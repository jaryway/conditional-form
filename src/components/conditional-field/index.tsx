import React, { FC, Fragment } from 'react';
import { FormSpy, Field } from 'react-final-form';
import { OnChange, ExternallyChanged } from 'react-final-form-listeners';

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

export type ConditionalFieldProps = {
  name: string;
  conditions: Array<ICondition>;
};

interface VisibleFieldProps {
  conditions: ICondition[];
  name: string;
}

// const isEqual = (values: any, m: any) => {
//   const value = (values || {})[m.when];
//   const val2 = m.is;

//   if (Array.isArray(value)) {
//     if (Array.isArray(val2)) return val2.every((n: string) => value.some((v) => v === n));

//     return value.some((v) => v === val2);
//   }

//   return value === val2;
// };

const equal = (when: any, is: any) => {
  if (Array.isArray(when)) {
    if (Array.isArray(is)) return is.every((n: string) => when.some((v) => v === n));
    return when.some((v) => v === is);
  }

  return when === is;
};
const delay = async (callback: () => void) => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  callback();
};

const BecomesField: FC<any> = ({ name, when, is, becomes }) => (
  <Field name={name} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } },
    ) => (
      <FormSpy subscription={{}}>
        {() => (
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
  const conds = (conditions || []).filter((m) => m.visible);

  if (!conds.length) return <Fragment>{children}</Fragment>;

  return (
    <FormSpy subscription={{ values: true }}>
      {({ form }) => {
        const match = conds.some((m) => {
          const state = form.getFieldState(m.when);
          return equal(state?.value, m.is);
        });

        !match && delay(() => form.change(name, undefined));

        return match ? children : null;
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
  // 当 a.value === x 时，b.visible = false，当字段 a 的值变成 x 时，显示或隐藏字段 b 
  // 当 a.value === x 时，b.value = becomes，当字段 a 的值变成 x 时，更新字段 b 的值为 becomes

  const becomes = conditions.filter((m) => m.becomes !== undefined);

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
