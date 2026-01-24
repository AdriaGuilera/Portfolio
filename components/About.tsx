"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [100, -100],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [50, -50],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const collageItems = [
    {
      src: "/media/studying.png",
      alt: "Studying - Always learning and growing",
      className: "col-span-2 row-span-2",
    },
    {
      src: "/media/lifting.png",
      alt: "Lifting - Staying active and healthy",
      className: "col-span-1 row-span-1",
    },
    {
      src: "/media/fishing.png",
      alt: "Fishing - Finding peace in nature",
      className: "col-span-1 row-span-1",
    },
  ];

  const skills = [
    "Python",
    "LangChain & AI",
    "TypeScript",
    "Nest.js",
    "Flutter & Dart",
    "Angular",
    "Docker & SQL",
    "Git & C++",
  ];

  return (
    <section
      id="about"
      className="section-padding bg-surface overflow-hidden"
      ref={containerRef}
      aria-labelledby="about-heading"
    >
      <motion.div
        className="container-width"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        ref={ref}
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 id="about-heading" className="heading-2 mb-4">
            About
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

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Activity Collage with parallax */}
          <motion.div
            className="relative order-2 lg:order-1"
            style={{ y: imageY }}
          >
            <motion.div
              className="grid grid-cols-2 grid-rows-2 gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 1,
                delay: prefersReducedMotion ? 0 : 0.4,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {/* Studying image - top left */}
              <motion.div
                className="relative aspect-square bg-background border border-border overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.5,
                }}
              >
                <Image
                  src="/media/studying.png"
                  alt="Studying - Always learning and growing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>

              {/* Gym image - top right */}
              <motion.div
                className="relative aspect-square bg-background border border-border overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.6,
                }}
              >
                <Image
                  src="/media/lifting.png"
                  alt="Gym - Staying active and healthy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 12vw"
                />
              </motion.div>

              {/* Coding image - bottom left */}
              <motion.div
                className="relative aspect-square bg-background border border-border overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.7,
                }}
              >
                <Image
                  src="/media/coding2.png"
                  alt="Coding - Building things"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 12vw"
                />
              </motion.div>

              {/* Fishing image - bottom right */}
              <motion.div
                className="relative aspect-square bg-background border border-border overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.8,
                }}
              >
                <Image
                  src="/media/fishing.png"
                  alt="Fishing - Finding peace in nature"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 12vw"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div className="order-1 lg:order-2" style={{ y: textY }}>
            <motion.div variants={itemVariants}>
              <h3 className="heading-3 mb-6">Who I Am</h3>
              <div className="space-y-4 body-text mb-10">
                <p>
                  I'm a passionate Full Stack Developer and AI enthusiast from
                  Barcelona, currently wrapping up my BS in Software Engineering
                  at FIB UPC (graduating June 2026). The only thing remaining is
                  my bachelor's thesis, which I'm developing around Knowledge
                  Graphs and AI Agents.
                </p>
                <p>
                  Working full-stack at K·Factor, building mobile apps and AI
                  agents. On the side, I'm developing Livea—an AI-powered
                  ticketing system for real estate managers, and providing AI
                  consulting for small and medium businesses.
                </p>
                <p>
                  I'm drawn to startups focused on real-world problems, shipping
                  simple things that work rather than overengineering. I'm eager
                  to transition more deeply into AI, learning as much as
                  possible while contributing wherever I can.
                </p>
                <p>
                  When I'm not coding, you'll find me at the gym , or fishing by
                  the sea.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
