import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

/* ------------------------- DATA ------------------------- */
const skillCategories = [
  {
    title: "Programming Languages",
    icon: "💻",
    skills: [
      { name: "Python", icon: "🐍", level: 90 },
      { name: "JavaScript", icon: "🟨", level: 85 },
      { name: "Java", icon: "☕", level: 80 },
      { name: "C++", icon: "⚡", level: 85 },
      { name: "C", icon: "🔧", level: 80 },
      { name: "C#", icon: "🔷", level: 89 },
      { name: "Assembly", icon: "⚙️", level: 70 },
    ],
  },
  {
    title: "AI & ML (Core)",
    icon: "🤖",
    skills: [
      { name: "Machine Learning", icon: "📈", level: 88 },
      { name: "Deep Learning", icon: "🧠", level: 85 },
      { name: "NLP", icon: "🗣️", level: 82 },
      { name: "Gen AI", icon: "🧠", level: 90 },
      { name: "Computer Vision", icon: "👁️", level: 65 },
      { name: "Model Evaluation", icon: "🧪", level: 86 },
      { name: "Time Series Analysis", icon: "⏱️", level: 78 },
      { name: "RAG Pipelines", icon: "🔎", level: 82 },
      { name: "Embeddings", icon: "🧬", level: 84 },
      { name: "MLflow (Tracking)", icon: "🧾", level: 76 }
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    skills: [
      { name: "React.js", icon: "⚛️", level: 88 },
      { name: "Next.js", icon: "⬛", level: 82 },
      { name: "Node.js", icon: "🟢", level: 85 },
      { name: "Express.js", icon: "🚀", level: 80 },
      { name: "REST APIs", icon: "🔗", level: 85 },
      { name: "Flask", icon: "🌶️", level: 78 },
      { name: "FastAPI", icon: "⚡", level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", icon: "🍃", level: 80 },
      { name: "MySQL", icon: "🐬", level: 85 },
      { name: "SQL Server", icon: "🔵", level: 82 },
      { name: "PostgreSQL", icon: "🐘", level: 69 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "📚",
    skills: [
      { name: ".NET Framework", icon: "🔷", level: 75 },
      { name: "JavaFX", icon: "☕", level: 72 },
      { name: "TensorFlow", icon: "🧠", level: 90 },
      { name: "PyTorch", icon: "🔥", level: 85 },
      { name: "Scikit-learn", icon: "📊", level: 88 },
      { name: "Pandas", icon: "🐼", level: 92 },
      { name: "NumPy", icon: "🔢", level: 90 },
      { name: "Matplotlib", icon: "📈", level: 85 },
      { name: "Seaborn", icon: "📊", level: 82 },
    ],
  },
  {
    title: "Game Dev & Simulation",
    icon: "🎮",
    skills: [
      { name: "Unity", icon: "⚫", level: 80 },
      { name: "Unreal Engine", icon: "🔷", level: 65 },
    ],
  },
  {
    title: "Parallel Computing",
    icon: "⚡",
    skills: [
      { name: "MPI", icon: "🔄", level: 78 },
      { name: "OpenMP", icon: "🔗", level: 75 },
      { name: "OpenCL", icon: "⚡", level: 70 },
      { name: "CUDA", icon: "🎯", level: 68 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "🛠️",
    skills: [
      { name: "Git/GitHub", icon: "🐙", level: 90 },
      { name: "VS Code", icon: "💙", level: 95 },
      { name: "IntelliJ IDEA", icon: "🧠", level: 88 },
      { name: "Jupyter", icon: "📓", level: 90 },
      { name: "Postman", icon: "📮", level: 85 },
      { name: "Docker", icon: "🐳", level: 72 },
    ],
  },
  {
    title: "Soft Skills",
    icon: "🤝",
    skills: [
      { name: "Team Collaboration", icon: "👥", level: 92 },
      { name: "Event Coordination", icon: "📅", level: 90 },
      { name: "Leadership", icon: "👑", level: 88 },
      { name: "Communication", icon: "💬", level: 90 },
      { name: "Agile/Scrum", icon: "🔄", level: 85 },
    ],
  },
];

const floatingIcons = [
  "🐍", "⚛️", "🧠", "🔥", "🚀", "💻",
  "🌐", "🗄️", "🎮", "⚡", "🛠️", "🤝"
];

/* ------------------------- COMPONENT ------------------------- */
export function Skills() {
  const skillsRef = useRef(null);
  const [openSet, setOpenSet] = useState(new Set());

  // for repulsion: refs to each inner <span>
  const iconRefs = useRef([]);

  const toggle = (idx) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });

  // fade-in on view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillCards = entry.target.querySelectorAll(".skill-category-card");
            skillCards.forEach((card, index) => {
              setTimeout(() => card.classList.add("animate-fade-in-scale"), index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  // mouse repulsion for floating icons
  useEffect(() => {
    const container = skillsRef.current;
    if (!container) return;

    const R = 140;       // interaction radius (px)
    const MAX_PUSH = 30; // max offset (px)

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      iconRefs.current.forEach((el) => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        const cx = (b.left + b.right) / 2 - rect.left;
        const cy = (b.top + b.bottom) / 2 - rect.top;

        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy);

        if (dist < R) {
          const force = (R - dist) / R; // 0..1
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          const ox = nx * force * MAX_PUSH;
          const oy = ny * force * MAX_PUSH;
          el.style.transform = `translate(${ox}px, ${oy}px)`;
          el.style.transition = "transform 100ms linear";
        } else {
          el.style.transform = "translate(0,0)";
          el.style.transition = "transform 400ms ease";
        }
      });
    };

    const onLeave = () => {
      iconRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "translate(0,0)";
        el.style.transition = "transform 400ms ease";
      });
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={skillsRef}>
      {/* Floating Background Icons (repel cursor) */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <div
            key={index}
            className="absolute text-6xl opacity-20 floating-animation"
            style={{
              left: `${10 + ((index * 8) % 80)}%`,
              top: `${20 + ((index * 15) % 60)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${6 + (index % 3)}s`,
            }}
          >
            {/* inner span receives transform via JS so float animation remains */}
            <span
              ref={(el) => (iconRefs.current[index] = el)}
              className="block will-change-transform"
              style={{ transition: "transform 300ms ease" }}
            >
              {icon}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent applications and robust software solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => {
            const isOpen = openSet.has(i);
            return (
              <Card
                key={category.title}
                className="skill-category-card opacity-0 hover:shadow-xl transition-all duration-500 border-2 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Header (toggle) */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Collapsible content */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden px-6 pb-6">
                      <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skill.name}
                            className="group/skill cursor-pointer transform transition-all duration-200 hover:scale-102"
                            style={{ animationDelay: `${i * 0.1 + skillIndex * 0.05}s` }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg group-hover/skill:scale-125 transition-transform duration-200">
                                  {skill.icon}
                                </span>
                                <span className="text-sm font-medium group-hover/skill:text-primary transition-colors duration-200">
                                  {skill.name}
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground font-medium">
                                {skill.level}%
                              </span>
                            </div>

                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full hero-gradient rounded-full transition-all duration-1000 ease-out group-hover/skill:shadow-lg transform origin-left"
                                style={{
                                  width: `${skill.level}%`,
                                  animationDelay: `${i * 0.2 + skillIndex * 0.1}s`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tech Tags */}
        <div className="mt-16 text-center">
          {/* <div className="inline-flex flex-wrap gap-4 justify-center">
            {[
              "Python",
              "JavaScript",
              "Java",
              "C++",
              "C",
              "C#",
              "AI/ML",
              "Full Stack",
              "React",
              "Python",
              "Node.js",
              "TensorFlow",
              "MongoDB",
              "Git",
              "Unity",
              "CUDA",
            ].map((tech, index) => (
              <div
                key={tech}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium floating-animation hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default transform hover:scale-110"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {tech}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Skills;
