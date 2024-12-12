'use server';

import { getStorageUrlByName } from '@/lib/files';
import { uploadToS3 } from '@/packages/minio';

export const uploadVideoMuation = async (file: Blob) => {
  const filename = `recording_${new Date().toISOString()}.webm`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await uploadToS3(filename, buffer);

  return getStorageUrlByName(filename);
};
