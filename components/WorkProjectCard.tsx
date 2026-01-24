"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface WorkProjectCardProps {
  title: string;
  company: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  index: number;
  indexOffset?: number;
  type?: "work" | "project";
  itemVariants: {
    hidden: { y: number; opacity: number };
    visible: {
      y: number;
      opacity: number;
      transition: {
        duration: number;
        ease: number[];
      };
    };
  };
  href?: string;
  calltoAction?: boolean;
  onClick?: () => void;
}

export default function WorkProjectCard({
  title,
  company,
  category,
  description,
  tech,
  year,
  index,
  indexOffset = 0,
  type = "work",
  itemVariants,
  href,
  calltoAction = true,
  onClick,
}: WorkProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const actualIndex = indexOffset + index;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.article
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick || (href ? handleClick : undefined)}
      onKeyDown={onClick || href ? handleKeyDown : undefined}
      className="minimal-card group relative overflow-hidden focus-within:ring-2 focus-within:ring-text focus-within:ring-offset-2 cursor-pointer"
      whileHover={prefersReducedMotion ? {} : { y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      role="listitem"
      tabIndex={0}
      aria-label={`${title} - ${category}, ${year}`}
    >
      {/* Hover background effect */}
      <motion.div
        className="absolute inset-0 bg-surface"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Year badge */}
        <motion.div
          className="text-xs uppercase tracking-widest text-textSecondary mb-4"
          animate={{ x: prefersReducedMotion ? 0 : isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {year}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-light mb-2">{title}</h3>

        {/* Company */}
        <div className="text-sm text-text font-medium mb-2">{company}</div>

        {/* Category */}
        <div className="text-sm text-textSecondary uppercase tracking-wide mb-4">
          {category}
        </div>

        {/* Description */}
        <p className="body-text mb-6 text-sm break-words">{description}</p>

        {/* Tech tags */}
        <ul
          className="flex flex-wrap gap-2 mb-4"
          aria-label="Technologies used"
        >
          {tech.map((techItem) => (
            <motion.li
              key={techItem}
              className="text-xs px-3 py-1 border border-border uppercase tracking-wide"
              whileHover={
                prefersReducedMotion ? {} : { scale: 1.05, borderColor: "#000" }
              }
            >
              {techItem}
            </motion.li>
          ))}
        </ul>
        {/* Call to action */}
        {calltoAction && (
          <motion.div
            className="flex items-center text-sm uppercase tracking-wide mt-4"
            initial={{ x: 0 }}
            animate={{ x: prefersReducedMotion ? 0 : isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="mr-2">
              {type === "project" ? "View Project" : "View Details"}
            </span>
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
