import { Heading } from "@/components/ui/typography";
import { Container } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";

const MainSection = () => {
  return (
    <Container as="main">
      <section id="home" className="relative min-h-screen bg-surface flex items-center pt-28 md:pt-28 pb-16">
        <div className="w-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-0">
          {/* ── Left: Text Content ── */}
          <div
            className="w-full md:w-[45%] flex flex-col gap-5"
            data-aos="fade-right"
          >
            <Heading
              level="h1"
              className="font-secondary text-primary leading-tight"
            >
              Build Your Dream <br /> Graduation Team !
            </Heading>

            <p className="w-full md:w-[75%] font-primary text-content text-sm md:text-lg leading-relaxed">
              Connect with talented peers, find the right mentor, and turn your
              graduation project into a success story.
            </p>

            <Link
              href="/sign-up"
              className="w-fit px-7 py-3 mt-4 text-sm font-medium font-primary
                text-content-inverse bg-primary rounded-lg
                hover:bg-primary-dark transition-colors duration-200"
            >
              Get Started Now !
            </Link>
          </div>

          {/* ── Right: Image Collage ── */}
          <div
            className="relative w-full md:w-[55%] h-[300px] md:h-[560px]"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <Image
              src="/images/Group 2.png"
              alt="Graduation student"
              fill
              unoptimized
              className="object-contain object-right scale-100"
            />
            <span
              className="absolute top-[45%] left-[2%] md:left-[5%] w-6 md:w-7 h-7 animate-spin-slow"
              aria-hidden="true"
            >
              <Image
                src="/images/star.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>

            {/* ── Spinning star — bottom right area ── */}
            <span
              className="absolute bottom-[15%] md:bottom-[20%] right-[10%] md:right-[20%] w-5 h-5 animate-spin-slow"
              aria-hidden="true"
            >
              <Image
                src="/images/star.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default MainSection;
