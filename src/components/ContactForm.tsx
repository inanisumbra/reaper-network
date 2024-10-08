import Button, { Actions } from './Button';
import Input, { MultiInputs } from './Input';
import Textarea from './Textarea';
import { useContactForm } from '../hooks';
import * as React from 'react';

const ContactForm: React.FC = () => {
  const {
    contactForm,
    errors,
    submittable,
    handleReset,
    handleSubmit,
    ...formProps
  } = useContactForm();
  const { name, email, message } = contactForm;
  return (
    <>
      <MultiInputs>
        <Input
          name={'name'}
          label={'Name'}
          placeholder={'Grim Reaper'}
          value={name}
          error={errors['name']}
          {...formProps}
        />
        <Input
          name={'email'}
          label={'E-Mail'}
          type={'email'}
          placeholder={'grim@reaper.network'}
          inputWidth={'100%'}
          inputMarginLeft={1.5}
          value={email}
          error={errors['email']}
          {...formProps}
        />
      </MultiInputs>
      <Textarea
        name={'message'}
        label={'Message'}
        placeholder={'Questions about the afterlife for NFTs?'}
        value={message}
        error={errors['message']}
        {...formProps}
      />
      <Actions>
        <Button
          disabled={submittable}
          onClick={handleSubmit}
          label={'Submit'}
        />
        <Button label={'Reset'} onClick={handleReset} secondary />
      </Actions>
    </>
  );
};

export default ContactForm;
