import { isFn, isValid } from '@formily/shared';
import React, { FC, useContext, useMemo, Fragment } from 'react';
import { Schema } from '../../json-schema/schema';
import { FieldContext, SchemaOptionsContext } from '../context';
import Field from '../field';

const RecursionField: FC<any> = (props) => {
  const parent = useContext(FieldContext);
  const options = useContext(SchemaOptionsContext);

  const fieldSchema = useMemo(() => {
    const schema = new Schema(props.schema as any);
    return schema;
  }, [props.schema]);
  const fieldProps = useMemo(() => {
    //   fieldSchema.toFieldProps
    return fieldSchema['x-component-props'];
  }, [fieldSchema]);

  const getBaseName = () => {
    if (props.onlyRenderProperties) {
      return props.baseName || parent?.address.concat(props.name);
    }
    return props.baseName || parent?.address;
  };

  const baseName = getBaseName();
  const children = fieldSchema['x-content'] || fieldSchema['x-component-props']?.['children'];

  const renderProperties = (field?: any) => {
    if (props.onlyRenderSelf) return;
    return (
      <Fragment>
        {fieldSchema.mapProperties((item, name, index) => {
          const base = field?.address || baseName;
          let schema: Schema = item;
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name);
            if (mapped) {
              schema = mapped;
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null;
            }
          }
          return (
            <RecursionField schema={schema} key={`${index}-${name}`} name={name} basePath={base} />
          );
        })}
        {children}
      </Fragment>
    );
  };

  const render = () => {
    if (!isValid(props.name)) return renderProperties();
    if (fieldSchema.type === 'object') {
      if (props.onlyRenderProperties) return renderProperties();
      //   return (
      //     <ObjectField {...fieldProps} name={props.name} basePath={basePath}>
      //       {renderProperties}
      //     </ObjectField>
      //   );
    } else if (fieldSchema.type === 'array') {
      //   return (
      //     <ArrayField {...fieldProps} name={props.name} basePath={basePath}>
      //       {children}
      //     </ArrayField>
      //   );
    } else if (fieldSchema.type === 'void') {
      if (props.onlyRenderProperties) return renderProperties();
      //   return (
      //     <VoidField {...fieldProps} name={props.name} basePath={basePath}>
      //       {renderProperties}
      //     </VoidField>
      //   );
    }
    return (
      <Field {...fieldProps} name={props.name} baseName={baseName}>
        {children}
      </Field>
    );
  };

  return <Fragment>{render()}</Fragment>;
};

export default RecursionField;
