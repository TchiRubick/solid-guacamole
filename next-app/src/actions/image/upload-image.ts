'use server';

import { filesImageValidator, getImageUrlByName } from '@/lib/image';
import { insertImage } from '@/models/image/$insert-image';
import {
  convertFileToBuffer,
  generateSafeName,
  uploadToS3,
} from '@/packages/minio';

export const uploadImage = async (files: File[]) => {
  const validatedFiles = filesImageValidator.parse(files);
  const names: string[] = [];

  for (const file of validatedFiles) {
    const safename = generateSafeName();
    const buffer = await convertFileToBuffer(file);

    await uploadToS3(safename, buffer);

    const url = getImageUrlByName(safename);

    names.push(url);
  }

  const images = await insertImage(names.map((url) => ({ url })));

  return images;
};
