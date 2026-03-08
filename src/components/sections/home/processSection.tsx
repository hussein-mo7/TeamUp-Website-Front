import { Container } from "@/components/layout";
import { Heading } from "@/components/ui/typography";

const STEPS = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Sign up and build your academic profile. Highlight your skills, interests, and GPA to let others know what you bring to the table.",
  },
  {
    number: "02",
    title: "Discover Opportunities",
    description:
      "Browse through innovative project ideas or search for existing teams looking for members with your specific skillset.",
  },
  {
    number: "03",
    title: "Form or Join a Team",
    description:
      "Send join requests to teams you like, or create your own project and invite peers and a supervisor to start the collaboration.",
  },
  {
    number: "04",
    title: "Manage & Deliver",
    description:
      "Use our integrated dashboard to track tasks, schedule Zoom meetings, and communicate with your mentor until graduation day.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="bg-primary py-20 md:py-28 overflow-hidden">
      <Container>
        {/* ── Section Header ── */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <Heading level="h4" className="font-medium text-white mb-3">
            How It Works
          </Heading>
          <p className="font-primary text-content-light text-sm md:text-base">
            Your Journey to Success in 4 Simple Steps
          </p>
        </div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 relative">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center gap-5"
              data-aos="fade-up"
              data-aos-delay={`${i * 150}`}
            >
              {/* Number circle + dotted line row */}
              <div className="relative w-full flex items-center justify-center">
                {/* Dotted line — left side (not on first item) */}
                {i !== 0 && (
                  <div
                    className="hidden md:block absolute right-[calc(50%+32px)] left-0
                      border-t-2 border-dashed border-white/35 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                )}

                {/* Dotted line — right side (not on last item) */}
                {i !== STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute left-[calc(50%+32px)] right-0
                      border-t-2 border-dashed border-white/35 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                )}

                {/* Circle */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full
                  bg-white/10 border-2 border-white/30
                  flex items-center justify-center flex-shrink-0
                  shadow-[0_0_0_8px_rgba(255,255,255,0.06)]
                  backdrop-blur-sm"
                >
                  <span className="font-secondary font-bold text-white text-xl">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step text */}
              <div className="flex flex-col gap-2 px-2">
                <h3 className="font-secondary font-bold text-white text-base">
                  {step.title}
                </h3>
                <p className="font-primary text-white/70 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;
