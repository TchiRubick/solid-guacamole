'use client';

import { createOrganizationMutation } from '@/actions/organization/create';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { currentSession } from '@/actions/auth/current-session';
import { useRouter } from 'next/navigation';
import { useScopedI18n } from '@/locales/client';

export const CreateOrganizationForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const tCreateOrganizationForm = useScopedI18n('create-organization-form');

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: currentSession,
  });

  if (!user?.user) {
    return <div>OwnerID is not found</div>;
  }

  const { mutate } = useMutation({
    mutationFn: createOrganizationMutation,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });

      router.push('/organization');
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
      name: '',
      description: '',
      ownerId: user.user.id,
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value);
    },
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{tCreateOrganizationForm('title')}</CardTitle>
          <CardDescription>
            {tCreateOrganizationForm('description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <Field name='name'>
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>
                    {tCreateOrganizationForm('name-label')}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type='text'
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={tCreateOrganizationForm('name-placeholder')}
                  />
                </div>
              )}
            </Field>
            <Field name='description'>
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>
                    {tCreateOrganizationForm('description-label')}
                  </Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={tCreateOrganizationForm(
                      'description-placeholder'
                    )}
                  />
                </div>
              )}
            </Field>
            <Button type='submit' className='mt-4'>
              {tCreateOrganizationForm('submit-button')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
