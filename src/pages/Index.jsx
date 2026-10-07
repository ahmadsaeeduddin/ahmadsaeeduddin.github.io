"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import ScrollWebSlinger from "@/components/navigation/ScrollWebSlinger";
import SectionHeadingMotion from "@/components/motion/SectionHeadingMotion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollWebSlinger />
      <main>
        <HeroSection />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <SectionHeadingMotion />
    </div>
  );
};

export default Index;
