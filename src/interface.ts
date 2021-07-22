// import {
//   IFieldState,
//   IMutators,
//   IForm,
//   IVirtualFieldState,
//   FormPathPattern,
//   IFormExtendedValidateFieldOptions,
//   ValidateNodeResult,
// } from '@formily/react';

type ICondition = {
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

export type ComponentName =
  | 'Page'
  | 'PageSection'
  | 'Form'
  | 'ColumnsLayout'
  | 'Column'
  | 'RichText'
  | 'CustomField'
  | 'TableField'
  | 'TextField'
  | 'TextareaField'
  | 'NumberField'
  | 'BooleanField'
  | 'RadioField'
  | 'CheckboxField'
  | 'SelectField'
  | 'MultiSelectField'
  | 'CascadeSelectField'
  | 'DateField'
  | 'UploadField'
  | 'CascadeDateField'
  | 'EditorField'
  | 'OrganizationSelectField';

export interface ActionType {
  forceUpate: () => void;
  reset: (props?: any) => void;
  submit: (onSubmit?: (values: any) => any) => Promise<any>;
  // validate: (path?: FormPathPattern, opts?: IFormExtendedValidateFieldOptions) => Promise<ValidateNodeResult>;
  // setFieldValue: (path?: FormPathPattern, value?: any, silent?: boolean) => void;
}

export type IValidationType =
  | 'required'
  | 'phone'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'url'
  | 'mobile'
  | 'email'
  | 'ID'
  | 'date';

export interface IOption {
  defaultChecked?: boolean;
  text: string;
  value: string;
  sid?: string; // serial_xxxx
}

export interface IPermission {
  [k: string]: { writable?: 0 | 1 | boolean; visible?: 0 | 1 | boolean };
}

export interface ISchema<
  T = IBase &
    (
      | IPageSection
      | IColumn
      | IColumnsLayout
      | IRichText
      | ITableField
      | ITextField
      | ITextareaField
      | INumberField
      | IBooleanField
      | ICheckboxField
      | IRadioField
      | ISelectField
      | IMultiSelectField
      | ICascadeSelectField
      | IDateField
      | IUploadField
      | ICascadeDateField
      | IEditorField
      | IOrganizationSelectField
    ),
> {
  engineVersion?: string;
  version?: string;
  componentName: string & ComponentName;
  id: string;
  props: T;
  children?: Array<ISchema<T>>;
}

export interface IValidation {
  type: IValidationType;
  param?: string;
  message?: string;
}

export interface IBase {
  visibility?: Array<'PC' | 'MOBILE'>;
  fieldId?: string;
  itemDirection?: 'horizontal' | 'vertical';
  __style__?: any;
  label?: string;
  behavior?: 'NORMAL' | 'DISABLED' | 'READONLY' | 'HIDDEN';
  display?: boolean;
  visible?: boolean;
  readOnly?: boolean;
  showLabel?: boolean;
  labelCol?: any;
  wrapperCol?: any;
  options?: Array<string | { value: string; label: string; defaultChecked?: boolean }>;
  placeholder?: string; // 占位提示

  labelAlign?: 'top' | 'middle' | 'bottom'; // 标签对齐方式
  labelTextAlign?: 'left' | 'right'; // 标签的文本对齐方式

  validationType?: IValidationType;
  validation?: Array<IValidation>;
  conditions?: Array<ICondition>;
  rules?: any[];

  formula?: {
    data: Array<{
      fieldId: string; //
      value: any;
      fields: string[];
    }>;
  };
}

// 分组
export interface IPageSection extends IBase {
  size?: 'small' | 'default';
  showHeader?: boolean; // 显示头部
  showHeadDivider?: boolean; // 头部分割线
  showBorder?: boolean; // 显示边框
}

// 布局容器列
export interface IColumn {
  span?: number; // 栅格占位格数 0~24
}
// 布局容器
export interface IColumnsLayout {
  // layout: '12:9:3';
  columnGap?: number | '0' | '16px' | '24px' | '32px';
  rowGap?: number | '0px' | '16px' | '24px' | '32px';
  layout?: 'VERTICAL' | 'HORIZONTAL';
  mobileRowGap?: string | '0px' | '16px' | '24px' | '32px';
}
// 图文展示
export interface IRichText {
  label: string;
  content: string;
  contentPaddingMobile?: number;
}
// 图文展示
export interface ITableField extends IBase {
  actionsColumnWidth?: number; // 70;
  // labelTextAlign?: 'left';
  // theme: 'split';
  delButtonText?: string; // { use: 'zh_CN'; zh_CN: '删除'; type: 'i18n' };
  addButtonText?: string; // 新增一项
  addButtonPosition?: 'bottom' | 'top';
  // moveUp: { use: 'zh_CN'; zh_CN: '上移'; type: 'i18n' };
  // fieldId: string;
  maxItems?: 50;
  showIndex?: true; // 显示行号
  showActions?: true; // 显示操作按钮
  showDeleteConfirm?: true; // 显示删除提示
  showTableHead?: boolean; // 显示表头
  // showSortable: false;// 显示排序按钮
  // __category__: 'form';
  // moveDown: { use: 'zh_CN'; zh_CN: '下移'; type: 'i18n' };
  // labelColSpan: 4;
  // layout: 'TABLE';
  minItems?: 1;
  actions?: any[];
  value?: any[];
  // children: ISchema[];
}
// 单行文本
export interface ITextField extends IBase {
  label: string; // 标签文本
  labelAlign: 'top' | 'middle' | 'bottom'; // 标签对齐方式
  labelTextAlign: 'left' | 'right'; // 标签的文本对齐方式
  placeholder?: string; // 占位提示
  labelColSpan?: number; // 标签宽度(栅格)
  minLength?: number; // 最小长度
  maxLength?: number; // 最大长度
  itemDirection?: 'horizontal' | 'vertical';
  value?: Date | string | number;

  size?: 'small' | 'medium' | 'large';
}
// 多行文本
export interface ITextareaField extends ITextField {
  htmlType: 'textarea';
  rows: number;
  autoHeight: boolean;
}
// 数值
export interface INumberField extends ITextField {
  precision: number; // 精度（小数点位）
  innerAfter?: string; // 后缀，比如：元、美元，km
  min?: number;
  max?: number;
}

// 复选
export interface ICheckboxField extends IBase {
  label: string; // 标签文本
  labelAlign?: 'top' | 'middle' | 'bottom'; // 标签对齐方式
  labelTextAlign?: 'left' | 'right'; // 标签的文本对齐方式
  remote?: string; // api 地址
  dataSourceType: 'remote' | 'custom'; // remote：通过 api 获取，custom：手动配置
  dataSource?: Array<IOption>;
  itemDirection?: 'horizontal' | 'vertical';
}
// 复选
export interface IBooleanField extends IBase {
  label: string; // 标签文本
  labelAlign?: 'top' | 'middle' | 'bottom'; // 标签对齐方式
  labelTextAlign?: 'left' | 'right'; // 标签的文本对齐方式
}
// 单选
export interface IRadioField extends ICheckboxField {}

// 下拉单选
export interface ISelectField extends ICheckboxField {
  mode: 'single' | 'multiple';
  placeholder?: string; // 占位提示
}
// 下拉复选
export interface IMultiSelectField extends ISelectField {}
// 联级选择
export interface ICascadeSelectField {}
// 日期
export interface IDateField extends ITextField {
  // itemDirection: 'horizontal' | 'vertical';
  value?: Date | string;
  // 可选日期 none:无限制，
  disabledDate?: {
    type:
      | 'none' // 无限制
      | 'afterToday' // 可选今天之前（含今天）
      | 'beforeToday' // 可选今天之后（含今天）
      | 'duration'; // 不可选区间（含开始和结束）
    start?: Date;
    end?: Date;
  };
  format?: 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH:mm:ss';
}
// 日期区间
export interface ICascadeDateField extends Omit<IBase, 'placeholder'> {
  label: string; // 标签文本
  placeholder?: [string, string];
  value?: [Date?, Date?];
  // 可选日期 none:无限制，
  disabledDate?: {
    type:
      | 'none' // 无限制
      | 'afterToday' // 可选今天之前（含今天）
      | 'beforeToday' // 可选今天之后（含今天）
      | 'duration'; // 不可选区间（含开始和结束）
    start?: Date;
    end?: Date;
  };
  format?: 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH:mm:ss';
}
export interface IUploadField extends IBase {
  /**
   * 按钮文本
   */
  buttonText?: string;
  /**
   * 多选
   */
  multiple?: boolean;
  /**
   * 最大上传文件个数
   */
  maxCount?: number;
  /**
   * 允许上传的文件类型
   */
  accept?: string;
}
// 富文本编辑器
export interface IEditorField extends ITextareaField {
  tinymceScriptSrc?: string;
}
// 组织机构选择器
export interface IOrganizationSelectField extends ITextField {
  type: Array<
    'LEGALENTITY' | 'DIVISION' | 'GROUP' | 'POSITION' | 'USER' | 'VARIABLEROLE' | 'ROOTLEGAL'
  >;
  multiple?: boolean;
  companyId?: string;
  variableData?: Array<object>;
  tagClosable?: boolean;
}

export interface IConditionItem {
  when: string;
  is: any;
}

export interface IConditionMap {
  [key: string]: Array<IConditionItem>;
  // or?: Array<IConditionItem>;
  // and?: Array<IConditionItem>;
}

// export interface ISchemaFieldComponent extends IFieldState {
//   schema: ISchema;
//   mutators: IMutators;
//   form: IForm;
//   // required?: boolean;
//   className?: string;
//   onChange?: (v: any) => void;
//   // [k: string]: any;
//   // value?: any;
//   // name: string;
//   // editable?: boolean;
//   // renderField: (addtionKey: string | number, reactKey?: string | number) => React.ReactElement;
// }
// export interface ISchemaVirtualFieldComponent extends IVirtualFieldState {
//   schema: ISchema;
//   form?: IForm;
//   // children?: React.ReactElement[];
//   // renderField: (addtionKey: string | number, reactKey?: string | number) => React.ReactElement;
// }

// export type ISchemaFieldContext = Partial<ISchemaFieldComponent>;

export interface IAbstractSchemaForm {
  requestMethod?: any; // 数据请求配置
  tinymceScriptSrc?: string; // 富文本的 js 文件地址
  organizationSelectComponent?: React.JSXElementConstructor<any> | React.FunctionComponent<any>;
  registryComponents?: IRegistryComponents; // 注册组件
  valueRender?: (schema: ISchema, value: any) => any; // 配置值渲染器
}

export interface IConfigContext extends IAbstractSchemaForm {
  uploadRequest?: (options: any) => Promise<any>;
}

interface IAbstractSchemaFormContext {
  schema: ISchema; // 表单配置数据
  value?: any; // 表单的值
  isMobile?: boolean;
  readOnly?: boolean; // 表单是否只读
  permissions?: IPermission; // 表单权限
  tinymceScriptSrc?: string; // 富文本的 js 文件地址
  valueRender?: (schema: ISchema, value: any) => any; // 配置值渲染器
  organizationSelectComponent?: React.JSXElementConstructor<any> | React.FunctionComponent<any>;
}

interface INormalSchemaFormContext extends IAbstractSchemaFormContext {
  mode: 'normal';
  descriptionMode: undefined;
}

interface IDesignSchemaFormContext extends IAbstractSchemaFormContext {
  mode: 'design';
  descriptionMode: undefined;
}

interface IDescriptionSchemaFormContext extends IAbstractSchemaFormContext {
  mode: 'description';
  descriptionMode: 'disabled' | 'text';
}

export type ISchemaFormContext =
  | INormalSchemaFormContext
  | IDesignSchemaFormContext
  | IDescriptionSchemaFormContext;

// s.type = 'case_1';
// s.field = 'disabled';
// // s.mode = 'description';
// var s: ISchemaFormContext = { mode: 'normal', descriptionMode: 'disabled' };
// if (s.mode === 'design') s.descriptionMode='disabled';

export type ISchemaForm = IAbstractSchemaForm &
  ISchemaFormContext & {
    // schema: ISchema;
    // value?: any; // 表单值
    extra?: React.ReactNode; // 在表单前面的内容，children 在表单后面
    style?: React.CSSProperties;
    formRef?: React.RefObject<ActionType>;
    onSubmit?: (v: any) => void;
    onValidateFailed?: (errors: any) => void;
    forceUpate?: () => void; // 强制更新表单，当表单关联关系发生变化的时候需要
  };

// export type MixinConnectedComponent<T extends string> = React.FC<ISchemaFieldComponent> &
//   {
//     [key in T]: React.FC<ISchemaFieldComponent>;
//   };
export interface IFieldContext {
  schema: ISchema;
}

export interface ISchemaFormComponent {
  schema: ISchema;
  // form: IForm;
  [k: string]: any;
}

export interface IRegistryComponents {
  // fields: {
  //   [key: string]: React.JSXElementConstructor<any>;
  // };
  // virtualFields: {
  //   [key: string]: React.JSXElementConstructor<any>;
  // };
  // previewComponent?: string | React.JSXElementConstructor<any>;
  // formComponent: string | React.JSXElementConstructor<any>;
  // formItemComponent: React.JSXElementConstructor<any>;
  previewComponent?: string | React.JSXElementConstructor<any>;
  rootComponent?: string | React.JSXElementConstructor<any>;
  formComponent?: string | React.JSXElementConstructor<any>;
  formItemComponent?: React.JSXElementConstructor<any>;

  virtualFields?: {
    Form: React.JSXElementConstructor<any>;
    PageSection: React.JSXElementConstructor<any>;
    ColumnsLayout: React.JSXElementConstructor<any>;
    Column: React.JSXElementConstructor<any>;
    [k: string]: React.JSXElementConstructor<any>;
  };
  fields?: {
    TableField: React.JSXElementConstructor<any>;
    TextField: React.JSXElementConstructor<any>;
    TextareaField: React.JSXElementConstructor<any>;
    NumberField: React.JSXElementConstructor<any>;
    BooleanField: React.JSXElementConstructor<any>;
    RadioField: React.JSXElementConstructor<any>;
    CheckboxField: React.JSXElementConstructor<any>;
    SelectField: React.JSXElementConstructor<any>;
    MultiSelectField: React.JSXElementConstructor<any>;
    CascadeSelectField: React.JSXElementConstructor<any>;
    DateField: React.JSXElementConstructor<any>;
    UploadField: React.JSXElementConstructor<any>;
    CascadeDateField: React.JSXElementConstructor<any>;
    EditorField: React.JSXElementConstructor<any>;
    OrganizationSelectField: React.JSXElementConstructor<any>;
    RichText: React.JSXElementConstructor<any>;
    CustomField: React.JSXElementConstructor<any>;
    [k: string]: React.JSXElementConstructor<any>;
  };
}
