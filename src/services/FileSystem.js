import RNFetchBlob from 'react-native-fetch-blob';

import { createThumbnail } from './Image';

const DIRECTORIES = RNFetchBlob.fs.dirs;

function isRawBook(file) {
  return file.type === 'directory';
}

function isImage(file) {
  return file.filename.split('.').pop() === 'jpg';
}

export function getParentPath(path) {
  return path.substring(0, path.lastIndexOf('/') + 1);
}

const BOOKS_DIR = `${getParentPath(DIRECTORIES.DocumentDir)}Books`;

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

export async function getDirectoryFiles(dirPath) {
  return RNFetchBlob.fs.lstat(dirPath).then(files => files);
}

export async function formatBook(book) {
  const path = `${BOOKS_DIR}/${book.filename}`;
  const pagesPath = `${path}/pages`;
  let ref = performance.now();
  await RNFetchBlob.fs.mkdir(path);
  await RNFetchBlob.fs.mv(book.path, pagesPath);
  const files = await getDirectoryFiles(pagesPath);
  const images = files.filter(file => isImage(file));
  await Promise.all(images.map((image, index) => RNFetchBlob.fs.mv(image.path, `${pagesPath}/${index + 1}.jpg`)));
  await createThumbnail(path);
}

export async function getUserBooks() {
  const files = await getDirectoryFiles(BOOKS_DIR);
  return files.filter(file => file.type === 'directory');
}

export async function getBookPages(path) {
  const files = await getDirectoryFiles(`${path}/pages`);
  return files.filter(file => isImage(file));
}
