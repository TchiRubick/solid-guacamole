'use client';

import { createOrganizationMutation } from '@/actions/organization/create';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { currentSession } from '@/actions/auth/current-session';
import { useQueryClient } from '@tanstack/react-query';

export const CreateOrganizationForm = () => {
  const { toast } = useToast();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: currentSession,
  });
  const { mutate } = useMutation({
    mutationFn: createOrganizationMutation,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });
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
      ownerId: user?.user?.id ?? '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value);

      console.log(values.value);
    },
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
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
                  <Label htmlFor={field.name}>Organization name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type='text'
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Name'
                  />
                </div>
              )}
            </Field>
            <Field name='description'>
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Description</Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Description'
                  />
                </div>
              )}
            </Field>
            <Button type='submit'>Create</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
