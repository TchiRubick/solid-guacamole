'use client';

import { inviteUserAction } from '@/actions/user/invite-user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

// TODO: rename this component
export const DialogCloseButton = () => {
  const { mutate } = useMutation({
    mutationFn: inviteUserAction,
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      email: '',
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({ email: z.string().email() }),
    },
    onSubmit: (values) => {
      mutate(values.value);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Invite</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Invitation</DialogTitle>
          <DialogDescription>
            Enter the mail adress of the new member{' '}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='link' className='sr-only'>
                Link
              </Label>
              <Field name='email'>
                {(field) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type='email'
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='john@mail.com'
                  />
                )}
              </Field>
            </div>
            <Button type='submit' className='px-3'>
              Invite
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
