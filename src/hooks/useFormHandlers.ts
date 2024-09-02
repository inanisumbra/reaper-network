import { useState, useCallback, ChangeEvent } from 'react';

type Form = Record<string, any>;
type FormErrors = Record<string, boolean>;
type FormValidators = Record<string, any>;

const INITIAL_FORM = { name: '' };
const INITIAL_FORM_ERRORS = {
  name: false,
};
export const FORM_VALIDATORS = {
  name: (value: string) => value && /[A-Za-z0-9]+/.test(value),
};

const useFormHandlers = (
  initForm: Form = INITIAL_FORM,
  initFormErrors: FormErrors = INITIAL_FORM_ERRORS,
  formValidators: FormValidators = FORM_VALIDATORS
) => {
  const [form, setForm] = useState(initForm);
  const [formErrors, setFormErrors] = useState(initFormErrors);
  const [submittable, setSubmittable] = useState(false);

  const handleFormChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      if (name && value && value !== form[name]) {
        setForm({ ...form, [name]: value });
      }
      if (Object.keys(form).map((name) => form[name] && !formErrors[name])) {
        setSubmittable(true);
      } else {
        setSubmittable(false);
      }
    },
    [form, formErrors]
  );
  const handleFormBlur = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormErrors({
        ...formErrors,
        [name]: !formValidators[name](value),
      });
      handleFormChange(event);
    },
    [formErrors, formValidators, handleFormChange]
  );
  const handleFormFocus = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = event.target;
      if (name && Object.keys(form).indexOf(name) !== -1) {
        setFormErrors({
          ...formErrors,
          [name]: false,
        });
      }
    },
    [formErrors, form]
  );
  const handleFormReset = useCallback(() => {
    setForm(initForm);
    setFormErrors(initFormErrors);
  }, [initForm, initFormErrors]);

  return {
    form,
    submittable,
    errors: formErrors,
    handleChange: handleFormChange,
    handleBlur: handleFormBlur,
    handleFocus: handleFormFocus,
    handleReset: handleFormReset,
  };
};

export default useFormHandlers;
