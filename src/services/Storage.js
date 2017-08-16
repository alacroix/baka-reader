// @flow

import { AsyncStorage } from 'react-native';

const APP_NAME = 'baka-reader';

const STARTED_BOOKS_KEY = `@${APP_NAME}:startedBooks`;

export async function getStartedBooks() {
  const startedBooks = await AsyncStorage.getItem(STARTED_BOOKS_KEY);
  if (startedBooks !== null) {
    return JSON.parse(startedBooks);
  }
  return [];
}

export async function saveProgression(book: RNFetchBlobStat, currentPage: number, isOver: boolean) {
  const startedBooks = await getStartedBooks();

  const cleanedBooks = startedBooks.filter(b => b.filename !== book.filename);
  if (!isOver) {
    cleanedBooks.push({
      filename: book.filename,
      currentPage,
    });
  }

  await AsyncStorage.setItem(STARTED_BOOKS_KEY, JSON.stringify(cleanedBooks));
}

export default {
  saveProgression,
};
