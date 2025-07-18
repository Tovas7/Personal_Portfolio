"use client"

import { useState, useEffect } from "react"
import * as echarts from "echarts"
import { motion, useScroll, useTransform } from "framer-motion"
import CVDownload from "../components/cv-download"
import ThemeToggle from "../components/theme-toggle"
import { useTheme } from "../hooks/use-theme"
import FadeIn from "../components/animations/fade-in"
import StaggerContainer from "../components/animations/stagger-container"
import StaggerItem from "../components/animations/stagger-item"
import ParallaxSection from "../components/animations/parallax-section"
import FloatingElement from "../components/animations/floating-element"
import MagneticButton from "../components/animations/magnetic-button"
import ScrollProgress from "../components/animations/scroll-progress"

export default function App() {
  const { darkMode, setDarkMode, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Initialize skill charts
  useEffect(() => {
    if (!mounted) return

    const frontendChart = echarts.init(document.getElementById("frontend-skills"))
    const backendChart = echarts.init(document.getElementById("backend-skills"))

    const frontendOption = {
      animation: true,
      animationDuration: 2000,
      animationEasing: "cubicOut",
      radar: {
        indicator: [
          { name: "React", max: 100 },
          { name: "Next.js", max: 100 },
          { name: "TypeScript", max: 100 },
          { name: "Tailwind CSS", max: 100 },
          { name: "HTML/CSS", max: 100 },
        ],
        radius: 80,
        splitNumber: 4,
        axisName: {
          color: darkMode ? "#9CA3AF" : "#374151",
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: darkMode ? "#374151" : "#E5E7EB",
          },
        },
        splitArea: {
          show: false,
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [95, 90, 85, 92, 98],
              name: "Frontend Skills",
              areaStyle: {
                color: "rgba(59, 130, 246, 0.1)",
              },
              lineStyle: {
                color: "rgba(59, 130, 246, 1)",
                width: 2,
              },
              symbol: "circle",
              symbolSize: 4,
            },
          ],
        },
      ],
    }

    const backendOption = {
      animation: true,
      animationDuration: 2000,
      animationEasing: "cubicOut",
      animationDelay: 500,
      radar: {
        indicator: [
          { name: "Node.js", max: 100 },
          { name: "Express", max: 100 },
          { name: "MongoDB", max: 100 },
          { name: "GraphQL", max: 100 },
          { name: "AWS", max: 100 },
        ],
        radius: 80,
        splitNumber: 4,
        axisName: {
          color: darkMode ? "#9CA3AF" : "#374151",
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: darkMode ? "#374151" : "#E5E7EB",
          },
        },
        splitArea: {
          show: false,
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [88, 85, 80, 75, 82],
              name: "Backend Skills",
              areaStyle: {
                color: "rgba(16, 185, 129, 0.1)",
              },
              lineStyle: {
                color: "rgba(16, 185, 129, 1)",
                width: 2,
              },
              symbol: "circle",
              symbolSize: 4,
            },
          ],
        },
      ],
    }

    frontendChart.setOption(frontendOption)
    backendChart.setOption(backendOption)

    const handleResize = () => {
      frontendChart.resize()
      backendChart.resize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      frontendChart.dispose()
      backendChart.dispose()
    }
  }, [darkMode, mounted])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "testimonials", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setMenuOpen(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <ScrollProgress />

      {/* Header */}
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
          darkMode ? "bg-gray-900/90 text-white border-gray-800" : "bg-white/90 text-gray-900 border-gray-200"
        } border-b`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg">MULUKEN</span>
              </motion.div>
              {/* <div>
                <span className="text-xl font-bold">Mu</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Senior Full Stack Developer</p>
              </div> */}
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                {["home", "about", "experience", "projects", "skills", "testimonials", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`cursor-pointer whitespace-nowrap capitalize font-medium hover:text-blue-600 transition-colors relative ${
                      activeSection === item ? "text-blue-600" : ""
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                    {activeSection === item && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </motion.div>
            </div>

            <motion.button
              className="md:hidden cursor-pointer whitespace-nowrap p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.i
                className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-xl`}
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile menu */}
          <motion.div
            className="md:hidden overflow-hidden"
            initial={false}
            animate={{ height: menuOpen ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
          >
            <div className="py-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col space-y-4">
                {["home", "about", "experience", "projects", "skills", "testimonials", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`cursor-pointer whitespace-nowrap capitalize font-medium hover:text-blue-600 transition-colors text-left ${
                      activeSection === item ? "text-blue-600" : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -20 }}
                    transition={{ delay: menuOpen ? 0.1 * index : 0, duration: 0.3 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Theme</span>
                  <div className="flex items-center space-x-3">
                    <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen flex items-center overflow-hidden"
      >
        <motion.div
          className={`absolute inset-0 transition-colors duration-300 ${
            darkMode
              ? "bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900"
              : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
          }`}
          style={{ y: heroY, opacity: heroOpacity }}
        />

        {/* Floating background elements */}
        <FloatingElement className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full" duration={4} />
        <FloatingElement className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full" duration={6} />
        <FloatingElement className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full" duration={5} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-4">
                  <motion.p
                    className="text-blue-600 font-semibold text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Welcome to my portfolio
                  </motion.p>
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <span
                      className={`block transition-colors duration-300 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      I'm
                    </span>
                    <motion.span
                      className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      Muluken Zewdu
                    </motion.span>
                  </motion.h1>
                  <motion.h2
                    className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Full Stack Developer | Software Engineer | MERN Specialist
                  </motion.h2>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={1}>
                <p
                  className={`text-lg max-w-lg leading-relaxed transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                 Full-stack developer specializing in the MERN stack, real-time systems, and 3D visualization.
                <br />I build efficient, scalable solutions for education and aerospace, turning ideas into functional software. 
                <br />Let’s create something impactful.

                </p>
              </FadeIn>

              <FadeIn direction="up" delay={1.2}>
                <div className="flex flex-wrap gap-4">
                  <MagneticButton>
                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer whitespace-nowrap font-semibold shadow-lg"
                      onClick={() => scrollToSection("projects")}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View My Work
                    </motion.button>
                  </MagneticButton>
                  <MagneticButton>
                    <motion.button
                      className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap font-semibold"
                      onClick={() => scrollToSection("contact")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Let's Connect
                    </motion.button>
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.8} className="hidden md:block">
              <ParallaxSection speed={0.2}>
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                    animate={{ rotate: [6, 8, 6] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.img
                    src="/public/Profile 1.jpg?height=600&width=600"
                    alt="Muluken Zewdu - Software Engineer"
                    className="relative rounded-2xl shadow-2xl max-w-full h-auto object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </ParallaxSection>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p
                className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
               Transforming ideas into powerful digital solutions with hands-on expertise in full-stack development,<br />
                specializing in MERN stack, real-time systems, and 3D visualization across education and aerospace sectors.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <ParallaxSection speed={0.3}>
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                    animate={{ rotate: [-6, -4, -6] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.img
                    src="/public/Profile 2.jpg?height=500&width=600"
                    alt="Muluken Zewdu working"
                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </ParallaxSection>
            </FadeIn>

            <div className="space-y-8">
              <FadeIn direction="right" delay={0.2}>
                <div>
                  <h3 className="text-3xl font-bold mb-6">Professional Journey</h3>
                  <div
                    className={`space-y-6 text-lg leading-relaxed transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <p>
                    I'm a passionate Full Stack Developer with expertise in building scalable, real-time web applications.
                    I earned my BSc in Computer Science from Debre Tabor University with a 3.56 GPA.
                    My work spans education and aerospace, blending MERN stack development with 3D visualization.
                    </p>
                    <p>
                      Specialized in modern JavaScript ecosystems including React, Next.js, and Node.js, 
                      <br />with a focus on building scalable web applications, integrating APIs, <br />
                      and enhancing performance through real-time features and UI/UX optimization.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.2}>
                <StaggerItem>
                  <motion.div
                    className={`text-center p-6 rounded-xl shadow-lg transition-colors duration-300 ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <motion.div
                      className="text-3xl font-bold text-blue-600 mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                    >
                      10+
                    </motion.div>
                    <div className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Projects Completed
                    </div>
                  </motion.div>
                </StaggerItem>

                <StaggerItem>
                  <motion.div
                    className={`text-center p-6 rounded-xl shadow-lg transition-colors duration-300 ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <motion.div
                      className="text-3xl font-bold text-purple-600 mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.7 }}
                    >
                      1+
                    </motion.div>
                    <div className={`transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Years Experience
                    </div>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>

              <FadeIn direction="up" delay={0.6}>
                <CVDownload className="pt-4" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Experience</h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A track record of delivering exceptional results across diverse industries and technologies
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="space-y-12" staggerDelay={0.3}>
              {[
                {
                  title: "Software Development Team Member",
                  company: "Gafat Aeropspace Engineering Development Center",
                  period: "Oct 2022 – Feb 2025",
                  description:
                    "Designed and implemented robust backend architectures and RESTful APIs to support critical aerospace research initiatives",
                    "Developed high-fidelity 3D simulation systems to enable advanced data visualization and real-time analysis",
                    "Engineered cloud-native solutions to optimize operational workflows and enhance system scalability.",
                  technologies: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
                },
                {
                  title: "Software Engineering Intern",
                  company: "Debre Markos University",
                  period: "June 2024 – Sep 2024",
                  description:
                    "Developed a full-stack dormitory management system using React and Node.js, automating room assignments and maintenance requests for 500+ students.",
                    "Collaborated with university staff to gather requirements and implement solutions that improved administrative efficiency by 70%.",
                    "Designed and deployed a user-friendly interface with role-based access control, ensuring smooth adoption by the housing department.",
                  technologies: ["React Js", "Node Js", "MongoDB", "Express", "Tailwind CSS"],
                },
              ].map((job, index) => (
                <StaggerItem key={index}>
                  <div className="relative pl-8 pb-12 border-l-2 border-blue-200 dark:border-blue-800 last:pb-0">
                    <motion.div
                      className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    />
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                          <p className="text-lg text-blue-600 font-semibold">{job.company}</p>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 font-medium">{job.period}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Showcasing innovative solutions built with cutting-edge technologies and attention to detail
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.2}>
            {[
              {
                title: "Podcastify- Podcast Publishing Platform",
                description:
                  " A Next.js-powered podcast hosting platform that streamlines content creation with AI-powered publishing tools, seamless cross-platform distribution to Spotify/Apple/Google, and actionable real-time analytics for creators",
                image: "https://www.google.com/imgres?q=Podcastify-%20Podcast%20Publishing%20Platform%20images&imgurl=https%3A%2F%2Fhelloaudio.fm%2Fwp-content%2Fuploads%2F2024%2F05%2FTop-10-Podcast-Platforms-for-Distribution-Monetization-Video-and-More-1-1024x683.png&imgrefurl=https%3A%2F%2Fhelloaudio.fm%2Fpodcast-platforms%2F&docid=ynadzu_v7kFXFM&tbnid=XpWPv9Bd_6z_2M&vet=12ahUKEwiA24uohLCOAxU20wIHHX2-GqwQM3oECHMQAA..i&w=1024&h=683&hcb=2&ved=2ahUKEwiA24uohLCOAxU20wIHHX2-GqwQM3oECHMQAA?height=400&width=600",
                tags: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "Supabase"],
                demo: "#",
                github: "#",
                featured: true,
              },
              {
                title: "SendSwift - File Sharing System",
                description:
                  "A React Native file-sharing app enabling offline P2P transfers, self-destructing files, and decentralized storage for secure, internet-independent sharing",
                image: "https://www.google.com/imgres?q=File%20Sharing%20System%20images&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1570184671%2Fphoto%2Fperson-holding-digital-tablet-with-cloud-storage-security-concept.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DNap8gDH3RMLu1XFZD_CQD7hQl4kiss_26nz2wDkHqcI%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ffile-sharing&docid=HEyzfryjpiC0sM&tbnid=H01favF0Czy7bM&vet=12ahUKEwiPx83QhLCOAxU1ywIHHSGUHkcQM3oECCYQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwiPx83QhLCOAxU1ywIHHSGUHkcQM3oECCYQAA?height=400&width=600",
                tags:["React Native", "Node.js", "PostgreSQL", "IPFS", "WebRTC"],
                demo: "#",
                github: "#",
                featured: true,
              },
              {
                title: "TripPlanner -  AI-powered travel assistant",
                description:
                  "Transform trip planning with AI-curated itineraries tailored to your budget, interests, and travel style—all in one app.",
                image: "https://www.google.com/imgres?q=AI-powered%20travel%20assistant%20images&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fai-powered-travel-assistant-ready-take-you-unforgettable-journey-futuristic-robot-with-luggage-eiffel-tower-background_856795-84734.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fai-powered-travel-assistant-ready-take-you-unforgettable-journey-futuristic-robot-with-luggage-eiffel-tower-background_324240601.htm&docid=KCmUIIUZOCwAPM&tbnid=fuLsv4m13D_G1M&vet=12ahUKEwjHp5vshLCOAxWjzQIHHQ4VItoQM3oECB0QAA..i&w=626&h=626&hcb=2&ved=2ahUKEwjHp5vshLCOAxWjzQIHHQ4VItoQM3oECB0QAA?height=400&width=600",
                tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
                demo: "#",
                github: "https://github.com/Tovas7/TripPlanner",
                featured: false,
              },
              {
                title: "Debre Tabor University E-Learning Platform",
                description:
                  "A full-stack MERN e-learning platform for Debre Tabor University, enabling seamless course management, interactive assessments, and real-time academic tracking with secure authentication and scalable architecture",
                image: "https://www.google.com/imgres?q=e%20learning%20images&imgurl=https%3A%2F%2Fcdn.elearningindustry.com%2Fwp-content%2Fuploads%2F2021%2F08%2FTop-5-Benefits-Of-eLearning-Education.png&imgrefurl=https%3A%2F%2Felearningindustry.com%2Ftop-benefits-of-elearning-education&docid=SHvckqdperxIPM&tbnid=lvPsUPytwqNFrM&vet=12ahUKEwi-oOmfhrCOAxVs2wIHHULxD9QQM3oECCkQAA..i&w=820&h=460&hcb=2&ved=2ahUKEwi-oOmfhrCOAxVs2wIHHULxD9QQM3oECCkQAA?height=400&width=600",
                tags: ["MERN Stack", "JWT Auth", "LMS", "Socket.io", "Higher Ed Tech"],
                demo: "#",
                github: "#",
                featured: false,
              },
              {
                title: "NeatBot- File Automation Tool",
                description:
                  "A Python-based desktop automation tool that intelligently organizes files, eliminates duplicates, and maintains data integrity through non-destructive operations and automated backups",
                image: "https://www.google.com/imgres?q=File%20Automation%20Tool%20images&imgurl=https%3A%2F%2Fwww.goanywhere.com%2Fsites%2Fdefault%2Ffiles%2Fgoanywhere%2F043019-ga-everything-you-need-to-know-about-ftp-automation-software-850x330.jpg&imgrefurl=https%3A%2F%2Fwww.goanywhere.com%2Fblog%2Feverything-you-need-to-know-about-ftp-automation-software&docid=13R4UULoLUDBjM&tbnid=6SsvTMiDMas-TM&vet=12ahUKEwjb5Ym1hrCOAxUdxAIHHaHVF58QM3oECFgQAA..i&w=850&h=330&hcb=2&ved=2ahUKEwjb5Ym1hrCOAxUdxAIHHaHVF58QM3oECFgQAA?height=400&width=600",
                tags: ["Python", "PyQt", "File Automation", "Data Integrity", "Desktop App"],
                demo: "#",
                github: "https://github.com/Tovas7/NeatBot",
                featured: false,
              },
              {
                title: "Developer Portfolio Platform",
                description:
                  "A modern, responsive portfolio website with advanced animations, dark mode support, and optimized performance. Built with accessibility in mind.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
                demo: "#",
                github: "https://github.com/Tovas7/Personal_Portfolio",
                featured: false,
              },
            ].map((project, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className={`group relative bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                    project.featured ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                    >
                      Featured
                    </motion.div>
                  )}
                  <div className="h-64 overflow-hidden">
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <MagneticButton>
                        <a
                          href={project.demo}
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer whitespace-nowrap font-semibold"
                        >
                          <i className="fas fa-external-link-alt mr-2"></i>
                          Live Demo
                        </a>
                      </MagneticButton>
                      <MagneticButton>
                        <a
                          href={project.github}
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap font-semibold"
                        >
                          <i className="fab fa-github mr-2"></i>
                          Source Code
                        </a>
                      </MagneticButton>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Expertise</h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive skill set spanning modern web technologies, cloud platforms, and development methodologies
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-12 mb-16" staggerDelay={0.3}>
            <StaggerItem>
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h3 className="text-2xl font-bold mb-8 text-center">Frontend Development</h3>
                <div id="frontend-skills" className="w-full h-80 mb-8"></div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "HTML5", icon: "fab fa-html5", color: "text-orange-600" },
                    { name: "CSS3", icon: "fab fa-css3-alt", color: "text-blue-600" },
                    { name: "JavaScript", icon: "fab fa-js", color: "text-yellow-500" },
                    { name: "React", icon: "fab fa-react", color: "text-blue-500" },
                    { name: "Sass", icon: "fab fa-sass", color: "text-pink-500" },
                    { name: "Bootstrap", icon: "fab fa-bootstrap", color: "text-purple-600" },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.i
                        className={`${skill.icon} text-4xl mb-3 ${skill.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h3 className="text-2xl font-bold mb-8 text-center">Backend Development</h3>
                <div id="backend-skills" className="w-full h-80 mb-8"></div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "Node.js", icon: "fab fa-node-js", color: "text-green-600" },
                    { name: "Python", icon: "fab fa-python", color: "text-blue-500" },
                    { name: "PHP", icon: "fab fa-php", color: "text-purple-600" },
                    { name: "MySQL", icon: "fas fa-database", color: "text-blue-600" },
                    { name: "MongoDB", icon: "fas fa-leaf", color: "text-green-600" },
                    { name: "AWS", icon: "fab fa-aws", color: "text-orange-500" },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.i
                        className={`${skill.icon} text-4xl mb-3 ${skill.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn direction="up">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Tools & Technologies</h3>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" staggerDelay={0.1}>
                {[
                  { name: "Git", icon: "fab fa-git-alt", color: "text-red-600" },
                  { name: "GitHub", icon: "fab fa-github", color: "text-gray-800 dark:text-white" },
                  { name: "Docker", icon: "fab fa-docker", color: "text-blue-500" },
                  { name: "VS Code", icon: "fas fa-code", color: "text-blue-600" },
                  { name: "Figma", icon: "fab fa-figma", color: "text-purple-600" },
                  { name: "Jira", icon: "fab fa-jira", color: "text-blue-600" },
                  { name: "NPM", icon: "fab fa-npm", color: "text-red-600" },
                  { name: "Webpack", icon: "fas fa-box-open", color: "text-blue-500" },
                  { name: "Linux", icon: "fab fa-linux", color: "text-gray-800 dark:text-white" },
                  { name: "Heroku", icon: "fas fa-h-square", color: "text-purple-600" },
                  { name: "Netlify", icon: "fas fa-server", color: "text-teal-600" },
                  { name: "Vercel", icon: "fas fa-triangle", color: "text-gray-800 dark:text-white" },
                ].map((tool, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center group"
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <motion.i
                        className={`${tool.icon} text-5xl mb-4 ${tool.color}`}
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="font-semibold">{tool.name}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials</h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                What clients and colleagues say about working with me
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.2}>
            {[
              {
                name: "Mr Moges Tsegaw",
                role: " Computer Science Department Head at Debre Tabor University",
                content:
                  "Muluken is an exceptional problem-solver with the rare ability to turn theoretical knowledge into real-world solutions—a true asset to any tech team.",
                avatar: "data:image/jpeg;base64,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?height=80&width=80",
                rating: 5,
              },
              {
                name: "Dr. Habtu Hailu",
                role: "Lecturer at Debre Tabor University",
                content:
                  "A brilliant mind with relentless curiosity, Muluken consistently pushed boundaries in my Data Mining and Warehousing class, setting a benchmark for excellence",
                avatar: "data:image/jpeg;base64,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?height=80&width=80",
                rating: 5,
              },
              {
                name: "Mr. Getasew Nibretu",
                role: "Final Year Project Advisor",
                content:
                  "Watching Muluken's  final project—from concept to flawless execution—confirmed their potential as a future tech innovator",
                avatar: "data:image/jpeg;base64,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?height=80&width=80",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="flex items-center mb-6">
                    <motion.img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.i
                        key={i}
                        className="fas fa-star text-yellow-500"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">"{testimonial.content}"</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ready to bring your next project to life? Let's discuss how we can create something amazing together.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn direction="left">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                    <label htmlFor="name" className="block mb-3 font-semibold text-lg">
                      Full Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 text-lg transition-all duration-300"
                      placeholder="Enter your full name"
                      whileFocus={{ borderColor: "#3B82F6" }}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                    <label htmlFor="email" className="block mb-3 font-semibold text-lg">
                      Email Address
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 text-lg transition-all duration-300"
                      placeholder="Enter Your Email"
                      whileFocus={{ borderColor: "#3B82F6" }}
                    />
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="subject" className="block mb-3 font-semibold text-lg">
                    Project Subject
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 text-lg transition-all duration-300"
                    placeholder="Brief project description"
                    whileFocus={{ borderColor: "#3B82F6" }}
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="message" className="block mb-3 font-semibold text-lg">
                    Project Details
                  </label>
                  <motion.textarea
                    id="message"
                    rows={6}
                    className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 text-lg resize-none transition-all duration-300"
                    placeholder="Tell me about your project, timeline, and requirements..."
                    whileFocus={{ borderColor: "#3B82F6" }}
                  />
                </motion.div>
                <MagneticButton>
                  <motion.button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer whitespace-nowrap font-semibold text-lg shadow-lg"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </MagneticButton>
              </form>
            </FadeIn>

            <FadeIn direction="right">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                  <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                    <StaggerItem>
                      <div className="flex items-start">
                        <motion.div
                          className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Location</h4>
                          <p className="text-gray-600 dark:text-gray-300">Addis Abeba,Ethiopia</p>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="flex items-start">
                        <motion.div
                          className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <i className="fas fa-envelope text-blue-600 text-xl"></i>
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Email</h4>
                          <p className="text-gray-600 dark:text-gray-300">raphaeltovas6@gmailcom</p>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="flex items-start">
                        <motion.div
                          className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <i className="fas fa-phone-alt text-blue-600 text-xl"></i>
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Phone</h4>
                          <p className="text-gray-600 dark:text-gray-300">+251961061510</p>
                        </div>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-8">Connect With Me</h3>
                  <StaggerContainer className="flex space-x-4" staggerDelay={0.1}>
                    {[
                      { icon: "fab fa-linkedin-in", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
                      { icon: "fab fa-github", bg: "bg-gray-800", hover: "hover:bg-gray-900" },
                      { icon: "fab fa-twitter", bg: "bg-blue-400", hover: "hover:bg-blue-500" },
                      { icon: "fab fa-youtube", bg: "bg-red-600", hover: "hover:bg-red-700" },
                    ].map((social, index) => (
                      <StaggerItem key={index}>
                        <MagneticButton>
                          <motion.a
                            href="#"
                            className={`w-14 h-14 rounded-xl ${social.bg} flex items-center justify-center text-white text-xl ${social.hover} transition-colors cursor-pointer shadow-lg`}
                            whileHover={{
                              scale: 1.1,
                              y: -5,
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className={social.icon}></i>
                          </motion.a>
                        </MagneticButton>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>

                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Current Availability</h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm currently accepting new projects and collaborations. Let's discuss how I can help bring your
                    vision to life.
                  </p>
                  <motion.div
                    className="flex items-center text-green-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.i
                      className="fas fa-check-circle mr-3 text-xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="font-semibold text-lg">Available for new projects</span>
                  </motion.div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className={`py-12 border-t ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <FadeIn direction="left">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-white font-bold text-lg">MZ</span>
                  </motion.div>
                  <span className="text-xl font-bold">Muluken Zewdu</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  © {new Date().getFullYear()} Muluken Zewdu. All rights reserved.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex space-x-6">
                  {["home", "about", "experience", "projects", "skills", "testimonials", "contact"].map(
                    (item, index) => (
                      <motion.button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className="capitalize text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {item}
                      </motion.button>
                    ),
                  )}
                </div>

                <MagneticButton>
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer whitespace-nowrap font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">Back to top</span>
                    <motion.i
                      className="fas fa-arrow-up"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.button>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
