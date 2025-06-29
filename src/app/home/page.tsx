/*'use client'
import React from 'react';
import BlurText from '../ui/Home/BlurText';
const page = () => {
      const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
    return (
    <div className="min-h-screen pt-10">
      <div className="max-w-5xl mx-auto ml-10">
        <BlurText
          text="WELCOME TO JOB PORTAL"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl text-orange-500 mb-8 translate-x-130"
        />
      </div>
     

    </div>
   
    );
};

export default page;*/
'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlurText from '../ui/Home/BlurText';
import { 
  MagnifyingGlassIcon, 
  UserPlusIcon, 
  BuildingOffice2Icon, 
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const featuredJobs = [
  { id: 1, title: 'Senior Frontend Developer', company: 'TechNova Inc.', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Product Manager', company: 'Innovate Co.', location: 'New York, NY', type: 'Full-time' },
  { id: 3, title: 'UX/UI Designer', company: 'Creative Solutions', location: 'San Francisco, CA', type: 'Contract' },
];

export default function HomePage() {
  const handleAnimationComplete = () => {
    console.log('Hero text animation completed!');
  };

  const heroImageUrl = "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop";

  return (
    <div className="bg-white">
      <Navbar />
      
      <main>
        
        <section 
          className="hero min-h-screen" 
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        >
          <div className="hero-overlay bg-black bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-3xl">
              <BlurText
                text="WELCOME TO JOB KHUJI"
                delay={150}
                animateBy="words"
                onAnimationComplete={handleAnimationComplete}
                className="mb-5 text-5xl md:text-7xl font-extrabold text-white"
              />
              <p className="mb-8 text-lg md:text-xl text-white/90">
                The ultimate platform connecting ambitious professionals with innovative companies. Your future career is just a click away.
              </p>
              
        
              <div className="form-control">
                <div className="relative">
                  <input type="text" placeholder="Search by job title, skill, or company" className="input input-lg input-bordered w-full pr-16 text-gray-800" />
                  <button className="btn btn-primary btn-lg bg-orange-500 hover:bg-orange-600 border-none absolute top-0 right-0 rounded-l-none text-white">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Everything You Need, All In One Place</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Whether you're looking to find your next role, hire top talent, or upskill your career, we have you covered.</p>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              
              <div className="card bg-base-100 shadow-lg text-center p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="flex justify-center">
                  <div className="p-4 bg-orange-100 rounded-full"><BriefcaseIcon className="h-10 w-10 text-orange-600"/></div>
                </div>
                <h3 className="text-xl font-bold mt-4">Find Your Next Role</h3>
                <p className="text-gray-500 mt-2">Search through thousands of curated job listings from top-tier companies.</p>
              </div>

              <div className="card bg-base-100 shadow-lg text-center p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="flex justify-center">
                    <div className="p-4 bg-blue-100 rounded-full"><BuildingOffice2Icon className="h-10 w-10 text-blue-600"/></div>
                </div>
                <h3 className="text-xl font-bold mt-4">Hire Top Talent</h3>
                <p className="text-gray-500 mt-2">Post job openings and connect with a vast pool of qualified candidates.</p>
              </div>

              <div className="card bg-base-100 shadow-lg text-center p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="flex justify-center">
                  <div className="p-4 bg-green-100 rounded-full"><AcademicCapIcon className="h-10 w-10 text-green-600"/></div>
                </div>
                <h3 className="text-xl font-bold mt-4">Upskill Your Career</h3>
                <p className="text-gray-500 mt-2">Enroll in expert-led courses to gain new skills and advance your career.</p>
              </div>

            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Featured Job Openings</h2>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {featuredJobs.map(job => (
                        <div key={job.id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all border border-gray-200/80">
                            <div className="card-body">
                                <span className="badge badge-outline border-orange-400 text-orange-600">{job.type}</span>
                                <h3 className="card-title text-xl font-bold mt-2">{job.title}</h3>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-sm text-gray-400 mt-1">{job.location}</p>
                                <div className="card-actions justify-end mt-4">
                                    <Link href={`/jobs/${job.id}`} className="btn btn-ghost text-orange-600">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="/register" className="btn btn-lg btn-primary bg-orange-500 hover:bg-orange-600 border-none text-white">
                        Join Now & Browse All Jobs
                    </Link>
                </div>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}