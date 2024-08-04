import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading_lottie.json";

interface ILoading {
  text?: string;
}

export default function Loading({ text = "Loading..." }: ILoading) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Lottie animationData={loadingAnimation} loop={true} />
      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        {text}
      </p>
    </div>
  );
}
