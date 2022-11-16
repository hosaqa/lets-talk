import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Container from './Container';

export const HEADER_HEIGHT = 48;

const Placeholder = styled.div`
  position: relative;
  height: ${HEADER_HEIGHT}px;
`;

const SHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
`;

const SContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
`;

const LinkList = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const LinkWrapper = styled.li`
  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export function Header() {
  return (
    <Placeholder>
      <SHeader>
        <SContainer>
          <nav>
            <LinkList>
              <LinkWrapper>
                <Link to="/">Record</Link>
              </LinkWrapper>
              <LinkWrapper>
                <Link to="/tags">Tags</Link>
              </LinkWrapper>
            </LinkList>
          </nav>
        </SContainer>
      </SHeader>
    </Placeholder>
  );
}
