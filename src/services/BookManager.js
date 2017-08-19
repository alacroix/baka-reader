// @flow

import {
  createBooksDirectory,
  importBook,
  getUserImportedBooks,
} from './FileSystem';
import Database, { BookStatusEnum, generateQuickGuid } from './Database';

export async function fetchImportedBooks() {
  await createBooksDirectory();
  const importedBooks = await getUserImportedBooks();
  await Promise.all(importedBooks.map(async (book: RNFetchBlobStat) => {
    const guid = generateQuickGuid();
    const infos = await importBook(book, guid);
    await Database
      .then((db) => {
        db.write(() => {
          db.create('Book', {
            id: guid,
            name: book.filename,
            totalPages: infos.totalPages,
            path: infos.path,
          });
        });
      });
  }));
}

export async function getUserBooks() {
  return Database.then(db => db.objects('Book'));
}

export function filterByProgress(books) {
  return books
    .filtered(`status = ${BookStatusEnum.IN_PROGRESS}`)
    .sorted('updatedAt');
}

export async function saveProgression(book: BookType, currentPage: number) {
  const newStatus = currentPage === book.totalPages ? BookStatusEnum.DONE : BookStatusEnum.IN_PROGRESS;
  const currentProgress = await Database.then(db => db
    .objectForPrimaryKey('InProgress', book.id));

  // updating progress
  if (currentProgress) {
    if (newStatus === BookStatusEnum.DONE) { // delete
      await Database.then(db => db.write(() => {
        db.delete(currentProgress);
      }));
    } else { // update
      await Database.then(db => db.write(() => {
        db.create('InProgress', {
          bookId: book.id,
          currentPage,
        }, true);
      }));
    }
  } else if (newStatus !== BookStatusEnum.DONE) {
    await Database.then(db => db.write(() => {
      db.create('InProgress', {
        bookId: book.id,
        currentPage,
      });
    }));
  }

  // updating book status
  Database.then(db => db.write(() => {
    db.create('Book', { id: book.id, status: newStatus, updatedAt: new Date() }, true);
  }));
}

export default {
  fetchImportedBooks,
  getUserBooks,
};
