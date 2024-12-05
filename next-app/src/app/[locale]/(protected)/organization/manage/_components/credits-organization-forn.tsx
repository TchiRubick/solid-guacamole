import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const CreditsOrganizationForm = () => {
  return (
    <div className='mb-12 flex items-center justify-between rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
      <Badge variant='secondary' className='h-9 px-4 py-2'>
        Credits remaining: 30
      </Badge>
      <Button variant='outline' size='sm'>
        Buy more
      </Button>
    </div>
  );
};
