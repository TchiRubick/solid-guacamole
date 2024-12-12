'use client';

import { uploadResumeMutation } from '@/actions/candidate/upload-resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const CandidateResumeUpload = ({ id }: { id: number }) => {
  const [file, setFile] = useState<File | null>(null);
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: uploadResumeMutation,
    onSuccess: () => {
      toast({
        title: 'Resume uploaded successfully',
      });

      client.invalidateQueries({
        queryKey: ['candidate', 'details', id],
      });
    },
    onError: (error) => {
      toast({
        title: 'Error during the upload',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClick = () => {
    if (!file) {
      return;
    }

    mutate({ candidateId: id, file });
  };

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='resume'>Resume</Label>
      <Input
        id='resume'
        type='file'
        accept='.pdf'
        aria-label='Upload PDF resume'
        onChange={handleFileChange}
      />
      {file && <div>Selected file: {file.name}</div>}
      <Button type='button' onClick={handleClick}>
        Upload a new resume
      </Button>
    </div>
  );
};
