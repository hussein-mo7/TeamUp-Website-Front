import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container = ({ children, className = "", as: Tag = "div" }: ContainerProps) => {
  return (
    <Tag className={`container mx-auto ${className}`.trim()}>
      {children}
    </Tag>
  );
};

export default Container;