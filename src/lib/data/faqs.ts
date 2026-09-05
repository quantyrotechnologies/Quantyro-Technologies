import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { FaqItem } from '@/components/FaqSection';

const DEFAULT_FAQS: Record<string, FaqItem[]> = {
  'service-website-development': [
    {
      q: 'Is SEO actually built into the site, or added on afterward?',
      a: 'Built in from the first sprint. Semantic HTML, clean heading hierarchy, self-referencing canonical tags, structured data, and Core Web Vitals budgets are part of the architecture decisions, not a checklist run before launch.',
    },
    {
      q: 'Which stack do you use — MERN, PHP/Laravel, or Next.js?',
      a: 'Whichever fits your actual constraints. We build MERN-stack applications, PHP/Laravel enterprise platforms, and Next.js/React sites regularly — the stack is chosen for your content model, team, and hosting needs, not a one-size-fits-all default.',
    },
    {
      q: 'Can you migrate an existing WordPress or legacy site without losing our search rankings?',
      a: 'Yes — this is a common project. We preserve URL structure or set up proper 301 redirects, keep metadata and structured data intact, and validate rankings post-migration rather than treating SEO preservation as an afterthought.',
    },
    {
      q: 'Do you handle both the design and the technical build?',
      a: 'Yes, end to end — from information architecture and UI design through to the technical build, deployment, and the on-page SEO foundation that makes the site actually rankable once it ships.',
    },
  ],
  'service-e-commerce': [
    {
      q: 'Do you build on Shopify Plus or custom headless stacks?',
      a: 'We build both. For brands wanting the operational familiarity of Shopify with maximum frontend speed, we engineer headless Next.js storefronts on Shopify Plus Storefront API. For specialized marketplaces, we build custom headless commerce on Medusa.js and PostgreSQL.',
    },
    {
      q: 'How do you prevent shopping cart abandonment on mobile?',
      a: 'By eliminating checkout latency. We implement 1-click Express Checkout (Apple Pay, Google Pay, Shop Pay), sub-second page transitions, and streamlined checkout accordions that boost conversion rates by 25-40%.',
    },
    {
      q: 'Can you integrate with our enterprise ERP, WMS, and inventory systems?',
      a: 'Yes. We build bidirectional real-time synchronization pipelines with SAP, NetSuite, Odoo, and custom warehouse management systems to ensure stock counts and order states are updated in milliseconds.',
    },
    {
      q: 'How do you ensure the store handles high traffic during flash sales?',
      a: 'We implement edge-computed caching, serverless checkout routing, and automated database read replicas that withstand 50,000+ concurrent shoppers with zero downtime or performance degradation.',
    },
  ],
  'service-ui-ux-design': [
    {
      q: 'What deliverables do we receive at the end of the UI/UX design phase?',
      a: 'You receive complete, clickable high-fidelity Figma prototypes, comprehensive design system tokens, responsive mobile/tablet/desktop layouts, and interactive developer handoff documentation with component state specifications.',
    },
    {
      q: 'Do your UI/UX designs comply with WCAG accessibility standards?',
      a: 'Yes. Every interface is designed to meet WCAG 2.1 AA and AAA standards, ensuring rigorous color contrast, keyboard navigable workflows, and screen-reader compatibility.',
    },
    {
      q: 'Can you redesign our existing web app without breaking user habits?',
      a: 'Yes. We conduct user telemetry audits, heatmapping analysis, and qualitative interviews to preserve high-frequency workflows while systematically fixing usability bottlenecks and elevating visual polish.',
    },
    {
      q: 'How do you ensure designs are realistically implementable in code?',
      a: 'Our product designers work directly alongside senior full-stack engineers. Every component is designed around real layout constraints (CSS Grid/Flexbox, Tailwind tokens) so the live product matches Figma 1:1.',
    },
  ],
  'service-cybersecurity-compliance': [
    {
      q: 'What is included in your VAPT (Vulnerability Assessment & Penetration Testing)?',
      a: 'Our certified ethical hackers conduct black-box and grey-box security testing across web applications, REST/GraphQL APIs, mobile apps, and cloud networks following OWASP Top 10 and SANS 25 methodologies.',
    },
    {
      q: 'Can you assist our startup in achieving SOC 2 Type II and HIPAA compliance?',
      a: 'Yes. We guide technical teams through the entire certification lifecycle: gap analysis, security policy drafting, automated CI/CD security scanning, cloud infrastructure hardening, and audit evidence collection.',
    },
    {
      q: 'Do you provide remediation assistance after identifying vulnerabilities?',
      a: 'Unlike audit-only agencies that hand you a PDF, our senior engineers write and deploy the actual remediation code patches, configuration hardening, and WAF rules to eliminate discovered vulnerabilities.',
    },
    {
      q: 'Do enterprise clients receive an official certificate of security clearance?',
      a: 'Yes. Upon successful remediation and re-testing, we issue a formal executive security assessment report and third-party clearance certificate suitable for enterprise procurement reviews and board audits.',
    },
  ],
  'service-seo-marketing': [
    {
      q: 'Is this technical SEO, content marketing, or both?',
      a: 'Both, but technical SEO is the foundation. We fix the architecture first — Core Web Vitals, crawlability, structured data, internal linking — then layer content and campaign work on top of a site that can actually rank.',
    },
    {
      q: 'Do you write the content, or just handle the technical side?',
      a: 'Both, depending on scope. We build the content architecture and information design (what pages should exist and why), and can produce the content itself or work alongside your existing content team.',
    },
    {
      q: 'How do you measure whether this is actually working?',
      a: 'Real analytics and attribution pipelines, not vanity metrics — organic traffic, keyword rankings, and conversion data tied back to actual business outcomes, reported against a baseline set at the start of the engagement.',
    },
    {
      q: 'Can you build programmatic SEO pages, like location or service pages at scale?',
      a: 'Yes — this is one of our core capabilities. We build templated, data-driven pages (by service, by region, by use case) that stay unique and genuinely useful rather than thin duplicate content.',
    },
  ],
  certifications: [
    {
      q: 'Are these certifications for the company or for individual engineers?',
      a: 'A mix of both — some are held at the organizational level, others by individual engineers on the team. Each card links through to the issuer so you can verify it directly rather than trust a badge on our site.',
    },
    {
      q: 'Why does certification matter for a software project?',
      a: 'It doesn’t replace a good portfolio, but it does verify baseline competency in specific standards — cloud architecture, security practices, or platform-specific expertise — which matters most on regulated or compliance-sensitive projects.',
    },
    {
      q: 'Do you pursue new certifications regularly?',
      a: 'Yes — the stack changes, and so do the certifications worth holding. We prioritize the ones directly relevant to the industries and platforms we build on.',
    },
  ],
  team: [
    {
      q: 'Will I actually work with the people shown on this page?',
      a: 'Yes — this page reflects the actual engineers and architects who take on client work, not a sales team fronting for outsourced juniors you never meet.',
    },
    {
      q: 'How do you assign engineers to a project?',
      a: 'Based on the actual technical shape of the work — a project heavy on AI/ML gets someone with that specific background, not whoever is available that week.',
    },
    {
      q: 'Do team members stay on a project for its full duration?',
      a: 'Yes, for continuity — swapping engineers mid-project is one of the most common reasons projects lose momentum, so we avoid it unless there’s a genuine reason (illness, scope change) to do otherwise.',
    },
  ],
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
  industries: [
    {
      q: 'Do you only work with the industries listed on this page?',
      a: 'No — these are the sectors where we have the deepest domain experience and compliance familiarity. We regularly take on projects outside this list; if your industry isn’t shown, tell us about it on the contact form.',
    },
    {
      q: 'How do you handle industry-specific compliance requirements?',
      a: 'Compliance is scoped during discovery, not bolted on afterward. For regulated sectors like FinTech and Healthcare, we design the data model, access control, and audit logging around the relevant standard (PCI-DSS, HIPAA, SOC 2) from the first sprint.',
    },
    {
      q: 'Can one project span multiple industries, like a fintech marketplace?',
      a: 'Yes. Most real projects blend patterns from two or three of these sectors — a healthcare marketplace needs both HIPAA compliance and e-commerce checkout flows, for example. We scope the actual requirements, not the label.',
    },
  ],
  'industry-banking-fintech': [
    {
      q: 'Can you build for a regulated financial institution, not just a startup?',
      a: 'Yes. We architect systems designed to pass PCI-DSS and SOC 2 audits, with access control, encryption, and audit logging built in from day one rather than retrofitted before a compliance review.',
    },
    {
      q: 'Do you integrate with existing core banking or payment infrastructure?',
      a: 'Yes — we regularly build on top of and modernize legacy core banking APIs, and integrate with major payment rails, card processors, and KYC/AML verification providers rather than replacing everything at once.',
    },
    {
      q: 'How do you approach fraud detection for high-transaction-volume platforms?',
      a: 'We build real-time risk-scoring pipelines that evaluate transactions as they happen, using rule-based checks combined with ML models trained on your transaction patterns, tuned to your actual fraud/false-positive tolerance.',
    },
  ],
  'industry-fitness-wellness': [
    {
      q: 'Can you integrate with wearables like Apple Watch, Fitbit, or Whoop?',
      a: 'Yes — we build against the major wearable and health APIs (HealthKit, Google Fit, Fitbit, Whoop, Oura) so activity data syncs into your platform without asking users to manually log anything.',
    },
    {
      q: 'How do you keep users engaged beyond the first few weeks?',
      a: 'Real personalization, not generic streak counters — adaptive workout and nutrition plans driven by actual user data, combined with live or on-demand coaching where it fits your product.',
    },
    {
      q: 'How is sensitive health data protected?',
      a: 'Encryption at rest and in transit, strict access control, and GDPR/HIPAA-aware data handling where applicable — health and biometric data gets the same treatment as financial data.',
    },
  ],
  'industry-taxi-ride-hailing': [
    {
      q: 'Can you build an Uber-style ride-hailing platform from scratch?',
      a: 'Yes — rider app, driver app, and dispatch/admin backend, with real-time GPS tracking, fare calculation, and payment processing as one connected system, not three separate builds.',
    },
    {
      q: 'How do you handle surge pricing and peak-demand load?',
      a: 'Dynamic fare engines that respond to real-time supply and demand, backed by infrastructure load-tested for peak-hour spikes so dispatch matching doesn’t slow down when demand does.',
    },
    {
      q: 'Can you integrate driver KYC and compliance checks?',
      a: 'Yes — automated driver onboarding with document verification and background-check integration, scoped to your operating region’s licensing requirements.',
    },
  ],
  'industry-education-edtech': [
    {
      q: 'Can you build both live classes and self-paced courses in one platform?',
      a: 'Yes — live video classrooms, on-demand content, and offline-capable modules can all live in one platform rather than forcing a choice between formats.',
    },
    {
      q: 'How do you handle data privacy for student users, including minors?',
      a: 'Age-appropriate data handling, parental consent flows where required, and strict access control on student records — privacy requirements are scoped in during discovery, not added later.',
    },
    {
      q: 'Can you integrate with our existing school or corporate LMS?',
      a: 'Yes, we integrate with existing LMS and school management systems rather than requiring a full migration, so you keep your institutional data where it already lives.',
    },
  ],
  'industry-dating-social': [
    {
      q: 'How do you handle identity verification and fake profiles?',
      a: 'Photo verification, identity checks, and automated fraud/bot detection are built into onboarding — trust and safety is treated as core product infrastructure, not a moderation afterthought.',
    },
    {
      q: 'Can you build real-time chat and video calling into the app?',
      a: 'Yes — real-time messaging and in-app video calling at scale, with the same infrastructure patterns we use for any high-concurrency real-time feature.',
    },
    {
      q: 'How does AI-powered matchmaking actually work?',
      a: 'Compatibility scoring based on the signals you actually have — stated preferences, behavior, and interaction patterns — tuned to your platform rather than a generic recommendation model.',
    },
  ],
  'industry-real-estate-proptech': [
    {
      q: 'Can you build virtual tours and AR/VR property walkthroughs?',
      a: 'Yes — 3D virtual tours and AR/VR walkthroughs integrated into the listing experience, so buyers can shortlist properties before ever scheduling a visit.',
    },
    {
      q: 'Do you integrate with MLS and other listing data providers?',
      a: 'Yes, we integrate with MLS feeds and third-party listing data sources so your platform stays current without manual re-entry.',
    },
    {
      q: 'Can you build lead and commission management for our agents?',
      a: 'Yes — lead tracking, commission calculation, and broker dashboards are common additions once the core listing and search experience is in place.',
    },
  ],
  'industry-ecommerce-retail': [
    {
      q: 'Can your platforms handle Black Friday-level traffic spikes?',
      a: 'That’s the design target, not an afterthought — headless architecture with edge caching, sub-second checkout, and load-tested inventory sync built to hold up under peak seasonal traffic.',
    },
    {
      q: 'Do you work with our existing ERP or inventory system?',
      a: 'Yes, we integrate with existing ERP, fulfillment, and inventory systems rather than requiring a full replacement — the goal is a connected storefront, not a rebuild of your back office.',
    },
    {
      q: 'Can you migrate us off a template platform like Shopify or WooCommerce?',
      a: 'Yes. We’ve migrated storefronts from templated platforms to headless architectures, and can also build headless on top of Shopify Plus if you want to keep it as the commerce backend.',
    },
  ],
  'industry-healthcare-telemedicine': [
    {
      q: 'Is everything you build HIPAA-compliant by default?',
      a: 'Compliance is designed in from the architecture stage — encrypted data at rest and in transit, strict access control, and full audit trails — rather than added as a checklist item before launch.',
    },
    {
      q: 'Can you integrate with our existing EHR system?',
      a: 'Yes. We work with HL7 and FHIR standards to connect new patient portals, telemedicine platforms, or clinical tools to existing electronic health record systems without forcing a data migration.',
    },
    {
      q: 'Do you have experience with remote patient monitoring and medical device data?',
      a: 'Yes — we build ingestion pipelines for IoT medical device telemetry, handling the volume and reliability requirements of continuous patient monitoring data.',
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

