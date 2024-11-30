'use server';

import { getList } from "@/models/interview/$get-list";

export const interviewList = async () => {
  const list = await getList();

  return list;
};
