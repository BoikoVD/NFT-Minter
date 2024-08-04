"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const AnimatedBg = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent"
        }
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false
          },
          onHover: {
            enable: false
          }
        }
      },
      particles: {
        color: {
          value: "#ffffff"
        },
        links: {
          color: "#ffffff",
          distance: 220,
          enable: true,
          opacity: 0.1,
          width: 1
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out
          },
          random: false,
          speed: 0.5,
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 120
        },
        opacity: {
          value: 0.1
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 5 }
        }
      },
      detectRetina: true
    }),
    []
  );

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return <></>;
};
