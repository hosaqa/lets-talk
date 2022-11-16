import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import Container from '../components/layout/Container';
import { AddTagForm } from '../features/Tags/AddTagForm/AddTagForm';
import { TagsList } from '../features/Tags/TagsList/TagsList';

export function TagsPage() {
  return (
    <MainLayout>
      <Container>
        <AddTagForm />
        <TagsList />
      </Container>
    </MainLayout>
  );
}
