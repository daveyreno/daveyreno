"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { HireMeButton } from "./HireMeButton";
import Logo from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  buttonPosition?: { top: number; right: number };
}

// Menu items configuration
export const MainMenu = [
  {
    label: "Abilities",
    link: "/abilities",
  },
  {
    label: "Experience",
    link: "/experience",
  },
];

export default function MobileMenu({
  isOpen,
  onClose,
  buttonPosition = { top: 20, right: 20 },
}: MobileMenuProps) {
  const circleVariants = {
    closed: {
      clipPath: `circle(0% at ${buttonPosition.right}px ${buttonPosition.top}px)`,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: {
      clipPath: `circle(150% at ${buttonPosition.right}px ${buttonPosition.top}px)`,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const logoVariants = {
    closed: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.4,
        ease: [0, 0.55, 0.45, 1] as const,
      },
    },
  };

  const closeButtonVariants = {
    closed: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.4,
        ease: [0, 0.55, 0.45, 1] as const,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.4,
        ease: [0, 0.55, 0.45, 1] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-50"
        >
          {/* Background */}
          <motion.div
            variants={circleVariants}
            className="absolute inset-0 bg-background"
          />

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between p-6">
              <motion.div variants={logoVariants}>
                <Logo />
              </motion.div>
              <motion.button
                variants={closeButtonVariants}
                onClick={onClose}
                className="text-foreground hover:text-muted-foreground transition-colors h-6"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1">
              <div className="px-6 pt-8 space-y-6">
                {MainMenu.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <Link
                      href={item.link}
                      onClick={onClose}
                      className="block text-foreground text-2xl font-medium hover:text-muted-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  custom={MainMenu.length}
                  variants={menuItemVariants}
                  className="pt-4"
                >
                  <HireMeButton size="lg" />
                </motion.div>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
