'use client';

import { getAllCandidateAction } from '@/actions/candidate/get-all-candidate';
import type { CreateInterviewPayload } from '@/actions/interview/create-interview';
import { createInterviewMutation } from '@/actions/interview/create-interview';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus, Send, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

interface Question {
  id: string;
  text: string;
}

export default function CreateInterview() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: '' },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { id: crypto.randomUUID(), text: '' }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const { data: candidates } = useQuery({
    queryKey: ['candidate'],
    queryFn: getAllCandidateAction,
  });

  const { mutate: createInterview, isPending } = useMutation({
    mutationKey: ['createInterview'],
    mutationFn: createInterviewMutation,
    onSuccess: () => {
      toast({
        title: 'Interview sent successfully',
      });

      router.push('/interview/list');
    },
    onError: (error) => {
      toast({
        title: 'Error sending interview',
        description: error.message,
      });
    },
  });

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      name: '',
      description: '',
    } as CreateInterviewPayload,
    onSubmit: (valeur) => {
      const data = {
        name: valeur.value.name,
        description: valeur.value.description,
        candidateId: Number(valeur.value.candidateId),
        expiresAt: valeur.value.expiresAt,
      };

      createInterview(data);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        candidateId: z.number().min(1),
        expiresAt: z.date().min(new Date()),
      }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      className='container mx-auto p-6'
    >
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl'>Create New Interview</CardTitle>
          <CardDescription>
            Set up an interview and send invitations to candidates
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Basic Information */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Interview Name</Label>
              <Field name='name'>
                {(field) => (
                  <Input
                    id={field.name}
                    placeholder='e.g., Senior Developer Technical Interview'
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </Field>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Interview Description</Label>
              <Field name='description'>
                {(field) => (
                  <Textarea
                    id={field.name}
                    placeholder='e.g., Senior Developer Technical Interview'
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='min-h-[100px]'
                  />
                )}
              </Field>
            </div>
          </div>
          <Separator />

          {/* Candidate Selection */}
          <div className='space-y-4'>
            <Label>Select Candidate</Label>
            <div className='flex items-center gap-4'>
              <Field name='candidateId'>
                {(field) => (
                  <Select onValueChange={(e) => field.handleChange(Number(e))}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Choose a candidate' />
                    </SelectTrigger>

                    <SelectContent>
                      {candidates?.map((candidate, cle) => (
                        <SelectItem key={cle} value={candidate.id.toString()}>
                          {candidate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    {/*  */}
                  </Select>
                )}
              </Field>
              <span className='text-sm text-muted-foreground'>or</span>
              <Button variant='outline' asChild>
                <Link href='/candidate/create'>
                  <User className='mr-2 h-4 w-4' />
                  New Candidate
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Date Selection */}
          <div className='space-y-4'>
            <Label>Invitation Expiration Date</Label>
            <Field name='expiresAt'>
              {(field) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.state.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.state.value
                        ? format(field.state.value, 'PPP')
                        : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.state.value}
                      onSelect={(e) => field.handleChange(e ?? new Date())}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </Field>
          </div>

          <Separator />

          {/* Questions */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Label>Interview Questions</Label>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addQuestion}
              >
                <Plus className='mr-2 h-4 w-4' />
                Add Question
              </Button>
            </div>

            <div className='space-y-4'>
              {questions.map((question, index) => (
                <div key={question.id} className='flex gap-2'>
                  <div className='flex-1 space-y-2'>
                    <Label htmlFor={question.id} className='sr-only'>
                      Question {index + 1}
                    </Label>
                    <Input
                      id={question.id}
                      placeholder={`Question ${index + 1}`}
                      value={question.text}
                      onChange={(e) =>
                        updateQuestion(question.id, e.target.value)
                      }
                    />
                  </div>
                  {questions.length > 1 && (
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={() => removeQuestion(question.id)}
                      className='shrink-0'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-end space-x-4'>
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type='submit'
                disabled={isPending || !canSubmit || isSubmitting}
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-4 w-4' />
                    Send Invitation
                  </>
                )}
              </Button>
            )}
          </Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
