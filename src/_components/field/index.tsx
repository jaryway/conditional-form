import { isFn } from '@formily/shared';
import React, { FC, Fragment, useContext, createElement } from 'react';
import ConditionalField from '../../components/conditional-field';
import { FieldContext } from '../context';

// const isVoidField=(node:any)=>{
//     return node instanceof ViodField;
// }

const InternalField: FC<any> = (props) => {
  const { field } = props;
  const { conditions } = field || {};

  const children = isFn(props.children)
    ? props.children(props.field, props.field.form)
    : props.children;

  const renderComponent = () => {
    if (!field.component[0]) return <Fragment>{children}</Fragment>;

    /*
    const value = !isVoidField(field) ? field.value : undefined
    const onChange = !isVoidField(field)
      ? (...args: any[]) => {
          field.onInput(...args)
          field.component[1]?.onChange?.(...args)
        }
      : field.component[1]?.onChange
    const onFocus = !isVoidField(field)
      ? (...args: any[]) => {
          field.onFocus(...args)
          field.component[1]?.onFocus?.(...args)
        }
      : field.component[1]?.onFocus
    const onBlur = !isVoidField(field)
      ? (...args: any[]) => {
          field.onBlur(...args)
          field.component[1]?.onBlur?.(...args)
        }
      : field.component[1]?.onBlur
    const disabled = !isVoidField(field)
      ? field.pattern === 'disabled' || field.pattern === 'readPretty'
      : undefined
    const readOnly = !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined
      */

    return createElement(field.component[0], {
      ...field.component[1],
      style: {
        ...field.component[1]?.style,
      },
    });
  };

  const renderDecorator = (child: React.ReactNode) => {
    if (!field.decorator[0]) {
      return <Fragment>{child}</Fragment>;
    }

    return createElement(
      field.decorator[0],
      {
        ...field.decorator[1],
        style: {
          ...field.decorator[1]?.style,
        },
      },
      child,
    );
  };

  const renderCondition = (child: React.ReactNode) => {
    if (conditions && conditions.length)
      return <ConditionalField name={field.name} conditions={conditions}>{child}</ConditionalField>;

    return <Fragment>{child}</Fragment>;
  };

  return renderCondition(renderDecorator(renderComponent()));
};

const Field: FC<any> = ({ children, ...props }) => {
  const parent = useContext(FieldContext);
  const fieldProps = { ...props, baseName: parent?.name };

  return (
    <FieldContext.Provider value={fieldProps}>
      <InternalField field={fieldProps}>{children}</InternalField>
    </FieldContext.Provider>
  );
};

export default Field;
