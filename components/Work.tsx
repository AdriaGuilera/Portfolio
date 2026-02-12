"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Skills from "./Skills";
import WorkProjectCard from "./WorkProjectCard";

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const figureY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [150, -150],
  );
  const figureRotate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-10, 10],
  );

  const workExperience = [
    {
      title: "Junior FullStack Developer",
      company: "K·Factor Technologies",
      category: "Full-Stack & AI Development",
      description:
        "Built multi-tenant AI agents using Python and LangChain ecosystem. Developed and maintained Nest.js backends and Flutter mobile apps. Implemented RAG systems and SQL agents for intelligent document retrieval and database querying using LLMs.",
      tech: [
        "Python",
        "LangChain",
        "Nest.js",
        "Flutter",
        "RAG",
        "SQL Agents",
        "PostgreSQL",
      ],
      year: "Feb 2025 – Present",
    },
    {
      title: "AI Consulting for SMEs",
      company: "Freelance",
      category: "AI Integration & Consulting",
      description:
        "Consulting for small and medium companies to integrate AI into workflows. Built HR chatbot on Microsoft Teams with RAG architecture. Developed email management platform with AI-powered sorting. Created document extraction pipeline reducing manual entry by 70%.",
      tech: ["Python", "RAG", "Microsoft Teams", "LLMs"],
      year: "Feb 2025 – Present",
    },
  ];

  const projects = [
    {
      title: "Livea - AI Ticketing System",
      company: "Personal Project",
      category: "AI Development",
      description:
        "Building an AI-powered ticketing system for real estate managers with WhatsApp integration. Automating customer service and making property management more efficient.",
      tech: [
        "Python",
        "LangChain",
        "WhatsApp API",
        "AI Agents",
        "React",
        "Nest.js",
        "FastAPI",
      ],
      year: "Dec 2025 – Present",
    },
    {
      title: "For Fun Projects",
      company: "Personal",
      category: "Exploration & Learning",
      description:
        "Side projects built for experimentation and learning. Exploring new technologies, testing ideas, and building tools that solve interesting problems or just spark joy.",
      tech: ["Various Technologies"],
      year: "Ongoing",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section
      id="work"
      className="section-padding overflow-hidden scroll-mt-20"
      ref={containerRef}
      aria-labelledby="work-heading"
    >
      <motion.div
        className="container-width"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        ref={ref}
      >
        {/* Work Experience Section */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-20 gap-8">
            <motion.div variants={itemVariants}>
              <h2 id="work-heading" className="heading-2 mb-4">
                Work Experience
              </h2>
              <motion.div
                className="w-20 h-px bg-text"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : 0.3,
                }}
                style={{ originX: 0 }}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <div
            className="grid md:grid-cols-2 gap-8"
            role="list"
            aria-label="Work experience"
          >
            {workExperience.map((item, index) => (
              <WorkProjectCard
                key={item.title}
                {...item}
                index={index}
                indexOffset={0}
                type="work"
                itemVariants={itemVariants}
              />
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-20 gap-8">
            <motion.div variants={itemVariants}>
              <h2 className="heading-2 mb-4">Projects</h2>
              <motion.div
                className="w-20 h-px bg-text"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.8,
                  delay: prefersReducedMotion ? 0 : 0.3,
                }}
                style={{ originX: 0 }}
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <div
            className="grid md:grid-cols-2 gap-8"
            role="list"
            aria-label="Projects"
          >
            {projects.map((item, index) => (
              <WorkProjectCard
                key={item.title}
                {...item}
                index={index}
                indexOffset={200}
                type="project"
                itemVariants={itemVariants}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-border">
          <Skills />
        </div>
      </motion.div>
    </section>
  );
}
