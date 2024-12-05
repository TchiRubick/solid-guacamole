'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { currentSession } from '@/actions/auth/current-session';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { updateOrganizationMutation } from '@/actions/organization/update';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';

export const DetailsOrganizationForm = () => {
  const { toast } = useToast();
  const t = useScopedI18n('details-organization-form');
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationMutation,
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
      name: session?.organization?.name ?? '',
      description: session?.organization?.description ?? '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: async (values) => {
      await mutateAsync({
        id: session?.organization?.id ?? '',
        name: values.value.name,
        description: values.value.description,
      });
    },
  });

  return (
    <div className='mb-12 space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800/50'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <div>
          <Label htmlFor='name'>{t('label-name')}</Label>
          <Field name='name'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={t('name-placeholder')}
              />
            )}
          </Field>
        </div>
        <div>
          <Label htmlFor='description'>{t('label-description')}</Label>
          <Field name='description'>
            {(field) => (
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={t('description-placeholder')}
              />
            )}
          </Field>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='mt-4 grid justify-self-end'
        >
          {t('button-save')}
        </Button>
      </form>
    </div>
  );
};
