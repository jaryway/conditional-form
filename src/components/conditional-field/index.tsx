import React, { FC, Fragment } from 'react';
import { FormSpy, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

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
  name: string;
  conditions: Array<ICondition>;
};

interface VisibleFieldProps {
  conditions: ICondition[];
  name: string;
}

const isEqual = (values: any, m: any) => {
  const value = (values || {})[m.when];
  const val2 = m.is;

  if (Array.isArray(value)) {
    if (Array.isArray(val2)) return val2.every((n: string) => value.some((v) => v === n));

    return value.some((v) => v === val2);
  }

  return value === val2;
};

const equal = (when: any, is: any) => {
  if (Array.isArray(when)) {
    if (Array.isArray(is)) return is.every((n: string) => when.some((v) => v === n));
    return when.some((v) => v === is);
  }

  return when === is;
};

const BecomesField: FC<any> = ({ name, when, is, becomes }) => (
  <Field name={name} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } },
    ) => (
      <FormSpy subscription={{}}>
        {({ form }) => (
          <OnChange name={when}>
            {(value) => {
              if (equal(value, is)) {
                onChange(becomes);
              }
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);

BecomesField.displayName = 'BecomesField';

const VisibleField: React.FC<VisibleFieldProps> = ({ name, conditions, children }) => {
  const conds = (conditions || []).filter((m) => !m.becomes || m.visible);

  if (!conds.length) return <Fragment>{children}</Fragment>;

  return (
    <FormSpy subscription={{ values: true }}>
      {({ form }) => {
        const match = conds.filter((m) => {
          const when = form.getFieldState(m.when);
          return equal(when, m.is);
        });

        return match ? children : <Field name={name} value={undefined} />;
      }}
    </FormSpy>
  );
};

VisibleField.displayName = 'VisibleField';

export const ConditionalField: React.FC<ConditionalFieldProps> = ({
  conditions,
  name,
  children,
}) => {
  // const { name } = ((children as React.ReactElement).props || {}) as any;
  // const visibleConditions = conditions.filter((m) => !m.becomes || m.visible);
  const becomes = conditions.filter((m) => m.becomes);

  // 当 a.value===x 时，b.visible=false，当组件 a 的值变成 x 时，组件 b 显示或隐藏
  // 当 a.value===x 时，b.value=becomes，当组件 a 的值变成 x 时，组件 b 的值变成 becomes

  return (
    <Fragment>
      <VisibleField name={name} conditions={conditions}>
        {children}
      </VisibleField>
      {becomes.map((m, i) => {
        return (
          <BecomesField
            key={`becomes-${i}`}
            name={name}
            when={m.when}
            is={m.is}
            becomes={m.becomes}
          />
        );
      })}
    </Fragment>
  );

  // return (
  //   <FormSpy subscription={{ values: true }}>
  //     {({ values, form }) => {
  //       const visibleConds = conditions.filter((m) => !m.becomes || m.visible);

  //       const visible =
  //         visibleConds.length === 0 ||
  //         visibleConds.some((m) => {
  //           return isEqual(values, m);
  //         });

  //       // 实现当某个字段为某个值时，把当前字段的值改成某个值
  //       const [becomesCondition] = conditions.filter((m) => {
  //         if (!m.becomes) return false;
  //         return isEqual(values, m);
  //       });

  //       if (visible) {
  //         if (becomesCondition) {
  //           setTimeout(() => {
  //             name && form.change(name, becomesCondition.becomes);
  //           }, 0);
  //         }

  //         return children;
  //       }

  //       /* 这里可以通过 FormControlField Unmount 实现
  //       // // fix setState Warning
  //       // setTimeout(() => {
  //       //   name && form.change(name, undefined);
  //       // }, 0);
  //       */

  //       return null;
  //     }}
  //   </FormSpy>
  // );
};

ConditionalField.displayName = 'ConditionalField';
