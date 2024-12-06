'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2, User, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
}

export default function CreateInterview() {
  const [date, setDate] = useState<Date>();
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { id: crypto.randomUUID(), text: '' }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Interview Created',
      description:
        'The interview has been created and invitations will be sent.',
    });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className='container mx-auto max-w-3xl p-6'>
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
              <Input
                id='name'
                placeholder='e.g., Senior Developer Technical Interview'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Interview Description</Label>
              <Textarea
                id='description'
                placeholder='Provide details about the interview process...'
                className='min-h-[100px]'
              />
            </div>
          </div>

          <Separator />

          {/* Candidate Selection */}
          <div className='space-y-4'>
            <Label>Select Candidate</Label>
            <div className='flex items-center gap-4'>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Choose a candidate' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='jm'>John Mayer</SelectItem>
                  <SelectItem value='srv'>Stevie Ray Vaughn</SelectItem>
                  <SelectItem value='jh'>Jimi Hendrix</SelectItem>
                  <SelectItem value='bbk'>B.B King</SelectItem>
                  <SelectItem value='ak'>Albert King</SelectItem>
                  <SelectItem value='bg'>Buddy Guy</SelectItem>
                  <SelectItem value='ec'>Eric Clapton</SelectItem>
                </SelectContent>
              </Select>

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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : 'Select a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
          <Button variant='outline' type='button'>
            Save as Draft
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
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
        </CardFooter>
      </Card>
    </form>
  );
}
