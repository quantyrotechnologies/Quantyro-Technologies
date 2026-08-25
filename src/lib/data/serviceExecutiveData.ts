export interface ExecutivePillar {
  title: string;
  desc: string;
  icon: 'shield' | 'zap' | 'code' | 'lock';
}

export interface ServiceExecutiveContent {
  headline: string;
  narrative: string[];
  pillars: ExecutivePillar[];
}

export const SERVICE_EXECUTIVE_DATA: Record<string, ServiceExecutiveContent> = {
  'website-development': {
    headline: 'High-Performance Web Architecture Engineered for Measurable Organic Pipeline & Revenue Growth',
    narrative: [
      'In today’s competitive B2B digital landscape, your website is your highest-value sales executive. Most standard agency websites suffer from bloated client-side JavaScript, fragile CMS plugins, and poor Core Web Vitals that actively penalize search rankings and inflate visitor bounce rates. Quantyro engineers websites as mission-critical digital infrastructure — combining server-side rendering (SSR), edge caching, and semantic HTML architecture to deliver sub-second Largest Contentful Paint (LCP) and 95+ Google Lighthouse scores across all viewports.',
      'From custom MERN-stack web portals and modern Next.js 15 platforms to high-scale PHP & Laravel enterprise applications, every project is built from ground zero by senior software engineers. We implement strict TypeScript type-safety, automated CI/CD deployment pipelines, and structured schema markup (JSON-LD) directly into the code. This ensures seamless search engine indexing, instant crawl budget discovery, and top-tier ranking potential for high-intent commercial keywords.',
      'Our client-first engagement model guarantees total transparency: you receive 100% intellectual property ownership, zero vendor lock-in, complete git repositories, and production-tested code designed to scale without costly rewrites.',
    ],
    pillars: [
      {
        title: '100% IP & Source Ownership',
        desc: 'Complete transfer of all git repositories, documentation, and infrastructure keys upon launch.',
        icon: 'shield',
      },
      {
        title: 'Sub-Second Performance SLA',
        desc: 'Guaranteed <0.8s TTFB and 95+ Core Web Vitals for optimal Google search indexing.',
        icon: 'zap',
      },
      {
        title: 'Senior-Led Engineering',
        desc: 'Direct collaboration with senior full-stack architects — zero junior outsourcing.',
        icon: 'code',
      },
      {
        title: 'OWASP Security Hardened',
        desc: 'Sanitized inputs, strict CSP headers, and bank-grade data security protocols.',
        icon: 'lock',
      },
    ],
  },
  'e-commerce': {
    headline: 'Composable Headless Commerce Engineered for Sub-Second Checkout & High Peak Conversions',
    narrative: [
      'Modern digital commerce brands cannot afford slow checkout funnels, monolithic CMS constraints, or server crashes during high-traffic flash sales. Quantyro delivers composable headless e-commerce platforms using Next.js 15, Shopify Plus APIs, and Medusa.js backend engines. By decoupling the frontend presentation layer from backend transaction logic, we achieve instantaneous page loads, ultra-smooth product navigation, and checkout conversion rate lifts of 25% to 40%.',
      'Our engineering team integrates real-time inventory synchronization with enterprise ERPs (SAP, NetSuite, Odoo), automated multi-currency localization, and sub-millisecond payment routing via Stripe and custom payment gateways. We implement edge-computed caching and automated database read replicas to guarantee 99.99% uptime, even during Black Friday and seasonal traffic spikes with tens of thousands of concurrent checkouts.',
      'We build your commerce store for compounding organic search traffic with automated product schema, dynamic breadcrumbs, and ultra-fast mobile rendering that satisfies every Google shopping crawler requirement.',
    ],
    pillars: [
      {
        title: 'Zero Cart Friction',
        desc: 'Instant 1-click checkout workflows optimized for maximum average order value (AOV).',
        icon: 'zap',
      },
      {
        title: 'Peak Traffic Resilience',
        desc: 'Engineered to withstand 50,000+ concurrent users with zero downtime or transaction lag.',
        icon: 'shield',
      },
      {
        title: 'Omnichannel ERP Sync',
        desc: 'Bi-directional real-time inventory, pricing, and fulfillment data automation.',
        icon: 'code',
      },
      {
        title: 'Google Shopping SEO',
        desc: 'Full Product, AggregateRating, and Offer structured data for rich SERP snippets.',
        icon: 'lock',
      },
    ],
  },
  'mobile-apps': {
    headline: 'Native & Cross-Platform Mobile Engineering Built for 60fps Performance & High Retention',
    narrative: [
      'Delivering a five-star mobile application requires more than just responsive screens — it demands rock-solid offline synchronization, battery-efficient background processes, and buttery-smooth 60fps native performance. Quantyro builds enterprise and consumer mobile applications using React Native and Flutter, supplemented with native Swift (iOS) and Kotlin (Android) modules where hardware-level acceleration is essential.',
      'Our mobile architecture incorporates local-first SQLite and WatermelonDB storage with conflict-free replicated data types (CRDTs), ensuring users can complete critical tasks without active network connectivity. Every mobile build undergoes automated unit, integration, and UI regression tests across real physical devices via cloud test farms before hitting the Apple App Store or Google Play Store.',
      'We provide complete automated Fastlane CI/CD release pipelines, zero-rejection app review compliance, and end-to-end analytics instrumentation for deep user lifecycle tracking.',
    ],
    pillars: [
      {
        title: '60fps Native Experience',
        desc: 'Hardware-accelerated animations and gesture handling with zero UI stutter.',
        icon: 'zap',
      },
      {
        title: 'Offline-First Sync Engine',
        desc: 'Deterministic background sync that preserves user data across intermittent connectivity.',
        icon: 'shield',
      },
      {
        title: 'Store Compliance Guarantee',
        desc: '100% adherence to Apple Human Interface & Google Material Guidelines for instant approval.',
        icon: 'code',
      },
      {
        title: 'Biometric & Keychain Security',
        desc: 'Hardware-level FaceID/Fingerprint auth with encrypted local SQLite storage.',
        icon: 'lock',
      },
    ],
  },
  'custom-software': {
    headline: 'Bespoke Enterprise Software & Scalable Multi-Tenant SaaS Product Architecture',
    narrative: [
      'Off-the-shelf software and bloated legacy platforms restrict business agility, inflate operational costs, and introduce severe security vulnerabilities. Quantyro designs and engineers custom software solutions, multi-tenant SaaS platforms, and distributed microservices tailored to your exact business operations and compliance mandates.',
      'Our architects build high-concurrency backends using Node.js, Go, PostgreSQL, and Redis, connected through low-latency gRPC and GraphQL API gateways. We decouple complex business workflows with asynchronous event streaming (Apache Kafka and RabbitMQ), allowing individual services to scale independently while maintaining complete data consistency and sub-100ms response times.',
      'With automated blue/green zero-downtime deployment pipelines, strict role-based access control (RBAC), and automated database backups, your enterprise software remains secure, auditable, and ready for high-velocity feature releases.',
    ],
    pillars: [
      {
        title: 'Modular Microservices',
        desc: 'Decoupled services that eliminate single points of failure and scale independently.',
        icon: 'code',
      },
      {
        title: 'Enterprise Multi-Tenancy',
        desc: 'Isolated tenant data partitions with granular role-based security policies.',
        icon: 'lock',
      },
      {
        title: 'High-Concurrency Scale',
        desc: 'Engineered to process millions of API requests daily with sub-100ms latency.',
        icon: 'zap',
      },
      {
        title: 'Zero Vendor Lock-In',
        desc: 'Open-source enterprise tech stack running on your private AWS or GCP cloud accounts.',
        icon: 'shield',
      },
    ],
  },
  'ai-machine-learning': {
    headline: 'Production-Grade Enterprise AI, RAG Systems & Autonomous Multi-Agent Workflows',
    narrative: [
      'Moving AI from prototype to production requires rigorous data security, deterministic response accuracy, and zero proprietary data leakage. Quantyro develops custom enterprise AI architectures, advanced Retrieval-Augmented Generation (RAG) pipelines, and autonomous multi-agent systems grounded strictly in your proprietary corporate data.',
      'We combine hybrid dense-sparse vector indexing (Pinecone, Qdrant, Milvus) with semantic reranking and automated context chunking to achieve 98%+ retrieval precision. For sensitive enterprise workflows, we deploy self-hosted open-source foundation models (Llama 3, Mistral) on private VPC instances using vLLM and TensorRT-LLM, ensuring your sensitive customer and operational data never touches third-party public AI APIs.',
      'Every AI solution is equipped with real-time observability, guardrail toxicity filtering, and automated regression evaluations to prevent hallucinations and maintain audit-compliant governance.',
    ],
    pillars: [
      {
        title: 'Zero Data Leakage',
        desc: 'Private enterprise knowledge enclaves deployed entirely within your secure VPC cloud.',
        icon: 'lock',
      },
      {
        title: 'Deterministic RAG Accuracy',
        desc: 'Hybrid vector search with semantic rerankers eliminating AI hallucinations.',
        icon: 'shield',
      },
      {
        title: 'Autonomous Agent Workflows',
        desc: 'Multi-agent systems with tool-calling capabilities that automate complex business tasks.',
        icon: 'zap',
      },
      {
        title: 'Cost-Optimized Inference',
        desc: 'Quantized self-hosted LLMs reducing monthly token inference costs by up to 70%.',
        icon: 'code',
      },
    ],
  },
  'seo-marketing': {
    headline: 'Engineer-Led Technical SEO & Programmatic Search Architecture for Compounding Traffic',
    narrative: [
      'Traditional marketing agencies rely on guesswork and superficial content tweaks. Quantyro treats SEO as a core engineering discipline — architecting programmatic page engines, automated Schema.org entity graphs, and performance optimizations that capture high-intent commercial search volume at scale.',
      'We perform deep technical audits to eliminate crawl budget waste, resolve indexing canonicalization issues, and optimize server-side rendering pipelines for Google’s web crawlers. Our programmatic SEO frameworks enable high-growth businesses to dynamically deploy thousands of high-quality, localized, and intent-targeted landing pages without duplicate content penalties.',
      'Combined with server-side Google Analytics 4 (GA4) instrumentation and multi-touch conversion attribution, we give marketing and executive leadership clear visibility into organic revenue generation and customer acquisition cost (CAC) reduction.',
    ],
    pillars: [
      {
        title: 'Programmatic Scale',
        desc: 'Engineered architecture generating thousands of ranking landing pages dynamically.',
        icon: 'code',
      },
      {
        title: 'Core Web Vitals Mastery',
        desc: '95+ Lighthouse performance scores guaranteeing Google ranking crawl preference.',
        icon: 'zap',
      },
      {
        title: 'Entity Graph Schema',
        desc: 'Deep JSON-LD structured data mapping your brand to Google Knowledge Graph entities.',
        icon: 'shield',
      },
      {
        title: 'Server-Side Attribution',
        desc: 'Accurate ad-blocker resilient conversion tracking with server-to-server GA4 pipelines.',
        icon: 'lock',
      },
    ],
  },
  'cloud-devops': {
    headline: 'Multi-Region Cloud Architecture, Kubernetes Orchestration & Automated CI/CD Pipelines',
    narrative: [
      'Scaling modern digital applications demands resilient, self-healing cloud infrastructure that eliminates manual deployments and prevents costly service outages. Quantyro architects multi-cloud AWS and Google Cloud environments using Terraform and OpenTofu Infrastructure-as-Code (IaC), establishing deterministic, version-controlled cloud environments.',
      'We design and manage production Kubernetes (EKS, GKE) clusters with automated horizontal pod autoscaling, zero-trust network microsegmentation, and automated blue/green canary deployments via ArgoCD. Our observability pipelines integrate Datadog, Prometheus, and OpenTelemetry for real-time distributed tracing, automated anomaly alerting, and self-healing infrastructure recovery.',
      'Our cloud optimization engineers audit existing architectures to eliminate idle compute resources, rightsizing instances and database clusters to slash monthly AWS/GCP bills by 30% to 50% without sacrificing performance.',
    ],
    pillars: [
      {
        title: '99.99% Availability SLA',
        desc: 'Multi-availability zone failover architecture engineered for zero maintenance downtime.',
        icon: 'shield',
      },
      {
        title: '30-50% Cloud Cost Cut',
        desc: 'Aggressive infrastructure rightsizing, spot instance orchestration, and reserved capacity.',
        icon: 'zap',
      },
      {
        title: 'GitOps CI/CD Automation',
        desc: 'Automated test suites, security scans, and instant canary rollbacks on every push.',
        icon: 'code',
      },
      {
        title: 'SOC 2 & ISO Hardened',
        desc: 'Immutable infrastructure manifests with zero-trust networking and encrypted data at rest.',
        icon: 'lock',
      },
    ],
  },
};
