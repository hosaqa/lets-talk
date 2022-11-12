import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Container from './Container';

export const HEADER_HEIGHT = 48;

const SHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
`;

const SContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const LinkList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const LinkWrapper = styled.li`
  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export function Header() {
  return (
    <SHeader>
      <SContainer>
        <nav>
          <LinkList>
            <LinkWrapper>
              <Link to="/">Record</Link>
            </LinkWrapper>
            <LinkWrapper>
              <Link to="tags">Tags</Link>
            </LinkWrapper>
          </LinkList>
        </nav>
      </SContainer>
    </SHeader>
  );
}