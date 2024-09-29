import { useState, cloneElement } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  // FaCoffee, (Line 59)
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiCloudflare,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { GiServerRack } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function AboutMe() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: "React", icon: <FaReact />, color: "text-blue-400" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
    { name: "Express", icon: <SiExpress />, color: "text-gray-400" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
    { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
    { name: "Prisma", icon: <SiPrisma />, color: "text-blue-400" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-300" },
    { name: "AWS", icon: <FaAws />, color: "text-yellow-500" },
    { name: "Docker", icon: <FaDocker />, color: "text-blue-500" },
    { name: "Serverless", icon: <GiServerRack />, color: "text-purple-500" },
    { name: "Cloudflare", icon: <SiCloudflare />, color: "text-orange-500" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/shahzaib-afzal",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://x.com/theshahzaib_?t=DJuCqG-ooyw1QlvOnYBK_Q&s=09",
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      url: "mailto:shahzaib.workk@gmail.com",
    },
    // {
    //   name: "Buy Me a Coffee",
    //   icon: <FaCoffee />,
    //   url: "https://www.buymeacoffee.com/theshahzaibafzal",
    // },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#050520] to-[#2a1b3d] font-sans text-white">
      <div className="container relative mx-auto px-4 py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-blob absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-50 mix-blend-multiply blur-xl filter"></div>
          <div className="animate-blob animation-delay-2000 absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-yellow-500 opacity-50 mix-blend-multiply blur-xl filter"></div>
          <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-pink-500 opacity-50 mix-blend-multiply blur-xl filter"></div>
        </div>

        <div className="relative z-10">
          <header className="mb-16 text-center">
            <motion.div
              className="mx-auto mb-4 mt-[-45px] h-44 w-44 rounded-full border-4 border-purple-500 bg-cover bg-center shadow-lg"
              style={{
                backgroundImage:
                  "url('https://cdn.ratemycampus.live/profile-img/Shahzaib%20Afzal1')",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h1
              className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Shahzaib Afzal
            </motion.h1>
            <motion.p
              className="text-base text-gray-300 sm:text-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Full-Stack Developer | Computer Scientist | Tech Enthusiast
            </motion.p>
          </header>

          <div className="grid items-start gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                About Me
              </h2>
              <p className="mb-6 text-gray-300">
                Passionate about creating innovative web solutions and pushing
                the boundaries of what's possible in tech. With a keen eye for
                detail and a love for clean, efficient code, I bring ideas to
                life through the power of modern web technologies.
              </p>
              <div className="mb-8 flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium transition-all hover:bg-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cloneElement(link.icon, { className: "w-5 h-5" })}
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <h2 className="mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                Featured Project
              </h2>
              <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-lg font-bold text-purple-400 sm:text-2xl">
                  RateMyCampus
                </h3>
                <p className="mb-4 text-gray-300">
                  A revolutionary platform for students to rate and review their
                  university experiences.
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-gray-400">
                  <li>Comprehensive, user-driven campus ratings</li>
                  <li>Real-time updates and intuitive interfaces</li>
                  <li>Robust backend systems for scalability</li>
                  <li>Cutting-edge tech stack</li>
                </ul>
                <Link to={"/"}>
                  <motion.div
                    className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore RateMyCampus
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                Tech Stack & Skills
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white/5 p-4 backdrop-blur-sm transition-all ${
                      hoveredSkill === skill.name ? "bg-white/20" : ""
                    }`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <div className={`mb-2 text-4xl ${skill.color}`}>
                      {skill.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.footer
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
              Let's Connect
            </h2>
            <p className="mb-6 text-gray-300 sm:text-xl">
              I'm always excited to collaborate on new projects or discuss the
              latest in web development. Whether you have a brilliant idea or
              just want to chat tech, don't hesitate to reach out!
            </p>
            <motion.a
              href="mailto:shahzaib.workk@gmail.com"
              className="inline-block rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-8 py-4 font-bold text-white transition-all hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
