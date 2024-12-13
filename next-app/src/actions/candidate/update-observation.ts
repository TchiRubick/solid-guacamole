'use server';

import { updateObservation } from '@/models/candidate/$update-observation';

export const updateObservationMutation = async ({
  id,
  observation,
}: {
  id: number;
  observation: string;
}) => {
  const result = await updateObservation(id, observation);
  return result;
};
