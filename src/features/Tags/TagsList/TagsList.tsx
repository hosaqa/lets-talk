import React, { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useViewModel } from '../../../hooks/useViewModel';
import { useInjection } from '../../../hooks/useInjection';
import { TYPES } from '../../../di/types';
import { ITagsListViewModel } from './TagsListViewModel';

const formatDate = (date: Date) => `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

export const TagsList = observer(({ className }: { className?: string }) => {
  const viewModel = useInjection<ITagsListViewModel>(TYPES.TagsListViewModel);
  const { fetchingStatus, list, fetchList, deleteTag, deletingTagIds } =
    useViewModel<ITagsListViewModel>(viewModel);

  useLayoutEffect(() => {
    fetchList();
  }, []);

  return (
    <section className={className}>
      {fetchingStatus === 'loading' && 'Wait...'}
      {fetchingStatus === 'loaded' && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(({ id, name, createdAt, updatedAt }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{formatDate(createdAt)}</td>
                <td>{formatDate(updatedAt)}</td>
                <td>
                  <button onClick={() => deleteTag(id)} disabled={deletingTagIds.includes(id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
});
