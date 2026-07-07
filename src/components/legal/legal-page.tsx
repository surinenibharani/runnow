import { FadeIn } from "@/components/motion/fade-in";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { isMedicalDisclaimerHeading } from "@/lib/medical-disclaimer";

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: title },
            ]}
          />
          <p className="text-sm text-muted-foreground">Last updated {lastUpdated}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p}
                    className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {isMedicalDisclaimerHeading(section.heading) ? (
                      <MedicalDisclaimerText>{p}</MedicalDisclaimerText>
                    ) : (
                      p
                    )}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
