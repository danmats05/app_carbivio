"use client";

import Image from "next/image";
import { useLoader } from "@/contexts/SmartLoaderContext";

export default function Loader() {
  const { showLoader } = useLoader();

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 bg-[#151514] flex flex-col items-center justify-center z-[9999]">
      {/* Logo */}
      <div className="mb-4">
        <Image
          src="/logo.png"
          alt="Carbivio"
          width={210}
          height={210}
          className="object-contain"
        />
      </div>

      {/* Loader */}
      <div className="loader" />

      {/* Styles CSS */}
      <style jsx>{`
        .loader {
          display: block;
          --height-of-loader: 4px;
          --loader-color: #eca226;
          width: 250px;
          height: var(--height-of-loader);
          border-radius: 30px;
          background-color: rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .loader::before {
          content: "";
          position: absolute;
          background: var(--loader-color);
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          border-radius: 30px;
          animation: moving 1s ease-in-out infinite;
        }

        @keyframes moving {
          50% {
            width: 100%;
          }
          100% {
            width: 0;
            right: 0;
            left: unset;
          }
        }
      `}</style>
    </div>
  );
}
