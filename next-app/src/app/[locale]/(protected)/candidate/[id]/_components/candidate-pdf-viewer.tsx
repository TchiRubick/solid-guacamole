import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export const CandidatePDFViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p className='text-center text-sm'>
        Page {pageNumber} of {numPages}
      </p>
      <div className='mt-4 flex gap-2'>
        <Button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber === numPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
