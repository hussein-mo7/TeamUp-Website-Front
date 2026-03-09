"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Linkedin } from "lucide-react";
import { Container } from "@/components/layout";
import { Heading } from "@/components/ui/typography";
import { Input, Textarea } from "@/components/ui/forms";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // hook up your API call here
    console.log(form);
  };

  return (
    <section
      id="contact"
      className="relative bg-surface py-20 md:py-28 overflow-hidden"
    >
      {/* Decorative wave */}
      <div
        className="absolute inset-0 pointer-events-none top-16"
        aria-hidden="true"
      >
        <Image
          src="/images/Vector1.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Rotating star */}
      <span
        className="absolute top-[38%] left-[80%] md:left-[39%] w-6 h-6 animate-spin-slow"
        aria-hidden="true"
      >
        <Image src="/images/star.svg" alt="" fill className="object-contain" />
      </span>

      <Container>
        <div className="flex flex-col md:flex-row items-start justify-between gap-14 md:gap-10">
          {/* ── Left ── */}
          <div
            className="w-full md:w-[40%] flex flex-col gap-6 pt-2"
            data-aos="fade-right"
          >
            <Heading level="h3" className="font-medium text-content">
              Contact Us
            </Heading>
            <p className="font-primary text-base leading-relaxed text-content">
              <span className="text-primary">
                Have a question or need assistance?
              </span>{" "}
              Our team is here to support your graduation journey.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group w-fit"
                aria-label="Visit our Facebook page"
              >
                <div
                  className="w-11 h-11 rounded-full bg-primary flex items-center justify-center
                  group-hover:bg-primary-dark transition-colors duration-200 flex-shrink-0"
                >
                  <Facebook
                    size={20}
                    className="text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-primary text-sm text-content group-hover:text-primary transition-colors duration-200">
                  Facebook
                </span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group w-fit"
                aria-label="Visit our LinkedIn page"
              >
                <div
                  className="w-11 h-11 rounded-full bg-primary flex items-center justify-center
                  group-hover:bg-primary-dark transition-colors duration-200 flex-shrink-0"
                >
                  <Linkedin
                    size={20}
                    className="text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-primary text-sm text-content group-hover:text-primary transition-colors duration-200">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div
            className="w-full md:w-[53%] bg-white rounded-2xl border border-gray-100
              shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-4 md:p-12"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Input
                id="name"
                name="name"
                type="text"
                label="Name"
                value={form.name}
                onChange={handleChange}
                placeholder="enter your name"
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                placeholder="enter your email"
              />
            </div>
            <div className="mb-7">
              <Textarea
                id="message"
                name="message"
                label="Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3.5 bg-primary text-white text-sm font-semibold
                font-primary rounded-xl hover:bg-primary-dark transition-colors duration-200
                shadow-[0_2px_12px_rgba(37,99,235,0.3)]
                hover:shadow-[0_4px_18px_rgba(37,99,235,0.4)]"
            >
              send
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
