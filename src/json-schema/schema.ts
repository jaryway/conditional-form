import { each, isFn, map } from '@formily/shared';
import {
  ISchema as ISch,
  SchemaKey,
  SchemaTypes,
  SchemaEnum,
  SchemaProperties,
  ISchemaTransformerOptions,
  IFieldFactoryProps,
  ICondition,
} from './types';
import { transformSchemaToFieldProps } from './transformer';

export type ISchema<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
> = ISch<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message
>;

export class Schema<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  //   ReactionField = any,
> implements ISchema
{
  parent?: Schema;
  root?: Schema;
  name?: SchemaKey;
  title?: Message;
  description?: Message;
  default?: any;
  readOnly?: boolean;
  writeOnly?: boolean;
  type?: SchemaTypes;
  enum?: SchemaEnum<Message>;
  const?: any;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[] | boolean | string;
  format?: string;
  /** nested json schema spec **/
  definitions?: Record<
    string,
    Schema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  >;
  properties?: Record<
    string,
    Schema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  >;
  items?:
    | Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >
    | Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >[];
  additionalItems?: Schema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  patternProperties?: Record<
    string,
    Schema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  >;
  additionalProperties?: Schema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;

  //????????????
  ['x-index']?: number;
  //????????????
  ['x-pattern']?: Pattern;
  //????????????
  ['x-display']?: Display;
  //?????????
  ['x-validator']?: Validator;
  //?????????
  ['x-decorator']?: Decorator;
  //???????????????
  ['x-decorator-props']?: DecoratorProps;
  //??????
  ['x-component']?: Component;
  //????????????
  ['x-component-props']?: ComponentProps;

  //   ['x-reactions']?: SchemaReaction<ReactionField>[];

  ['x-content']?: any;

  ['x-visible']?: boolean;

  ['x-hidden']?: boolean;

  ['x-disabled']?: boolean;

  ['x-editable']?: boolean;

  ['x-read-only']?: boolean;

  ['x-read-pretty']?: boolean;

  ['x-conditions']?: ICondition[];

  _isJSONSchemaObject = true;

  version = '1.2';

  constructor(
    json: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
    parent?: Schema,
  ) {
    if (parent) {
      this.parent = parent;
      this.root = parent.root;
    } else {
      this.root = this;
    }
    return this.fromJSON(json);
  }

  fromJSON = (
    json: ISch<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    if (!json) return this;
    if (Schema.isSchemaInstance(json)) return json;

    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        const value = (json as any)[key];
        if (key === 'properties') {
          this.setProperties(value);
        } else if (key === 'patternProperties') {
          this.setPatternProperties(value);
        } else if (key === 'additionalProperties') {
          this.setAdditionalProperties(value);
        } else if (key === 'items') {
          this.setItems(value);
        } else if (key === 'additionalItems') {
          this.setAdditionalItems(value);
        } else if (key === '$ref') {
          // this.fromJSON(this.findDefinitions(value));
        } else {
          (this as any)[key] = value;
        }
      }
    }

    return this;
  };

  setProperties = (
    properties: SchemaProperties<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    for (const key in properties) {
      // console.log('454545-p', key, properties[key]);
      this.addProperty(key, properties[key]);
    }
    return this;
  };

  setItems = (
    schema:
      | ISchema<
          Decorator,
          Component,
          DecoratorProps,
          ComponentProps,
          Pattern,
          Display,
          Validator,
          Message
        >
      | ISchema<
          Decorator,
          Component,
          DecoratorProps,
          ComponentProps,
          Pattern,
          Display,
          Validator,
          Message
        >[],
  ) => {
    if (!schema) return;
    if (Array.isArray(schema)) {
      this.items = schema.map((item) => new Schema(item, this));
    } else {
      this.items = new Schema(schema, this);
    }
    return this.items;
  };

  setAdditionalProperties = (
    properties: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    if (!properties) return;
    this.additionalProperties = new Schema(properties);
    return this.additionalProperties;
  };

  setAdditionalItems = (
    items: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    if (!items) return;
    this.additionalItems = new Schema(items, this);
    return this.additionalItems;
  };

  setPatternProperties = (
    properties: SchemaProperties<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    if (!properties) return this;
    for (const key in properties) {
      this.addPatternProperty(key, properties[key]);
    }
    return this;
  };

  addPatternProperty = (
    key: SchemaKey,
    schema: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    if (!schema) return;
    this.patternProperties = this.patternProperties || {};
    this.patternProperties[key] = new Schema(schema, this);
    this.patternProperties[key].name = key;
    return this.patternProperties[key];
  };

  removePatternProperty = (key: SchemaKey) => {
    const schema = (this.patternProperties as any)[key];
    delete (this.patternProperties as any)[key];
    return schema;
  };

  addProperty = (
    key: SchemaKey,
    schema: ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >,
  ) => {
    this.properties = this.properties || {};
    this.properties[key] = new Schema(schema, this);
    this.properties[key].name = key;
    return this.properties[key];
  };

  /**
   * ?????????????????? properties ????????? map ??????
   * @param callback
   * @returns
   */
  mapProperties = <T>(
    callback?: (
      schema: Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >,
      key: SchemaKey,
      index: number,
    ) => T,
  ): T[] => {
    return Schema.getOrderProperties(this).map(({ schema, key }, index) => {
      return (callback && callback(schema, key, index)) as T;
    });
  };

  reduceProperties = <P, R>(
    callback?: (
      buffer: P,
      schema: Schema<
        Decorator,
        Component,
        DecoratorProps,
        ComponentProps,
        Pattern,
        Display,
        Validator,
        Message
      >,
      key: SchemaKey,
      index: number,
    ) => R,
    predicate?: P,
  ): R => {
    let results: any = predicate;
    Schema.getOrderProperties(this, 'properties').forEach(({ schema, key }, index) => {
      results = callback && callback(results, schema, key, index);
    });
    return results;
  };

  toFieldProps = (options?: ISchemaTransformerOptions): IFieldFactoryProps<any, any> => {
    return transformSchemaToFieldProps(this, options as any);
  };

  toJSON = (recursion = true) => {
    const results: { [k: string]: any } = {};
    each(this, (value: any, key) => {
      if ((isFn(value) && !key.includes('x-')) || key === 'parent' || key === 'root') return;
      if (key === 'properties' || key === 'patternProperties') {
        if (!recursion) return;
        results[key] = map(value, (item) => item?.toJSON?.());
      } else if (key === 'additionalProperties' || key === 'additionalItems') {
        if (!recursion) return;
        results[key] = value?.toJSON?.();
      } else if (key === 'items') {
        if (!recursion) return;
        if (Array.isArray(value)) {
          results[key] = value.map((item) => item?.toJSON?.());
        } else {
          results[key] = value?.toJSON?.();
        }
      } else {
        results[key] = value;
      }
    });
    return results as ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >;
  };

  static getOrderProperties = (
    schema: ISchema = {},
    propertiesName: keyof ISchema = 'properties',
  ) => {
    const orderProperties = [];
    const unorderProperties = [];
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    for (const key in schema[propertiesName]) {
      const item = schema[propertiesName][key];
      const index = item['x-index'];
      if (!isNaN(index)) {
        orderProperties[index] = { schema: item, key };
      } else {
        unorderProperties.push({ schema: item, key });
      }
    }
    return orderProperties.concat(unorderProperties).filter((item) => !!item);
  };

  static isSchemaInstance = (value: any): value is Schema => {
    return value instanceof Schema;
  };
}
