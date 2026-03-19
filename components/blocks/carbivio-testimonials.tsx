"use client";

import { cn } from "@/lib/utils";
import {
  CarbivioTestimonialCard,
  TestimonialAuthor,
} from "@/components/ui/carbivio-testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function CarbivioTestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-[#151514] text-white",
        "py-16 lg:py-20 px-6",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4 px-4">
          <p className="text-[#eca226] text-sm font-semibold uppercase tracking-widest mb-3">
            Témoignages clients
          </p>
          <h2 className="font-special-gothic font-extrabold text-4xl lg:text-6xl text-white leading-tight max-w-4xl mb-4">
            {title}
          </h2>
          <p className="text-white/40 text-lg lg:text-xl max-w-3xl font-medium leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-4 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:60s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(8)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <CarbivioTestimonialCard
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                )),
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#151514] to-transparent sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#151514] to-transparent sm:block" />
        </div>
      </div>
    </section>
  );
}
