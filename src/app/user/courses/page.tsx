'use client';
import React, { useState, useEffect } from 'react';
import { Course } from '@/lib/types';
import api from '@/lib/api';
import CourseCard from '@/app/ui/course/CourseCard';
import Pagination from '@/app/ui/common/Pagination';
import { useSearchParams } from 'next/navigation';
import page from '../dashboard/page';

interface PaginatedCourseData
{
  data:Course[];
  total:number;
  page:number;
  lastPage:number;
}
export default function CoursesPage() {
  const [paginatedData,setPaginatedData]=useState<PaginatedCourseData | null>(null);
  //const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [myCourseIds, setMyCourseIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams=useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const page=searchParams.get('page')||'1';
      try {
        const [allCoursesRes, myCoursesRes] = await Promise.all([
          api.get<PaginatedCourseData>('/course/published',{params:{page}}),
          api.get<PaginatedCourseData>('/course/my-courses',{params:{page}}),
        ]);
        
        setPaginatedData(allCoursesRes.data);
        const owenedCourses=myCoursesRes.data.data;
        setMyCourseIds(new Set(owenedCourses.map(c => c.id)));

      } catch (err) {
        console.error("Failed to fetch courses data:", err);
        setError("Could not load courses. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Courses</h1>
      <p className="text-lg text-gray-600 mb-8">
        Upskill yourself with our expert-led courses and accelerate your career.
      </p>

      {loading && (
        <div className="text-center mt-12">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mt-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && paginatedData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedData.data.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isPurchased={myCourseIds.has(course.id)}
              />
            ))}
          </div>

          <Pagination
            currentPage={paginatedData.page}
            lastPage={paginatedData.lastPage}
            total={paginatedData.total}
          />
        </>
      )}
    </div>
  );
}