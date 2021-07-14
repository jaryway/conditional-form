import React, { FC, cloneElement, isValidElement } from 'react';
import { Form, FormItemProps } from 'antd';
import { Field } from 'react-final-form';
import AsyncValidator, { RuleItem } from 'async-validator';
import { getValidateState, useFieldForErrors } from '../../utils';
// import { RuleObject } from "rc-field-form/lib/interface";
// import { Rule } from "antd/lib/form";

// const requiredFuc = (value: any) => (value ? undefined : 'Required');

const composeValidators = (rules: RuleItem[], name: string) => {
  if (!rules || !rules.length) return undefined;

  // console.log('composeValidators');

  return async (value: any) => {
    return await rules.reduce(async (error: Promise<any> | undefined, rule) => {
      const cloneRule = { ...rule };
      const validator = new AsyncValidator({ [name]: [cloneRule] });
      return (
        (await error) ||
        (await validator.validate({ [name]: value }).catch((ex) => {
          const [{ message }] = ex.errors;
          return message;
        }))
      );
    }, undefined);
  };
};

const _isRequired = (required: any, rules: any) => {
  if (required === undefined) return false;
  if (required) return true;
  if (!rules) return false;

  return rules.some((rule: any) => {
    if (rule && typeof rule === 'object' && rule.required) return true;
    return false;
  });
};

interface FormControlProps extends Omit<FormItemProps<any>, 'children' | 'rules'> {
  name?: string;
  label?: string;
  required?: boolean;
  rules?: RuleItem[];
  type?: 'checkbox' | 'radio';
}

const FormControl: FC<FormControlProps> = ({
  label,
  required,
  rules,
  name,
  type,
  children,
  ...rest
}) => {
  const isRequired = _isRequired(required, rules);
  const { meta } = useFieldForErrors(name || '');
  // console.log('meta.error', meta.error);

  return (
    <Form.Item
      {...rest}
      label={label}
      required={isRequired}
      validateStatus={name ? getValidateState(meta) : undefined}
      help={!!name && (meta.touched || meta.modified) && meta.error}
    >
      {name ? (
        <Field
          name={name}
          // validate={requiredFuc}
          validate={composeValidators(rules || [], name)}
          type={type}
        >
          {({ input }) => {
            if (isValidElement(children)) return cloneElement(children, { ...input });
            if (typeof children === 'function') return children({ ...input });
            return children;
          }}
        </Field>
      ) : (
        children
      )}
    </Form.Item>
  );
};

export default FormControl;
