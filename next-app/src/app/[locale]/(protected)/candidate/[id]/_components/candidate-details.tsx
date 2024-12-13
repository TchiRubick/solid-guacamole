'use client';

import { oneCandidateQuery } from '@/actions/candidate/get-candidate';
import { useQuery } from '@tanstack/react-query';
import { CandidateSkeleton } from '../../_components/candidate-skeleton';
import { CandidatePDFViewer } from './candidate-pdf-viewer';
import { CandidateResumeUpload } from './candidate-resume-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FileText, Mail, Phone, User } from 'lucide-react';
import { useScopedI18n } from '@/packages/locales/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { updateObservationMutation } from '@/actions/candidate/update-observation';
import { useForm } from '@tanstack/react-form';

export const CandidateDetails = ({ id }: { id: number }) => {
  const { data, isFetching } = useQuery({
    queryKey: ['candidate', 'details', id],
    queryFn: () => oneCandidateQuery(id),
  });
  const t = useScopedI18n('candidate-details');

  const { mutate } = useMutation({
    mutationFn: updateObservationMutation,
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Candidate observation is add successfully!.',
      });
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
      observation: '',
    },

    validatorAdapter: zodValidator(),
    onSubmit: async (values) => {
      await mutate({
        id: id,
        observation: values.value.observation,
      });
    },
  });

  if (isFetching) return <CandidateSkeleton />;

  return (
    <div className='min-h-screen bg-background p-6'>
      <Card className='mx-auto max-w-full'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-4xl font-bold'>
            {t('candidate-details')}
          </CardTitle>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-4'>
              {data?.resume && <CandidatePDFViewer url={data.resume} />}
              <CandidateResumeUpload
                id={id}
                trigger={
                  data?.resume
                    ? `${t('replace-resume')}`
                    : `${t('upload-resume')}`
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>{t('candidate-name')}</Label>
                <div className='relative'>
                  <Input
                    id='name'
                    className='pl-8'
                    value={data?.name}
                    readOnly
                  />
                  <User className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>{t('candidate-email')}</Label>
                <div className='relative'>
                  <Input
                    id='email'
                    type='email'
                    className='pl-8'
                    value={data?.email}
                    readOnly
                  />
                  <Mail className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>{t('candidate-phone')}</Label>
                <div className='relative'>
                  <Input
                    id='phone'
                    type='tel'
                    className='pl-8'
                    value={data?.phone}
                    readOnly
                  />
                  <Phone className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                </div>
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='observations'>
                {t('candidate-observations')}
              </Label>
              <Field name='observation'>
                {(field) => (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className='min-h-[100px]'
                    placeholder={t('candidate-resume-placeholder')}
                  />
                )}
              </Field>
            </div>
            <Button className='w-full'>Save</Button>
            <div className='space-y-2'>
              <Label className='flex items-center gap-2'>
                <FileText className='h-4 w-4' />
                {t('candidate-interview-list')}
              </Label>
              <Textarea
                className='min-h-[100px]'
                placeholder='Add interview notes here...'
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
