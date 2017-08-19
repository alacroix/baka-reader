// @flow

import Realm from 'realm';

import { DATABASE_DIR } from './FileSystem';

export function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
}

export const BookStatusEnum = {
  NEW: 0,
  IN_PROGRESS: 1,
  DONE: 2,
};

const Book = {
  name: 'Book',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    path: 'string',
    totalPages: 'int',
    status: { type: 'int', default: BookStatusEnum.NEW },
    createdAt: { type: 'date', default: new Date() },
    updatedAt: { type: 'date', default: new Date() },
  },
};

const InProgress = {
  name: 'InProgress',
  primaryKey: 'bookId',
  properties: {
    bookId: 'string',
    currentPage: 'int',
  },
};

const configuration = {
  schema: [Book, InProgress],
};

Realm.defaultPath = DATABASE_DIR;

export default Realm.open(configuration);
