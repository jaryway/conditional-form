export type SchemaEnum<Message> = Array<
  | string
  | number
  | boolean
  | { label: Message; value: any; [key: string]: any }
  | { key: any; title: Message; [key: string]: any }
>;

export type SchemaTypes =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | (string & {});

export type SchemaProperties<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message,
> = Record<
  string,
  ISchema<
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

export type SchemaPatch = (schema: ISchema) => ISchema;

export type SchemaKey = string | number;

export type SchemaEffectTypes =
  | 'onFieldInit'
  | 'onFieldMount'
  | 'onFieldUnmount'
  | 'onFieldValueChange'
  | 'onFieldInputValueChange'
  | 'onFieldInitialValueChange'
  | 'onFieldValidateStart'
  | 'onFieldValidateEnd'
  | 'onFieldValidateFailed'
  | 'onFieldValidateSuccess';

// export type SchemaReaction<Field = any> =
//   | {
//       dependencies?: string[] | Record<string, string>
//       when?: string | boolean
//       target?: string
//       effects?: SchemaEffectTypes[]
//       fulfill?: {
//         state?: Stringify<Formily.Core.Types.IGeneralFieldState>
//         schema?: ISchema
//         run?: string
//       }
//       otherwise?: {
//         state?: Stringify<Formily.Core.Types.IGeneralFieldState>
//         schema?: ISchema
//         run?: string
//       }
//       [key: string]: any
//     }
//   | ((field: Field) => void)

// export type SchemaReactions<Field = any> =
//   | SchemaReaction<Field>
//   | SchemaReaction<Field>[]

export type SchemaItems<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message,
> =
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
    >[];

export type SchemaComponents = Record<string, any>;

export interface ISchemaFieldFactoryOptions<Components extends SchemaComponents = any> {
  components?: Components;
  scope?: any;
}
export declare type JSXComponent = any;
export declare type FieldDecorator<Decorator extends JSXComponent, ComponentProps = any> =
  | [Decorator]
  | [Decorator, ComponentProps]
  | boolean
  | any[];
export declare type FieldComponent<Component extends JSXComponent, ComponentProps = any> =
  | [Component]
  | [Component, ComponentProps]
  | boolean
  | any[];

export type ICondition = {
  /**
   * Property that represents the name of the field to watch
   */
  when: string;
  /**
   * Property that represents the value needed to reach the condition
   */
  is: any;
  visible?: true;
  becomes?: any;
};

export interface IFieldFactoryProps<
  Decorator extends JSXComponent,
  Component extends JSXComponent,
  TextType = any,
  ValueType = any,
> {
  name: string | number;
  baseName?: string;
  title?: TextType;
  description?: TextType;
  value?: ValueType;
  initialValue?: ValueType;
  required?: boolean;
  // display?: FieldDisplayTypes;
  // pattern?: FieldPatternTypes;
  hidden?: boolean;
  visible?: boolean;
  editable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  readPretty?: boolean;
  // dataSource?: FieldDataSource;
  // validateFirst?: boolean;
  // validator?: FieldValidator;
  decorator?: FieldDecorator<Decorator>;
  component?: FieldComponent<Component>;
  condition?: any;
  conditions?: ICondition[];
}

export interface ISchemaTransformerOptions extends ISchemaFieldFactoryOptions {
  required?: ISchema['required'];
}

export type Stringify<P extends { [key: string]: any }> = {
  /**
   * Use `string & {}` instead of string to keep Literal Type for ISchema#component and ISchema#decorator
   */
  [key in keyof P]?: P[key] | (string & {});
};

export type ISchema<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  // ReactionField = any
> = Stringify<{
  version?: string;
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
  $ref?: string;
  /** nested json schema spec **/
  definitions?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  properties?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  items?: SchemaItems<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  additionalItems?: ISchema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  patternProperties?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >;
  additionalProperties?: ISchema<
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
  ['x-decorator']?: Decorator | (string & {}) | ((...args: any[]) => any);
  //???????????????
  ['x-decorator-props']?: DecoratorProps;
  //??????
  ['x-component']?: Component | (string & {}) | ((...args: any[]) => any);
  //????????????
  ['x-component-props']?: ComponentProps;
  //???????????????
  //   ['x-reactions']?: SchemaReactions<ReactionField>
  //??????
  ['x-content']?: any;

  ['x-visible']?: boolean;

  ['x-hidden']?: boolean;

  ['x-disabled']?: boolean;

  ['x-editable']?: boolean;

  ['x-read-only']?: boolean;

  ['x-read-pretty']?: boolean;
}>;
