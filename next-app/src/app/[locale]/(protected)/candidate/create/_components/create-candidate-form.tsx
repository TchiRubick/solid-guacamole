'use client';

import { createCandidateMutation } from '@/actions/candidate/create-candidate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useRouter } from 'next/navigation';

export const CreateCandidateForm = () => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createCandidateMutation,
    onSuccess: (response) => {
      toast({
        title: 'Candidate created',
        description: 'You can move forward with the next steps',
      });

      router.push(`/candidate/${response.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed candidate creation',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, Field } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
    },
    onSubmit: (values) => {
      mutate(values.value);
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Field name='name'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Field name='email'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='email'
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='phone'>Phone</Label>
          <Field name='phone'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='tel'
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='address'>Address</Label>
          <Field name='address'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='tel'
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </Field>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='title'>Title</Label>
          <Field name='title'>
            {(field) => (
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='tel'
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </Field>
        </div>
      </div>
      <div className='mt-8 flex justify-end gap-2'>
        <Button type='submit' className='w-44'>
          Submit
        </Button>
      </div>
    </form>
  );
};
