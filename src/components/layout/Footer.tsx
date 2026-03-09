import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout";

const BROWSE_LINKS = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Teams", href: "/teams" },
  { label: "Mentors", href: "/mentors" },
];

const ABOUT_LINKS = [
  { label: "Our Vision", href: "/#vision" },
  { label: "How it Works", href: "/#process" },
  { label: "Features", href: "/#features" },
  { label: "Contact Us", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: MessageCircle, href: "https://whatsapp.com", label: "WhatsApp" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-primary-light">
      <Container className="py-14">
        {/* ── Top row ── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between">
          {/* Logo + tagline */}
          <div className="w-full md:w-[38%] flex flex-col gap-8">
            <Link href="/" aria-label="TeamUp home">
              <div className="relative w-[95px] h-6">
                <Image
                  src="/images/logo.png"
                  alt="TeamUp Logo"
                  fill
                  unoptimized
                  quality={100}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="font-primary text-sm text-primary leading-relaxed w-[85%]">
              "TeamUp is a dedicated platform for university students to
              simplify the journey of graduation projects by connecting talents,
              ideas, and academic mentors in one place."
            </p>
          </div>

          {/* Browse links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-primary text-lg">
              Browse
            </h4>
            <ul className="flex flex-col gap-3">
              {BROWSE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-primary text-sm text-content hover:text-primary
                      transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-primary text-lg">
              About
            </h4>
            <ul className="flex flex-col gap-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-primary text-sm text-content hover:text-primary
                      transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-primary/15 my-10" />

        {/* ── Bottom row ── */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="font-primary text-sm text-content-light text-center md:text-left">
            © 2026 TeamUp. All rights reserved. Designed for Al-Azhar University
            Students
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center
                  hover:bg-primary-dark transition-colors duration-200"
              >
                <Icon size={20} className="text-white" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
