import React, { useState } from 'react';
import { Field, FormSpy } from 'react-final-form';
// import { OnChange } from "react-final-form-listeners";

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

export type ConditionalFieldProps = {
  conditions: Array<ICondition>;
};

const isEqual = (values: any, m: any) => {
  const value = (values || {})[m.when];
  const val2 = m.is;

  if (Array.isArray(value)) {
    if (Array.isArray(val2)) return val2.every((n: string) => value.some((v) => v === n));

    return value.some((v) => v === val2);
  }

  return value === val2;
};

export const ConditionalField: React.FC<ConditionalFieldProps> = ({ conditions, children }) => {
  const child = children as React.ReactElement;
  const { name } = (child.props || {}) as any;

  return (
    <FormSpy subscription={{ values: true }}>
      {({ values, form }) => {
        const visibleConds = conditions.filter(
          (m) => m.visible === true || m.visible === undefined,
        );

        const visible =
          visibleConds.length === 0 ||
          visibleConds.some((m) => {
            // const value = (values || {})[m.when];
            return isEqual(values, m);
          });

        // 实现当某个字段为某个值时，把当前字段的值改成某个值
        const [match] = conditions.filter((m) => {
          if (!m.becomes) return false;
          return isEqual(values, m);
        });

        if (visible) {
          if (match) {
            setTimeout(() => {
              name && form.change(name, match.becomes);
            }, 0);
          }

          return children;
        }

        setTimeout(() => {
          name && form.change(name, undefined);
        }, 0);

        return null;
      }}
    </FormSpy>
  );
};

ConditionalField.displayName = 'ConditionalField';
