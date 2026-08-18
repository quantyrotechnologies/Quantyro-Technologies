import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { FaqItem } from '@/components/FaqSection';

const DEFAULT_FAQS: Record<string, FaqItem[]> = {
  blog: [
    {
      q: 'How frequently does Quantyro publish engineering insights and technical case studies?',
      a: 'We publish in-depth architectural breakdowns, technical post-mortems, and technology evaluations bi-weekly. Every article is written by practicing software engineers and systems architects.',
    },
    {
      q: 'Can I submit a question or topic request for the engineering team to cover?',
      a: 'Yes! You can reach out via our contact page or leave a comment on any blog post with topics or architectural dilemmas you would like our team to break down.',
    },
    {
      q: 'Are the code examples and architectural patterns production-ready?',
      a: 'All architectural patterns, schemas, and benchmark numbers shared in our articles reflect real-world, battle-tested solutions deployed across enterprise and high-growth client environments.',
    },
  ],
  'blog-post': [
    {
      q: 'How do I implement these architectural recommendations in my existing codebase?',
      a: 'We recommend starting with an incremental proof-of-concept on a non-critical module, establishing automated regression guardrails, and gradually decoupling monolithic dependencies.',
    },
    {
      q: 'Can Quantyro assist our team in auditing or building this architecture?',
      a: 'Absolutely. We partner with ambitious companies to architect, build, and optimize high-concurrency web applications, AI integrations, and cloud infrastructure.',
    },
    {
      q: 'Where can I ask follow-up questions about this article?',
      a: 'You can submit your thoughts directly in the discussion section below or connect with our engineering leadership through our contact form.',
    },
  ],
};

async function fetchFaqs(pageSlug: string): Promise<FaqItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_FAQS[pageSlug] ?? DEFAULT_FAQS['blog-post'];
    }
    return data.map((row) => ({ q: row.question, a: row.answer }));
  } catch {
    return DEFAULT_FAQS[pageSlug] ?? DEFAULT_FAQS['blog-post'];
  }
}

export const getFaqs = unstable_cache(fetchFaqs, ['faqs'], {
  tags: ['faqs'],
  revalidate: 60,
});

