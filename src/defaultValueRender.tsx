import React from 'react';
import moment from 'moment';
import { ISchema, IDateField, ICascadeDateField, ICheckboxField } from './interface';

const defaultDateFormat = 'YYYY-MM-DD';

export function defaultValueRender(schema: ISchema, value: any) {
  // console.log('fdfdfdf', value);
  if (value === undefined || value === null) return '-';
  if (schema.componentName === 'DateField') {
    return value && moment(value).format((schema.props as IDateField).format || defaultDateFormat);
  }

  if (schema.componentName === 'CascadeDateField') {
    if (!value) return '-';

    const { format } = schema.props as ICascadeDateField;
    const [start, end] = value;

    return [
      start ? moment(start).format(format || defaultDateFormat) : '',
      end ? moment(end).format(format || defaultDateFormat) : '',
    ].join(' ~ ');
  }

  if (schema.componentName === 'CheckboxField' || schema.componentName === 'MultiSelectField') {
    const props = schema.props as ICheckboxField;
    if (props.dataSourceType === 'remote') return value.join('、');

    return (value as string[])
      .map((v) => {
        const item = (props.dataSource || []).find((m) => m.value === v);

        return item?.text || v;
      })
      .join('、');
  }

  if (schema.componentName === 'EditorField' || schema.componentName === 'RichText')
    return <div dangerouslySetInnerHTML={{ __html: value }} />;

  if (schema.componentName === 'OrganizationSelectField')
    return value.map((m: any) => m.name).join('、');

  if (schema.componentName === 'BooleanField') return value ? 'True' : 'False';

  return value;
}
