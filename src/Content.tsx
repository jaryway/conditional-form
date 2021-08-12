import React from 'react';

import { Card as AntCard } from 'antd';
import 'antd/dist/antd.css';
import { ComponentTreeWidget } from './widgets/ComponentTreeWidget';
import { useTreeNode, useTest } from './hooks';

export const Content = () => {
  const s = useTest('content');

  console.log('useTest-content', s);

  return (
    <ComponentTreeWidget
      components={{
        Field: (props) => {
          // const s= useTree();
          const node = useTreeNode();
          console.log('xxxx', props, node.props);

          return (
            <span
              {...props}
              style={{
                background: '#eee',
                display: 'inline-block',
                ...props.style,
                padding: '10px 20px',
                border: '1px solid #ddd',
              }}
            >
              {node.props.title}
              {props.children}
            </span>
          );
        },
        Card: (props) => {
          return (
            <AntCard
              {...props}
              // style={{
              //   background: '#eee',
              //   border: '1px solid #ddd',
              //   display: 'flex',
              //   padding: 10,
              //   height: props.children ? 'auto' : 150,
              //   justifyContent: 'center',
              //   alignItems: 'center',
              // }}
            >
              {props.children ? props.children : <span>拖拽字段进入该区域</span>}
            </AntCard>
          );
        },
        Section: (props) => {
          return (
            <div
              {...props}
              style={{
                background: '#eee',
                border: '1px solid #ddd',
                display: 'flex',
                padding: 10,
                height: props.children ? 'auto' : 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {props.children ? props.children : <span>拖拽字段进入该区域</span>}
            </div>
          );
        },
        Checkbox: (props) => {
          return (
            <div
              {...props}
              style={{
                background: '#eee',
                border: '1px solid #ddd',
                display: 'flex',
                padding: 10,
                height: props.children ? 'auto' : 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {props.children ? props.children : <span>拖拽字段进入该区域</span>}
            </div>
          );
        },
      }}
    />
  );
};
