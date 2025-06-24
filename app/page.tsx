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
                  Passionate about building scalable, high-performance web applications using modern technologies like the MERN stack. <br />
                  I specialize in crafting intuitive user experiences, real-time systems, <br />
                  and impactful digital solutions that drive both usability and innovation across sectors like education and aerospace.

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
                    src="/placeholder.svg?height=600&width=600"
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
                    src="/placeholder.svg?height=500&width=600"
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
                      50+
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
                  title: "Senior Full Stack Developer",
                  company: "TechCorp Solutions",
                  period: "2022 - Present",
                  description:
                    "Leading development of enterprise-scale applications serving 100K+ users. Architected microservices infrastructure reducing system latency by 40%. Mentoring junior developers and establishing best practices.",
                  technologies: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
                },
                {
                  title: "Full Stack Developer",
                  company: "Digital Innovations Inc",
                  period: "2020 - 2022",
                  description:
                    "Developed and maintained multiple client projects using modern web technologies. Implemented CI/CD pipelines improving deployment efficiency by 60%. Collaborated with cross-functional teams to deliver pixel-perfect designs.",
                  technologies: ["Next.js", "Express", "MongoDB", "GraphQL", "Tailwind CSS"],
                },
                {
                  title: "Frontend Developer",
                  company: "StartupXYZ",
                  period: "2019 - 2020",
                  description:
                    "Built responsive web applications from concept to deployment. Optimized application performance achieving 95+ Lighthouse scores. Worked closely with UX/UI designers to implement intuitive user interfaces.",
                  technologies: ["React", "Redux", "Sass", "Webpack", "Jest"],
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
                title: "Enterprise E-Commerce Platform",
                description:
                  "A comprehensive online marketplace with advanced features including real-time inventory management, multi-vendor support, and integrated payment processing serving 50K+ daily users.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
                demo: "#",
                github: "#",
                featured: true,
              },
              {
                title: "Project Management Suite",
                description:
                  "A collaborative project management application with real-time updates, advanced analytics, and team collaboration tools. Increased team productivity by 35%.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
                demo: "#",
                github: "#",
                featured: true,
              },
              {
                title: "Financial Analytics Dashboard",
                description:
                  "An interactive dashboard for financial data visualization with real-time market data, custom reporting, and predictive analytics capabilities.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "D3.js", "Express", "PostgreSQL", "Docker"],
                demo: "#",
                github: "#",
                featured: false,
              },
              {
                title: "Social Learning Platform",
                description:
                  "A modern learning management system with video streaming, interactive quizzes, progress tracking, and community features for enhanced learning experience.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "GraphQL", "Node.js", "MongoDB", "WebRTC"],
                demo: "#",
                github: "#",
                featured: false,
              },
              {
                title: "Weather Intelligence App",
                description:
                  "A sophisticated weather application with AI-powered forecasting, location-based alerts, and beautiful data visualizations for weather enthusiasts.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React Native", "Redux", "Weather API", "Machine Learning"],
                demo: "#",
                github: "#",
                featured: false,
              },
              {
                title: "Developer Portfolio Platform",
                description:
                  "A modern, responsive portfolio website with advanced animations, dark mode support, and optimized performance. Built with accessibility in mind.",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
                demo: "#",
                github: "#",
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
                  "John's technical expertise and attention to detail are exceptional. He delivered our project ahead of schedule and exceeded all expectations. His ability to translate complex requirements into elegant solutions is remarkable.",
                avatar: "/placeholder.svg?height=80&width=80",
                rating: 5,
              },
              {
                name: "Dr. Habtu Hailu",
                role: "Lecturer at Debre Tabor University",
                content:
                  "Working with John was a game-changer for our startup. His full-stack expertise helped us build a scalable platform that handles thousands of users seamlessly. Highly recommended!",
                avatar: "/placeholder.svg?height=80&width=80",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Design Lead at Digital Innovations",
                content:
                  "John has an incredible ability to bring designs to life with pixel-perfect precision. His collaboration skills and technical knowledge make him an invaluable team member.",
                avatar: "/placeholder.svg?height=80&width=80",
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
                      placeholder="Your full name"
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
                      placeholder="your.email@example.com"
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
                          <p className="text-gray-600 dark:text-gray-300">San Francisco, California, USA</p>
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
                          <p className="text-gray-600 dark:text-gray-300">john.doe@example.com</p>
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
                    <span className="text-white font-bold text-lg">JD</span>
                  </motion.div>
                  <span className="text-xl font-bold">John Doe</span>
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
