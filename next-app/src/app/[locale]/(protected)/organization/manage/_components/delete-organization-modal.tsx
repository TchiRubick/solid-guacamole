'use client';
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
import { useScopedI18n } from '@/locales/client';

import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

export const DeleteOrganizationModal = () => {
  const { toast } = useToast();
  const t = useScopedI18n('delete-organization-modal');
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteOrganizationMutation,
    onSuccess: () => {
      toast({
        title: `${t('toast-success-title')}`,
        description: `${t('toast-success')}`,
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: `${t('toast-error-title')}`,
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
        <Button variant='destructive'>{t('title')}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
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
                  placeholder={t('input-password-placeholder')}
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
            {isPending ? (
              <Loader className='animate-spin' />
            ) : (
              `${t('delete-button')}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};