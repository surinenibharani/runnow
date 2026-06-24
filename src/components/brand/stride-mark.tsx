import { cn } from "@/lib/utils";

type StrideMarkProps = {
  className?: string;
};

export function StrideMark({ className }: StrideMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d="M2 7.5h2.5M1.5 10.5h2M2 13.5h2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="16.25" cy="5.75" r="2" fill="currentColor" />
      <path
        d="M14.75 7.75c-1.5 1.5-2.75 3.25-3.75 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 13l4 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 13l-3.25 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.5 8.75l2-1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
