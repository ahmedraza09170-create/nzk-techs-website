

const SITE = {
  name: "NZK Techs",
  location: "Karachi & Hyderabad, Pakistan · Working remotely worldwide",
  locations: ["Karachi", "Hyderabad", "Remote"],
  phone: "03347127234",             
  whatsapp: "923347127234",         
  whatsappDisplay: "03347127234",
  email: "",                       
};

const CATEGORIES = [
  { id: "website",  label: "Website Development",  icon: "bi-window-stack", blurb: "Business, institutional and brand websites that are fast, responsive and easy to understand." },
  { id: "software", label: "Software Development", icon: "bi-code-square",  blurb: "Management systems, portals, dashboards and workflow tools built around real operations." },
  { id: "mobile",   label: "Mobile Applications",  icon: "bi-phone",        blurb: "Cross-platform iOS and Android apps built with Flutter, from education to fintech and maps." },
  { id: "ai",       label: "AI Applications",      icon: "bi-stars",        blurb: "AI-assisted tools, smart chat experiences and automation that remove repetitive work." }
];


const TEAM = [
{
    id: "nazar-muhammad",
    name: "Nazar Muhammad",
    initials: "NM",
    role: "Founder & Technology Lead, NZK Technologies",
    shortRole: "Founder",
    leader: true,
    experience: "",
    photo: "assets/img/team/nazar-muhammad.png",

    linkedin: "https://www.linkedin.com/in/nazarmuhammad91?utm_source=share_via&utm_content=profile&utm_medium=member_ios",

    tagline: "Leading technology teams and delivering reliable ERP, enterprise and web solutions for organizations across multiple industries.",

    bio: [
        "I'm Nazar Muhammad, Founder of NZK Technologies, with experience in leading software development teams and delivering technology solutions for businesses and institutions. My work includes ERP solutions, web application development, and the modernization of legacy systems.",

        "Throughout my professional journey, I've been involved in delivering software solutions for organizations in sectors including banking, healthcare, and education. I focus on understanding organizational requirements and translating them into practical, reliable, and scalable technology solutions.",

        "At NZK Technologies, my role is to guide the technical direction, support development teams, maintain project quality, and ensure that every solution is aligned with the client's objectives. My vision is to build technology that solves real business challenges and creates long-term value."
    ],

    expertise: [
        "Technology leadership",
        "Software development management",
        "ERP solutions",
        "Enterprise web applications",
        "Legacy system modernization",
        "Technical project delivery",
        "Business technology solutions"
    ],

    related: "software"
},
  {
    id: "ezzat-gul",
    name: "Ezzat Gul",
    initials: "EG",
    role: "Senior Software Engineer",
    shortRole: "Senior Software Engineer",
    experience: "7+ years",
    photo: "assets/img/team/ezzat-gul.jpg",
    tagline: "Results-driven engineer building enterprise-level web applications.",
    bio: [
      "Ezzat is a results-driven software engineer with over seven years of experience designing, developing, and deploying enterprise-level web applications.",
      "His work spans ERP systems, student management portals, banking applications, HR systems, and reporting solutions."
    ],
    expertise: ["Enterprise web applications", "ERP systems", "Student management portals", "Banking applications", "HR systems", "Reporting solutions"],
    related: "software"
  },
  {
    id: "haris-khan",
    name: "Haris Khan",
    initials: "HK",
    role: "Senior Software Developer",
    shortRole: "Senior Software Developer",
    experience: "7+ years",
    photo: "assets/img/team/haris-khan.jpeg",
    tagline: "Dependable digital solutions for banks and enterprise clients.",
    bio: [
      "Haris Khan brings over seven years of experience delivering dependable digital solutions for banks and enterprise clients.",
      "He listens closely, communicates clearly, and builds solutions that save time, reduce complexity, and support long-term growth."
    ],
    expertise: ["Banking solutions", "Enterprise software", "Requirement analysis", "Scalable solutions"],
    related: "software"
  },
  {
    id: "muhammad-qasim",
    name: "Muhammad Qasim",
    initials: "MQ",
    role: "Senior Software Engineer",
    shortRole: "Senior Software Engineer",
    experience: "13+ years",
    photo: "assets/img/team/muhammad-qasim.jpg",
    tagline: "Builds dependable web systems, portals and business applications.",
    bio: [
      "Muhammad Qasim is a senior software engineer with 13+ years of experience building web portals, ERP-style systems and business applications.",
      "He holds a Master's degree in Computer Science and has also trained students in software development, which shapes how clearly he plans, documents and hands over software."
    ],
    expertise: [],
    related: "software"
  },
  {
    id: "muhammad-rafi",
    name: "Muhammad Rafi",
    initials: "MR",
    role: "Senior Mobile Developer",
    shortRole: "Senior Mobile Developer",
    experience: "4+ years",
    photo: "assets/img/team/muhammad-rafi.jpg",
    tagline: "Building production-ready mobile apps for iOS and Android.",
    bio: [
      "Muhammad Rafi builds production-ready mobile apps for iOS and Android. He has 4+ years of experience developing mobile apps and has delivered 20+ apps including e-commerce, fitness, music, attendance, social, maps, calling, chat, and payment-based products."
    ],
    expertise: ["iOS & Android apps", "App Store & Play Store releases", "Payments & maps", "Chat & calling features"],
    related: "mobile"
  },
  {
    id: "ahmed-raza",
    name: "Ahmed Raza",
    initials: "AR",
    role: "Frontend Developer",
    shortRole: "Frontend Developer",
    experience: "",
    photo: "assets/img/team/ahmed-raza.jpg",
    tagline: "Fast, responsive and accessible interfaces for every screen size.",
    bio: [
      "Ahmed Raza is a frontend developer who turns designs and ideas into fast, responsive and accessible interfaces that feel clear on every screen size.",
      "He focuses on clean, user-friendly layouts that work smoothly across phones, tablets and desktops."
    ],
    expertise: ["Responsive interfaces", "User-friendly layouts", "Accessible design", "Cross-device consistency"],
    related: "website"
  },
  {
    id: "muhammad-bilal",
    name: "Muhammad Bilal",
    initials: "MB",
    role: "Backend Developer",
    shortRole: "Backend Developer",
    experience: "",
    photo: "assets/img/team/muhammad-bilal.jpg",
    tagline: "Server-side architecture, APIs and databases that applications can rely on.",
    bio: [
      "Muhammad Bilal is a backend developer responsible for the server-side foundations that keep applications reliable.",
      "He builds the APIs, data layers and application logic that power websites and business applications."
    ],
    expertise: ["APIs & integrations", "Databases & data handling", "Application logic", "Server-side architecture"],
    related: "software"
  }
];

const PROJECTS = [
  {
    id: "purify-waters",
    title: "Purify Waters",
    category: "website",
    featured: true,
    tags: ["Brand website", "Product showcase"],
    icon: "bi-droplet",
    image: "assets/img/projects/purify-waters.png",
    summary: "A digital presence for a bottled water brand offering its own products and custom-label bottled water for other businesses.",
    overview: "The project brings the brand's own bottled water range and custom-label service together in one online experience. The website gives visitors a direct way to understand the product offering and the business behind it.",
    challenge: "The key requirement was to present two connected offerings — Purify Waters products and private-label supply — in a way that is easy for customers and business enquiries to understand.",
    approach: "The website structure focuses on brand presentation, product information and a clear explanation of private-label services, with a responsive layout for visitors across devices.",
    outcome: "A unified online presence for the brand, its product range and its business-to-business private-label offering.",
    features: ["Brand and product presentation", "Private-label (custom bottle) service explained", "Responsive layout for all devices", "Clear path for business enquiries"],
    tech: [],
    platform: "Website",
  },
  {
    id: "learners-academy",
    title: "Learners Academy Hyderabad",
    category: "website",
    featured: true,
    tags: ["Education", "Institutional website"],
    icon: "bi-mortarboard",
    image: "assets/img/projects/learners-webiste.png",
    summary: "An educational website for a Hyderabad institute offering classes IX–XII coaching and ECAT and MDCAT preparation.",
    overview: "The website presents Learners Academy as a professional educational institute and organises information about its academic offerings for students and families.",
    challenge: "The main communication need is to make the institute's academic scope easy to understand, from school-level coaching to ECAT and MDCAT preparation.",
    approach: "The website uses clear educational content, structured programme information and a responsive interface to support visitors looking for institute and course information.",
    outcome: "A dedicated online presence for Learners Academy that communicates its educational identity and coaching programmes.",
    features: ["Classes IX–XII coaching information", "ECAT and MDCAT preparation programmes", "Structured programme pages", "Responsive for students and parents"],
    tech: [],
    platform: "Website",
  },
  {
    id: "learners-academy-sms",
    title: "Learners Academy School Management System",
    category: "software",
    featured: true,
    tags: ["Education", "School Management System"],
    icon: "bi-kanban",
    image: "assets/img/projects/learners-software.jpg",
    summary: "A school management system (SMS) supporting the institute's academic and administrative work, developed alongside its educational website.",
    overview: "The project focuses on providing the institute with a software-based way to support its internal work and day-to-day operations. It extends the institute's digital presence beyond its public-facing website.",
    challenge: "The need is different from a public website: the institute also requires a digital system for internal academic and administrative workflows.",
    approach: "The solution is treated as a purpose-built software project, with its structure and functionality centred on the institute's operational requirements.",
    outcome: "A dedicated software project for Learners Academy, extending its digital ecosystem into internal institute operations.",
    features: ["Support for academic workflows", "Support for administrative workflows", "Purpose-built for an educational organisation", "Complements the public Learners Academy website"],
    tech: [],
    platform: "Web software",
  },
  {
    id: "pos-uk-client",
    title: "Point of Sale System for a UK Client",
    category: "software",
    featured: true,
    tags: ["Point of Sale", "Retail software", "UK client"],
    icon: "bi-receipt",
    image: "",
    summary: "A point of sale (POS) system developed for a client in the United Kingdom to handle everyday sales and store operations.",
    overview: "A point of sale system built for a UK-based client. It brings day-to-day selling, billing and store operations into one dependable software solution.",
    challenge: "The client needed a reliable POS that staff could use quickly at the counter, with clear records behind every sale.",
    approach: "The team treated it as a purpose-built software project, shaping the workflow, interface and data structure around how the client actually trades.",
    outcome: "A dedicated POS solution delivered remotely to an international client.",
    features: ["Fast sales and billing workflow", "Product and stock management", "Sales records and reporting", "Built for an international (UK) client"],
    tech: [],
    platform: "Web software"
  },
 {
    id: "complaint-management-system",
    title: "Complaint Management System",
    category: "software",
    featured: false,
    tags: ["Complaint Management", "Admin Dashboard"],
    icon: "bi-clipboard2-check",
    image: "",
    summary: "A digital complaint management system that allows users to submit complaints and administrators to review, manage and track them through a centralized dashboard.",
    overview: "A web-based complaint management solution designed to organize complaint submissions, simplify administrative workflows and improve communication between users and management.",
    challenge: "Managing complaints manually can make it difficult to track submissions, monitor their status and ensure that issues are handled efficiently.",
    approach: "The team developed a centralized system with user complaint submission, administrative management and a structured complaint tracking workflow.",
    outcome: "A more organized complaint handling process that helps administrators manage submissions, monitor progress and maintain complaint records.",
    features: [
        "Online complaint submission",
        "Centralized admin dashboard",
        "Complaint status management",
        "Complaint tracking and records",
        "Organized complaint handling workflow",
        "Responsive interface for all devices"
    ],
    tech: [],
    platform: "Web software"
},
  {
    id: "fitpick-ai",
    title: "FitPick AI",
    category: "ai",
    featured: true,
    tags: ["AI", "Website", "Academic project"],
    icon: "bi-stars",
    image: "",
    summary: "An AI-powered website developed for Isra University students as part of our ongoing academic project support.",
    overview: "FitPick AI is an AI-assisted website created as part of our academic project support for students of Isra University.",
    challenge: "Students needed a working, presentable AI project that demonstrates a real idea rather than only a report.",
    approach: "The team guided the project from idea to a functioning website, combining an AI-assisted experience with a clean, responsive interface.",
    outcome: "A complete academic AI project, ready to present and demonstrate. We continue to support Isra University students with new projects.",
    features: ["AI-assisted website experience", "Clean, responsive interface", "Developed for Isra University students", "Guided from idea to working demo"],
    tech: [],
    platform: "Website"
  },
  {
    id: "pneumonia-detection-ai",
    title: "Pneumonia Detection AI App",
    category: "ai",
    featured: true,
    tags: ["AI", "Healthcare", "Academic project"],
    icon: "bi-heart-pulse",
    image: "",
    summary: "An AI application for pneumonia detection, developed as an academic project with Isra University students.",
    overview: "The Pneumonia Detection AI App applies artificial intelligence to a healthcare use case. It was built as an academic project for students of Isra University.",
    challenge: "The project needed to show how AI can support a healthcare scenario in a way that is understandable and demonstrable.",
    approach: "The team supported the project from concept to a working application, with a simple interface around the AI model.",
    outcome: "A working AI application that demonstrates the concept. It is an academic demonstration, not a certified medical device. We continue to support Isra University students with new projects.",
    features: ["AI-based detection workflow", "Simple, easy-to-use interface", "Developed for Isra University students", "Academic demonstration project"],
    tech: [],
    platform: "AI application"
  },
  {
    id: "heuser-qbank",
    title: "Heuser Qbank",
    category: "mobile",
    featured: false,
    tags: ["Flutter", "Education", "Quiz Engine", "Analytics"],
    icon: "bi-journal-check",
    image: "",
    summary: "An education app for MDCAT students to prepare with quizzes, explanations, performance analysis and progress tracking.",
    overview: "An education app for MDCAT students to prepare with quizzes, explanations, performance analysis, and progress tracking.",
    features: ["Quiz creation and attempt workflows", "Question-level feedback with explanations", "Results dashboard and performance metrics", "Theme customization with dark/light mode"],
    tech: ["Flutter", "Dart"],
    platform: "Android",
    stores: ["Google Play"]
  },
  {
    id: "the-next-school",
    title: "The Next School FBA",
    category: "mobile",
    featured: true,
    tags: ["Flutter", "School Management", "iOS & Android", "REST API"],
    icon: "bi-backpack2",
    image: "",
    summary: "A parent and teacher school app live on the App Store and Google Play, bringing timetable, homework, attendance and announcements together.",
    overview: "A parent and teacher school app live on the App Store and Google Play. Families track multiple children, timetable, homework, attendance, leave, and announcements from one place.",
    features: ["Multi-child dashboard with attendance insights", "Daily timetable, homework, and assignments", "Leave requests, gate pass, and announcements", "Parent, teacher, and school workflows"],
    tech: ["Flutter", "Dart", "REST APIs"],
    platform: "iOS & Android",
    stores: ["Google Play", "App Store"]
  },
  {
    id: "brant-self-storage",
    title: "Brant Self Storage",
    category: "mobile",
    featured: false,
    tags: ["Flutter", "Task Management", "Operations", "Role Based Access"],
    icon: "bi-box-seam",
    image: "",
    summary: "An operations app for self-storage management where caretakers and site-setup/maintenance users handle tasks and track progress.",
    overview: "An operations app for self-storage management where caretakers and site-setup/maintenance role users handle tasks and progress tracking for facilities.",
    features: ["Role-based operations workflow", "Cleaning, maintenance, and status updates", "Weekly, monthly, quarterly, and annual tasks", "Task follow-up and team communication screens"],
    tech: ["Flutter", "Dart"],
    platform: "Mobile"
  },
  {
    id: "mindvibes",
    title: "MindVibes",
    category: "mobile",
    featured: false,
    tags: ["Flutter", "Chat", "Audio", "Dark/Light Mode"],
    icon: "bi-soundwave",
    image: "",
    summary: "A wellness app focused on affirmations and mantra recordings with social engagement features, playlists and chat.",
    overview: "A wellness app focused on affirmations and mantra recordings with social engagement features. Users can create and manage personal playlists, chat with others, and switch between light and dark themes.",
    features: ["Affirmation and mantra recording", "Social feed and chat features", "Playlist creation and playback flow", "Dark/Light mode support"],
    tech: ["Flutter", "Dart", "Audio", "Chat"],
    platform: "Mobile"
  },
  {
    id: "lignevert",
    title: "Lignevert",
    category: "mobile",
    featured: true,
    tags: ["Flutter", "Stripe", "Fintech", "Real Estate"],
    icon: "bi-building-up",
    image: "",
    summary: "A real estate investment platform where investors discover and fund projects such as buildings and apartments.",
    overview: "A real estate investment platform where investors discover and fund projects such as buildings and apartments. Includes payment workflows and investment tracking experience.",
    features: ["Project discovery and investment flow", "Portfolio, wallet, and transaction screens", "Stripe payment integration", "Investor-focused dashboard and analytics"],
    tech: ["Flutter", "Dart", "Stripe"],
    platform: "Mobile"
  },
  {
    id: "flexride",
    title: "FlexRide",
    category: "mobile",
    featured: true,
    tags: ["Flutter", "Maps", "Ride Hailing", "Wallet"],
    icon: "bi-geo-alt",
    image: "",
    summary: "A ride-hailing app with live maps, nearby vehicles, destination search, driver chat/call, ride activity and wallet top-up.",
    overview: "A ride-hailing app with live maps, nearby vehicles, destination search, driver chat/call, ride activity, and wallet top-up.",
    features: ["Google Maps home with nearby rides", "Saved places and destination search", "Driver profiles with call and chat", "Wallet, payments, and trip history"],
    tech: ["Flutter", "Dart", "Google Maps"],
    platform: "Mobile"
  }
];

const HOME_PROJECTS = ["the-next-school", "pos-uk-client", "purify-waters"];

const HOME_TEAM = ["nazar-muhammad", "ezzat-gul", "haris-khan"];

