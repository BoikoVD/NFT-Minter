import { MouseEventHandler } from "react";

interface IButton {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  styleType?: "rectangle" | "parallelogram";
  size?: "small" | "large";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const styles = {
  main: "text-lg text-white transition-all duration-500 bg-button-gradient bg-size-200 bg-pos-0 hover:bg-pos-100",
  disabled: "disabled:opacity-75 disabled:hover:bg-pos-0",

  // Style type
  rectangle: "rounded-md",
  parallelogram:
    "[clip-path:polygon(40px_0%,100%_0%,calc(100%-40px)_100%,0%_100%)]",

  // Sizes
  small: "px-10 py-3 md:px-14",
  large: "px-14 py-6 md:px-24"
};

export default function Button(props: IButton) {
  const {
    children,
    onClick,
    type = "button",
    styleType = "rectangle",
    size = "large",
    className,
    disabled = false,
    isLoading = false
  } = props;

  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`${styles.main} ${styles.disabled} ${styles[styleType]} ${styles[size]} ${className}`}
        disabled={disabled || isLoading}
      >
        {isLoading ? "..." : children}
      </button>
    </>
  );
}
