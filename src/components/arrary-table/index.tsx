import { isArr } from '@formily/shared';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { Fragment } from 'react';
import { Schema } from '../../json-schema/schema';
import SchemaField from '../../SchemaField1';

const json = {
  type: 'array',
  'x-decorator': 'FormItem',
  'x-component': 'ArrayTable',
  'x-component-props': {},
  'x-decorator-props': {},
  _designableId: '212t32qkfco',
  items: {
    type: 'object',
    _designableId: 'nrymiw0xn50',
    properties: {
      '76t2ht3h9bn': {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: 'Title',
        },
        _designableId: '76t2ht3h9bn',
        properties: {
          cmnugwkexmq: {
            type: 'void',
            'x-component': 'ArrayTable.SortHandle',
            _designableId: 'cmnugwkexmq',
            'x-index': 0,
          },
        },
        'x-index': 0,
      },
      obw8ifinypm: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: 'Title',
        },
        _designableId: 'obw8ifinypm',
        properties: {
          z99ba7au7f4: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator-props': {},
            _designableId: 'z99ba7au7f4',
            'x-index': 0,
          },
        },
        'x-index': 1,
      },
      '6u5w427z4zu': {
        title: 'Input',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {},
        'x-decorator-props': {},
        _designableId: '6u5w427z4zu',
        'x-index': 2,
      },
      kfqvn9wp6j6: {
        title: 'Input',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {},
        'x-decorator-props': {},
        _designableId: 'kfqvn9wp6j6',
        'x-index': 3,
      },
      o8vwimme0pj: {
        title: 'Input',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {},
        'x-decorator-props': {},
        _designableId: 'o8vwimme0pj',
        'x-index': 4,
      },
      x2e82p21jx7: {
        title: 'Input',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {},
        'x-decorator-props': {},
        _designableId: 'x2e82p21jx7',
        'x-index': 5,
      },
      '8hwmqlxf7hz': {
        title: 'TextArea',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {},
        'x-decorator-props': {},
        _designableId: '8hwmqlxf7hz',
        'x-index': 6,
      },
      wlnw3zztr8n: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: 'Title',
        },
        _designableId: 'wlnw3zztr8n',
        properties: {
          qv7k5b43lf2: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator-props': {},
            _designableId: 'qv7k5b43lf2',
            'x-index': 0,
          },
        },
        'x-index': 7,
      },
      l680b1ze18a: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: 'Title',
        },
        _designableId: 'l680b1ze18a',
        properties: {
          m823fz0acsa: {
            title: '',
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator-props': {},
            _designableId: 'm823fz0acsa',
            'x-index': 0,
          },
        },
        'x-index': 8,
      },
      nfuqyrdswaw: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: 'Title',
        },
        _designableId: 'nfuqyrdswaw',
        properties: {
          '78pn9g2ltjw': {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator-props': {},
            _designableId: '78pn9g2ltjw',
            'x-index': 0,
          },
        },
        'x-index': 9,
      },
      '91uhh5d4k6p': {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: '装逼',
        },
        _designableId: '91uhh5d4k6p',
        properties: {
          p2wmnf9xlre: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {},
            'x-decorator-props': {},
            _designableId: 'p2wmnf9xlre',
            'x-index': 0,
          },
        },
        'x-index': 10,
      },
      z6rxdsxh789: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: 'Title',
        },
        _designableId: 'z6rxdsxh789',
        properties: {
          oj5bz5jrnix: {
            type: 'void',
            'x-component': 'ArrayTable.Remove',
            _designableId: 'oj5bz5jrnix',
            'x-index': 0,
          },
          '689dlwv0kft': {
            type: 'void',
            'x-component': 'ArrayTable.MoveDown',
            _designableId: '689dlwv0kft',
            'x-index': 1,
          },
          y93e2eiacqj: {
            type: 'void',
            'x-component': 'ArrayTable.MoveUp',
            'x-decorator-props': {},
            _designableId: 'y93e2eiacqj',
            'x-index': 2,
          },
        },
        'x-index': 11,
      },
    },
  },
  'x-index': 1,
  properties: {
    '37s6cj83bvb': {
      type: 'void',
      title: 'Addition',
      'x-component': 'ArrayTable.Addition',
      _designableId: '37s6cj83bvb',
      'x-index': 0,
    },
  },
};

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1;
};

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1;
};

const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1;
};

export const ArrayTable = () => {
  const schema = new Schema(json);
  //   console.log('columns.items', items);
  const parseSources = (schema: Schema): any[] => {
    if (isColumnComponent(schema) || isOperationsComponent(schema) || isAdditionComponent(schema)) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name']) return [];
      const name = schema['x-component-props']?.['dataIndex'] || schema['name'];
      //   const field = arrayField.query(arrayField.address.concat(name)).take();
      //   const columnProps = field?.component?.[1] || schema['x-component-props'] || {};
      //   const display = field?.display || schema['x-display'];
      return [
        {
          dataIndex: name,
          schema,
          title: schema['x-component-props']?.title,
          render: (value: any, record: any) => {
            return <SchemaField schema={schema as any} />;
          },
        },
      ];
    } else if (schema.properties) {
      return schema.reduceProperties((buf, sche) => {
        return buf.concat(parseSources(sche));
      }, [] as any[]);
    }

    return [];
  };

  const parseArrayItems = (schema: Schema['items']) => {
    const sources: any[] = [];
    const items = isArr(schema) ? schema : [schema];

    return items.reduce((columns, sche) => {
      const item = parseSources(sche as any);
      if (item) {
        return columns.concat(item);
      }
      return columns;
    }, sources as any[]);
  };

  console.log('columns', parseArrayItems(schema.items));

  return (
    <>
      <Table columns={parseArrayItems(schema.items)} dataSource={[{ z99ba7au7f4: '4545' }]} />
      <Button type="dashed" style={{ width: '100%' }} icon={<PlusOutlined />}>
        add
      </Button>
    </>
  );

  return <Fragment />;
};

ArrayTable.Column = ({ children }: any) => {
  return <Fragment>{children}</Fragment>;
};
