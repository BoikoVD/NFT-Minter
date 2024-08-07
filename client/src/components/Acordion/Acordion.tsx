"use client";
import { useState } from "react";
import AccordionItem from "./AcordionItem/AcordionItem";

interface IProps {
  data: {
    question: string;
    answer: string;
  }[];
}

const Accordion = ({ data }: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-[800px]">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
