import { injectable, inject } from 'inversify';
import { makeObservable, observable, action } from 'mobx';
import { ITagsService, TagModel } from '../../../services/TagsService';
import { TYPES } from '../../../di/types';

export interface ITagsListViewModel {
  list: TagModel[];
  fetchingStatus: 'idle' | 'loading' | 'loaded';
  fetchList: () => void;
  deleteTag: (id: string) => void;
  deletingTagIds: string[];
  startEditingTag: (id: string) => void;
  stopEditingTag: (id: string) => void;
  editingTagIds: string[];
  patchTag: (id: string, diff: Partial<TagModel>) => void;
}

@injectable()
export class TagsListViewModel implements ITagsListViewModel {
  private _tagsService: ITagsService;
  public deletingTagIds: string[] = [];
  public editingTagIds: string[] = [];

  public constructor(@inject(TYPES.TagsService) _tagsService: ITagsService) {
    this._tagsService = _tagsService;

    makeObservable(this, {
      deletingTagIds: observable,
      deleteTag: action,
      editingTagIds: observable,
      startEditingTag: action,
      stopEditingTag: action,
    });
  }

  fetchList = () => {
    this._tagsService.fetchTags().catch(() => {
      alert('Something happend!');
    });
  };

  deleteTag = (id: string) => {
    if (!this.deletingTagIds.includes(id)) {
      this.deletingTagIds.push(id);
    }

    this._tagsService
      .deleteTag(id)
      .then(() => {
        alert('Tag successfully deleted!');
      })
      .catch(() => {
        alert('Something happend!');
      })
      .finally(() => {
        const index = this.deletingTagIds.indexOf(id);
        this.deletingTagIds.splice(index, 1);
      });
  };

  startEditingTag = (id: string) => {
    this.editingTagIds.push(id);
  };

  stopEditingTag = (id: string) => {
    const index = this.editingTagIds.indexOf(id);
    this.editingTagIds.splice(index, 1);
  };

  patchTag = (id: string, diff: Partial<TagModel>) => {
    this._tagsService
      .patchTag(id, diff)
      .catch(() => {
        alert("Haven't updated!");
      })
      .finally(() => {
        this.stopEditingTag(id);
      });
  };

  get fetchingStatus() {
    return this._tagsService.tagsFetchingStatus;
  }

  get list() {
    return this._tagsService.tags;
  }
}
