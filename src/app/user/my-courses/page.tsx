'use client';
import React, { useState, useEffect } from 'react';
import { Course } from '@/lib/types';
import api from '@/lib/api';
import Link from 'next/link';
import MyCourseCard from '@/app/ui/course/MyCourseCard';
import Pagination from '@/app/ui/common/Pagination';
import { useSearchParams } from 'next/navigation';
interface PaginatedCourseData
{
    data:Course[];
    total:number;
    page:number;
    lastPage:number;
}
export default function MyCoursesPage() {
    const [paginatedData,setPaginatedData]=useState<PaginatedCourseData | null>(null);
   // const [myCourses, setMyCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams=useSearchParams();
    useEffect(() => {
        const fetchMyCourses = async () => {
            setLoading(true);
            setError(null);
            const page=searchParams.get('page') || '1';
            try {
                const response = await api.get<PaginatedCourseData>('/course/my-courses',{params:{page}});
                setPaginatedData(response.data);
            } catch (err) {
                console.error("Failed to fetch my courses:", err);
                setError("Could not load your courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, [searchParams]);

    return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Learning</h1>
        
        {loading && (
            <div className="text-center py-20">
                <span className="loading loading-spinner loading-lg text-orange-500"></span>
            </div>
        )}
        
        {error && (
            <div className="alert alert-error">
                <span>{error}</span>
            </div>
        )}

        {!loading && !error && paginatedData && (
            <> 
                {paginatedData.data.length > 0 ? (
                    <>
                        <div className="space-y-6">
                            {paginatedData.data.map(course => <MyCourseCard key={course.id} course={course} />)}
                        </div>
                        <Pagination
                            currentPage={paginatedData.page}
                            lastPage={paginatedData.lastPage}
                            total={paginatedData.total}
                        />
                    </>
                ) : (
                   
                    <div className="text-center bg-base-100 p-10 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">Your learning journey awaits!</h3>
                        <p className="text-gray-500 mt-2">You haven't enrolled in any courses yet.</p>
                        <Link href="/user/courses" className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white mt-6">
                            Explore Courses
                        </Link>
                    </div>
                )}
            </>
        )}
    </div>
);

           
}