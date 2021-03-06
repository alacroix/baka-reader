import RNFetchBlob from 'react-native-fetch-blob';

import ImageResizer from 'react-native-image-resizer';

export async function createThumbnail(bookPath) {
  await ImageResizer.createResizedImage(
    `${bookPath}/pages/1.jpg`,
    160 * 2,
    240 * 2,
    'JPEG',
    80,
  )
    .then(({ uri }) => RNFetchBlob.fs.mv(uri, `${bookPath}/thumbnail.jpg`));
}

export default {
  createThumbnail,
};
