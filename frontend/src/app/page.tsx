
'use client';

import { useRouter } from "next/navigation";
import GradualSpacing from "@/animations/GradualSpacing";
import Blured from "@/animations/Blured";
import { motion } from "framer-motion";
import {useEffect} from "react";


export default function Home() {
const navigate = useRouter();

useEffect(() => {
    setTimeout(()=> {
        navigate.push('/recommender');
    }, 8000);
}, []);

  return (
    <main className=" flex min-h-screen flex-col items-center  p-24">
    <Blured text={"Mirada Movie Recommender"} className={"text-5xl font-serif italic"}/>
        <motion.div
            initial={{
                backgroundColor: '#c54123',
                opacity: 0.8,
                scaleX:1.5
            }}
            animate={{
                backgroundColor: '#3333ff',
                opacity: 0.5,
                scaleX:1
            }}
            transition={{
                duration: 5,

        }}
            className={"h-120  px-6 max-w-full my-8 flex items-center justify-center gap-3 overflow-hidden"}>
            <motion.img
                initial={{
                    scale: 0.5,
                    rotate: -10,
                    x: -100,
                    opacity: 0.5
                }}
                animate={{
                    scale: 1,
                    rotate: 0,
                    x: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    ease: "easeOut"

                }}
                src={"https://raw.githubusercontent.com/Yisak-E/imageAssets/main/posters/Atlas_tt14856980.jpg"}
                alt={"Movie Poster"}
                className={"h-100"}
           />

              <motion.img
                  initial={{
                        scale: 0,
                        rotate: 0,
                        x: 100,
                        opacity: 0.5
                  }}
                  animate={{
                        scale: 1,
                        rotate: 360,
                        x: 0,
                        opacity: 1,
                  }}
                  transition={{
                        duration: 1,
                        ease: "easeOut"
                  }}
                src={"https://raw.githubusercontent.com/Yisak-E/imageAssets/main/posters/A_Quiet_Place__Day_One_tt13433802.jpg"}
                alt={"A Quiet Place Day_One"}
                className={"h-100"}
           />
              <motion.img
                    initial={{
                        scale: 0.5,
                        rotate: 10,
                        x: 100,
                        opacity: 0.5
                    }}
                    animate={{
                        scale: 1,
                        rotate: 0,
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeOut"
                    }}

                src={"https://m.media-amazon.com/images/M/MV5BNzg3YjVmZGYtOTc5MC00MDdiLTllOTYtZWQ0ODQ1MmMyNTExXkEyXkFqcGc@._V1_SX300.jpg"}
                alt={"Movie Poster"}
                className={"h-100"}
           />

        </motion.div>
        <GradualSpacing text={"Your ultimate movie appetizer, for 2026.".toUpperCase()} />
    </main>
  );
}
