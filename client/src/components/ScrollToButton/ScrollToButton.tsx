"use client";
import Button from "@/components/UI/Button";

interface IScrollToButton {
  children: React.ReactNode;
  elementId: string;
  className?: string;
}

export default function ScrollToButton(props: IScrollToButton) {
  const { children, elementId, className } = props;

  const clickHandler = () => {
    const element = document.getElementById(elementId);
    if (element) {
      const y = element.offsetTop - 100;
      window.scroll({
        top: y,
        behavior: "smooth"
      });
    }
  };

  return (
    <Button
      onClick={clickHandler}
      className={className}
      styleType="parallelogram"
    >
      {children}
    </Button>
  );
}
