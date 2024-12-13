'use client';

import LogByOpt from '../_components/LogByOpt';

export default function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  return (
    <div>
      <LogByOpt />
    </div>
  );
}
