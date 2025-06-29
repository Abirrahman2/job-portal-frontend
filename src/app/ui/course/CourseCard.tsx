'use client';
import React, { useState } from 'react';
import { Course } from '@/lib/types';
import { ClockIcon, LanguageIcon, SignalIcon } from '@heroicons/react/24/outline';
import api from '@/lib/api';

interface CourseCardProps {
    course: Course;
    isPurchased: boolean;
}

export default function CourseCard({ course, isPurchased }: CourseCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePurchase = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/payment/create-checkout-session', { courseId: course.id });
            const { url } = response.data;
            if (url) {
                window.location.href = url;
            }
        } catch (error: any) {
            console.error("Failed to create Stripe session:", error);
            alert(error.response?.data?.message || "Could not initiate purchase. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card w-full bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <figure className="h-52">
                <img 
                    src={course.link || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} 
                    alt={course.title} 
                    className="w-full h-full object-cover" 
                />
            </figure>
            
            <div className="card-body p-6">
                <div className="flex justify-between items-start">
                    <span className="badge badge-warning bg-orange-100 text-orange-700 border-orange-200 font-semibold">{course.category}</span>
                    <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                </div>
                
                <h2 className="card-title text-xl font-bold mt-4 h-14 overflow-hidden">{course.title}</h2>
                
                <div className="grid grid-cols-3 gap-2 text-gray-500 text-xs mt-2 border-t pt-4">
                    <div className="flex items-center gap-2" title="Duration"><ClockIcon className="h-4 w-4" /> {course.duration}</div>
                    <div className="flex items-center gap-2" title="Language"><LanguageIcon className="h-4 w-4" /> {course.language}</div>
                    <div className="flex items-center gap-2" title="Level"><SignalIcon className="h-4 w-4" /> {course.level}</div>
                </div>

                <div className="card-actions justify-center mt-4">
                    {isPurchased ? (
                        <button className="btn btn-disabled bg-green-100 text-green-700 w-full">
                           Enrolled
                        </button>
                    ) : (
                        <button 
                            onClick={handlePurchase} 
                            disabled={isLoading}
                            className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white w-full"
                        >
                            {isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Buy Now'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}