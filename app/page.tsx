import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Projects />
      <Pricing />
    </div>
  );
}
