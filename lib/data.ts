import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'mohammedsuhail100506@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Mohammed, I am reaching out to you because...',

    upworkProfile: 'https://www.linkedin.com/in/mohammed-suhail-m-52a847333/',
    cvDownload: 'https://drive.google.com/drive/folders/17TGon_uR1B3zIvBTCK2iaU8BfDUTw7Cf?usp=drive_link',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/suhail100506' },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/mohammed-suhail-m-52a847333/',
    },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'React.js',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'HTML5',
            icon: '/logo/html5.svg',
        },
        {
            name: 'CSS',
            icon: '/logo/css.svg',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
        {
            name: 'REST APIs',
            icon: '/logo/js.png',
        },
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'JWT',
            icon: '/logo/jwt.svg',
        },
    ],
    database: [
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'GitHub',
            icon: '/logo/github.png',
        },
        {
            name: 'VS Code',
            icon: '/logo/vscode.svg',
        },
        {
            name: 'Postman',
            icon: '/logo/postman.svg',
        },
        {
            name: 'Cloudinary',
            icon: '/logo/cloudinary.svg',
        },
        {
            name: 'npm',
            icon: '/logo/npm.svg',
        },
        {
            name: 'Vercel',
            icon: '/logo/vercel.svg',
        },
        {
            name: 'Render',
            icon: '/logo/render.svg',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'SkillBridge AI',
        slug: 'skillbridge-ai',
        liveUrl: 'https://github.com/suhail100506',
        sourceCode: 'https://github.com/suhail100506/SkillBridge-AI',
        year: 2026,
        description: `
  <strong>Problem:</strong> College students and fresh graduates lack clear paths to identify their skill gaps, direct roadmaps to learn them, and mock interview practice to prepare for recruitment.<br/><br/>

  <strong>Solution:</strong> Developed SkillBridge AI, an AI-powered career platform that bridges quality education and decent work. Features include resume parsing, customized learning roadmaps, AI-conducted mock interviews, and automated job recommendations.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>📄 <strong>Resume Parsing & Gap Analysis:</strong> Extract resume details using pdf-parse to map skill gaps against target roles.</li>
    <li>🛣️ <strong>Personalized Learning Roadmaps:</strong> Generate step-by-step milestones with estimation hours, progress trackers, and note-saving.</li>
    <li>🎙️ <strong>Mock Interview Engine:</strong> Conduct custom technical/behavioral mock sessions with AI feedback, confidence scoring, and accordion transcript reviews.</li>
    <li>📱 <strong>React Native & Expo App:</strong> Shared logic monorepo serving both Next.js web dashboard and cross-platform mobile app.</li>
  </ul>
`,
        role: `
  <strong>Lead Full-Stack AI Engineer (HackHazards 2026)</strong><br/>
  Designed the system flow, LLM integrations, and backend routing:<br/>
  <ul>
    <li>⚙️ Programmed Node.js/Express.js endpoints for mock interviews and roadmap generators powered by Claude API.</li>
    <li>💻 Developed the React.js client interface utilizing Vite, Tailwind CSS, Framer Motion, and shadcn/ui.</li>
    <li>📱 Formulated monorepo components for the Expo mobile app client.</li>
    <li>📂 Styled MongoDB database schemas using Mongoose for user tracking and feedback threads.</li>
  </ul>
`,
        techStack: [
            'React',
            'React Native',
            'Expo',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Claude API',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/thumbnail/skillbridge_thumb.png',
        longThumbnail: '/projects/long/skillbridge_thumb.png',
        images: [
            '/projects/images/skillbridge1.png',
            '/projects/images/skillbridge2.png',
            '/projects/images/skillbridge3.png',
            '/projects/images/skillbridge4.png',
            '/projects/images/skillbridge5.png',
        ],
    },
    {
        title: 'Sattrack - Satellite Tracker',
        slug: 'sattrack-satellite-tracker',
        liveUrl: 'https://github.com/suhail100506',
        sourceCode: 'https://github.com/suhail100506/Sattrack',
        year: 2026,
        description: `
  <strong>Problem:</strong> Tracking satellite orbital movements and predicting their localized visibility windows requires real-time computations of elevation, azimuth, and pass intervals.<br/><br/>

  <strong>Solution:</strong> Developed Sattrack, an end-to-end tracking system featuring a Python Flask backend visibility engine using orbital models and sample TLE datasets, integrated with a React Native Expo mobile application that renders satellite coordinate passes, elevations, and altitude schedules.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>🛰️ <strong>Orbit Visibility Engine:</strong> Computes real-time elevation, azimuth, range, altitude, and sub-point coordinates.</li>
    <li>📱 <strong>React Native Mobile Client:</strong> Premium Expo-based mobile interface with horizontal slider details, gesture overlays, and visible coordinate lists.</li>
    <li>⚙️ <strong>Flask REST Backend:</strong> Real-time REST endpoints serving visibility analysis for observer locations.</li>
  </ul>
`,
        role: `
  <strong>Full-Stack Systems & Mobile Developer</strong><br/>
  Designed and developed the prediction backend and cross-platform mobile app:<br/>
  <ul>
    <li>⚙️ Built the Flask backend engine to calculate local visibility passes and orbital stats.</li>
    <li>📱 Developed the React Native client with Expo, implementing custom detail sheet animations and route navigation.</li>
    <li>📊 Structured TLE parsing models to query current position parameters for satellite tracking.</li>
  </ul>
`,
        techStack: [
            'React Native',
            'Expo',
            'Flask',
            'Python',
            'TypeScript',
            'REST API',
        ],
        thumbnail: '/projects/thumbnail/sattrack_logo.png',
        longThumbnail: '/projects/long/sattrack_logo.png',
        images: [
            '/projects/images/sattrack1.png',
            '/projects/images/sattrack2.png',
        ],
    },
    {
        title: 'KMG Training Management System',
        slug: 'kmg-training-management-system',
        liveUrl: 'https://github.com/suhail100506',
        sourceCode: 'https://github.com/suhail100506/Kmg-training-management-system',
        year: 2026,
        description: `
  <strong>Problem:</strong> Administrative departments at CDOT required a centralized, secure system to manage training allocations, track staff course rosters, and audit user activity across multiple departments.<br/><br/>

  <strong>Solution:</strong> Engineered KMG, a training management system with React, Vite, Node.js, and Express, offering role-based access control (RBAC), master data controls, monthly/quarterly reports, and bulk Excel roster uploads.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>📊 <strong>Analytics Dashboard:</strong> Aggregated training stats, cost breakdowns, and active roster visualizations.</li>
    <li>🔐 <strong>Role-Based Access Control (RBAC):</strong> Granular permissions for Super Admin, Admin, and User roles.</li>
    <li>📂 <strong>Bulk Import Engine:</strong> Parse and import multi-row Excel spreadsheets containing staff records.</li>
    <li>📈 <strong>Reports Generator:</strong> Generates cost analysis, department-wise, quarterly, and financial-year reports.</li>
    <li>🛡️ <strong>System Audit Log:</strong> Logs administrative changes and database updates for complete system trace.</li>
  </ul>
`,
        role: `
  <strong>Full-Stack Development Intern (C-DOT)</strong><br/>
  Implemented the core UI structure, bulk-uploader engine, and report APIs:<br/>
  <ul>
    <li>🛠️ Built Express.js backend endpoints for training records, user lists, settings, and audit trails.</li>
    <li>💻 Developed a responsive dashboard client in React using Tailwind CSS and Vite.</li>
    <li>📂 Created Excel bulk-upload parsing endpoints for automated database migrations.</li>
    <li>📊 Crafted database reporting procedures to extract cost analytics and quarterly completions.</li>
  </ul>
`,
        techStack: [
            'React',
            'Node.js',
            'Express.js',
            'Tailwind CSS',
            'Vite',
            'REST API',
            'JavaScript',
        ],
        thumbnail: '/projects/thumbnail/kmg.png',
        longThumbnail: '/projects/long/kmg.png',
        images: [
            '/projects/images/kmg1.png',
            '/projects/images/kmg2.png',
            '/projects/images/kmg3.png',
            '/projects/images/kmg4.png',
            '/projects/images/kmg5.png',
        ],
    },
    {
        title: 'TransLynk - AI Multilanguage Translator',
        slug: 'ai-language-translator',
        liveUrl: 'https://github.com/suhail100506',
        sourceCode: 'https://github.com/suhail100506/Translator',
        year: 2026,
        description: `
  <strong>Problem:</strong> Cross-lingual communication within India faces dialect barriers and requires high-accuracy, context-sensitive translation systems that preserve semantic meaning.<br/><br/>

  <strong>Solution:</strong> Developed TransLynk, an AI-powered multilingual translation platform leveraging React, Flask, Python, and the state-of-the-art IndicTrans2 model, allowing users to accurately translate text between multiple regional Indian languages.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>🌐 <strong>Multilingual Translation:</strong> Seamless and accurate translation across multiple official Indian languages.</li>
    <li>🧠 <strong>IndicTrans2 Backend:</strong> Integrated with IndicTrans2 models for high-quality, contextual translation output.</li>
    <li>⚡ <strong>Flask REST API:</strong> Lightweight, scalable Flask backend running the translation model endpoints.</li>
    <li>🎨 <strong>Responsive UI:</strong> Built a modern React-based interface with optimal layouts for translation inputs.</li>
    <li>🎙️ <strong>Speech & Text Integration:</strong> Supports voice inputs (speech-to-text) and vocal translations (text-to-speech).</li>
  </ul>
`,
        role: `
  <strong>Lead Full-Stack AI Developer</strong><br/>
  Designed and implemented the core application architecture:<br/>
  <ul>
    <li>⚙️ Developed the Flask REST backend wrapping the IndicTrans2 AI models.</li>
    <li>💻 Designed the React client interface for responsive text inputs and language selection.</li>
    <li>📈 Integrated optimization techniques for fast backend text processing and translation.</li>
  </ul>
`,
        techStack: [
            'React',
            'Flask',
            'Python',
            'IndicTrans2',
            'REST API',
        ],
        thumbnail: '/projects/thumbnail/translator_new.png',
        longThumbnail: '/projects/long/translator_new.png',
        images: [
            '/projects/images/translator1_new.png',
            '/projects/images/translator2_new.png',
            '/projects/images/translator3.png',
            '/projects/images/translator4.png',
            '/projects/images/translator5.png',
        ],
    },
    {
        title: 'CREDENT Mobile App',
        slug: 'credent-mobile-app',
        liveUrl: 'https://github.com/suhail100506',
        year: 2025,
        description: `
  <strong>Problem:</strong> Fintech and gamified reward applications demand fast, responsive mobile user interfaces, micro-animations, real-time leaderboards, and instant notifications.<br/><br/>

  <strong>Solution:</strong> Developed CREDENT, a React Native mobile application inspired by CRED. Features include verification, customizable user rewards, interactive leaderboards, and a premium UI layout.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>📱 <strong>React Native & Expo:</strong> A fully responsive and fluid mobile experience compiled for iOS and Android.</li>
    <li>🏆 <strong>Gamification:</strong> Leaderboard standings, user ranking, and reward systems.</li>
    <li>💾 <strong>Supabase & Postgres:</strong> Real-time database updates and secure PostgreSQL data modeling.</li>
  </ul>
`,
        role: `
  <strong>Mobile Application Developer</strong><br/>
  Led the frontend design and database architecture:<br/>
  <ul>
    <li>📱 Built a premium mobile UI using Tailwind styles and React Native components.</li>
    <li>⚡ Managed database integrations with Supabase client bindings.</li>
    <li>🔔 Setup device notification schemas and real-time leaderboard statistics.</li>
  </ul>
`,
        techStack: [
            'React Native',
            'Expo',
            'TypeScript',
            'Supabase',
            'PostgreSQL',
        ],
        thumbnail: '/projects/thumbnail/credent.png',
        longThumbnail: '/projects/long/credent.png',
        images: [
            '/projects/images/credent1.png',
            '/projects/images/credent2.png',
            '/projects/images/credent3.png',
            '/projects/images/credent4.png',
            '/projects/images/credent5.png',
        ],
    },
    {
        title: 'Job Portal Platform',
        slug: 'job-portal-platform',
        liveUrl: 'https://github.com/suhail100506',
        year: 2025,
        description: `
  <strong>Problem:</strong> Standard job application pipelines are often disjointed, offering poor user management, lack of security in resumes, and minimal tracking metrics for candidates and hiring managers.<br/><br/>

  <strong>Solution:</strong> Created a complete full-stack job portal where recruiters can seamlessly post job opportunities and candidates can apply. Included dashboards, resume uploading, and candidate metrics.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>🔐 <strong>Role-Based Authentication:</strong> Secure access using JWT for candidates and recruiters with specialized dashboard workflows.</li>
    <li>📄 <strong>Resume Management:</strong> Cloud-based resume uploads with secure storage and viewing.</li>
    <li>📊 <strong>Analytics Dashboard:</strong> Analytics graphs and statistics showing job listing popularity and application rates.</li>
  </ul>
`,
        role: `
  <strong>Full-Stack MERN Developer</strong><br/>
  Responsible for the entire system development:<br/>
  <ul>
    <li>🛠️ Designed database models for job listings, applications, and user accounts.</li>
    <li>🔑 Implemented secure authentication and session management using JWT.</li>
    <li>☁️ Managed remote storage connections for candidate resume uploads.</li>
  </ul>
`,
        techStack: [
            'React',
            'Node.js',
            'Express.js',
            'MongoDB',
            'JWT',
        ],
        thumbnail: '/projects/thumbnail/job-portal_new.png',
        longThumbnail: '/projects/long/job-portal_new.png',
        images: [
            '/projects/images/job-portal4_new.png',
            '/projects/images/job-portal1_new.png',
            '/projects/images/job-portal2_new.png',
            '/projects/images/job-portal3_new.png',
        ],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Full Stack Development Intern',
        company: 'C-DOT',
        duration: 'May 2026 – Present',
    },
];
