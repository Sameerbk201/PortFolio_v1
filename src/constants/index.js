import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
  ansible,
  arduino,
  azure,
  bash,
  c,
  car,
  chatapp,
  contact,
  cplus,
  css,
  devops,
  docker,
  estate,
  express,
  flask,
  git,
  github,
  GUI,
  homeautomation,
  html,
  IOT,
  java,
  javascript,
  jenkins,
  linkedin,
  linux,
  mobdev,
  mongodb,
  motion,
  mui,
  nextjs,
  nodejs,
  paramount,
  pizzaapp,
  pricewise,
  python,
  pytube,
  react,
  redux,
  RTOS,
  sass,
  savonia,
  snapgram,
  sql,
  summiz,
  tailwindcss,
  threads,
  typescript,
  videocall,
  waterlab,
  waterlaba,
  weather,
} from "../assets/icons";

export const skills = [
  {
    imageUrl: java,
    name: "Java",
    type: "programming language",
  },
  {
    imageUrl: docker,
    name: "Docker",
    type: "Devops",
  },
  {
    imageUrl: python,
    name: "Python",
    type: "programming language",
  },

  {
    imageUrl: jenkins,
    name: "Jenkins",
    type: "Devops",
  },

  {
    imageUrl: cplus,
    name: "c++",
    type: "programming language",
  },
  {
    imageUrl: c,
    name: "c",
    type: "programming language",
  },
  {
    imageUrl: devops,
    name: "CICD",
    type: "DevOps",
  },
  {
    imageUrl: azure,
    name: "Azure",
    type: "Cloud",
  },
  {
    imageUrl: ansible,
    name: "Ansible",
    type: "DevOps",
  },
  {
    imageUrl: arduino,
    name: "Arduino ",
    type: "Embedded Programming",
  },

  {
    imageUrl: linux,
    name: "Linux",
    type: "Os",
  },
  {
    imageUrl: mobdev,
    name: "React-Native",
    type: "Mobile Devlopment",
  },
  {
    imageUrl: sql,
    name: "SQL",
    type: "Database",
  },
  {
    imageUrl: bash,
    name: "Bash Scripting",
    type: "Scripting",
  },
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: express,
    name: "Express",
    type: "Backend",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: GUI,
    name: "Windows App Development",
    type: "Windows App",
  },
  {
    imageUrl: RTOS,
    name: "Real-Time-Operating-System",
    type: "Embeded Programming",
  },
  {
    imageUrl: IOT,
    name: "Internet Of Things",
    type: "IoT",
  },

  {
    imageUrl: mui,
    name: "Material-UI",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: redux,
    name: "Redux",
    type: "State Management",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: flask,
    name: "Flask",
    type: "Backend",
  },
];

export const experiences = [
  {
    title: "Intern",
    company_name:
      "Viimatech Digital Oy And Savonia University Of Applied Sciences",
    icon: savonia,
    iconBg: "#accbe1",
    date: "November 2021 - March 2022",
    points: [
      "Building a Professional Network: Actively networking with professionals in the field, fostering valuable connections contributing to personal and career growth.",
      "Researching Monitoring Solutions: Conducting comprehensive research on monitoring solutions to enhance industrial pumping system performance.",
      "Utilizing VT3 Field Devices: Hands-on experience with VT3 Field devices for accurate measurements and data collection.",
      "Creating User-Friendly Data Visualization: Developing a user-friendly interface for data visualization, ensuring accessibility of real-time analytics for stakeholders.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Savonia Unversity ",
    icon: savonia,
    iconBg: "#fbc3bc",
    date: "May 2023 - July 2023",
    points: [
      "Developing a Dynamic Web App: Created a dynamic web application and a robust backend using the MERN stack, incorporating modern technologies for efficient development.",
      "Implementing Real-Time Communication: Utilized Socket.IO for real-time communication, enabling seamless interaction between clients and servers.",
      "Integrating User Authentication and Role-Based Rendering: Implemented user authentication and role-based rendering to ensure secure access and personalized experiences.",
      "Visualizing Real-Time Data: Incorporated real-time data updates with visualizations, enhancing user experience and providing valuable insights.",
      "Efficient Backend Management: Engineered a backend system capable of handling multiple clients, integrating cloud storage, managing sensor data, and controlling hardware components for intrusion detection.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Kuopio Water Lab Savonia University",
    icon: waterlaba,
    iconBg: "#b7e4c7",
    date: "Sep 2023 - Dec 2023",
    points: [
      "Establishing Secure Connection to OPC UA Server: Implemented a secure connection to an OPC UA server, prioritizing data integrity and confidentiality.",
      "Retrieving and Validating Data: Retrieved data from the OPC UA server and ensured its integrity, potentially transforming it for visualization purposes.",
      "Utilizing Effective Visualization Techniques: Employed effective visualization techniques for real-time updates, enhancing the user experience and facilitating data interpretation.",
      "Designing User-Friendly Interface: Designed a user-friendly interface for seamless interaction with the information, prioritizing usability and accessibility.",
    ],
  },
  {
    title: "Cyber Security Intern",
    company_name: "Paramount Assure",
    icon: paramount,
    iconBg: "#000000",
    date: "Feb 2023 - Present",
    points: [],
  },
];

export const socialLinks = [

  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://linkedin.com/in/sameer-karn-589544230",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/bk201grsameer",
  },
];

export const projects = [
  {
    iconUrl: chatapp,
    theme: "btn-back-red",
    name: "Chat App Clone",
    description:
      "Developed a real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack and Socket.io for handling real-time communication",
    link: "https://github.com/bk201grsameer/Chat_Project_MERN",
  },
  {
    iconUrl: homeautomation,
    theme: "btn-back-blue",
    name: "A Simple Home Automation App",
    description:
      "Designed a web-based home automation app. Monitor sensors, control servos with ease using Arduino",
    link: "https://github.com/bk201grsameer/Sensor_Project?tab=readme-ov-file",
  },
  {
    iconUrl: videocall,
    theme: "btn-back-green",
    name: "Video Call App Using WebRTC",
    description:
      "Devloped a simple video call application built using WebRTC (Web Real-Time Communication) and Node.js as the signaling server. The app allows users to make video calls to each other by selecting phone numbers from a list and provides basic call management features",
    link: "https://github.com/bk201grsameer/Video_Call_APP_MERN",
  },

  {
    iconUrl: pytube,
    theme: "btn-back-pink",
    name: "Pytube",
    description:
      "The PyTube Downloader is a simple Python program that utilizes the pytube library to download videos from YouTube. This program provides an easy-to-use command-line interface for downloading your favorite videos in various formats and resolutions",
    link: "https://github.com/bk201grsameer/DownloadVideos",
  },
  {
    iconUrl: pizzaapp,
    theme: "btn-back-black",
    name: "A Simple Pizza App",
    description:
      "This application allows users to conveniently order pizzas of their choice, select different sizes, and make payments using PayPal",
    link: "https://github.com/bk201grsameer/FoodApp",
  },
  {
    iconUrl: weather,
    theme: "btn-back-yellow",
    name: "Weather App",
    description:
      "Created a simple terminal based weather app. This program utilizes Selenium WebDriver with ChromeDriver to fetch the current temperature and city information from a weather website. It is a simple example of web scraping for educational purposes. The program is written in Python",
    link: "https://github.com/bk201grsameer/GetWeather",
  },
];
