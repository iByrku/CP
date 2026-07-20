export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  role: string;
  category: 'finance' | 'medicine' | 'ai' | 'corporate' | 'integration';
  shortDesc: string;
  fullDesc: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
  metrics?: {
    value: string;
    label: string;
  };
}

export interface Competency {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface TeamMember {
  role: string;
  count: number;
  skills: string[];
}

export interface ContactFormInput {
  name: string;
  email: string;
  telegram?: string;
  projectType: string;
  budgetRange: string;
  description: string;
}
