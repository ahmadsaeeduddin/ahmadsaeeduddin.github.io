import { useState, useMemo, useCallback /*, useEffect */ } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export function Projects() {
  const [current, setCurrent] = useState(0);

  // ---- Your projects data (unchanged) ----
  const projects = useMemo(
    () => [
      {
        title: "Fake News Detection System",
        period: "Jul 2025",
        description:
          "LLM + RAG pipeline for real-time news claim verification from reliable sources.",
        longDescription:
          "Built a comprehensive fake news detection system that combines web scraping, natural language processing, and retrieval-augmented generation. The system automatically extracts keywords, performs FAISS vector search, and uses Groq's Llama 3 API for intelligent classification.",
        technologies: ["Python", "LLMs", "RAG", "NLP", "FAISS", "Groq API", "Web Scraping"],
        category: "AI/ML",
        image: "🤖",
        color: "project-card-1",
        highlights: ["91.2% accuracy", "Real-time processing", "Automated fact-checking"],
        source: "https://github.com/fastgenesys/summer_25_fakenews", // ⬅️ add
      },
      {
        title: "Autonomous Car Simulation",
        period: "May 2025",
        description:
          "Self-driving TORCS system using deep learning for steering and throttle.",
        longDescription:
          "Created an autonomous driving simulation using PyTorch and TORCS. The system processes sensor data through deep learning models to make real-time steering and throttle predictions for autonomous navigation.",
        technologies: ["PyTorch", "Python", "TORCS", "Deep Learning", "Computer Vision"],
        category: "AI/ML",
        image: "🚗",
        color: "project-card-3",
        highlights: ["Real-time control", "Sensor fusion", "Neural network driving"],
        source: "https://github.com/ahmadsaeeduddin/AI-Car_Simulator", // ⬅️ add
      },
      {
        title: "Student Management System",
        period: "2025",
        description:
          "End-to-end MERN system managing students from registration to performance tracking.",
        longDescription:
          "A full-featured MERN stack system where admins can register students, assign courses, and manage academic records. Students can log in to view grades, attendance, and assigned coursework. The backend handles authentication, data storage, and validation, while the React frontend provides a responsive, role-based interface for smooth navigation between dashboards, forms, and reports.",
        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "HTML", "CSS"],
        category: "Web Development",
        image: "🎓",
        color: "project-card-6",
        highlights: ["Role-based dashboards", "Real-time data updates", "Secure authentication"],
        source: "https://github.com/zohaib-han/Attendance-System",
      },
      {
        title: "Employee Management",
        period: "2025",
        description:
          "React + MySQL system handling employees from onboarding to performance review.",
        longDescription:
          "A complete employee lifecycle management system built with React, Express, Node.js, and MySQL. HR can add new employees, assign them to departments, manage attendance, and evaluate performance. The system supports CRUD operations, search and filter features, and generates data summaries. The React frontend ensures smooth navigation, while the MySQL backend stores structured employee data with secure access controls.",
        technologies: ["React.js", "MySQL", "Express.js", "Node.js", "JavaScript", "HTML", "CSS"],
        category: "Web Development",
        image: "👔",
        color: "project-card-7",
        highlights: ["Department mapping", "Attendance tracking", "Performance analytics"],
        source: "https://github.com/ahmadsaeeduddin/EmployeeManagement",
      },      
      {
        title: "Rocket Simulation",
        period: "Jan 2025 - 2026",
        description:
          "Rocket simulation for NESCOM with realistic aerodynamics and physics.",
        longDescription:
          "Final Year Project in collaboration with NESCOM, developing advanced rocket simulation software using Unreal Engine. The system models complex aerodynamics, environmental conditions, and real-time physics calculations.",
        technologies: ["Unreal Engine", "C++", "Python", "Physics Simulation", "Aerodynamics"],
        category: "Simulation",
        image: "🚀",
        color: "project-card-4",
        highlights: ["Real-time physics", "Environmental modeling", "Industry collaboration"],
        source: "https://github.com/ibraheem-farrukh/RAC-NESCOM-FYP", // ⬅️ add
      },
      {
        title: "Retail Management System",
        period: "2025",
        description:
          "JavaFX + MySQL system to manage retail operations from inventory to sales reporting.",
        longDescription:
          "Built a desktop-based retail management solution using JavaFX, Java, and MySQL to streamline day-to-day store operations. The system flow covers product inventory management, billing, customer records, supplier management, and sales tracking. Admins can add or update products, process transactions, generate invoices, and view sales analytics. The MySQL backend ensures reliable data storage and retrieval, while the JavaFX interface provides an intuitive and responsive user experience for retail staff.",
        technologies: ["JavaFX", "Java", "MySQL", "JDBC"],
        category: "Desktop Application",
        image: "🛒",
        color: "project-card-10",
        highlights: ["Inventory tracking", "Billing & invoicing", "Sales analytics"],
        source: "https://github.com/ahmadsaeeduddin/Retail-Management-System",
      },
      {
        title: "Parallel Social Behavior-Based Algorithm for Identification of Influential Users",
        period: "2025",
        description:
          "Parallelized PSAIIM implementation using MPI, OpenMP, and METIS for large-scale social network analysis.",
        longDescription:
          "Developed a high-performance parallel version of the Parallel Social Behavior-Based Algorithm for Identification of Influential Users (PSAIIM). The system processes large-scale social network datasets to detect influential nodes by modeling social behaviors. Implemented multiple parallelization strategies including MPI for distributed computing, OpenMP for shared memory parallelism, and METIS for graph partitioning. The workflow supports sequential, hybrid OpenMP+MPI, and OpenMP+MPI+METIS executions, enabling scalability across multi-core and cluster environments while maintaining accuracy in influence ranking.",
        technologies: ["C++", "MPI", "OpenMP", "METIS", "Parallel Computing", "Graph Processing"],
        category: "High-Performance Computing",
        image: "🌐",
        color: "project-card-9",
        highlights: ["MPI + OpenMP hybrid parallelism", "Graph partitioning with METIS", "Optimized for large-scale networks"],
        source: "https://github.com/ahmadsaeeuddin/Parallel-social-behavior-based-algorithm-for-identification-of-influential-users",
      },      
      {
        title: "Sentiment Analyzer",
        period: "Apr 2025",
        description:
          "Neural network-based sentiment classifier for tweets with 91.2% accuracy.",
        longDescription:
          "Developed a sophisticated sentiment analysis system using TensorFlow and Keras. Applied advanced tokenization, padding, and embeddings to classify tweets into positive, negative, neutral, and irrelevant categories.",
        technologies: ["TensorFlow", "Keras", "Python", "NLP", "Neural Networks"],
        category: "AI/ML",
        image: "📊",
        color: "project-card-2",
        highlights: ["91.2% accuracy", "4 sentiment classes", "Twitter dataset"],
        source: "https://github.com/ahmadsaeeduddin/Sentiment_analyzer", // ⬅️ add
      }
    ],
    []
  );
  

  const total = projects.length;
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  // Optional autoplay:
  // useEffect(() => {
  //   const id = setInterval(next, 5000);
  //   return () => clearInterval(id);
  // }, [next]);

  const p = projects[current];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions spanning AI/ML, full-stack development, and cutting-edge research projects.
          </p>
        </div>

        {/* Transparent / Glass Slider */}
        <div className="relative">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6 shadow-2xl overflow-hidden">
            {/* Controls */}
            <Button
              aria-label="Previous project"
              variant="outline"
              size="icon"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/40 border-white/10"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
            <Button
              aria-label="Next project"
              variant="outline"
              size="icon"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/40 border-white/10"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>

            {/* Active slide */}
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-0">
              <div className={`${p.color} p-6 relative overflow-hidden rounded-xl`}>
                  <div className="absolute top-0 right-0 text-7xl opacity-20 rotate-12 select-none">
                    {p.image}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {p.category}
                      </Badge>
                      <span className="text-sm opacity-90">{p.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{p.title}</h3>
                    <p className="text-muted-foreground">{p.description}</p>
                  </div>
                </div>

                {/* Chips under slide */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.highlights.map((h, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        ✨ {h}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.slice(0, 6).map((t, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                    {p.technologies.length > 6 && (
                      <Badge variant="secondary" className="text-xs">
                        +{p.technologies.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 pb-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === current ? "hero-gradient" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Selected Project Details */}
        <div className="mt-12">
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {p.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                  {p.source ? (
                    <Button asChild className="hero-gradient text-white">
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${p.title} source on GitHub`}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View Source
                      </a>
                    </Button>
                  ) : (
                    <Button disabled variant="secondary" title="Source not available">
                      <Github className="h-4 w-4 mr-2" />
                      View Source
                    </Button>
                  )}
                </div>
                </div>
                <div className="text-center">
                  <div className={`${p.color} w-48 h-48 rounded-2xl flex items-center justify-center mx-auto shadow-2xl`}>
                    <span className="text-8xl text-white opacity-90 select-none">{p.image}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
