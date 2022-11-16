import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  margin: 0;
  background-color: transparent;
  border: 0;
  background: #caff2b;
  padding: 10px 20px;
  border-radius: 12px;
`;

export default function Button({
  children,
  className,
  ...buttonProps
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLButtonElement>) {
  return (
    //TODO: FIX TYPE
    <SButton className={className} {...buttonProps}>
      {children}
    </SButton>
  );
}
