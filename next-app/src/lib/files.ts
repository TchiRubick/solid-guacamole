import { env } from '@/env';

export const getStorageUrlByName = (name: string) =>
  `http${env.MINIO_SSL === 'true' ? 's' : ''}://${env.MINIO_DOMAIN}:${env.MINIO_PORT ?? 9000}/${env.MINIO_BUCKET_NAME}/${name}`;
