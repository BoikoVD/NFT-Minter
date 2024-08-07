import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading_lottie.json";

interface ILoading {
  text?: string;
}

const styles = {
  wrapper: "relative flex h-full w-full items-center justify-center",
  text: "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
};

export default function Loading({ text = "Loading..." }: ILoading) {
  return (
    <div className={styles.wrapper}>
      <Lottie animationData={loadingAnimation} loop={true} />
      <p className={styles.text}>{text}</p>
    </div>
  );
}
