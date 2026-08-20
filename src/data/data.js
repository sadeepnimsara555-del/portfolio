// ============================================================
//  data.js — All portfolio content lives here.
//  Edit this file to update your portfolio without touching components.
// ============================================================

export const personalInfo = {
  name: "Sadeep Nimsara Godage",
  tagline: "Artificial Intelligence Undergraduate",
  location: "Meegoda, Sri Lanka",
  rotatingRoles: ["AI & ML Engineer", "Full-Stack Developer", "IT Undergraduate"],
  intro: `IT undergraduate specializing in Artificial Intelligence with hands-on experience
in full-stack development and machine learning. Proficient in building web applications
via the MERN stack and mobile solutions using React Native. Skilled in Python for AI/ML
(model training & preprocessing) and Java Spring Boot for backend architecture.
Proven ability to integrate intelligent components into scalable software.
Seeking an internship to leverage technical expertise in Software Engineering and AI/ML.`,
  socials: {
    github: "https://github.com/sadeepnimsara555-del",
    linkedin: "https://www.linkedin.com/in/sadeepnimsara-godage-2101b53a9/",
    email: "mailto:your-email@example.com", // 👈 Replace with your email
  },
  cvUrl: "/cv.pdf", // 👈 Drop your CV as public/cv.pdf
};

export const skills = [
  {
    category: "Languages",
    icon: "Code2",
    items: ["Java", "Python", "SQL", "JavaScript", "HTML", "CSS", "R"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "Layers",
    items: ["React", "React Native", "Node.js", "Express.js", "Java Spring Boot", "Pandas", "TensorFlow"],
  },
  {
    category: "AI & Machine Learning",
    icon: "Brain",
    items: ["Machine Learning", "AI", "NLP", "Scikit-learn", "Hyperparameter Tuning"],
  },
  {
    category: "Tools & Databases",
    icon: "Database",
    items: ["MongoDB", "Supabase", "PostgreSQL", "MySQL", "Postman", "Git", "GitHub", "OOP"],
  },
  {
    category: "Soft Skills",
    icon: "Users",
    items: ["Problem Solving", "Teamwork", "Adaptability", "Time Management", "Communication", "Continuous Learning"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Web-Based Retail Hospital Store Management System with Intelligent Analytics",
    dates: "Feb 2026 – Apr 2026",
    tech: ["React", "Node.js", "Express.js", "Supabase", "PostgreSQL", "Python", "Scikit-learn", "JWT"],
    bullets: [
      "Full-stack retail platform (PERN stack) with Supabase Row Level Security for real-time inventory tracking and secure multi-role access control",
      "AI-powered forecasting service (Python + Scikit-learn) for sales predictions and trend analysis",
      "RESTful API for POS operations, customer loyalty management, and automated invoicing",
    ],
    github: "https://github.com/sadeepnimsara555-del",
  },
  {
    id: 2,
    title: "Staff Management System",
    dates: "Jul 2025 – Sep 2025",
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate", "Maven", "JavaScript", "Bootstrap"],
    bullets: [
      "Full-stack MVC app to digitize safari operations: bookings, vehicle assignments, guide scheduling",
      "Secure multi-role authentication (Admins, Customers, Staff)",
      "Optimized MySQL schema via Hibernate for complex entity relationships",
    ],
    github: "https://github.com/sadeepnimsara555-del",
  },
  {
    id: 3,
    title: "Heart Failure Prediction",
    dates: "Jul 2025 – Sep 2025",
    tech: ["Python", "TensorFlow", "Pandas", "NLTK", "TF-IDF", "PCA", "SVM", "Scikit-learn", "Matplotlib"],
    bullets: [
      "Complete ML pipeline with custom text preprocessing (cleaning, tokenization, stopword removal)",
      "TF-IDF vectorization + PCA for dimensionality reduction",
      "Compared KNN, Logistic Regression, Random Forest, XGBoost, SVM, and a Neural Network (MLPClassifier) using Accuracy, Precision, Recall, F1-score, ROC-AUC",
    ],
    github: "https://github.com/sadeepnimsara555-del",
  },
  {
    id: 4,
    title: "Online Bakery Store Management System",
    dates: "Feb 2025 – Apr 2025",
    tech: ["Java", "Spring Boot", "IntelliJ IDEA", "HTML", "CSS", "JavaScript"],
    bullets: [
      "Web app applying OOP principles to manage products, users, and transactions",
      "CRUD operations, file handling, custom data structures (Linked Lists)",
    ],
    github: "https://github.com/sadeepnimsara555-del",
  },
];

export const education = [
  {
    id: 1,
    degree: "BSc (Hons) in Information Technology, Specializing in Artificial Intelligence",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    dates: "2024 – 2028",
    current: true,
  },
  {
    id: 2,
    degree: "G.C.E. Advanced Level (A/L)",
    institution: "P de S Kularathna College, Ambalangoda",
    dates: "2019 – 2021",
    current: false,
  },
  {
    id: 3,
    degree: "G.C.E. Ordinary Level (O/L)",
    institution: "Future for Children College, Kosgoda",
    dates: "2007 – 2018",
    current: false,
  },
];

export const certifications = [
  {
    id: 1,
    title: "Certificate in AI/ML Engineer – Stage 1",
    issuer: "SLIIT",
    url: "https://code.sliit.org/certificates/tj0cpdil15",
  },
  {
    id: 2,
    title: "Certificate in AI/ML Engineer – Stage 2",
    issuer: "SLIIT",
    url: "https://code.sliit.org/certificates/hvw0vt2vfs",
  },
  {
    id: 3,
    title: "Web Design for Beginners",
    issuer: "Open University of Sri Lanka",
    url: "https://lnkd.in/p/gsZrj4xs",
  },
  {
    id: 4,
    title: "Information Communication Technology Technician (NVQ Level 3)",
    issuer: "NAITA / OWF",
    url: "https://owf.lk",
  },
];

export const leadership = [
  {
    id: 1,
    role: "Head Prefect",
    institution: "Future for Children College",
    dates: "2018",
    description:
      "Led the prefect team, coordinated student-related activities and events, and represented the student body to school management.",
  },
  {
    id: 2,
    role: "Junior Prefect",
    institution: "Future for Children College",
    dates: "2015 – 2017",
    description:
      "Maintained discipline, supported school activities and student management across multiple academic years.",
  },
];
