const navLinks = [
  { id: 1, name: "Work", link: "#work" },
  { id: 2, name: "Experience", link: "#experience" },
  { id: 3, name: "Skills", link: "#skills" },
  { id: 4, name: "Certifications", link: "#certifications" },
];

const words = [
  { id: 1, text: "Ideas", img: "./images/ideas.svg" },
  { id: 2, text: "Designs", img: "./images/designs.svg" },
  { id: 3, text: "Insights", img: "./images/insights.png" },
  { id: 4, text: "Concepts", img: "./images/concepts.svg" },
  { id: 5, text: "Ideas", img: "./images/ideas.svg" },
  { id: 6, text: "Designs", img: "./images/designs.svg" },
  { id: 7, text: "Insights", img: "./images/insights.png" },
  { id: 8, text: "Concepts", img: "./images/concepts.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Coding Experience" },
  { value: 15, suffix: "+", label: "Certifications Earned" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 3, suffix: "+", label: "Internships & Trainings Completed" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/Code.png",
    title: "Clean & Scalable Code",
    desc: "Writing efficient, modular code that’s easy to maintain and scale as your product grows.",
  },
  {
    imgPath: "/images/Prob.png",
    title: "Strong Problem Solving",
    desc: "Breaking down complex challenges and building practical solutions with clarity.",
  },
  {
    imgPath: "/images/User.png",
    title: "User-Centric Thinking",
    desc: "Designing with empathy to ensure user experience stays at the core of every decision.",
  },
];

const techStackImgs = [
  {
    name: "React",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Node.js",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Git",
    imgPath: "/images/logos/git.svg",
  },
];
const Certificates = [
  {
    name: "Google Data Analytics",
    imgPath: "images/Cert/Google.png",
  },
  {
    name: "Meta Frontend Developer",
    imgPath: "images/Cert/Meta.png",
  },
  {
    name: "React Js Mastery",
    imgPath: "images/Cert/React.png",
  },
  {
    name: "Python Mastery",
    imgPath: "images/Cert/Python.png",
  },
  {
    name: "Figma Designer",
    imgPath: "images/Cert/Figma.png",
  },
  {
    name: "Data Science and ML",
    imgPath: "images/Cert/Data.png",
  },
  /*
  {
    name: "Accenture Job Simulation",
    imgPath: "images/Cert/Accenture.png",
  },*/
];

const techStackIcons = [
  {
    name: "React JS",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Node.js",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },

  {
    name: "SQL",
    modelPath: "/models/SQL.glb",
    scale: 5,
    rotation: [0, 0, 0],
  },
  {
    name: "Git",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    id: 1,
    desc: "Worked on real-world backend development at TGH Technologies using Node.js, enhancing backend functionality and collaborating with the dev team.",
    imgPath: "/images/Tgh_TEch.png",
    logoPath: "/images/TGH_Logo.png",
    title: "Backend Developer Intern",
    date: "November 2023 – June 2024",
    responsibilities: [
      "Developed and maintained backend features using Node.js, improving application performance and reliability.",
      "Developed and consumed RESTful APIs, integrating them with front-end components for seamless data flow.",
      "Contributed to enhancing code quality, adding new features, and resolving bugs in the backend system.",
    ],
  },
  {
    id: 2,
    desc: "Developed mobile apps at Techmaghi with React Native, focusing on cross-platform UI development, component structuring, and design best practices.",
    imgPath: "/images/Techmaghi.png",
    logoPath: "/images/TechMaghi_logo.webp",
    title: "Android App Developer Intern",
    date: "January 2023",
    responsibilities: [
      "Learned the basics of mobile development using React Native.",
      "Built simple cross-platform mobile interfaces using JSX and React components.",
      "Participated in hands-on sessions to design and test UI components.",
    ],
  },
  {
    id: 3,
    desc: "Gained hands-on web development experience at Immensphere, building responsive interfaces and exploring modern workflows.",
    imgPath: "/images/Immensphere.png",
    logoPath: "/images/Immensphere_Logo.png",
    title: "Web Developer Intern",
    date: "September 2022 – November 2022",
    responsibilities: [
      "Learned to build responsive web pages using HTML, CSS, and JavaScript",
      "Explored front-end development with React.js and gained exposure to component-based design.",
      "Practiced version control using Git and GitHub for managing code and collaborating on tasks.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/el_d_iablo07?igsh=MXUydnhheWVmNmtnZQ==",
  },
  {
    name: "github",
    imgPath: "/images/github.png",
    link: "https://github.com/Roshan017",
  },

  {
    name: "x",
    imgPath: "/images/x.png",
    link: "https://x.com/RoshanPMath",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/roshan-mathew2104/",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  Certificates,
};
