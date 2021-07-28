import React, { FC, cloneElement, isValidElement, useEffect } from 'react';
import { Form, FormItemProps } from 'antd';
import { Field, useForm } from 'react-final-form';
import AsyncValidator, { RuleItem } from 'async-validator';
import { getValidateState } from '../../utils';

// const requiredFuc = (value: any) => (value ? undefined : 'Required');

const composeValidators = (rules: RuleItem[], name: string) => {
  if (!rules || !rules.length) return undefined;

  return async (value: any) => {
    return await rules.reduce(async (error, rule) => {
      const cloneRule = { ...rule };
      const validator = new AsyncValidator({ [name]: [cloneRule] });
      return (
        (await error) ||
        (await validator.validate({ [name]: value }).catch((ex) => {
          const [{ message }] = ex.errors;
          return message;
        }))
      );
    }, undefined as Promise<any> | undefined);
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

const Control: FC<any> = ({ input, meta, label, required, rules, children, ...rest }) => {
  const isRequired = _isRequired(required, rules);
  const form = useForm();

  useEffect(() => {
    return () => {
      // console.log('unmount', input, meta);
      form.change(input.name, undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChildren = () => {
    if (isValidElement(children)) return cloneElement(children, { ...input });
    if (typeof children === 'function') return children({ ...input });
    return children;
  };

  return (
    <Form.Item
      {...rest}
      label={label}
      required={isRequired}
      validateStatus={getValidateState(meta)}
      help={(meta.touched || meta.modified) && meta.error}
    >
      {getChildren()}
    </Form.Item>
  );
};

// const requiredFuc = (value: any) => (value ? undefined : 'Required');
const FieldFormItem: FC<any> = ({ rules, name, type, ...rest }) => {
  return (
    <Field
      name={name}
      type={type}
      // initialValue={''}
      // component="input"
      // validate={requiredFuc}
      validate={composeValidators(rules || [], name)}
    >
      {({ input, meta }) => {
        // console.log('inputinputinput', name, input.value);
        return <Control {...{ input, meta, ...rest }} />;
      }}
    </Field>
  );
};

const FormControl: FC<FormControlProps> = (props) => {
  const { name, rules: _, ...rest } = props;

  if (name) return <FieldFormItem {...props} />;

  return <Form.Item {...rest}>{props.children}</Form.Item>;
};

export default FormControl;
