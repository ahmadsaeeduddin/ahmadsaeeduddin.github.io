import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import profileImage from "@/assets/me2.png";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 hero-gradient rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="stagger-animation">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="block">Hi, I'm</span>
                <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                     Saeed Ud Din Ahmad
                </span> 
              </h1>
            </div>
            
            <div className="stagger-animation" style={{ animationDelay: "0.1s" }}>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                AI/ML Engineer & Full Stack Developer
              </p>
            </div>

            <div className="stagger-animation" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Computer Science student at FAST University passionate about artificial intelligence, 
                machine learning, and creating innovative solutions that make a difference.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="stagger-animation flex flex-col sm:flex-row gap-10 mt-8" style={{ animationDelay: "0.3s" }}>
              <Button 
                onClick={scrollToProjects}
                size="lg" 
                className="hero-gradient hover:scale-105 transition-transform duration-200 text-white shadow-lg"
              >
                View My Work
              </Button>
              <Button 
                onClick={scrollToContact}
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform duration-200 border-2"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="stagger-animation flex space-x-6 mt-8" style={{ animationDelay: "0.4s" }}>
              <a 
                href="https://github.com/ahmadsaeeduddin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/saeed-ud-din-ahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="mailto:ahmadsaeeduddin@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>

            {/* Download Resume */}
            <div className="stagger-animation mt-6" style={{ animationDelay: "0.5s" }}>
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
              <a href="/Saeed-Ud-Din-Ahmad_AI.pdf" download="Saeed-Ud-Din-Ahmad_AI.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            </div>
          </div>

          {/* Profile Image - Right Side */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative animate-float">
              <div className="w-80 h-80 rounded-full p-1 hero-gradient">
                <img
                  src={profileImage}
                  alt="Saeed Ud Din Ahmad"
                  className="w-full h-full rounded-full object-cover border-4 border-background group-hover:scale-110 origin-center"
                />
              </div>
              <div className="absolute inset-0 rounded-full hero-gradient opacity-20 blur-md animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}