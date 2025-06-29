
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