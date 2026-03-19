import { cn } from "@/lib/utils";
import Image from "next/image";

export interface TestimonialAuthor {
  name: string;
  handle?: string;
  title?: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function CarbivioTestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[360px] sm:max-w-[360px]",
        "transition-colors duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar rectangulaire pour les voitures - encore plus large */}
        <div className="relative h-12 w-40 shrink-0 overflow-hidden">
          <Image
            src={author.avatar}
            alt={author.name}
            className="object-cover"
            fill
            sizes="160px"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-white">
            {author.name}
          </h3>
          {author.title && (
            <p className="text-sm text-[#eca226]">{author.title}</p>
          )}
          {author.handle && (
            <p className="text-sm text-white/60">@{author.handle}</p>
          )}
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-white/80">{text}</p>
    </Card>
  );
}
