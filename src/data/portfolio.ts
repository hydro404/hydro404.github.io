/**
 * Portfolio content. Keep project claims tied to work you can explain or show.
 * Coaching and competition results are in achievements.ts.
 */
export const profile = {
  name: 'Luis Anthony Grado',
  shortName: 'Luis Anthony',
  role: 'Full-Stack Software Engineer',
  location: 'Philippines',
  github: 'https://github.com/hydro404',
  linkedin: 'https://www.linkedin.com/in/luis-anthony-grado/',
  calendly: 'https://calendly.com/luisanthonygrado/30min',
  resume: '/Grado_Resume.pdf',
};

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  technologies: string[];
  image: string;
  imageMobile?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt: string;
  contribution: string[];
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'brownout-baga',
    title: 'BrownoutBaga',
    category: 'Web application',
    summary: 'A tracker of scheduled brownouts across Albay. It turns the electric cooperative’s Facebook posts into a searchable calendar, down to the barangay.',
    role: 'Developer',
    technologies: ['Laravel', 'Vue', 'n8n'],
    image: '/images/projects/brownout-baga.webp',
    imageWidth: 1408,
    imageHeight: 704,
    imageAlt: 'BrownoutBaga calendar showing scheduled brownouts in Albay for the month, with search by barangay or municipality',
    contribution: [
      'Built the tracker with Laravel and Vue.',
      'Automated the flow from the cooperative’s Facebook announcements to calendar entries with n8n.',
    ],
    liveUrl: 'https://brownoutbaga.online',
  },
  {
    slug: 'bu-csm',
    title: 'BU Clientele Satisfaction Measurement',
    category: 'Web application',
    summary: 'A feedback system developed with the Bicol University ICT Office during my internship.',
    role: 'Frontend developer',
    technologies: ['Laravel', 'PHP', 'HTML', 'CSS'],
    image: '/images/projects/bu-csm-portfolio.webp',
    imageMobile: '/images/projects/bu-csm-portfolio-mobile.webp',
    imageWidth: 1774,
    imageHeight: 887,
    imageAlt: 'Desktop and mobile views of the Bicol University Clientele Satisfaction Measurement survey, presented in browser and phone frames',
    contribution: [
      'Worked on the frontend of the satisfaction measurement system using Laravel.',
      'Contributed as part of the development team at the Bicol University ICT Office.',
    ],
    liveUrl: 'https://survey.bicol-u.edu.ph',
  },
  {
    slug: 'pasubli',
    title: 'PASUBLI',
    category: 'Web application',
    summary: 'A team capstone project connecting a JavaScript frontend with a Node.js backend.',
    role: 'Lead developer',
    technologies: ['JavaScript', 'Node.js'],
    image: '/images/projects/pasubli-capstone.png',
    imageAlt: 'PASUBLI capstone project interface',
    contribution: [
      'Led the project development team and built the frontend.',
      'Wrote JavaScript to integrate the frontend with the Node.js backend.',
    ],
  },
  {
    slug: 'java-pos',
    title: 'POS & Inventory System',
    category: 'Desktop application',
    summary: 'A point-of-sale and inventory application built for a client with Java and MySQL.',
    role: 'Developer',
    technologies: ['Java', 'MySQL'],
    image: '/images/projects/java-pos.png',
    imageAlt: 'Java point-of-sale and inventory application interface',
    contribution: [
      'Developed a client application for point-of-sale and inventory work.',
      'Used Java for the application and MySQL for its database.',
    ],
  },
  {
    slug: 'nadira',
    title: 'Nadira',
    category: 'Website',
    summary: 'An Adobe XD design translated into a single-page website for a freelance client.',
    role: 'Frontend developer',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: '/images/projects/nadira-upwork.png',
    imageAlt: 'Nadira website developed from an Adobe XD design',
    contribution: [
      'Converted the supplied Adobe XD design into a working single-page website.',
      'Implemented the interface using HTML, CSS, Bootstrap, and JavaScript.',
    ],
  },
  {
    slug: 'bu-e-receipt',
    title: 'BU E-Receipt System',
    category: 'Web application',
    summary: 'A web application interface for Bicol University electronic receipts.',
    role: 'Frontend developer',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: '/images/projects/ereceipt-quarta.png',
    imageAlt: 'Bicol University electronic receipt system interface',
    contribution: [
      'Designed and developed the frontend of the web application.',
      'Built the interface using HTML, CSS, Bootstrap, and JavaScript.',
    ],
  },
  {
    slug: 'curio-4502',
    title: 'Curio-4502',
    category: 'E-commerce',
    summary: 'An e-commerce website developed for a client using Node.js and Bootstrap.',
    role: 'Developer',
    technologies: ['Node.js', 'Bootstrap', 'JavaScript'],
    image: '/images/projects/curio-comms.png',
    imageAlt: 'Curio-4502 e-commerce website interface',
    contribution: [
      'Developed the e-commerce website for a client.',
      'Used Node.js and Bootstrap to build the web experience.',
    ],
  },
];

export const experience = [
  {
    date: 'July 2025–Present',
    title: 'Special Science Teacher I',
    organization: 'Camalig National High School, DepEd',
    type: 'full-time',
    description: 'Teaching senior high school and coaching student teams while completing my DOST JLSS return of service.',
  },
  {
    date: 'November 2024–Present',
    title: 'Associate Software Engineer',
    organization: 'XS Enterprises LLC',
    type: 'part-time',
    description: 'Developing applications with Laravel and Bootstrap. Full-time from November 2024, part-time since July 2025.',
  },
  {
    date: 'February–May 2024',
    title: 'Frontend Developer Intern',
    organization: 'Bicol University ICT Office',
    description: 'Contributed to the BU Clientele Satisfaction Measurement system as a frontend developer.',
  },
  {
    date: 'May 2023–July 2024',
    title: 'Frontend Web Developer',
    organization: 'Quarta',
    description: 'Worked on web interfaces at a banking fintech startup.',
  },
  {
    date: 'February–March 2023',
    title: 'Freelance Frontend Developer',
    organization: 'Upwork',
    description: 'Translated an Adobe XD design into a single-page website for a client.',
  },
];

export const education = {
  degree: 'BS Information Technology',
  honors: 'Cum Laude',
  school: 'Bicol University',
  note: 'DOST JLSS Scholar',
};
