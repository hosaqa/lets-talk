import React from 'react';
import styled from 'styled-components';
import Container from '../components/layout/Container';
import LoginForm from '../features/LoginForm/LoginForm';

const PageContent = styled.section`
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function LoginPage() {
  return (
    <Container>
      <PageContent>
        <LoginForm />
      </PageContent>
    </Container>
  );
}
