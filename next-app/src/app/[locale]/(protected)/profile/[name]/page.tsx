import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSession } from '@/server-functions/session';
import { Pencil } from 'lucide-react';

const ProfilePage = async () => {
  const session = await getSession();

  return (
    <Card className='p-4'>
      <CardContent className='mx-auto max-w-2xl space-y-12'>
        <CardTitle className='text-4xl font-normal'>Profile</CardTitle>
        <Card className='space-y-6 p-4'>
          <div className='space-y-2'>
            <h2 className='text-xl font-normal'>Personal Information</h2>
            <p className='text-gray-400'>
              Update your personal information and preferences.
            </p>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' defaultValue={session?.user?.username} />
          </div>
          <Button variant={'outline'}>Save</Button>
        </Card>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-xl font-normal'>Avatar</h2>
            <p className='text-gray-400'>Update your profile picture.</p>
          </div>
          <Avatar className='relative h-24 w-24'>
            <AvatarImage>{session?.user?.image}</AvatarImage>
            <AvatarFallback className='rounded-lg uppercase'>
              {session?.user?.username.charAt(0)}
              {session?.user?.username.charAt(1)}
            </AvatarFallback>
            <Button
              size='icon'
              variant='secondary'
              className='absolute bottom-1 right-1 h-8 w-8 rounded-full'
            >
              <Pencil className='h-4 w-4' />
              <span className='sr-only'>Edit avatar</span>
            </Button>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
