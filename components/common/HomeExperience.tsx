"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

export default function HomeExperience() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <SectionTitle title="Experience" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-lg p-4 sm:p-6 bg-gradient-to-br from-pink-600 to-rose-500 flex items-center justify-center aspect-[4/3]">
          <span className="text-white text-xl sm:text-2xl font-semibold">
            You?
          </span>
        </div>
        <motion.div
          whileHover="hover"
          initial="initial"
          className="rounded-lg p-4 sm:p-6 bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-600 flex items-center justify-center aspect-[4/3] relative hover:opacity-90 transition-opacity"
        >
          <Link href="/experience" className="absolute inset-0 z-0" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2 z-10">
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs sm:text-xs"
            >
              FinTech
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs sm:text-xs"
            >
              2025
            </Badge>
          </div>
          <motion.img
            alt="Soar Logo"
            loading="lazy"
            width="160"
            height="60"
            decoding="async"
            className="object-contain h-auto w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] brightness-0 invert cursor-pointer pointer-events-none"
            src="/soar-inc-logo.svg"
            variants={{
              initial: { scale: 1 },
              hover: {
                scale: [1, 1.12, 1.08],
                transition: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              },
            }}
          />
        </motion.div>
        <motion.div
          whileHover="hover"
          initial="initial"
          className="rounded-lg p-4 sm:p-6 bg-gradient-to-br to-sky-950 from-emerald-600 flex items-center justify-center aspect-[4/3] relative hover:opacity-90 transition-opacity"
        >
          <Link href="/experience" className="absolute inset-0 z-0" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2 z-10">
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs sm:text-xs"
            >
              FinTech
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs sm:text-xs"
            >
              2021 - 2025
            </Badge>
          </div>
          <motion.img
            alt="Lendi Logo"
            loading="lazy"
            width="300"
            height="200"
            decoding="async"
            data-nimg="1"
            className="rounded-md object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] cursor-pointer pointer-events-none"
            style={{ color: "transparent" }}
            src="/lendi-logo.svg"
            variants={{
              initial: { scale: 1 },
              hover: {
                scale: [1, 1.12, 1.08],
                transition: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              },
            }}
          />
        </motion.div>
        <motion.div
          whileHover="hover"
          initial="initial"
          className="rounded-lg p-4 sm:p-6 bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center aspect-[4/3] relative hover:opacity-90 transition-opacity"
        >
          <Link href="/experience" className="absolute inset-0 z-0" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2 z-10">
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs sm:text-xs"
            >
              ConTech
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs sm:text-xs"
            >
              2017 - 2021
            </Badge>
          </div>
          <motion.img
            alt="Cranetime Logo"
            loading="lazy"
            width="300"
            height="200"
            decoding="async"
            data-nimg="1"
            className="rounded-md object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] cursor-pointer pointer-events-none"
            style={{ color: "transparent" }}
            src="/cranetime-logo.svg"
            variants={{
              initial: { scale: 1 },
              hover: {
                scale: [1, 1.12, 1.08],
                transition: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              },
            }}
          />
        </motion.div>
        <motion.div
          whileHover="hover"
          initial="initial"
          className="rounded-lg p-4 sm:p-6 bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center aspect-[4/3] relative hover:opacity-90 transition-opacity"
        >
          <Link href="/experience" className="absolute inset-0 z-0" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2 z-10">
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs sm:text-xs"
            >
              LegalTech
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs sm:text-xs"
            >
              2013 - 2017
            </Badge>
          </div>
          <motion.img
            alt="LEGALNET Logo"
            loading="lazy"
            width="300"
            height="200"
            decoding="async"
            data-nimg="1"
            className="rounded-md object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] cursor-pointer pointer-events-none"
            style={{ color: "transparent" }}
            src="/legalnet-logo.svg"
            variants={{
              initial: { scale: 1 },
              hover: {
                scale: [1, 1.12, 1.08],
                transition: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              },
            }}
          />
        </motion.div>
        <motion.div
          whileHover="hover"
          initial="initial"
          className="rounded-lg p-4 sm:p-6 bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center aspect-[4/3] relative hover:opacity-90 transition-opacity"
        >
          <Link href="/experience" className="absolute inset-0 z-0" />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-row gap-2 z-10">
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-xs sm:text-xs"
            >
              Infra
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-light text-xs sm:text-xs"
            >
              2009 - 2016
            </Badge>
          </div>
          <motion.img
            alt="CrazyDomains Logo"
            loading="lazy"
            width="300"
            height="200"
            decoding="async"
            data-nimg="1"
            className="rounded-md object-contain h-auto w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] cursor-pointer pointer-events-none"
            style={{ color: "transparent" }}
            src="/crazydomains-logo.svg"
            variants={{
              initial: { scale: 1 },
              hover: {
                scale: [1, 1.12, 1.08],
                transition: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
