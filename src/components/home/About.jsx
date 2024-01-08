/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";

export function About() {
  return (
    <motion.div
      className="text-start m-auto lg:w-4/5 md:w-full sm:w-full pb-20"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h2 className="text-gray-600 text-center text-opacity-90 text-5xl font-bold leading-tight my-10">
        Bienvenue chez Poussez Pas Derrière
      </h2>
      <p className="text-gray-600 m-auto px-6 text-opacity-90 leading-7 sm:w-4/5">
        Nous avons décidé de centrer notre pépinière sur les plantes
        comestibles, offrant ainsi à chacun la possibilité de déambuler dans son
        jardin ou sur sa terrasse tout en savourant ce qui l'entoure. Si vous
        souhaitez obtenir davantage d'informations, n'hésitez pas à nous
        contacter au{" "}
        <span className="text-amber-500 font-bold">06 19 10 04 12.</span>
      </p>
      <p className="text-gray-600 mt-10 text-center text-opacity-90 text-4xl font-bold leading-10">
        Bon Jardinage à tous !
      </p>
    </motion.div>
  );
}
