"use client";

import { useEffect, useState } from "react";
import styles from "./grid-background.module.css";
import HeroSection from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import StatisticsSection from "@/components/statistics-section";
import HowItWorksSection from "@/components/how-it-works-section";
import FaqSection from "@/components/faq-section";
import CtaSection from "@/components/cta-section";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main>
      <div className={styles.gridBackground}>
        <div
          className={styles.spotlight}
          style={{
            "--x": `${mousePosition.x * 100}%`,
            "--y": `${mousePosition.y * 100}%`,
          }}
        />
      </div>
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Statistics Section */}
      <StatisticsSection />
      {/* How It Works Section */}
      <HowItWorksSection />
      {/* FAQ Section */}
      <FaqSection />
      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
