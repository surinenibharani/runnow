import { MedicalDisclaimerText } from "@/components/legal/medical-disclaimer-text";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import {
  RunnerConcernCard,
  runnerConcernNavPillClass,
} from "@/components/injuries/runner-concern-card";
import {
  womenRunnerConcerns,
  womenRunnerNavSections,
  womenRunnerPageIntro,
} from "@/lib/injuries/women-runner-concerns";

const BASE_PATH = "/injuries/for-women-runners";

export function WomenRunnerConcernsSection() {
  return (
    <>
      <FadeIn className="mb-8">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {womenRunnerPageIntro.whyUnique}{" "}
          <MedicalDisclaimerText>
            {womenRunnerPageIntro.disclaimer}
          </MedicalDisclaimerText>
        </p>
      </FadeIn>

      <FadeIn className="mb-10">
        <nav
          aria-label="Women runner health topics"
          className="flex flex-wrap justify-center gap-2"
        >
          {womenRunnerNavSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={runnerConcernNavPillClass("violet")}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <StaggerChildren className="mb-12 space-y-8">
        {womenRunnerConcerns.map((concern) => (
          <StaggerItem key={concern.id}>
            <RunnerConcernCard
              concern={concern}
              theme="violet"
              basePath={BASE_PATH}
              linkTitle
              showShare
              showIllustration
            />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </>
  );
}
