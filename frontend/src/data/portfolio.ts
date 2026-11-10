export const profile = {
  name: 'Prathmesh Pimpalshende',
  role: 'Aspiring Cloud & DevOps Engineer',
  location: 'Pune, Maharashtra, India',
  email: 'prathmeshimpalshende@gmail.com',
  github: 'https://github.com/prathmesh-git',
  linkedin: 'https://www.linkedin.com/in/prathmesh-pimpalshende/',
  resume: '/Prathmesh-Pimpalshende-Resume.pdf',
  availability: 'Available for full-time opportunities',
};

export const education = {
  degree: 'B.Tech, Computer Science',
  institution: 'GH Raisoni University, Nagpur',
  years: '2022—2026',
  score: '7.91 / 10',
};
export const experience = {
  role: 'Web Development Intern',
  company: 'Digital Guruji',
  period: 'April—July 2025',
  bullets: [
    'Built responsive web interfaces using HTML, CSS, JavaScript, and Bootstrap.',
    'Helped debug and implement full-stack features across multiple client projects.',
  ],
};

export const projects = [
  {
    number: '01',
    category: 'AWS INFRASTRUCTURE',
    title: 'CloudDataFlow',
    label: 'PERSONAL PROJECT',
    summary:
      'An event-driven CSV pipeline: upload a file to S3, process it with Lambda, store structured records in MySQL, and return a temporary download link.',
    detail:
      'The web tier uses an Application Load Balancer and EC2 Auto Scaling across Availability Zones. The VPC separates public and private subnets; IAM roles grant service access without hard-coded keys.',
    stack: ['AWS S3', 'Lambda · Python', 'RDS MySQL', 'EC2 · ALB', 'VPC · IAM'],
    repo: 'https://github.com/prathmesh-git/clouddataflow-aws-project',
    thumbnail: '/images/projects/clouddataflow.webp',
    thumbnailAlt: 'GitHub project page for CloudDataFlow, the AWS data processing pipeline',
  },
  {
    number: '02',
    category: 'LINUX & BASH',
    title: 'Linux Administration Toolkit',
    label: 'RHEL',
    summary:
      'A menu-driven Bash toolkit for routine RHEL administration, written to make common checks and user-management tasks repeatable.',
    detail:
      'The scripts cover system monitoring, user and group administration, disk usage thresholds, timestamped compressed backups with logging, and log analysis with standard tools.',
    stack: ['Bash', 'RHEL', 'System monitoring', 'Automation'],
    repo: 'https://github.com/prathmesh-git/Linux-Admin-Toolkit',
    thumbnail: '/images/projects/linux-admin-toolkit.webp',
    thumbnailAlt: 'GitHub repository page for the Linux Administration Toolkit',
  },
  {
    number: '03',
    category: 'FULL-STACK · AI INTEGRATION',
    title: 'Unreel',
    label: 'LIVE APPLICATION',
    summary:
      'A fact-checking application for short-form videos. It transcribes audio, extracts on-screen text, checks claims against web sources, and analyzes bias.',
    detail:
      'React and Express connect Whisper transcription, Groq LLaMA claim analysis, Tavily search, OCR, and MongoDB persistence. The app also has a Telegram bot workflow and a live deployment.',
    stack: ['React · Vite', 'Node · Express', 'MongoDB', 'Whisper · Groq', 'Tavily · Docker'],
    repo: 'https://github.com/prathmesh-git/Unreel',
    live: 'https://unreeled.in',
    thumbnail: '/images/projects/unreel.webp',
    thumbnailAlt: 'Unreel video analysis interface with a sample claim report',
  },
  {
    number: '04',
    category: 'INTERNSHIP PROJECT',
    title: 'Open Media Flow',
    label: 'DIGITAL GURUJI',
    summary:
      'A collaborative media platform built during the internship, bringing frontend, backend, and AI API work together.',
    detail:
      'Contributed to the interface, backend API integration, and research into media-generation APIs as part of a team.',
    stack: ['HTML · CSS · JavaScript', 'REST APIs', 'AI APIs'],
    repo: 'https://github.com/prathmesh-git',
    thumbnail: '/images/projects/open-media-flow.webp',
    thumbnailAlt: 'OpenMediaFlow model discovery page',
  },
];

export const skillGroups = [
  {
    number: '01',
    title: 'Linux & systems',
    description:
      'Routine administration, user and group management, permissions, disk monitoring, logs, and Bash scripting on RHEL.',
    level: 'HANDS-ON',
    tools: 'RHEL · BASH · CLI',
  },
  {
    number: '02',
    title: 'Cloud & infrastructure',
    description:
      'Designed and built an AWS pipeline using VPC networking, EC2, ALB, Auto Scaling, S3, Lambda, RDS, IAM, and NAT.',
    level: 'PROJECT EXPERIENCE',
    tools: 'AWS · VPC · IAM',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Full-stack web development across React, Node.js, Express, REST APIs, MongoDB, SQL, and JavaScript.',
    level: 'BUILT IN PROJECTS',
    tools: 'MERN · REST · SQL',
  },
  {
    number: '04',
    title: 'Containers & delivery',
    description:
      'Dockerized application workflows and deployed web applications. Building depth in cloud operations and automation.',
    level: 'WORKING KNOWLEDGE',
    tools: 'DOCKER · GIT · RENDER',
  },
];
export const learningActivities = [
  {
    title: 'Linux administration',
    description: 'Making routine system checks and maintenance repeatable with shell scripts.',
    status: 'PRACTICING',
  },
  {
    title: 'AWS architecture',
    description:
      'Deepening my understanding of networks, IAM, event flows, and managed services through project work.',
    status: 'BUILDING',
  },
  {
    title: 'Cloud / DevOps roles',
    description:
      'Looking for a team where I can contribute, learn from production systems, and grow with good engineering practice.',
    status: 'OPEN',
  },
];
