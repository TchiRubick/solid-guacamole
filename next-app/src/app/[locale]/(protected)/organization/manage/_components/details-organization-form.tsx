'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

export const DetailsOrganizationForm = () => {
  const { toast } = useToast();
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: currentSession,
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganizationMutation,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Organization updated successfully',
      });
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
    <Card className='space-y-4 p-4'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <div>
          <Label htmlFor='name'>Name</Label>
          <Field name='name'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='Organization name'
              />
            )}
          </Field>
        </div>
        <div>
          <Label htmlFor='description'>Description</Label>
          <Field name='description'>
            {(field) => (
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='Organization description'
              />
            )}
          </Field>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='mt-4 grid justify-self-end'
        >
          Save
        </Button>
      </form>
    </Card>
  );
};
