"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImagesHeader() {
  return (
    <motion.div
      className="relative lg:block m-auto mb-14 lg:w-4/5 md:w-full sm:w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Image
        className="object-center object-cover h-[700px] m-auto shadow-2xl lg:rounded-md"
        src="/pépinère Pyrénées orientales.jpg"
        width={1920}
        height={1920}
        alt="pépinière pyrénées orientales"
      />
      <div className="absolute bottom-10 inset-x-0">
        <Image
          className="w-1/5 h-auto m-auto"
          src="/lolo 2 pépinière.png"
          width={654}
          height={214}
          alt="pépinière pyrénées orientales"
        />
      </div>
    </motion.div>
  );
}
