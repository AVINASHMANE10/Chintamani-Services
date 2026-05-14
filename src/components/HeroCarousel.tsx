"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Check, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

type CarouselDict = {
  badge: string;
  learnMore: string;
};

type ServicesMap = Record<string, { name: string; short: string }>;

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({
  locale,
  dict,
  servicesDict,
}: {
  locale: Locale;
  dict: CarouselDict;
  servicesDict: ServicesMap;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % services.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + services.length) % services.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // Get 3 cards for desktop
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % services.length;
      cards.push(services[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();
  const currentService = services[currentIndex]; // For mobile single card

  // Feature badges for each service
  const getFeatures = (slug: string) => {
    switch (slug) {
      case "stp-fire-tank-cleaning":
        return ["Complete desludging", "MPCB compliance", "Expert crew"];
      case "water-tank-cleaning":
        return ["Safe & hygienic", "Food-grade clean", "Leak inspection"];
      case "cooling-tower-cleaning":
        return ["Fill cleaning", "Energy savings", "Biofilm removal"];
      case "solar-water-heater":
        return ["All brands", "Tube replacement", "AMC available"];
      default:
        return ["ISO certified", "Trained crew", "10+ years"];
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      {/* Top badge */}
      <div className="container-x relative mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-800 shadow-sm ring-1 ring-blue-200 md:text-sm">
          <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
          {dict.badge}
        </div>
      </div>

      <div className="container-x relative">
        {/* MOBILE VIEW - Single large card */}
        <div className="md:hidden">
          <motion.div
            key={currentService.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 shadow-2xl">
              {/* Service number badge */}
              <div className="absolute left-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-base font-extrabold text-blue-600 shadow-lg">
                {currentService.number}
              </div>

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={currentService.image}
                  alt={servicesDict[currentService.slug].name}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="bg-white p-6">
                {/* Icon */}
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <currentService.icon className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Service name */}
                <h3 className="mb-2 font-display text-xl font-extrabold leading-tight text-blue-900">
                  {servicesDict[currentService.slug].name}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {servicesDict[currentService.slug].short}
                </p>

                {/* Features */}
                <div className="mb-5 grid grid-cols-1 gap-2">
                  {getFeatures(currentService.slug).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Check
                          className="h-3.5 w-3.5 text-blue-600"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/${locale}/services/${currentService.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                >
                  {dict.learnMore}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Mobile navigation arrows */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-md transition-all hover:bg-blue-50 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-md transition-all hover:bg-blue-50 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW - 3 cards */}
        <div className="relative hidden md:block">
          <div className="grid grid-cols-3 gap-5">
            {visibleCards.map((service, idx) => {
              const content = servicesDict[service.slug];
              const ServiceIcon = service.icon;
              const features = getFeatures(service.slug);
              const isCenter = idx === 1;

              return (
                <motion.div
                  key={`${service.slug}-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300",
                      isCenter
                        ? "scale-105 ring-2 ring-blue-500"
                        : "ring-1 ring-blue-200 hover:shadow-2xl",
                    )}
                  >
                    {isCenter && (
                      <div className="absolute right-4 top-4 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        Featured
                      </div>
                    )}

                    <div className="absolute left-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-extrabold text-white shadow-md">
                      {service.number}
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden bg-blue-50">
                      <Image
                        src={service.image}
                        alt={content.name}
                        fill
                        sizes="33vw"
                        className="object-cover object-center"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                    </div>

                    <div className="p-5">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <ServiceIcon className="h-5 w-5" strokeWidth={2} />
                      </div>

                      <h3 className="mb-2 font-display text-lg font-extrabold leading-tight text-blue-900 xl:text-xl">
                        {content.name}
                      </h3>

                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                        {content.short}
                      </p>

                      <div className="mb-4 space-y-2">
                        {features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-gray-700"
                          >
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <Check
                                className="h-3 w-3 text-blue-600"
                                strokeWidth={3}
                              />
                            </div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className={cn(
                          "inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                          isCenter
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200",
                        )}
                      >
                        {dict.learnMore}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop navigation arrows */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="absolute -left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-700 shadow-xl transition-all hover:bg-blue-50 lg:flex"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="absolute -right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-700 shadow-xl transition-all hover:bg-blue-50 lg:flex"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Indicators (shared for both mobile and desktop) */}
        <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
          {services.map((s, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to ${s.slug}`}
                className="group relative h-8"
              >
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    isActive
                      ? "w-8 bg-blue-700"
                      : "w-2 bg-blue-300 group-hover:bg-blue-400",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 md:mt-6">
          <div className="mx-auto h-1 max-w-md overflow-hidden rounded-full bg-blue-200">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: paused ? "0%" : "100%" }}
              transition={{
                duration: paused ? 0.3 : AUTOPLAY_MS / 1000,
                ease: "linear",
              }}
              className="h-full bg-blue-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
