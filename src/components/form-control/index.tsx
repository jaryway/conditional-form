import React, { FC, cloneElement, isValidElement, useEffect } from 'react';
import { Form, FormItemProps } from 'antd';
import { Field, useForm } from 'react-final-form';
import AsyncValidator, { RuleItem } from 'async-validator';
import { getValidateState, useFieldForErrors } from '../../utils';
// import WithUnmountField from './WithUnmountField';
// import { RuleObject } from "rc-field-form/lib/interface";
// import { Rule } from "antd/lib/form";

// const requiredFuc = (value: any) => (value ? undefined : 'Required');

const composeValidators = (rules: RuleItem[], name: string) => {
  if (!rules || !rules.length) return undefined;

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
  if (required !== undefined) return required;
  // if (required) return true;
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

// const requiredFuc = (value: any) => (value ? undefined : 'Required');

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
  const form = useForm();
  useEffect(() => {
    return () => {
      name && form.change(name, undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('rules', rules, isRequired);

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
          type={type}
          // validate={requiredFuc}
          validate={composeValidators(rules || [], name)}
        >
          {({ input }) => {
            console.log('inputinputinput', name, input.value);
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
