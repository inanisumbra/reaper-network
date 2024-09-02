import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';
import { colors } from '../utils';
import { Label } from './Input';

interface ErrorProp {
  error?: boolean;
}

const Wrapper = tw.div`relative no-underline rounded text-main flex-col flex justify-end mb-6 w-fill`;

const AreaField = styled.textarea(({error}:ErrorProp) => [
  tw`w-full tracking-paragraph opacity-90 bg-transparent text-main uppercase text-base h-32 md:h-48 border border-main p-3 outline-none rounded resize-none [transition:border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out]
  focus:[background: hsla(0, 0%, 100%, 0.075)] focus:[box-shadow: 0 0 0 1px #fff] placeholder:opacity-70 placeholder:text-primary`,
  error && tw`border-2 border-pink placeholder:text-pink`
])

export type TextAreaRef = ForwardedRef<HTMLTextAreaElement>;

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	name: string;
	error?: boolean;
  required?:boolean;
}

const TextAreaInner = ({ label, required, error, name, ...textAreaProps }: TextAreaProps, inputRef: TextAreaRef) => (
  <Wrapper>
    <Label htmlFor={name} error={error} required={required}>
      {label}
    </Label>
    <AreaField
      id={name}
      name={name}
      error={error}
      ref={inputRef}
      {...textAreaProps}
    />
  </Wrapper>
);

const TextArea = forwardRef(TextAreaInner)

export default TextArea;