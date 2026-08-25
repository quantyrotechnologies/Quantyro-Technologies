import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { TeamMember } from '@/lib/types';

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'chirag-kumar',
    name: 'Chirag Kumar',
    role: 'Founder & Principal Full-Stack Architect',
    bio: 'Founder & Principal Full-Stack Architect with 3+ years of production experience building high-scale distributed web platforms, Next.js architectures, and resilient cloud systems. Specialist in MERN stack, Python microservices, and end-to-end cloud DevOps pipelines. Passionate about engineering high-speed, scalable enterprise software solutions.',
    photoUrl: '/images/team/chirag-kumar.jpg',
    linkedinUrl: null,
    skills: ['System Architecture', 'Next.js 15 & React 19', 'Python Backend', 'MERN Stack & TypeScript', 'PostgreSQL & MongoDB', 'Cloud DevOps & Docker'],
    experience: 'Founder & Lead Architect',
  },
  {
    id: 'manohar-kumar-singh',
    name: 'Manohar Kumar Singh',
    role: 'Senior Full-Stack & Backend Engineer',
    bio: 'Senior Full-Stack Engineer with 3+ years of production experience building enterprise web platforms, robust REST/GraphQL APIs, and high-performance backend systems. Specialist in MERN stack, Node.js, Next.js 15, and database optimizations.',
    photoUrl: '/images/team/manohar-kumar-singh.jpg',
    linkedinUrl: null,
    skills: ['MERN Stack', 'Node.js & Express', 'Next.js 15 & React 19', 'PostgreSQL & MongoDB', 'REST & GraphQL APIs', 'TypeScript & Tailwind', 'Docker & Cloud CI/CD'],
    experience: '3+ Years Exp',
  },
  {
    id: 'divyam-yadav',
    name: 'Divyam Yadav',
    role: 'Principal Full-Stack Architect & DevOps Lead',
    bio: 'Full-Stack Software Architect and DevOps Specialist with 6+ years of production experience designing resilient cloud infrastructure, distributed microservices, and high-performance backend systems. Expert in Go (Golang), Kubernetes, CI/CD automation, and modern scalable architecture.',
    photoUrl: '/images/team/divyam-yadav.jpg',
    linkedinUrl: null,
    skills: ['Full-Stack Architecture', 'Go (Golang)', 'DevOps & CI/CD', 'Kubernetes & Docker', 'Cloud Systems (AWS/GCP)', 'Node.js & TypeScript', 'Microservices', 'Distributed Systems'],
    experience: '6+ Years Exp',
  },
  {
    id: 'ayush-verma',
    name: 'Ayush Verma',
    role: 'Senior Frontend & Full-Stack Engineer',
    bio: 'Senior Frontend Specialist & Full-Stack Engineer with 4+ years of production experience crafting high-performance, pixel-perfect user interfaces and scalable web platforms. Expert in React.js, Next.js, TypeScript, Node.js, and modern database architectures.',
    photoUrl: '/images/team/ayush-verma.jpg',
    linkedinUrl: null,
    skills: ['Frontend Architecture', 'React.js & Next.js', 'TypeScript', 'Node.js', 'PostgreSQL & MongoDB', 'Tailwind CSS', 'UI/UX Performance', 'REST APIs'],
    experience: '4+ Years Exp',
  },
  {
    id: 'abhishek-singh',
    name: 'Abhishek Singh',
    role: 'Senior Software Engineer & .NET Architect',
    bio: 'Senior Software Engineer with 5+ years of production experience transforming complex business logic into high-performance enterprise code. Specialist in .NET Core, Angular, SQL Server/EF Core, microservices architecture, and scalable cloud solutions.',
    photoUrl: '/images/team/abhishek-singh.jpg',
    linkedinUrl: null,
    skills: ['.NET Core & C#', 'Angular', 'SQL Server & EF Core', 'Microservices', 'Enterprise Architecture', 'Cloud Solutions', 'RESTful APIs', 'TypeScript'],
    experience: '5+ Years Exp',
  },
  {
    id: 'ayush-bansal',
    name: 'Ayush Bansal',
    role: 'AI/ML Engineer & Data Analyst (PL-300)',
    bio: 'AI/ML Engineer and PL-300 Certified Data Analyst with 2.5+ years of production experience building intelligent models, supervised machine learning pipelines, and predictive analytics dashboards. Expert in Python, AI/ML engineering, Power BI, and data-driven systems.',
    photoUrl: '/images/team/ayush-bansal.jpg',
    linkedinUrl: null,
    skills: ['AI & Machine Learning', 'Supervised ML', 'PL-300 Certified', 'Data Analytics & Power BI', 'Python & PyTorch', 'Data Pipelines', 'Predictive Modeling'],
    experience: '2.5+ Years Exp',
  },
  {
    id: 'harsh-yadav',
    name: 'Harsh Yadav',
    role: 'Lead Technical Sales & Client Strategy',
    bio: 'Technical Sales Specialist and Client Strategy Lead with 4+ years of experience driving enterprise technology partnerships, solution scoping, and client success. Specialist in consultative tech sales, client acquisitions, and B2B growth.',
    photoUrl: '/images/team/harsh-yadav.jpg',
    linkedinUrl: null,
    skills: ['Technical Sales', 'Client Strategy & Growth', 'Solution Scoping', 'Enterprise Partnerships', 'B2B Sales Strategy', 'Account Management'],
    experience: '4+ Years Exp',
  },
  {
    id: 'prachi-rathi',
    name: 'Prachi Rathi',
    role: 'HR Specialist & People Operations',
    bio: 'Human Resources and Talent Operations Specialist with 1.5+ years of experience managing tech recruitment, talent acquisition, team culture, and people operations for fast-growing engineering teams.',
    photoUrl: '/images/team/prachi-rathi.jpg',
    linkedinUrl: null,
    skills: ['HR Operations', 'Tech Talent Acquisition', 'Engineer Onboarding', 'People & Culture', 'Employee Engagement', 'Resource Planning'],
    experience: '1.5+ Years Exp',
  },
  {
    id: 'siddharth-chaudhary',
    name: 'Siddharth Chaudhary',
    role: 'Lead Mobile App Architect (iOS & Android)',
    bio: 'Lead Mobile App Engineer and Cross-Platform Specialist with 4+ years of production experience crafting high-performance iOS and Android applications. Expert in React Native, Flutter, Swift, Kotlin, and offline-first mobile architectures.',
    photoUrl: '/images/team/siddharth-chaudhary.jpg',
    linkedinUrl: null,
    skills: ['React Native', 'Flutter & Dart', 'iOS & Swift', 'Android & Kotlin', 'Mobile Architecture', 'App Store / Play Store CI/CD'],
    experience: '4+ Years Exp',
  },
];

async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_TEAM;
    }

    const mapped: TeamMember[] = data.map((row) => {
      const name = (row.name as string) || '';
      const n = name.toLowerCase();
      let photoUrl = (row.photo_url as string | null) ?? null;
      let skills = (row.skills as string[] | null) ?? null;
      let experience = (row.experience as string | null) ?? null;

      if (n.includes('chirag')) {
        photoUrl = photoUrl || '/images/team/chirag-kumar.jpg';
        skills = (skills && skills.length > 0) ? skills : ['System Architecture', 'Next.js 15 & React 19', 'Python Backend', 'MERN Stack & TypeScript', 'PostgreSQL & MongoDB', 'Cloud DevOps & Docker'];
        experience = experience || 'Founder & Lead Architect';
      } else if (n.includes('manohar')) {
        photoUrl = photoUrl || '/images/team/manohar-kumar-singh.jpg';
        skills = (skills && skills.length > 0) ? skills : ['MERN Stack', 'Node.js & Express', 'Next.js 15 & React 19', 'PostgreSQL & MongoDB', 'REST & GraphQL APIs', 'Docker & Cloud CI/CD'];
        experience = experience || '3+ Years Exp';
      } else if (n.includes('divyam')) {
        photoUrl = photoUrl || '/images/team/divyam-yadav.jpg';
        skills = (skills && skills.length > 0) ? skills : ['Full-Stack Architecture', 'Go (Golang)', 'DevOps & CI/CD', 'Kubernetes & Docker', 'Cloud Systems (AWS/GCP)', 'Node.js & TypeScript', 'Microservices'];
        experience = experience || '6+ Years Exp';
      } else if (n.includes('ayush') && (n.includes('verma') || !n.includes('bansal'))) {
        photoUrl = photoUrl || '/images/team/ayush-verma.jpg';
        skills = (skills && skills.length > 0) ? skills : ['Frontend Architecture', 'React.js & Next.js', 'TypeScript', 'Node.js', 'PostgreSQL & MongoDB', 'Tailwind CSS', 'UI/UX Performance'];
        experience = experience || '4+ Years Exp';
      } else if (n.includes('bansal')) {
        photoUrl = photoUrl || '/images/team/ayush-bansal.jpg';
        skills = (skills && skills.length > 0) ? skills : ['AI & Machine Learning', 'Supervised ML', 'PL-300 Certified', 'Data Analytics & Power BI', 'Python & PyTorch', 'Data Pipelines'];
        experience = experience || '2.5+ Years Exp';
      } else if (n.includes('abhishek')) {
        photoUrl = photoUrl || '/images/team/abhishek-singh.jpg';
        skills = (skills && skills.length > 0) ? skills : ['.NET Core & C#', 'Angular', 'SQL Server & EF Core', 'Microservices', 'Enterprise Architecture', 'Cloud Solutions', 'RESTful APIs'];
        experience = experience || '5+ Years Exp';
      } else if (n.includes('harsh')) {
        photoUrl = photoUrl || '/images/team/harsh-yadav.jpg';
        skills = (skills && skills.length > 0) ? skills : ['Technical Sales', 'Client Strategy & Growth', 'Solution Scoping', 'Enterprise Partnerships', 'B2B Sales Strategy', 'Account Management'];
        experience = experience || '4+ Years Exp';
      } else if (n.includes('prachi')) {
        photoUrl = photoUrl || '/images/team/prachi-rathi.jpg';
        skills = (skills && skills.length > 0) ? skills : ['HR Operations', 'Tech Talent Acquisition', 'Engineer Onboarding', 'People & Culture', 'Employee Engagement'];
        experience = experience || '1.5+ Years Exp';
      } else if (n.includes('siddharth')) {
        photoUrl = photoUrl || '/images/team/siddharth-chaudhary.jpg';
        skills = (skills && skills.length > 0) ? skills : ['React Native', 'Flutter & Dart', 'iOS & Swift', 'Android & Kotlin', 'Mobile Architecture', 'App Store / Play Store CI/CD'];
        experience = experience || '4+ Years Exp';
      }

      return {
        id: row.id as string,
        name,
        role: row.role as string,
        bio: (row.bio as string | null) ?? null,
        photoUrl,
        linkedinUrl: null,
        skills,
        experience,
      };
    });

    // Ensure core members are included
    const result = [...mapped];
    DEFAULT_TEAM.forEach((def) => {
      if (!result.some((m) => m.name.toLowerCase().includes(def.name.toLowerCase().split(' ')[0]))) {
        result.push(def);
      }
    });

    return result;
  } catch (err) {
    console.error('[getTeamMembers] fallback', err);
    return DEFAULT_TEAM;
  }
}

export const getTeamMembers = unstable_cache(fetchTeamMembers, ['team-members'], {
  tags: ['team-members'],
  revalidate: 60,
  });
