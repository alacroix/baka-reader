declare type BlobStat = {
  fileinfo: string,
  lastModified: number,
  path: string,
  size: string,
  type: 'file' | 'directory',
};
