import { injectable } from 'inversify';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  DocumentData,
  deleteDoc,
} from 'firebase/firestore';
import { makeObservable, observable, action } from 'mobx';

import { firebaseDb } from './firebase';

export interface TagDTO {
  id: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface TagModel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

function mapDtoToModel(dto: TagDTO): TagModel {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: new Date(dto.created_at * 1000),
    updatedAt: new Date(dto.updated_at * 1000),
  };
}

function mapModelFieldsToDto(fields: Partial<TagModel>): Partial<TagDTO> {
  const mappers: Record<string, { fn: (value: any) => any; fieldName: string }> = {
    id: {
      fieldName: 'id',
      fn: (value: TagModel['id']) => value,
    },
    name: {
      fieldName: 'name',
      fn: (value: TagModel['name']) => value,
    },
    createdAt: {
      fieldName: 'created_at',
      fn: (value: TagModel['createdAt']) => Math.round(value.getTime() / 1000),
    },
    updatedAt: {
      fieldName: 'updated_at',
      fn: (value: TagModel['createdAt']) => Math.round(value.getTime() / 1000),
    },
  };

  return Object.entries(fields).reduce((acc: Partial<TagDTO>, entry) => {
    const [name, value] = entry;

    const { fieldName, fn } = mappers[name];

    acc[fieldName] = fn(value);

    return acc;
  }, {});
}

function mapModelToDto(model: TagModel): TagDTO {
  return {
    id: model.id,
    name: model.name,
    created_at: Math.round(model.createdAt.getTime() / 1000),
    updated_at: Math.round(model.updatedAt.getTime() / 1000),
  };
}

export interface ITagsService {
  tags: TagModel[];
  tagsFetchingStatus: 'idle' | 'loading' | 'loaded';
  fetchTags: () => Promise<TagModel[]>;
  createTag: (name: string) => Promise<TagModel>;
  patchTag: (id: string, diff: Partial<TagModel>) => Promise<TagModel>;
  deleteTag: (id: string) => Promise<void>;
}

@injectable()
export class TagsService implements ITagsService {
  tags: TagModel[] = [];
  tagsFetchingStatus: 'idle' | 'loading' | 'loaded' = 'idle';

  constructor() {
    makeObservable(this, {
      tags: observable,
      tagsFetchingStatus: observable,
      fetchTags: action,
      createTag: action,
      patchTag: action,
      deleteTag: action,
    });
  }

  fetchTags = async () => {
    this.tagsFetchingStatus = 'loading';

    const querySnapshot = await getDocs<DocumentData>(collection(firebaseDb, 'tags'));

    this.tagsFetchingStatus = 'loaded';

    const dtos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TagDTO[];
    const models = dtos.map(mapDtoToModel);

    this.tags = models;

    return models;
  };

  createTag = async (name: string) => {
    const { id: tempId, ...payload } = mapModelToDto({
      id: 'temp',
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const doc = await addDoc(collection(firebaseDb, 'tags'), payload);
    const model = mapDtoToModel({
      id: doc.id,
      ...payload,
    });

    this.tags.push(model);

    return model;
  };

  patchTag = async (id: string, diff: Partial<TagModel>) => {
    const diffWithTimeStamp = {
      ...diff,
      updatedAt: new Date(),
    };
    const payload = mapModelFieldsToDto(diffWithTimeStamp);

    const ref = doc(firebaseDb, 'tags', id);
    await updateDoc(ref, payload);

    const indexOfOutdatedTag = this.tags.findIndex((tag) => tag.id === id);
    const patchedTag = {
      ...this.tags[indexOfOutdatedTag],
      ...diffWithTimeStamp,
    };

    this.tags.splice(indexOfOutdatedTag, 1, patchedTag);

    return patchedTag;
  };

  deleteTag = async (id: string) => {
    await deleteDoc(doc(firebaseDb, 'tags', id));

    const index = this.tags.findIndex((tag) => tag.id === id);
    this.tags.splice(index, 1);
  };
}
