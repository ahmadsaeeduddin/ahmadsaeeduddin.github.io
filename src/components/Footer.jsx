import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div data-web-land="footer-brand" className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Saeed Ud Din Ahmad
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI/ML Engineer & Full Stack Developer passionate about creating innovative 
              solutions and pushing the boundaries of technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ahmadsaeeduddin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/saeed-ud-din-ahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:ahmadsaeeduddin@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium">Email:</span><br />
                <a href="mailto:ahmadsaeeduddin@gmail.com" className="hover:text-primary transition-colors duration-200">
                  ahmadsaeeduddin@gmail.com
                </a>
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Phone:</span><br />
                <a href="tel:+923359274034" className="hover:text-primary transition-colors duration-200">
                  +92 335 --------
                </a>
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Location:</span><br />
                Islamabad, Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Saeed Ud Din Ahmad. All rights reserved.
            </p>
            <div className="flex items-center text-muted-foreground text-sm">
              {/* <span>Built with</span> */}
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              {/* <span>using React, JavaScript & Tailwind CSS</span> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
