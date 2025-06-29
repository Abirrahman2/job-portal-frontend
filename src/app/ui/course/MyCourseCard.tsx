import React from 'react';
import { Course } from '@/lib/types';
import Link from 'next/link';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

export default function MyCourseCard({ course }: { course: Course }) {
  return (
    <div className="card card-side bg-base-100 shadow-md transition-all duration-300 hover:shadow-xl">
      <figure className="w-1/3 max-w-xs">
        <img 
            src={course.link || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} 
            alt={course.title} 
            className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <span className="badge badge-outline text-green-600 border-orange-300">{course.category}</span>
        <h2 className="card-title text-lg font-bold text-orange-600">{course.title}</h2>
        <p className="text-sm text-gray-500">Level: {course.level}</p>
        
        <div className="mt-2">
            <progress className="progress progress-success w-full" value="0" max="100"></progress>
            <span className="text-xs text-orange-400">0% Complete</span>
        </div>

        <div className="card-actions justify-end mt-2">
          <Link href={`/user/course-player/${course.id}`} className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white">
            <PlayCircleIcon className="h-5 w-5 mr-1" />
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}