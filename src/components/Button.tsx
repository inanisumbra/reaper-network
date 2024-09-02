import { ButtonHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

const StyledButton = styled.button`
  ${tw`
  rounded
  uppercase
  flex
  justify-center
  items-center
  no-underline
  text-base
  text-black-soft
  tracking-paragraph
  opacity-90
  font-bold
  h-11
  px-4
  w-fill
  bg-main
  mr-6
  hover:cursor-pointer
  hover:bg-secondary`}
  transition: background-color .2s ease-in-out,color .2s ease-in-out;
  ${({ disabled }:{disabled?:boolean;}) =>
    disabled
      ? `
    pointer-events: none;
    filter: grayscale(.2);
  `
      : ''}
`;

const SecondaryButton = styled.button`
  ${tw`relative flex items-center justify-center w-2/5 h-11 border border-main rounded shadow-none uppercase tracking-paragraph font-bold text-base text-main bg-transparent`}
  transition: background-color .2s ease-in-out,color .2s ease-in-out;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.075);
  }
  ${({ disabled }) =>
    disabled
      ? `
    pointer-events: none;
    filter: grayscale(.2);
  `
      : ''}
`;

export const Actions = tw.div`flex w-full items-center justify-between mt-auto pt-12`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  secondary?: boolean;
  disabled?: boolean;
}


const Button = (props:ButtonProps) => {
  const { label, secondary, disabled, ...extraProps } = props;
  if (secondary) {
    return <SecondaryButton {...extraProps}>{label}</SecondaryButton>;
  }
  return <StyledButton {...extraProps}>{label}</StyledButton>;
};


Button.defaultProps = {
  agreed: false,
  label: '',
};

export default Button;
