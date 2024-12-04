import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const DangerZone = () => {
  return (
    <Card className='space-y-4 border-destructive p-4'>
      <div className='flex w-full items-end justify-between gap-4'>
        <div className='flex w-full flex-col gap-4'>
          <Label htmlFor='danger'>Email</Label>
          <Input placeholder='Email address' id='danger' className='w-full' />
        </div>
        <Button variant='outline'>Transfer ownership</Button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='destructive'>Delete organization</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Delete organization</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this organization?
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Input id='link' placeholder='Enter your password to confirm' />
            </div>
            <Button
              type='submit'
              size='sm'
              className='px-3'
              variant='destructive'
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
