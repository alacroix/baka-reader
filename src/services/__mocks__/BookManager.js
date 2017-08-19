const storedBooks = [
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

export async function fetchImportedBooks() {
  return 'OK';
}

export async function getUserBooks() {
  return storedBooks;
}

export function filterByProgress(books) {
  return books;
}

export async function saveProgression() {
  return 'OK';
}

export async function getCurrentPage() {
  return 1;
}
