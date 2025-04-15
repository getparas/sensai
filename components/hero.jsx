"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full py-36 md:pt-48  overflow-hidden">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title gradient-premium shimmer">
            Unlock Your Potential for <br /> Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with actionable insights, expert guidance, and
            smart tools built to help you stand out in today's competitive job
            market.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 group animate-bounce">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-12 md:mt-16">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/banner.png"}
              width={1280}
              height={720}
              alt="Banner Sensai"
              className="rounded-2xl shadow-2xl mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
