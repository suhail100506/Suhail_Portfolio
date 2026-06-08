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
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
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
            name: 'Firebase',
            icon: '/logo/firebase.svg',
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
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'JWT',
            icon: '/logo/jwt.svg',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'AI Language Translator',
        slug: 'ai-language-translator',
        liveUrl: 'https://github.com/suhail100506',
        year: 2026,
        description: `
  <strong>Problem:</strong> Cross-lingual communication within India faces dialect barriers and requires high-accuracy, context-sensitive translation systems that preserve semantic meaning.<br/><br/>

  <strong>Solution:</strong> Developed an AI-powered multilingual translation platform leveraging React, Flask, Python, and the state-of-the-art IndicTrans2 model, allowing users to accurately translate text between multiple regional Indian languages.<br/><br/>

  <strong>Key Features:</strong><br/>
  <ul>
    <li>🌐 <strong>Multilingual Translation:</strong> Seamless and accurate translation across multiple official Indian languages.</li>
    <li>🧠 <strong>IndicTrans2 Backend:</strong> Integrated with IndicTrans2 models for high-quality, contextual translation output.</li>
    <li>⚡ <strong>Flask REST API:</strong> Lightweight, scalable Flask backend running the translation model endpoints.</li>
    <li>🎨 <strong>Responsive UI:</strong> Built a modern React-based interface with optimal layouts for translation inputs.</li>
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
        thumbnail: '/projects/thumbnail/translator.png',
        longThumbnail: '/projects/long/translator.png',
        images: [
            '/projects/images/translator1.png',
            '/projects/images/translator2.png',
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
        thumbnail: '/projects/thumbnail/job-portal.png',
        longThumbnail: '/projects/long/job-portal.png',
        images: [
            '/projects/images/job-portal1.png',
            '/projects/images/job-portal2.png',
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
];

export const MY_EXPERIENCE = [
    {
        title: 'Full Stack Development Intern',
        company: 'C-DOT',
        duration: 'May 2026 – Present',
    },
];
