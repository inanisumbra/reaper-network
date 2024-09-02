import tw, { styled } from 'twin.macro';
import * as React from 'react';
export interface ShowSectionProp {
  showSection?: boolean;
}

const SectionWrapper = styled.div(({ showSection }: ShowSectionProp) => [
  tw`relative flex-col items-center justify-center w-full h-screen [display:none] opacity-0 translate-y-1
  [transition: transform 0.325s ease-in-out, filter 0.325s ease-in-out, opacity 0.325s ease-in-out, -webkit-transform 0.325s ease-in-out, -webkit-filter 0.325s ease-in-out] [background-image: radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%)]`,
  showSection && tw`flex opacity-100 translate-y-0`,
]);
interface InnerProps extends ShowSectionProp {
  justifyEvenly?: boolean;
}
const SectionInner = styled.div(
  ({ showSection, justifyEvenly }: InnerProps) => [
    tw`relative flex-col items-center px-5 md:px-8 pb-6 pt-8 md:pb-6 md:pt-10 bg-black-link rounded text-main text-base tracking-paragraph [display:none] opacity-0 scale-95 -z-1 md:[width:42rem] [width:95%] [min-height: 50vh] h-max justify-start`,
    showSection && tw`flex opacity-90 scale-100 z-10`,
    justifyEvenly && tw`justify-evenly`,
  ]
);

const SectionTitle = tw.h2`relative text-main border-b border-main mb-8 pb-2 text-2xl tracking-title mr-auto uppercase`;

const CloseButton = styled.button`
  ${tw`absolute z-20 top-2 right-2 flex items-center justify-center h-10 w-10 border-none shadow-none bg-transparent rounded-full`}
  transition: background-color .2s ease-in-out,color .2s ease-in-out;
  p {
    ${tw`relative h-full w-full text-center uppercase text-lg text-main font-bold leading-10`}
    transform: scaleX(1.5);
  }
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.075);
  }
`;

interface SectionProps {
  name?: string;
  active?: string;
  children: any;
  handleClose: () => void;
  justifyEvenly?: boolean;
}

const Section: React.FC<SectionProps> = (props) => {
  const { name, active, children, handleClose, justifyEvenly } = props;
  if (name === active) {
    return (
      <SectionWrapper showSection>
        <SectionInner showSection justifyEvenly={justifyEvenly}>
          <CloseButton onClick={handleClose}>
            <p>X</p>
          </CloseButton>
          <SectionTitle>{name}</SectionTitle>
          {children}
        </SectionInner>
      </SectionWrapper>
    );
  }
  return <SectionWrapper />;
};

export default Section;
