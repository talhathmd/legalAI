import Image from "next/image";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          Simplify Legal Document Review with AI!
        </p>
      </div>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        Analyze your <span className="text-blue-800">legal documents</span> in
        seconds.
      </h1>

      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        LegalAI streamlines your contract and legal document analysis with
        advanced AI technology. Instantly detect risks, ambiguities, and
        inconsistencies, ensuring accuracy and compliance with minimal effort.
        Save time, reduce errors, and focus on what matters—leave the heavy
        lifting to LegalAI. Start reviewing smarter today!
      </p>

      <Link
        className={buttonVariants({
          size: "lg",
          className: "mt-5",
        })}
        href="#"
      >
        Get started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </MaxWidthWrapper>
  );
}
