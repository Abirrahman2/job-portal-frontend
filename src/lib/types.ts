import { Dispatch, SetStateAction } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'recruiter' | 'user';
  address: string;
  age: number;
  
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser:Dispatch<SetStateAction<User | null>>;
}
export interface CompanyInfo {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  jobType: string;
  createdAt: string; 
  company: CompanyInfo;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  language: string;
  duration: string;
  link: string;
  price: number;
  status: string;
  createdDate: string;
}
export interface Applicant
{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
}
export interface Application
{
  id:number;
  status:string;
  appliedAt:string;
  resumeUrl:string;
  user:Applicant;
}
export interface CreateUserDto
{
  firstName:string;
  lastName: string;
  age: number;
  email: string;
  password?: string;
  address: string;
  role: string;
  isActive: boolean;
}