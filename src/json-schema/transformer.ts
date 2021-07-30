import { Schema } from './schema';
import { IFieldFactoryProps, ISchemaFieldFactoryOptions } from './types';

import { isBool, isStr, isArr, isValid } from '@formily/shared';
import { Path as FormPath, Pattern } from '@formily/path';
import { RuleItem } from 'async-validator';
// import { FieldValidator } from 'final-form';

const findComponent = (
  type: 'component' | 'decorator',
  path: Pattern,
  options: ISchemaFieldFactoryOptions,
  // state: IFieldState,
) => {
  let component: any = null;

  if (path && options?.components) {
    if (FormPath.isPathPattern(path)) {
      component = FormPath.getIn(options.components, path);
      if (!component) {
        //Todo: need to use __DEV__ keyword
        console.error(
          `[Formily JSON Schema]: Cannot find the '${path}' component mapped by Schema.x-${type}`,
        );
      }
    }
  }
  // if (isFn(path) || (path?.['$$typeof'] && isFn(path['type']))) {
  //   return path;
  // }
  return component;
};

const getValidator = (schema: Schema): any => {
  let rules: RuleItem[] = [];
  // 校验数据类型，取值 date-time（时间格式）、email（邮件格式）、hostname（网站地址格式）、ipv4、ipv6、uri、uri-reference、uri-template、json-pointer
  if (schema.format) {
    rules.push({ type: schema.format as any });
  }
  //
  if (isValid(schema.maxItems)) {
    rules.push({ type: 'array', max: schema.maxItems });
  }
  if (isValid(schema.minItems)) {
    rules.push({ type: 'array', min: schema.minItems });
  }
  if (isValid(schema.maxLength)) {
    rules.push({ max: schema.maxLength });
  }
  if (isValid(schema.minLength)) {
    rules.push({ min: schema.minLength });
  }
  // 值必须是 number 类型, x ≤ maximum
  if (isValid(schema.maximum)) {
    rules.push({
      type: 'number',
      max: schema.maximum,
      validator: (rule, value) => {
        return true;
      },
    });
  }
  // 值必须是 number 类型, x ≥ minimum
  if (isValid(schema.minimum)) {
    rules.push({ type: 'number', min: schema.minimum });
  }
  // 值必须是 number 类型, x < exclusiveMaximum
  if (isValid(schema.exclusiveMaximum)) {
    // rules.push({ type: 'number', exclusiveMaximum: schema.exclusiveMaximum });
  }
  // 值必须是 number 类型, value < exclusiveMinimum
  if (isValid(schema.exclusiveMinimum)) {
    // rules.push({ exclusiveMinimum: schema.exclusiveMinimum });
  }
  // 正则
  if (isValid(schema.pattern)) {
    rules.push({ pattern: schema.pattern });
  }

  // 常亮，v===const
  if (isValid(schema.const)) {
    // rules.push({
    //   validator: (
    //     value: any,
    //     rule: any,
    //     ctx: any,
    //     format: (message: string, scope: any) => string,
    //   ) => {
    //     if (isEmpty(value)) return '';
    //     return value === schema.const ? '' : format(getValidateLocale('schema.const'), schema);
    //   },
    // });
  }
  // 倍数，x 是 multipleOf 的倍数，multipleOf=5, x 是 5 的倍数
  // if (isValid(schema.multipleOf)) {
  //   rules.push({
  //     validator: (rule: any, value: any, callback) => {
  //       if (isEmpty(value)) return true;
  //       const valid = value % (schema.multipleOf as number) === 0;

  //       callback(valid ? void 0 : '无效数据');
  //       // return false;
  //     },
  //   });
  // }

  // x 为对象时， x 的最大属性数，大于等于
  // if (isValid(schema.maxProperties)) {
  //   rules.push({
  //     validator: (
  //       value: any,
  //       rule: any,
  //       ctx: any,
  //       format: (message: string, scope: any) => string,
  //     ) => {
  //       if (isEmpty(value)) return '';
  //       return Object.keys(value || {}).length <= schema.maxProperties
  //         ? ''
  //         : format(getValidateLocale('schema.maxProperties'), schema);
  //     },
  //   });
  // }
  // if (isValid(schema.minProperties)) {
  //   rules.push({
  //     validator: (
  //       value: any,
  //       rule: any,
  //       ctx: any,
  //       format: (message: string, scope: any) => string,
  //     ) => {
  //       if (isEmpty(value)) return '';
  //       return Object.keys(value || {}).length >= schema.minProperties
  //         ? ''
  //         : format(getValidateLocale('schema.minProperties'), schema);
  //     },
  //   });
  // }
  // if (isValid(schema.uniqueItems)) {
  //   rules.push({
  //     validator: (
  //       value: any,
  //       rule: any,
  //       ctx: any,
  //       format: (message: string, scope: any) => string,
  //     ) => {
  //       value = toArr(value);
  //       return value.some((item: any, index: number) => {
  //         for (let start = index; start < value.length; start++) {
  //           if (isEqual(value[start], item)) {
  //             return false;
  //           }
  //         }
  //       })
  //         ? format(getValidateLocale('schema.uniqueItems'), schema)
  //         : '';
  //     },
  //   });
  // }

  if (isValid(schema['x-validator'])) {
    rules = rules.concat(schema['x-validator']);
  }
  if (rules.length) return rules;
};

const getBaseProps = (schema: Schema, options: ISchemaFieldFactoryOptions, state?: any) => {
  const props: Partial<IFieldFactoryProps<any, any>> = {};

  const validator = getValidator(schema);

  // const dataSource = getDataSource(schema);

  const editable = isValid(schema['x-editable']) ? schema['x-editable'] : schema['writeOnly'];

  const readOnly = isValid(schema['x-read-only']) ? schema['x-read-only'] : schema['readOnly'];

  const decoratorType = findComponent('decorator', schema['x-decorator'], options);

  const decoratorProps = schema['x-decorator-props'] || state?.decorator?.[1];

  const componentType = findComponent('component', schema['x-component'], options);
  const componentProps = schema['x-component-props'] || state?.component?.[1];

  // console.log('xdsdsdsdsdsdsdsd', componentType, decoratorType);

  if (isValid(schema.default)) {
    props.initialValue = schema.default;
  }

  if (isValid(schema.title)) {
    props.title = schema.title;
  }

  if (isValid(schema.description)) {
    props.description = schema.description;
  }

  if (isValid(schema['x-disabled'])) {
    props.disabled = schema['x-disabled'];
  }

  if (isValid(schema['x-read-pretty'])) {
    props.readPretty = schema['x-read-pretty'];
  }

  if (isValid(schema['x-visible'])) {
    props.visible = schema['x-visible'];
  }

  if (isValid(schema['x-hidden'])) {
    props.hidden = schema['x-hidden'];
  }

  // if (isValid(schema['x-display'])) {
  //   props.display = schema['x-display'];
  // }

  // if (isValid(schema['x-pattern'])) {
  //   props.pattern = schema['x-pattern'];
  // }

  // if (isValid(validator)) {
  //   props.validator = validator;
  // }

  // if (isValid(dataSource)) {
  //   props.dataSource = dataSource;
  // }

  if (isValid(editable)) {
    props.editable = editable;
  }

  if (isValid(readOnly)) {
    props.readOnly = readOnly;
  }

  if (isValid(decoratorType)) {
    props.decorator = [decoratorType, decoratorProps];
  }

  if (isValid(componentType)) {
    props.component = [componentType, componentProps];
  }

  if (isValid(schema['x-conditions'])) {
    props.conditions = schema['x-conditions'];
  }

  return props;
};

const getRequired = (schema: Schema) => {
  if (isBool(schema.required)) {
    return schema.required;
  }

  let parent = schema.parent;

  while (parent) {
    if (isStr(parent.required)) {
      if (FormPath.parse(parent.required).match(schema.name || '')) return true;
    } else if (isArr(parent.required)) {
      if (parent.required.some((parent) => FormPath.parse(parent).match(schema.name || ''))) {
        return true;
      }
    }
    parent = parent.parent;
  }
  return undefined;
};

export const transformSchemaToFieldProps = (
  schema: Schema,
  options: ISchemaFieldFactoryOptions,
): IFieldFactoryProps<any, any> => {
  const required = getRequired(schema);
  // const reactions = getReactions(schema, options);
  const props = getBaseProps(schema, options);

  // console.log('transformSchemaToFieldProps', schema, props, options);

  props.required = required;
  props.name = schema.name;
  // props.reactions = [reactions];

  return props as any;
};
