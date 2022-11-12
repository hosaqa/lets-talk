import React from 'react';
import styled from 'styled-components';
import Container from '../components/layout/Container';
import Recorder from '../features/Recorder/Recorder';

const PageContent = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function HomePage() {
  return (
    <Container>
      <PageContent>
        <Recorder />
      </PageContent>
    </Container>
  );
}
