import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about leveraging technology to solve real-world problems through AI and innovative software solutions.
          </p>
        </div>

        {/* Centered About Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              I'm a dedicated Computer Science student at FAST National University with a passion for 
              artificial intelligence, machine learning, and full-stack development. My journey in tech 
              has been driven by curiosity and a desire to create meaningful solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Beyond academics, I co-founded <strong>Khanabadosh Explorers</strong>, a student travel startup 
              that has successfully organized 10+ trips for over 300 university students. This experience 
              taught me valuable lessons in leadership, project management, and building teams.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              My technical expertise spans across AI/ML frameworks like TensorFlow and PyTorch, 
              full-stack development with React and Node.js, and database management. I'm particularly 
              interested in natural language processing, computer vision, and creating intelligent systems.
            </p>
          </div>
        </div>

        {/* Education Card - Centered */}
        <div className="max-w-3xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="hero-gradient p-4 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">Bachelor's in Computer Science</h3>
                  <p className="text-primary font-medium mb-3 text-lg">
                    FAST National University of Computer and Emerging Sciences
                  </p>
                  <div className="space-y-2 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3" />
                      August 2022 - June 2026
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3" />
                      Islamabad, Pakistan
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="font-medium mb-3 text-lg">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-3">
                      {["AI", "Deep Learning", "MLOPs", "OOP", "DSA", "Linear Algebra", "Probability & Stats", "Parallel Computing"].map((course) => (
                        <span 
                          key={course}
                          className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-full font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
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