import { FieldMetaState, useField } from 'react-final-form';

export interface ShowErrorProps {
  meta: FieldMetaState<any>;
}
export type ShowErrorFunc = (props: ShowErrorProps) => boolean;

/**
 *
 * @param param0
 * @returns boolean
 */
export const showErrorOnChange: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: ShowErrorProps) => {
  return !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));
};

export const showErrorOnBlur: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}: ShowErrorProps) => {
  return !!(((submitError && !dirtySinceLastSubmit) || error) && touched);
};

export const getValidateState = (meta: FieldMetaState<any> = {}) => {
  //   console.log('getValidateState', meta);
  const { touched, error, modified, validating, data } = meta;
  if ((touched || modified) && validating) return 'validating';
  if ((touched || modified) && data?.warning) return 'warning';

  if (showErrorOnChange({ meta })) return 'error';
  if ((touched || modified) && !error) return 'success';

  return undefined;
};

const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true,
  },
};

export const useFieldForErrors = (name: string) => {
  return useField(name, config);
};
