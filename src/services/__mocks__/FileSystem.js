const books = [
  {
    filename: 'Book 1',
    lastModified: 1502018672000,
    path: 'some/path/book1',
    size: 42,
    type: 'directory',
  }, {
    filename: 'Book 2',
    lastModified: 1502018673000,
    path: 'some/path/book2',
    size: 42,
    type: 'directory',
  },
];

export const DATABASE_DIR = '.';

export async function createBooksDirectory() {
  return 'OK';
}

export async function getUserImportedBooks() {
  return books;
}

export async function importBook() {
  return {
    path: 'some/new/path',
    totalPages: 42,
  };
}
