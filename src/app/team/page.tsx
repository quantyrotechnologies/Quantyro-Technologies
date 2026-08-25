import type { Metadata } from 'next';
import TeamContent from '@/components/TeamContent';
import { getTeamMembers } from '@/lib/data/team';
import { getFaqs } from '@/lib/data/faqs';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engineering Leadership & Senior Full-Stack Architects | Quantyro Technologies',
  description: 'Meet the senior software engineers, full-stack architects, and system builders behind Quantyro Technologies. Specialists in Next.js 15, MERN stack, Python, and cloud platforms.',
  alternates: { canonical: '/team' },
  keywords: [
    'Quantyro team',
    'Chirag Kumar software engineer',
    'Manohar Kumar Singh engineer',
    'Divyam Yadav DevOps full-stack architect',
    'Ayush Verma frontend full-stack engineer',
    'Abhishek Singh .NET Core Angular engineer',
    'Ayush Bansal AI ML engineer data analyst',
    'Harsh Yadav technical sales client strategy',
    'Prachi Rathi HR people operations',
    'Siddharth Chaudhary mobile app engineer Flutter React Native',
    'senior full-stack developers India',
    'MERN stack architects',
    'Golang DevOps engineers',
    'React Next.js TypeScript engineers',
    '.NET Core Angular enterprise architects',
    'mobile app developers iOS Android',
    'AI ML machine learning consultants',
    'B2B software sales consultants',
    'tech talent operations HR',
    'Next.js 15 engineers',
    'Python backend developers',
    'dedicated software development squad',
    'cloud architecture consultants',
  ],
  openGraph: {
    title: 'Engineering Leadership & Senior Architects | Quantyro Technologies',
    description: 'Meet the principal engineers and technical architects building high-scale web platforms, cloud microservices, and AI products.',
    url: `${SITE_URL}/team`,
    siteName: 'Quantyro Technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Leadership & Senior Architects | Quantyro Technologies',
    description: 'Direct collaboration with senior full-stack architects. Zero junior benches.',
  },
};

export default async function TeamPage() {
  const [team, faqs] = await Promise.all([
    getTeamMembers(),
    getFaqs('team'),
  ]);

  const teamJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/team/#profilepage`,
    url: `${SITE_URL}/team`,
    name: 'Quantyro Technologies Engineering Leadership',
    description: 'Principal software engineers, full-stack architects, and system builders.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: team.map((m, index) => ({
        '@type': 'Person',
        position: index + 1,
        name: m.name,
        jobTitle: m.role,
        description: m.bio || undefined,
        image: m.photoUrl ? `${SITE_URL}${m.photoUrl}` : undefined,
        worksFor: {
          '@type': 'Organization',
          name: 'Quantyro Technologies',
          url: SITE_URL,
        },
        knowsAbout: m.skills || ['Full-Stack Development', 'MERN Stack', 'Next.js', 'Software Architecture'],
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <TeamContent team={team} faqs={faqs} />
    </>
  );
}
