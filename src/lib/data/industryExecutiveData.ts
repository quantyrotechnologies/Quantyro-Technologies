export interface IndustryExecutiveData {
  headline: string;
  narrative: string[];
  pillars: {
    title: string;
    desc: string;
    icon: 'shield' | 'zap' | 'code' | 'lock';
  }[];
}

export const INDUSTRY_EXECUTIVE_DATA: Record<string, IndustryExecutiveData> = {
  'banking-fintech': {
    headline: 'High-Concurrency Financial Systems Engineered for Regulatory Compliance & Sub-Second Settlement',
    narrative: [
      'Regulated financial institutions, neobanks, and payment gateways operate in high-stakes environments where transaction latency, data consistency, and regulatory compliance directly dictate market survival. Legacy core banking mainframes and brittle middleware obstruct rapid product delivery, inflating operational overhead and exposing institutions to severe systemic risk. Quantyro architects modern, decoupled FinTech platforms with automated ACID-compliant transaction pipelines, ISO 20022 messaging, and real-time ledger consistency.',
      'Our financial engineering practice integrates biometrics, real-time AI fraud detection scoring, and open-banking APIs with automated PCI-DSS Level 1 and SOC 2 Type II compliance controls. We implement low-latency event-driven microservices via Apache Kafka and distributed database replication, guaranteeing zero data loss, automated failover, and sub-100ms API response times across global payment gateways.',
      'We provide regulated financial enterprises with complete intellectual property ownership, auditable git repositories, deterministic cryptographic key management, and zero vendor lock-in.',
    ],
    pillars: [
      {
        title: 'PCI-DSS & SOC 2 Hardened',
        desc: 'End-to-end payload encryption, tokenized cardholder enclaves, and continuous audit logging.',
        icon: 'lock',
      },
      {
        title: 'Sub-100ms Payment Routing',
        desc: 'Smart multi-gateway failover routing with real-time settlement reconciliation.',
        icon: 'zap',
      },
      {
        title: 'AI-Powered Fraud Scoring',
        desc: 'Machine learning heuristics scoring transaction anomalies in sub-12 milliseconds.',
        icon: 'shield',
      },
      {
        title: 'Open Banking & ISO 20022',
        desc: 'Standardized REST/gRPC API bridges connecting legacy cores to modern neobanking apps.',
        icon: 'code',
      },
    ],
  },
  'fitness-wellness': {
    headline: 'Connected Digital Health & Fitness Ecosystems Engineered for Compounding User Retention',
    narrative: [
      'The consumer fitness and digital wellness market has shifted from basic workout logging to hyper-personalized, sensor-driven daily engagement. Fitness brands and wellness platforms face steep early-user churn when apps lack automated device synchronization, real-time feedback, and dynamic habit-forming loops. Quantyro builds high-retention digital fitness platforms combining native mobile experiences with wearable IoT telemetry and adaptive AI workout generation.',
      'We engineer bidirectional real-time synchronization with Apple HealthKit, Google Fit/Health Connect, Garmin, and custom BLE (Bluetooth Low Energy) hardware. Our cloud backend processes high-throughput biometric time-series data (heart rate zones, HRV, cadence, sleep metrics) to deliver dynamic coaching recommendations, algorithmic leaderboard updates, and low-latency interactive video streaming.',
      'Every platform includes automated subscription monetization, recurring in-app billing engines, and strict GDPR/HIPAA-compliant biometric data anonymization protocols.',
    ],
    pillars: [
      {
        title: 'Real-Time Wearable Telemetry',
        desc: 'Sub-second BLE sensor pairing and bidirectional HealthKit/Google Fit sync.',
        icon: 'zap',
      },
      {
        title: 'Adaptive AI Personalization',
        desc: 'Dynamic workout and recovery recommendations tailored to live biometric stress scores.',
        icon: 'shield',
      },
      {
        title: 'Gamified Retention Architecture',
        desc: 'Social challenges, live interactive leaderboards, and streak preservation algorithms.',
        icon: 'code',
      },
      {
        title: 'Biometric Privacy Vault',
        desc: 'Zero-knowledge biometric storage with granular user-consent telemetry controls.',
        icon: 'lock',
      },
    ],
  },
  'taxi-ride-hailing': {
    headline: 'High-Concurrency Dispatch & Telematics Engines Built for Extreme Urban Fleet Scale',
    narrative: [
      'On-demand transportation and urban mobility platforms live and die by dispatch efficiency, GPS tracking precision, and dynamic pricing responsiveness. Inefficient matching algorithms increase deadhead miles, frustrate drivers, and elevate rider cancellation rates. Quantyro develops enterprise-grade ride-hailing platforms, dispatch algorithms, and telematics systems designed to manage tens of thousands of concurrent active trips with zero latency degradation.',
      'Our geospatial engineering team utilizes low-latency WebSocket protocols, map-matching heuristics, and custom route-matrix computation to achieve sub-second driver-to-rider dispatching and pinpoint ETA accuracy. We build automated surge pricing algorithms that respond dynamically to local demand density, traffic telemetry, and weather conditions in real time.',
      'From automated driver KYC verification and digital wallet payouts to in-app SOS geofence monitoring, we engineer complete operational ecosystems for fleet owners, city transport operators, and mobility startups.',
    ],
    pillars: [
      {
        title: 'Sub-Second Dispatch Matching',
        desc: 'Geospatial indexing (H3/S2) and Hungarian algorithm matching for minimal pickup delay.',
        icon: 'zap',
      },
      {
        title: 'Real-Time Telemetry & Tracking',
        desc: 'High-frequency GPS point smoothing with sub-200ms WebSocket location broadcasts.',
        icon: 'code',
      },
      {
        title: 'Dynamic Surge & Fare Engines',
        desc: 'Algorithmic demand balancing maximizing fleet utilization and operator margins.',
        icon: 'shield',
      },
      {
        title: 'Safety & Geofenced Telemetry',
        desc: 'Automated route-deviation alerts, driver shift fatigue monitoring, and emergency SOS.',
        icon: 'lock',
      },
    ],
  },
  'education-edtech': {
    headline: 'Scalable E-Learning Platforms & AI Tutoring Systems Built for Measurable Educational Outcomes',
    narrative: [
      'Digital education has evolved far beyond static video courses and generic PDF downloads. High-performing EdTech companies and corporate learning teams require interactive, competency-based learning environments that sustain student attention, adapt to individual learning paces, and provide verifiable skill certification. Quantyro develops custom LMS platforms, virtual classroom infrastructure, and generative AI tutoring systems engineered for scale.',
      'We build low-latency WebRTC live classrooms with collaborative whiteboarding, synchronized playback, and automated session recording pipelines. Our adaptive learning engines utilize knowledge-graph representations to pinpoint student comprehension gaps, dynamically serving tailored practice problems and AI-driven conversational explanations in real time.',
      'We ensure seamless integration with enterprise SCORM, xAPI, and LTI standards, accompanied by institutional multi-tenant administration, automated grading pipelines, and COPPA/FERPA student privacy compliance.',
    ],
    pillars: [
      {
        title: 'Adaptive Knowledge Graphs',
        desc: 'AI-driven diagnostic testing dynamically mapping learning paths to student mastery.',
        icon: 'code',
      },
      {
        title: 'Low-Latency Virtual Classrooms',
        desc: 'Scalable WebRTC interactive video with synchronized collaborative whiteboards.',
        icon: 'zap',
      },
      {
        title: 'COPPA & FERPA Compliant',
        desc: 'Strict student data safeguards, role-based access control, and anonymized analytics.',
        icon: 'lock',
      },
      {
        title: 'Enterprise LMS Interoperability',
        desc: 'Seamless compatibility with SCORM, xAPI, Canvas, Blackboard, and Google Classroom.',
        icon: 'shield',
      },
    ],
  },
  'dating-social': {
    headline: 'High-Trust Social Discovery & Matchmaking Architectures Built for Real-Time Community Scale',
    narrative: [
      'Modern social discovery and dating applications require a delicate balance between algorithmic matchmaking precision, low-latency communication infrastructure, and uncompromising user safety. Platforms that fail to control fake profiles, spam bots, and toxic interactions experience rapid user erosion. Quantyro designs and engineers viral, high-trust dating and social platforms with real-time video, chat, and AI-driven safety moderation.',
      'Our engineers implement multi-dimensional compatibility scoring algorithms combining user preference vectors with behavioral affinity signals. We build real-time WebRTC audio/video chat, instant messaging with message queuing (MQTT/WebSockets), and automated liveness verification using on-device biometric facial matching.',
      'We embed automated computer vision and natural language moderation models that intercept malicious content, spam, and policy violations in real time before they reach end-user feeds.',
    ],
    pillars: [
      {
        title: 'Vector-Based Matchmaking',
        desc: 'AI preference matching calculating compatibility scores across millions of profiles in milliseconds.',
        icon: 'zap',
      },
      {
        title: 'Biometric Profile Verification',
        desc: 'Automated 3D selfie liveness checks and verified identity badges eliminating catfish bots.',
        icon: 'lock',
      },
      {
        title: 'Real-Time Edge Moderation',
        desc: 'Multimodal AI scanning text, images, and video streams to intercept harassment instantly.',
        icon: 'shield',
      },
      {
        title: 'Low-Latency WebRTC & Chat',
        desc: 'Global edge-routed audio/video calls with instant push notifications and presence sync.',
        icon: 'code',
      },
    ],
  },
  'ecommerce-retail': {
    headline: 'Composable Headless Commerce Architectures Built to Dominate Peak Traffic & Maximize LTV',
    narrative: [
      'In high-volume digital retail, seconds of delay translate into millions in lost revenue and elevated customer acquisition costs. Monolithic legacy e-commerce platforms throttle page speed, complicate multichannel selling, and crash under the intense concurrency of flash sales and holiday promotions. Quantyro engineers composable headless commerce architectures that decouple storefront UI from backend transactional systems for unmatched speed and agility.',
      'We leverage Next.js 15 SSR with edge caching, automated ERP inventory synchronization (SAP, NetSuite, Microsoft Dynamics), and intelligent search engines (Algolia, Meilisearch) to deliver instantaneous catalog discovery. Our checkout architectures support multi-currency localized routing, one-click checkout, and dynamic tax calculation across global jurisdictions.',
      'Every retail build is engineered for maximum organic search dominance, featuring automated JSON-LD product schema, dynamic category breadcrumbs, and ultra-fast Core Web Vitals.',
    ],
    pillars: [
      {
        title: 'Flash-Sale Peak Concurrency',
        desc: 'Elastic autoscaling and Redis caching withstanding 50,000+ concurrent checkout requests.',
        icon: 'zap',
      },
      {
        title: 'Omnichannel ERP Integration',
        desc: 'Bi-directional real-time inventory and order sync with SAP, NetSuite, and warehouse WMS.',
        icon: 'code',
      },
      {
        title: 'Sub-Second Global Checkout',
        desc: 'Frictionless one-click payment flows reducing checkout abandonment by up to 35%.',
        icon: 'shield',
      },
      {
        title: 'PCI-DSS Tokenized Security',
        desc: 'Zero-touch payment data storage with strict CSP headers and fraud protection guardrails.',
        icon: 'lock',
      },
    ],
  },
  'real-estate-proptech': {
    headline: 'Immersive Real Estate & PropTech Platforms Engineered for Frictionless Property Transactions',
    narrative: [
      'The modern real estate consumer expects instantaneous search filters, interactive 3D virtual walkthroughs, and seamless digital transaction capabilities before ever setting foot on a property. Traditional brokerages and listing portals reliant on fragmented spreadsheets and outdated MLS feeds lose high-value buyers to agile digital platforms. Quantyro develops custom PropTech ecosystems, listing portals, and brokerage operations software.',
      'We engineer automated MLS / IDX / RETS data ingestion pipelines with automated deduplication, spatial GIS mapping, and AI-driven property recommendation algorithms. Our interactive 3D virtual tour viewers and augmented reality walkthroughs enable remote buyers to inspect properties with photorealistic precision on mobile and desktop.',
      'Our platforms integrate digital document management, automated escrow workflows, e-signature signing, and CRM lead distribution for top-performing brokerage teams.',
    ],
    pillars: [
      {
        title: 'Real-Time MLS / IDX Ingestion',
        desc: 'High-frequency listing normalization, automated duplicate removal, and spatial geocoding.',
        icon: 'code',
      },
      {
        title: 'Interactive 3D / AR Tours',
        desc: 'WebGL and WebXR virtual property walkthroughs loading instantaneously without plugins.',
        icon: 'zap',
      },
      {
        title: 'Predictive Property Valuation',
        desc: 'Machine learning valuation models analyzing historical comps, zoning, and neighborhood trends.',
        icon: 'shield',
      },
      {
        title: 'Encrypted Digital Closings',
        desc: 'Secure e-signature workflows, KYC verification, and encrypted document audit trails.',
        icon: 'lock',
      },
    ],
  },
  'healthcare-telemedicine': {
    headline: 'HIPAA-Aware Telemedicine & Healthcare Systems Engineered for Zero-Trust Clinical Reliability',
    narrative: [
      'Healthcare technology demands absolute data confidentiality, zero system downtime, and frictionless interoperability across clinical workflows. Fragmented Electronic Health Records (EHRs), insecure communication channels, and compliance oversights create severe clinical bottlenecks and substantial regulatory liabilities. Quantyro architects HIPAA-aware telemedicine platforms, clinical portals, and Remote Patient Monitoring (RPM) systems.',
      'Our clinical software engineering practice implements strict HL7/FHIR standards for bidirectional data exchange with Epic, Cerner, and Athenahealth. We deploy end-to-end encrypted WebRTC audio/video consultation pipelines, automated e-prescriptions (SureScripts), and Bluetooth medical IoT device integrations (pulse oximeters, blood pressure monitors, glucose meters).',
      'Every healthcare solution is architected with zero-trust network microsegmentation, granular role-based clinical access controls, and automated HIPAA audit logging.',
    ],
    pillars: [
      {
        title: 'HIPAA & HITRUST Hardened',
        desc: 'AES-256 clinical data encryption at rest and in transit with comprehensive immutable audit logs.',
        icon: 'lock',
      },
      {
        title: 'HL7 & FHIR Interoperability',
        desc: 'Standardized EHR data bridges seamlessly syncing patient records with Epic and Cerner.',
        icon: 'code',
      },
      {
        title: 'Encrypted Telehealth Consults',
        desc: 'Zero-latency WebRTC video rooms with end-to-end encryption and in-call clinical note capture.',
        icon: 'zap',
      },
      {
        title: 'Medical IoT Remote Telemetry',
        desc: 'Automated RPM device ingestion with real-time anomaly alerting for clinical response teams.',
        icon: 'shield',
      },
    ],
  },
};
