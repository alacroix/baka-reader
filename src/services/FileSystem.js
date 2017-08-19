// @flow

import RNFetchBlob from 'react-native-fetch-blob';

import { createThumbnail } from './Image';

const DIRECTORIES = RNFetchBlob.fs.dirs;

/*
 * *****************
 * Utility functions
 * *****************
 */

function isRawBook(file: RNFetchBlobStat) {
  return file.type === 'directory' && !file.filename.includes('realm');
}

function isImage(file: RNFetchBlobStat) {
  return file.filename.split('.').pop() === 'jpg';
}

function getParentPath(path: string) {
  return path.substring(0, path.lastIndexOf('/'));
}

async function getDirectoryFiles(dirPath: string) {
  return RNFetchBlob.fs.lstat(dirPath).then(files => files);
}

const BOOKS_DIR = `${getParentPath(DIRECTORIES.DocumentDir)}/Library/Books`;
export const DATABASE_DIR = `${getParentPath(DIRECTORIES.DocumentDir)}/Library/Caches/realm`;

/*
 * *****************
 * App functions
 * *****************
 */

export async function createBooksDirectory() {
  const isAlreadyPresent = await RNFetchBlob.fs.isDir(BOOKS_DIR);
  if (!isAlreadyPresent) {
    await RNFetchBlob.fs.mkdir(BOOKS_DIR);
  }
}

export async function getUserImportedBooks() {
  const files = await RNFetchBlob.fs.lstat(DIRECTORIES.DocumentDir);
  return files.filter(file => isRawBook(file));
}

export async function importBook(book: RNFetchBlobStat, guid: string) {
  const path = `${BOOKS_DIR}/${guid}`;
  const pagesPath = `${path}/pages`;
  await RNFetchBlob.fs.mkdir(path);
  await RNFetchBlob.fs.mv(book.path, pagesPath);
  const files = await getDirectoryFiles(pagesPath);
  const images = files.filter(file => isImage(file));
  await Promise.all(images.map((image, index) => RNFetchBlob.fs.mv(image.path, `${pagesPath}/${index + 1}.jpg`)));
  await createThumbnail(path);
  return {
    path,
    totalPages: images.length,
  };
}
