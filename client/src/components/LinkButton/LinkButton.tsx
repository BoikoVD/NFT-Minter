import Link from "next/link";

interface ILinkButton {
  children: React.ReactNode;
  to: string;
  styleType?: "filled" | "transparent";
  className?: string;
}

const styles = {
  default: "text-lg transition-all duration-500 px-10 py-3 rounded-md",

  filled: "text-white bg-button-gradient bg-size-200 bg-pos-0 hover:bg-pos-100",
  transparent:
    "text-pink bg-transparent border border-pink hover:bg-pink hover:text-white"
};

export default function LinkButton(props: ILinkButton) {
  const { children, to, styleType = "filled", className } = props;

  return (
    <Link
      href={to}
      className={`${styles.default} ${styles[styleType]} ${className}`}
    >
      {children}
    </Link>
  );
}
