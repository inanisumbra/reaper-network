import { useCallback } from 'react';
import { default as useFormHandlers } from './useFormHandlers';
import fetch from 'unfetch';

interface FormatEmail {
  name: string;
  email: string;
  message: string;
}

interface EmailData extends FormatEmail {
  date: number;
  html: string;
}

type ResetFn = () => void;

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
const sendContactFormToEmail = (data: EmailData, reset: ResetFn) =>
  fetch('/api/mailer', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => reset());

export const formatEmail = ({ name, email, message }: FormatEmail) => ({
  name,
  email,
  message,
  date: Date.now(),
  html: `
						  <div>From: ${name}</div>
						  <div>Email: <a href="mailto:${email}">${email}</a></div>
						  <div>Date: ${Date.now()}</div>
						  <div>Message: ${message}</div>
						  `,
});

export const CONTACT_FORM_VALIDATORS = {
  name: (value: string) => value && /[A-Za-z0-9]+/.test(value),
  email: (email: string) => email && /\S+@\S+\.\S+/.test(email),
  message: () => true,
};

export const INITIAL_CONTACT_FORM = { name: '', email: '', message: '' };
export const INITIAL_CONTACT_FORM_ERRORS = {
  name: false,
  email: false,
  message: false,
};
const useContactForm = () => {
  const {
    form: contactForm,
    handleReset: handleContactFormReset,
    submittable,
    errors,
    ...contactFormProps
  } = useFormHandlers(
    INITIAL_CONTACT_FORM,
    INITIAL_CONTACT_FORM_ERRORS,
    CONTACT_FORM_VALIDATORS
  );

  const handleContactFormSubmit = useCallback(
    () =>
      submittable &&
      sendContactFormToEmail(formatEmail(contactForm as FormatEmail), handleContactFormReset),
    [contactForm, submittable, handleContactFormReset]
  );

  return {
    submittable,
    handleReset: handleContactFormReset,
    handleSubmit: handleContactFormSubmit,
    errors,
    contactForm,
    ...contactFormProps,
  };
};

export default useContactForm;
