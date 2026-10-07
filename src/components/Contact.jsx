import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { TextRepel } from "@/components/motion/TextRepel";

const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyKCEWaU4S6eHqW-67ijKDbRBIRy3Zx7Qs0h6An0ODV38SJwYEWV4W-g_RjcL5ftnR22g/exec"; // <-- replace

export function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...rest of your submit logic
    setMsg(null);

    // required fields: firstName, email, subject, message
    const { firstName, email, subject, message } = form;
    if (!firstName || !email || !subject || !message) {
      setMsg({ type: "err", text: "Please fill in first name, email, subject, and message." });
      return;
    }

    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ type: "err", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName,
        email,
        subject,
        message,
        lastName: form.lastName || "",
        timestamp: new Date().toISOString(), // last column in your sheet
      };

      const fd = new FormData();
      fd.append("firstName", firstName);
      fd.append("lastName", form.lastName || "");
      fd.append("email", email);
      fd.append("subject", subject);
      fd.append("message", message);
      fd.append("timestamp", new Date().toISOString());
      console.log(Object.fromEntries(fd.entries())); // <-- should show your fields

      const res = await fetch(SHEETS_ENDPOINT, { method: "POST", body: fd });
      const txt = await res.clone().text();
      console.log("status:", res.status, "ok:", res.ok, "body:", txt);

      if (!res.ok) throw new Error("Network response was not ok");
      console.log(fd)
      setMsg({ type: "ok", text: "Thanks! Your message was sent." });
      setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setMsg({ type: "err", text: "Could not send. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 data-motion-heading className="text-3xl md:text-4xl font-bold mb-4">
            <TextRepel text="Get In Touch" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* left column (cards + socials) — keep your existing code here */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're looking for a passionate developer, have an exciting project in mind, 
                or want to discuss the latest in AI and technology, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <Card data-web-land="contact-card" className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="hero-gradient p-3 rounded-lg">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:ahmadsaeeduddin@gmail.com"
                        className="text-primary hover:underline"
                      >
                        ahmadsaeeduddin@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="hero-gradient p-3 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:+923359274034"
                        className="text-primary hover:underline"
                      >
                        +92 335 -------
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="hero-gradient p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Islamabad, Pakistan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-6">
              <a
                href="https://github.com/ahmadsaeeduddin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/saeed-ud-din-ahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card data-web-land="contact-form" className="border-2">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Let's work together!"
                    required
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={6}
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full hero-gradient text-white hover:scale-105 transition-transform duration-200"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {msg && (
                  <p className={`text-sm ${msg.type === "ok" ? "text-green-600" : "text-red-600"}`}>
                    {msg.text}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

{/* CTA Section */}
{/* <div className="text-center mt-16">
  <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-primary/5">
    <CardContent className="p-8">
      <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
      <p className="text-muted-foreground mb-6">
        I'm always excited to work on innovative projects and collaborate with forward-thinking teams.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">  
        <Button className="hero-gradient text-white" size="lg">
          <Mail className="h-4 w-4 mr-2" />
          Start a Conversation
        </Button>
        <Button variant="outline" size="lg">
          <Github className="h-4 w-4 mr-2" />
          View My Work
        </Button>
      </div>
    </CardContent>
  </Card>
</div> */}
