import { SectionNav } from "@/components/layout/section-nav";
import { tipsSectionNav } from "@/lib/navigation";

export function TipsSectionNav() {
  return (
    <SectionNav
      items={tipsSectionNav}
      ariaLabel="Tips sections"
    />
  );
}
