import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useScopedI18n } from '@/packages/locales/client';

export const CandidatePDFViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const t = useScopedI18n('candidate-pdf-viewer');

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{t('trigger')}</Button>
        </DialogTrigger>
        <DialogContent className='p-0'>
          <DialogTitle>{t('title')}</DialogTitle>
          <div className='relative flex flex-col items-center justify-center'>
            <ScrollArea className='absolute h-4/5 scroll-m-2 overflow-hidden'>
              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <Button
                onClick={() => setPageNumber((prev) => prev - 1)}
                disabled={pageNumber === 1}
                className='absolute left-0 top-80 z-50 rounded-e-full'
                size={'icon'}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={pageNumber === numPages}
                className='absolute right-0 top-80 z-50 rounded-s-full'
                size={'icon'}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
