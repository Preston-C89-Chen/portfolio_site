
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Be1 from "@public/be-port1.png";
import Be2 from "@public/be-port2.png";
import Bli1 from "@public/bli-port1.png";
import Bli2 from "@public/bli-port2.png";
import Sfport1 from "@public/sf-port1.jpg";
import Sfport2 from "@public/sf-port2.jpg";
import Sfport3 from "@public/sf-port3.jpg";
import VF1 from "@public/vf-port1.jpg";
import VF2 from "@public/vf-port2.jpg";
import { TextGenerateEffect } from "./text-generate-effect";
const products  = [
  {
    title: "Synapse",
    link: "https://dashboard.synapsefi.com/v3/auth/signin",
    thumbnail: Sfport1,
  },
  {
    title: "Synapse",
    link: "https://dashboard.synapsefi.com/v3/auth/signin",
    thumbnail: Sfport2,
  },
  {
    title: "Brightedge",
    link: "https://www.brightedge.com/",
    thumbnail: Be1,
  },
  {
    title: "Brightedge",
    link: "https://www.brightedge.com/",
    thumbnail: Be2,
  },
  {
    title: "britelite immersive",
    link: "http://www.briteliteimmersive.com/",
    thumbnail: Bli1,
  },
  {
    title: "britelite immersive",
    link: "http://www.briteliteimmersive.com/",
    thumbnail: Bli2,
  },
  {
    title: "Viewfind",
    link: "",
    thumbnail: VF1,
  },
  {
    title: "Viewfind",
    link: "",
    thumbnail: VF2,
  }
];

export const HeroParallax = () => {
  const firstRow = products.slice(0, 2);
  const secondRow = products.slice(2, 4);
  const thirdRow = products.slice(4, 6);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 700]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -700]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 300]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
         
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-md shadow-md max-w-md text-white">
          <h1 className="text-lg md:text-xl font-bold text-white mb-2">Synapsefi | Software Engineer</h1>
          <p className="text-sm md:text-base text-gray-300">An API company focusing on simplifying financial integrations.</p>
        </div>
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
          <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-md shadow-md max-w-md text-white">
              <h1 className="text-lg md:text-xl font-bold text-white mb-2">BrightEdge | Web Developer</h1>
              <p className="text-sm md:text-base text-gray-300">A SEO optimization platform focused on improving customer experience </p>
          </div>
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
          <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-md shadow-md max-w-md text-white">
            <h1 className="text-lg md:text-xl font-bold text-white mb-2">BriteLite Immersive | Frontend Engineer</h1>
            <p className="text-sm md:text-base text-gray-300">A creative agency focused on creating beauty and wonder</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Preston Chen  / <br />  Software Engineer
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        <TextGenerateEffect duration={2} filter={false} words={` Coding with flair and crafting systems where numbers and dreams pair.
        His language of choice speaks in elegant streams, Python's clarity, and Javascript's specailty fueling product dreams.
        Beyond the syntax, my passion probes AI's creativity.
        In a world of data, with visions firmly set, we build the future with everyline, a sure bet.`}/>
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
