'use client';
import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  total: number;
}

export default function Pagination({ currentPage, lastPage, total }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > lastPage) return;
    router.push(createPageURL(page));
  };
  
  if (total === 0 || lastPage <= 1) return null;

  return (
    <div className="join mt-12 flex justify-center">
      <button 
        className="join-item btn" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        «
      </button>
      <button className="join-item btn">
        Page {currentPage} of {lastPage}
      </button>
      <button 
        className="join-item btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
      >
        »
      </button>
    </div>
  );
}