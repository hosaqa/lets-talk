import { observable, action, makeObservable } from 'mobx';
import { injectable, inject } from 'inversify';
import { ITagsService } from '../../../services/TagsService';
import { TYPES } from '../../../di/types';

export interface IAddTagViewModel {
  nameInput: {
    value: string;
    onChange: (value: string) => void;
    disabled: boolean;
  };
  submitting: boolean;
  onSubmit: () => void;
}

@injectable()
export class AddTagViewModel implements IAddTagViewModel {
  @inject(TYPES.TagsService) private _tagsService: ITagsService;

  _nameInputValue = '';
  _nameInputOnChange = (next: string) => (this._nameInputValue = next);

  submitting = false;

  constructor() {
    makeObservable(this, {
      _nameInputValue: observable,
      _nameInputOnChange: action,
      submitting: observable,
      onSubmit: action,
    });
  }

  get nameInput() {
    return {
      value: this._nameInputValue,
      onChange: this._nameInputOnChange,
      disabled: this.submitting,
    };
  }

  onSubmit = async () => {
    this.submitting = true;

    try {
      await this._tagsService.createTag(this.nameInput.value);

      alert(`tag ${this.nameInput.value} created`);

      this._nameInputValue = '';
    } catch {
      alert('Something went wrong');
    } finally {
      this.submitting = false;
    }
  };
}
