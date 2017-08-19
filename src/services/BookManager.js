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
    .filtered('status == $0', BookStatusEnum.IN_PROGRESS)
    .sorted('updatedAt');
}

export async function saveProgression(book: BookType, currentPage: number) {
  const newStatus = currentPage === book.totalPages ? BookStatusEnum.DONE : BookStatusEnum.IN_PROGRESS;

  return Database.then(async (db) => {
    const currentProgress = db.objectForPrimaryKey('InProgress', book.id);

    let inProgressMutation;
    // updating progress
    if (currentProgress) {
      if (newStatus === BookStatusEnum.DONE) { // delete
        inProgressMutation = () => db.delete(currentProgress);
      } else { // update
        inProgressMutation = () => db.create('InProgress', {
          bookId: book.id,
          currentPage,
        }, true);
      }
    } else if (newStatus !== BookStatusEnum.DONE) {
      inProgressMutation = () => db.create('InProgress', {
        bookId: book.id,
        currentPage,
      });
    }
    // updating book status
    db.write(() => {
      inProgressMutation();
      db.create('Book', { id: book.id, status: newStatus, updatedAt: new Date() }, true);
    });
    db.write(() => {});
  });
}

export async function getCurrentPage(book: BookType) {
  return Database.then(async (db) => {
    const currentProgress = db.objectForPrimaryKey('InProgress', book.id);
    return currentProgress ? currentProgress.currentPage : 1;
  });
}
