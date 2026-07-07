import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import {
  RunnerConcernCard,
  runnerConcernNavPillClass,
} from "@/components/injuries/runner-concern-card";
import {
  menRunnerConcerns,
  menRunnerNavSections,
  menRunnerPageIntro,
} from "@/lib/injuries/men-runner-concerns";

const BASE_PATH = "/injuries/for-men-runners";

export function MenRunnerConcernsSection() {
  return (
    <>
      <FadeIn className="mb-8">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {menRunnerPageIntro.whyUnique}{" "}
          <MedicalDisclaimerText>
            {menRunnerPageIntro.disclaimer}
          </MedicalDisclaimerText>
        </p>
      </FadeIn>

      <FadeIn className="mb-10">
        <nav
          aria-label="Men runner health topics"
          className="flex flex-wrap justify-center gap-2"
        >
          {menRunnerNavSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={runnerConcernNavPillClass("sky")}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <StaggerChildren className="mb-12 space-y-8">
        {menRunnerConcerns.map((concern) => (
          <StaggerItem key={concern.id}>
            <RunnerConcernCard
              concern={concern}
              theme="sky"
              basePath={BASE_PATH}
              linkTitle
              showShare
            />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </>
  );
}
