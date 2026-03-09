import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-h1-mobile md:text-h1",
  h2: "text-h2-mobile md:text-h2",
  h3: "text-h3-mobile md:text-h3",
  h4: "text-h4-mobile md:text-h4",
  h5: "text-h5-mobile md:text-h5",
  h6: "text-h6-mobile md:text-h6",
};

const Heading = ({
  level,
  children,
  className = "",
  ...props
}: HeadingProps) => {
  const Tag = level;
  return (
    <Tag className={`${headingStyles[level]} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
