declare type RNFetchBlobStat = {
  filename: string,
  lastModified: number,
  path: string,
  size: string,
  type: 'file' | 'directory',
};
