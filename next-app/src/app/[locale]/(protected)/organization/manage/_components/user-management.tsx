import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const UserManagement = () => {
  return (
    <div className='container mx-auto space-y-6 p-6'>
      {/* Manage / Owner Section */}
      <Card className='w-full border-2 border-primary/20'>
        <CardHeader>
          <CardTitle>Information general</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' className='mt-2' placeholder='Information' />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea className='mt-2' placeholder='Enter description' />
            </div>
            <Button variant='outline' size='sm'>
              Save
            </Button>
          </div>

          <div className='space-y-4'>
            <div>
              <Label>Credits</Label>
              <Input
                className='mt-2'
                placeholder='Remaining credits: 50'
                readOnly
              />
            </div>
            <Button variant='outline' size='sm'>
              Buy more
            </Button>
          </div>

          <div className='space-y-4'>
            <Label className='text-destructive'>Danger</Label>
            <div className='flex items-end gap-4'>
              <div className='flex flex-col gap-4'>
                <Label htmlFor='danger'>Email</Label>
                <Input
                  placeholder='Email address'
                  className='border-destructive'
                />
              </div>
              <Button variant='outline'>Transfer ownership</Button>
            </div>
            <Button variant='destructive'>Delete organization</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
