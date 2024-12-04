import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InputPassword } from '@/components/input-password';
import { useMutation } from '@tanstack/react-query';
import { deleteOrganizationMutation } from '@/actions/organization/delete';
import { useQuery } from '@tanstack/react-query';
import { currentSession } from '@/actions/auth/current-session';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';

export const DeleteOrganizationModal = () => {
  const { toast } = useToast();
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });
  const { mutateAsync } = useMutation({
    mutationFn: deleteOrganizationMutation,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      confirmPassword: '',
      organizationId: session?.organization?.id ?? '',
      ownerEmail: session?.user?.email ?? '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutateAsync(values.value);
    },
  });
  return (
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
        <form
          className='flex items-center space-x-2'
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <div className='grid flex-1 gap-2'>
            <Field name='confirmPassword'>
              {(field) => (
                <InputPassword
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Enter your password to confirm'
                />
              )}
            </Field>
          </div>
          <Button
            type='submit'
            size='sm'
            className='px-3'
            variant='destructive'
          >
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
