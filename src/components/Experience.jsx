import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Building2 } from "lucide-react";

const experiences = [
  {
    title: "NLP / GenAI Internship",
    company: "Genesys Research Lab",
    period: "Jun – Aug 2025",
    location: "OnSite",
    category: "professional",
    logo: "/logos/genesys.png",
    employment_type: "Internship",
    description:
      "Worked on Natural Language Processing and Generative AI projects, developing solutions for text analysis, language models, and applied AI research.",
  },

  {
    title: "Full Stack Developer",
    company: "Shaoor",
    period: "Aug – Sept 2025",
    location: "Remote",
    category: "professional",
    employment_type: "Internship",
    logo: "/logos/shaoor.png",
    description:
      "Developed full-stack web applications using modern technologies, focusing on user experience, backend integration, and performance optimization.",
  },

  {
    title: "AI Engineer",
    company: "Intellema",
    period: "Nov 2025 – Present",
    location: "Remote / Islamabad",
    category: "professional",
    employment_type: "Full-time",
    logo: "/logos/intellema.png",
    description:
      "Building Agentic AI systems, RAG pipelines, LLM-powered applications, voice AI solutions, and AI backend services for real-world enterprise workflows.",
  },

  {
    title: "Aerospace Research Collaboration",
    company: "NESCOM",
    period: "2025 – 2026",
    location: "Islamabad, Pakistan",
    category: "collaboration",
    employment_type: "Research",
    logo: "/logos/nescom.png",
    description:
      "Collaborated with NESCOM on an aerospace simulation and telemetry platform, combining rocket dynamics, real-time telemetry, weather, terrain, geospatial data, and 3D visualization.",
  },

  {
    title: "Co-Founder",
    company: "Khanabadosh Explorers",
    period: "Mar 2024 – Present",
    location: "Islamabad, Pakistan",
    employment_type: "Self Employed",
    category: "venture",
    logo: "/logos/khanabadosh.png",
    description:
      "Co-founded a student travel startup, organizing trips for university students and managing operations, vendor coordination, logistics, and team execution.",
  },

  {
    title: "Co-Founder",
    company: "Nimco",
    period: "2024 – Present",
    location: "Islamabad, Pakistan",
    employment_type: "Self Employed",
    category: "venture",
    logo: "/logos/nimco.png",
    description:
      "Co-founded a community initiative supporting people in need, raising 100K+ PKR and helping deliver 200+ meals through donation and community efforts.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text`-4xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the amazing teams I've had the privilege to work with.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50 transform hover:-translate-y-2 overflow-hidden relative"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${experience.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-orange-700 transition-colors duration-300">
                      {experience.title}
                  </h3>

                  
                  <p className={`font-medium mb-3 bg-gradient-to-r ${experience.gradient} bg-clip-text text-transparent`}>
                    {experience.company}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {experience.period}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {experience.location}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {experience.description}
                </p>

                {/* Animated Border */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${experience.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}