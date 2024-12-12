'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { createQuestionMutation } from '@/actions/question/create-question';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

export const CreateQuestionForm = () => {
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: createQuestionMutation,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Question created successfully',
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
      value: '',
      organizationId: '',
    },
    validatorAdapter: zodValidator(),
    onSubmit: (values) => {
      mutate(values.value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Question</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Field name='value'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='text'
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='Question'
              />
            )}
          </Field>
          <Button type='submit'>Create</Button>
        </form>
      </CardContent>
    </Card>
  );
};
