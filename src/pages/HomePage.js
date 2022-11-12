import React from 'react';
import styled from 'styled-components';
import { MainLayout } from '../components/layout/MainLayout';
import { HEADER_HEIGHT } from '../components/layout/Header';
import Container from '../components/layout/Container';
import Recorder from '../features/Recorder/Recorder';

const PageContent = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function HomePage() {
  return (
    <MainLayout>
      <Container>
        <PageContent>
          <Recorder />
        </PageContent>
      </Container>
    </MainLayout>
  );
}
