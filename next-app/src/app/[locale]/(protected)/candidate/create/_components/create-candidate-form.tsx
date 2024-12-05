'use client';

import { createCandidateMutation } from '@/actions/candidate/create-candidate';
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
import { toast } from '@/hooks/use-toast';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Loader2, Mail, Phone, MapPin, User, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const CreateCandidateForm = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createCandidateMutation,
    onSuccess: (response) => {
      toast({
        title: 'Success!',
        description: 'Candidate profile has been created successfully.',
      });

      router.push(`/candidate/${response.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: 'Something went wrong',
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
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-2xl'>Create New Candidate</CardTitle>
        <CardDescription>
          Enter the candidate &apos;s information to create their profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
          className='space-y-8'
        >
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium'>
                Full Name
              </Label>
              <Field name='name'>
                {(field) => (
                  <div className='relative'>
                    <User className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder='John Doe'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium'>
                Email Address
              </Label>
              <Field name='email'>
                {(field) => (
                  <div className='relative'>
                    <Mail className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='email'
                      placeholder='john@example.com'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone' className='text-sm font-medium'>
                Phone Number
              </Label>
              <Field name='phone'>
                {(field) => (
                  <div className='relative'>
                    <Phone className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      type='tel'
                      placeholder='+1 (555) 000-0000'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address' className='text-sm font-medium'>
                Address
              </Label>
              <Field name='address'>
                {(field) => (
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder='123 Main St, City'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className='space-y-2 md:col-span-2'>
              <Label htmlFor='title' className='text-sm font-medium'>
                Job Title
              </Label>
              <Field name='title'>
                {(field) => (
                  <div className='relative'>
                    <Briefcase className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder='Software Engineer'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className='flex justify-end'>
            <Button
              type='submit'
              size='lg'
              disabled={isPending}
              className='min-w-[150px]'
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                'Create Candidate'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
