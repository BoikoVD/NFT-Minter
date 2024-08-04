"use client";
import { useState } from "react";
import AccordionItem from "./AcordionItem/AcordionItem";

const data = [
  {
    question: "What is a Pass NFT?",
    answer:
      "A Pass NFT is your key to unlocking unlimited use of our AI image generation and NFT claiming features."
  },
  {
    question: "How do I generate an image?",
    answer:
      "Simply use our intuitive AI tool to create unique images based on your input."
  },
  {
    question: "How do I claim an NFT?",
    answer:
      "After generating your image, click 'Claim NFT' to mint it on the blockchain."
  }
];

const Accordion = () => {
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
