interface IText {
  children: React.ReactNode;
  size?: "small" | "large";
  color?: "white" | "red";
  leading?: "none" | "normal" | "loose";
  className?: string;
}

const styles = {
  //leading
  none: "md:leading-none md:tracking-wider",
  normal: "md:leading-normal md:tracking-wider",
  loose: "md:leading-loose md:tracking-wider",

  // Sizes
  small: "text-sm md:text-lg",
  large: "text-lg md:text-2xl",

  // Colors
  white: "text-white",
  red: "text-red-500"
};

export default function Text({
  children,
  className = "",
  leading = "loose",
  size = "small",
  color = "white"
}: IText) {
  return (
    <p
      className={`${styles[leading]} ${styles[size]} ${styles[color]} ${className}`}
    >
      {children}
    </p>
  );
}
