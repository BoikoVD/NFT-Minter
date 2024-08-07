"use client";
import Text from "@/components/UI/Text";
import { useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface IAcordionItem {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick
}: IAcordionItem) => {
  const contentHeight = useRef<HTMLDivElement | null>(null);

  return (
    <div className="overflow-hidden border-b border-pink pb-4 pt-4">
      <button
        className={`flex w-full items-center justify-between`}
        onClick={onClick}
      >
        <Text size="large" className="text-left">
          {question}
        </Text>
        <RiArrowDropDownLine
          className={`transition-all duration-300 ${isOpen ? "rotate-[180deg]" : ""}`}
          size={40}
          color="#FF00BF"
        />
      </button>

      <div
        ref={contentHeight}
        className="transition-all duration-300"
        style={
          isOpen
            ? { height: contentHeight.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <Text className="pt-4" leading="none">
          {answer}
        </Text>
      </div>
    </div>
  );
};

export default AccordionItem;
