import * as React from 'react';
import tw, { styled } from 'twin.macro';

const NavigationWrapper = styled.ul`
  ${tw`relative flex items-center justify-evenly list-none w-full md:w-4/5 lg:w-3/5 max-w-md h-12 rounded border border-main divide-x`}
  margin-top: -1px;
  margin-right: 1px;
`;

const NavigationButtonWrapper = tw.li`relative flex items-center justify-center h-full w-1/4`;

const NavigationButton = styled.button`
  ${tw`relative flex items-center justify-center h-full w-full border-none shadow-none uppercase tracking-paragraph text-sm text-main font-thin bg-transparent`}
  transition: background-color .2s ease-in-out,color .2s ease-in-out;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.075);
  }
`;

interface NavigationItemProps {
  name: string;
  handleButtonClick: (name: string) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = (props) => {
  const { name, handleButtonClick } = props;
  const handleClick = () => handleButtonClick(name);
  return (
    <NavigationButtonWrapper>
      <NavigationButton onClick={handleClick}>{name}</NavigationButton>
    </NavigationButtonWrapper>
  );
};

interface NavigationProps {
  handleButtonClick: any;
  sectionNames?: string[];
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const {
    handleButtonClick,
    sectionNames = ['intro', 'reaper', 'about', 'contact'],
  } = props;
  const NavigationItems = sectionNames.map((name) => (
    <NavigationItem
      key={name}
      name={name}
      handleButtonClick={handleButtonClick}
    />
  ));
  return <NavigationWrapper>{NavigationItems}</NavigationWrapper>;
};

export default Navigation;
