import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const CreditsOrganizationForm = () => {
  return (
    <Card className='flex items-center justify-between rounded-xl p-6'>
      <Badge variant='secondary' className='h-9 px-4 py-2'>
        Credits remaining: 30
      </Badge>
      <Button variant='outline' size='sm'>
        Buy more
      </Button>
    </Card>
  );
};
