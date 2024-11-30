import { env } from '@/env';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const FILE_NAME_MAX_LENGTH = 255;

const validateFileSize = (files: File[]): boolean => {
  const totalSize = files.reduce((acc, cur) => acc + cur.size, 0);
  return totalSize <= MAX_FILE_SIZE;
};

const validateFileTypes = (files: File[]): boolean =>
  files.every((file) =>
    ACCEPTED_IMAGE_TYPES.includes(
      file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
    )
  );

const validateFileNames = (files: File[]): boolean =>
  files.every(
    (file) =>
      file.name.includes('..') === false &&
      file.name.length <= FILE_NAME_MAX_LENGTH
  );

export const filesImageValidator = z
  .instanceof(File, { message: 'File is required' })
  .array()
  .refine(validateFileSize)
  .refine(validateFileTypes)
  .refine(validateFileNames);

export const getImageUrlByName = (name: string) =>
  `http${env.MINIO_SSL === 'true' ? 's' : ''}://${env.MINIO_DOMAIN}:${env.MINIO_PORT ?? 9000}/${env.MINIO_BUCKET_NAME}/${name}`;
