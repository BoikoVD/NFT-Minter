"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import GradientBox from "@/components/UI/GradientBox";
import Button from "@/components/UI/Button";
import Title from "@/components/UI/Title";
import Text from "@/components/UI/Text";

interface IProps {
  data: {
    title: string;
    description: string;
    redirectData?: {
      to: string;
      text: string;
    };
    actionCallBack?: {
      callBack: () => void;
      text: string;
    };
  }[];
}

const styles = {
  container: "relative mt-10 flex w-full flex-col gap-4 sm:gap-6 md:gap-0",
  gradientBox: "flex flex-col items-center p-6",
  numberElementInGradientBox:
    "mb-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-pink text-purple md:hidden",
  numbersBarContainer:
    "absolute left-[50%] top-[50%] hidden w-[2px] translate-x-[-50%] bg-pink md:block",
  numberElementInBar:
    "absolute left-[50%] flex h-[30px] w-[30px] translate-x-[-50%] items-center justify-center rounded-full border border-[2px] border-pink bg-pink font-bold text-purple"
};

export default function StepCards({ data }: IProps) {
  const [barParams, setBarParams] = useState<number[]>([]);
  const { width } = useWindowSize();

  const idPrefix = "step_box_";

  useEffect(() => {
    if (data && width && width >= 768) {
      const newParams: number[] = [];
      for (let i = 0; i <= data.length; i++) {
        const element = document.getElementById(idPrefix + (i + 1));
        if (element) {
          if (newParams.length > 0) {
            newParams.push(
              element.offsetTop + element.offsetHeight / 2 - newParams[0]
            );
          } else {
            newParams.push(element.offsetTop + element.offsetHeight / 2);
          }
        }
      }
      setBarParams(newParams);
    }
  }, [width, data]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        const isTransparent = width && width >= 768;
        const isOdd = (index + 1) % 2 === 1;
        const isFirstOrLast = index === 0 || index === data.length - 1;
        return (
          <GradientBox
            wrapperClassName={`md:w-[45%] ${isOdd ? "md:self-start" : "md:self-end"} ${!isFirstOrLast ? "md:my-[-20px]" : ""}`}
            className={`${styles.gradientBox} ${isOdd ? "md:items-end" : "md:items-start"}`}
            transparentBorder={
              isTransparent ? (isOdd ? "left" : "right") : undefined
            }
            id={idPrefix + (index + 1)}
            key={idPrefix + (index + 1)}
          >
            <Text className={styles.numberElementInGradientBox} size="large">
              {index + 1}
            </Text>
            <Title
              tag="h3"
              size="medium"
              className={`text-center ${isOdd ? "md:text-right" : "md:text-left"}`}
            >
              {item.title}
            </Title>
            <Text
              className={`mt-4 text-center ${isOdd ? "md:text-right" : "md:text-left"}`}
            >
              {item.description}
            </Text>
            {item.redirectData && (
              <Button size="small" className="mt-4">
                {item.redirectData.text}
              </Button>
            )}
            {item.actionCallBack && (
              <Button
                size="small"
                className="mt-4"
                onClick={item.actionCallBack.callBack}
              >
                {item.actionCallBack.text}
              </Button>
            )}
          </GradientBox>
        );
      })}
      {barParams.length > 0 && (
        <div
          className={styles.numbersBarContainer}
          style={{
            top: barParams[0],
            height: barParams.length - 1 > 1 ? barParams[barParams.length - 1] : 0
          }}
        >
          {barParams.map((topValue, index) => {
            if (index === 0) {
              return (
                <div
                  className={`${styles.numberElementInBar} top-0 translate-y-[-99%]`}
                  key={index}
                >
                  1
                </div>
              );
            }
            if (index === barParams.length - 1) {
              return (
                <div
                  className={`${styles.numberElementInBar} top-[100%] translate-y-[-50%]`}
                  key={index}
                >
                  {index + 1}
                </div>
              );
            }
            return (
              <div
                className={`${styles.numberElementInBar} translate-y-[-50%]`}
                style={{ top: topValue }}
                key={index}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
