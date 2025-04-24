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
    <section className="w-full overflow-hidden py-36 md:pt-48">
      <div className="space-y-6 text-center">
        <div className="mx-auto space-y-6">
          <h1 className="gradient-title gradient-premium shimmer text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
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
            <Button size="lg" className="group animate-bounce px-8">
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
              className="mx-auto rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
