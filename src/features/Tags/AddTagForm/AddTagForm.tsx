import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../../components/Button/Button';

import { useViewModel } from '../../../hooks/useViewModel';
import { useInjection } from '../../../hooks/useInjection';
import { TYPES } from '../../../di/types';
import { IAddTagViewModel } from './AddTagViewModel';

export const AddTagForm = observer(() => {
  const viewModel = useInjection<IAddTagViewModel>(TYPES.AddTagViewModel);
  const { nameInput, onSubmit, submitting } = useViewModel<IAddTagViewModel>(viewModel);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        name="tag_name"
        value={nameInput.value}
        disabled={nameInput.disabled}
        onChange={(event) => nameInput.onChange(event.target.value)}
      />
      <Button type="submit" disabled={submitting}>
        ➕ Add
      </Button>
      {submitting && <span>Wait...</span>}
    </form>
  );
});
