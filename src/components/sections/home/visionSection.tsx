import Image from "next/image";
import { Container } from "@/components/layout";
import { Heading } from "@/components/ui/typography";

const VisionSection = () => {
  return (
    <section id="vision" className="relative w-full py-20 md:py-48">
      <Container className="w-full flex justify-center items-center gap-10 flex-col md:flex-row">
        {/* Image — slides in from left */}
        <div
          className="relative w-full md:w-[55%] h-72 md:h-[550px]"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <Image
            src="/images/Group 10.png"
            alt="Vision image"
            fill
            unoptimized
            className="object-contain object-center"
          />
        </div>

        {/* Text content — slides in from right */}
        <div className="w-full md:w-[39%] flex flex-col gap-5 md:gap-9">
          <Heading
            level="h5"
            className="font-medium"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Bridging the gap between academic ideas and professional reality
          </Heading>

          <p
            className="text-sm text-content-light"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            "Our vision is to transform the graduation project experience from a
            daunting academic requirement into a professional launching pad. We
            strive to create a collaborative ecosystem where every student finds
            their ideal team, every mentor provides impactful guidance, and
            every innovative idea finds its way to the marketplace. At TeamUp,
            we believe that the right partnership is the first step toward a
            successful career."
          </p>

          <div
            className="w-full flex justify-between items-center mt-5"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <span className="bg-primary h-[5px] rounded-full w-[65%]" />
            <Heading level="h5" className="font-medium">
              Our Vision
            </Heading>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VisionSection;
