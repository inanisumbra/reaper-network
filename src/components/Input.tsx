import tw, { styled, css } from 'twin.macro';
import * as React from 'react';

interface WrapperProps {
  inputWidth?: string;
  inputMarginLeft?: number;
}

const Wrapper = styled.div(({ inputWidth, inputMarginLeft }: WrapperProps) => [
  tw`relative no-underline rounded text-main flex-col flex justify-end mb-6`,
  inputWidth
    ? css`
        width: ${inputWidth};
      `
    : tw`w-fill`,
  inputMarginLeft
    ? css`
        margin-left: ${inputMarginLeft}rem;
      `
    : tw`ml-0`,
  css`
    input:-internal-autofill-selected {
      background-color: transparent !important;
    }
    @media (max-width: 1199px) {
      width: -webkit-fill-available;
      margin-left: 0;
    }
  `,
]);

interface ErrorProp {
  error?: boolean;
}

interface LabelProps extends ErrorProp {
  required?: boolean;
}

export const Label = styled.label(({ error, required }: LabelProps) => [
  tw`text-base mb-4 text-main inline-flex uppercase tracking-paragraph [text-shadow:0 2px 10px rgba(20, 20, 20, 0.1)]`,
  error && tw`text-pink`,
  required &&
    css`
      &:after {
        content: '*';
        position: relative;
        left: 0;
        padding-left: 0.2rem;
      }
    `,
]);

const Field = styled.input(({ error }: ErrorProp) => [
  tw`w-full tracking-paragraph opacity-90 bg-transparent text-main uppercase text-base h-11 border border-main px-3 outline-none rounded [transition: border-color .2s ease-in-out,box-shadow .2s ease-in-out,background-color .2s ease-in-out]
  focus:[background: hsla(0, 0%, 100%, 0.075)] focus:[box-shadow: 0 0 0 1px #fff] placeholder:opacity-70 placeholder:text-primary`,
  error && tw`border-2 border-pink placeholder:text-pink`,
]);

export const MultiInputs = tw.div`flex flex-col xl:flex-row w-full items-center justify-between`;

export type InputRef = React.ForwardedRef<HTMLInputElement>;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: boolean;
  inputWidth?: string;
  inputMarginLeft?: number;
  required?: boolean;
}

const InputInner = (
  {
    label,
    name,
    required,
    error,
    inputWidth,
    inputMarginLeft,
    ...inputProps
  }: InputProps,
  inputRef: InputRef
) => (
  <Wrapper inputWidth={inputWidth} inputMarginLeft={inputMarginLeft}>
    <Label htmlFor={name} required={required} error={error}>
      {label}
    </Label>
    <Field id={name} name={name} error={error} ref={inputRef} {...inputProps} />
  </Wrapper>
);

const Input = React.forwardRef(InputInner);

export default Input;
