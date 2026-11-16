/**
 * Portfolio content. Keep project claims tied to work you can explain or show.
 * Coaching and competition results are in achievements.ts.
 */
export const profile = {
  name: 'Luis Anthony Grado',
  shortName: 'Luis Anthony',
  role: 'Full-Stack Software Engineer',
  tagline: 'I build SaaS products, business systems, and automation.',
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

/** Slugs of the projects shown on the homepage, in order. */
export const featuredProjects = ['brownout-baga', 'bu-csm'];

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
    summary: 'An e-receipt system, developed by Quarta, that helps Bicol University college student organizations keep track of students’ payments.',
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

export interface ExperienceRole {
  title: string;
  /** Employment type, such as part-time. Shown beside the title. */
  type?: string;
  period: string;
}

export interface ExperienceLink {
  label: string;
  href: string;
  /** Slug of a project. The link then opens that project's dialog on the Projects page. */
  project?: string;
}

export interface Experience {
  organization: string;
  location?: string;
  /** The whole time at the organization. */
  period: string;
  /** First and last month as YYYY-MM, for the homepage career chart. Leave `end` out while current. */
  start: string;
  end?: string;
  current?: boolean;
  /** Newest first. More than one role shows the progression inside the organization. */
  roles: ExperienceRole[];
  highlights: string[];
  technologies?: string[];
  link?: ExperienceLink;
}

/** Software roles, ordered by start date with the newest first. These lead the Experience page and the homepage summary. */
export const engineeringExperience: Experience[] = [
  {
    organization: 'XS Enterprises LLC',
    location: 'Remote',
    period: 'Oct 2024–Present',
    start: '2024-10',
    current: true,
    roles: [
      { title: 'Full Stack Software Engineer', type: 'part-time', period: 'Jul 2025–Present' },
      { title: 'Associate Software Engineer', type: 'full-time', period: 'Oct 2024–Jun 2025' },
    ],
    highlights: [
      'Build SaaS applications across the stack with Laravel, JavaScript, and Bootstrap, from the database and back-end logic through to the interface.',
      'Reworked page designs to make the web platforms clearer and easier to use.',
      'Work remotely alongside other developers. Moved from Associate to Full Stack Software Engineer in July 2025.',
    ],
    technologies: ['Laravel', 'PHP', 'Bootstrap'],
  },
  {
    organization: 'Bicol University ICT Office',
    location: 'Legazpi, Albay',
    period: 'Feb–May 2024',
    start: '2024-02',
    end: '2024-05',
    roles: [{ title: 'Frontend Developer Intern', type: 'internship', period: 'Feb–May 2024' }],
    highlights: [
      'Front-end developer for the Clientele Satisfaction Measurement system, which the university uses to assess and improve its services.',
      'The system is live at survey.bicol-u.edu.ph.',
    ],
    technologies: ['Laravel', 'PHP', 'Bootstrap'],
    link: { label: 'See the BU CSM project', href: '/projects/#bu-csm', project: 'bu-csm' },
  },
  {
    organization: 'Quarta',
    period: 'May 2023–Jul 2024',
    start: '2023-05',
    end: '2024-07',
    roles: [{ title: 'Frontend Web Developer', type: 'part-time', period: 'May 2023–Jul 2024' }],
    highlights: [
      'Built web interfaces for a banking fintech startup based at Bicol University.',
      'Designed and developed the front end of the BU E-Receipt System, which helps Bicol University college student organizations keep track of students’ payments.',
    ],
    technologies: ['Bootstrap'],
    link: { label: 'See the BU E-Receipt System', href: '/projects/#bu-e-receipt', project: 'bu-e-receipt' },
  },
  {
    organization: 'Upwork',
    location: 'Remote',
    period: 'Feb–Mar 2022',
    start: '2022-02',
    end: '2022-03',
    roles: [{ title: 'Freelance Frontend Developer', type: 'freelance', period: 'Feb–Mar 2022' }],
    highlights: ['Turned a client’s Adobe XD design into a working single-page website.'],
    technologies: ['Bootstrap'],
    link: { label: 'See the Nadira website', href: '/projects/#nadira', project: 'nadira' },
  },
];

/** Teaching and support roles, ordered by start date with the newest first. Shown after the software roles. */
export const otherExperience: Experience[] = [
  {
    organization: 'Camalig National High School, DepEd',
    location: 'Camalig, Albay',
    period: 'Jul 2025–Present',
    start: '2025-07',
    current: true,
    roles: [{ title: 'Special Science Teacher I', type: 'full-time', period: 'Jul 2025–Present' }],
    highlights: [
      'Teach senior high school and coach the school’s research and robotics teams, including a champion team at the Robo Z Philippine Robotics Innovation Cup.',
      'Serving my return of service as a DOST JLSS scholar.',
    ],
    link: { label: 'See the coaching results', href: '/achievements/' },
  },
  {
    organization: 'SC DigitalDynamo S.R.L',
    location: 'Remote',
    period: 'Dec 2023–Feb 2025',
    start: '2023-12',
    end: '2025-02',
    roles: [
      { title: 'Virtual Assistant', type: 'part-time', period: 'Oct 2024–Feb 2025' },
      { title: 'Virtual Assistant', type: 'full-time', period: 'Dec 2023–Sep 2024' },
    ],
    highlights: [
      'Built custom software tools that automated the employer’s daily operational tasks.',
      'Managed schedules, data entry, and customer communications.',
    ],
  },
  {
    organization: 'Wyndale Hotel',
    location: 'Camalig, Albay',
    period: 'May 2023–May 2024',
    start: '2023-05',
    end: '2024-05',
    roles: [{ title: 'IT Support Technician', type: 'part-time', period: 'May 2023–May 2024' }],
    highlights: [
      'Kept the hotel’s systems and network running: LAN and WAN, VoIP phones, IP cameras, and Wi-Fi access points.',
      'Resolved faults quickly to limit downtime.',
    ],
  },
];

export const education = {
  degree: 'BS Information Technology',
  honors: 'Cum Laude',
  school: 'Bicol University',
  period: '2020–2024',
  note: 'DOST JLSS Scholar',
};
