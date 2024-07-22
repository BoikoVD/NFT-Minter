import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading_lottie.json";

interface ILoading {
    text?: string,
}

export default function Loading({ text = 'Loading...' }: ILoading) {

    return (
        <div className="relative flex items-center justify-center h-full w-full">
            <Lottie animationData={loadingAnimation} loop={true} />
            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {text}
            </p>
        </div>
    );
}