export interface ResumeProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  about: string;
  links: {
    github: string;
    linkedin: string | null;
  };
}

export interface ResumeExperience {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string | null;
  highlights: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  location: string;
  date: string | null;
}

export interface ResumeSkillGroup {
  category: string;
  items: string[];
}

export interface ResumeVolunteering {
  role: string;
  organization: string;
  start: string;
  end: string | null;
}

export interface ResumeData {
  profile: ResumeProfile;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  volunteering: ResumeVolunteering[];
}
