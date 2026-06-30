import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { womenRunnerConcerns } from "@/lib/injuries/women-runner-concerns";

export function WomenRunnerConcernsSection() {
  return (
    <>
      <FadeIn className="mb-8">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          These issues show up often in women&apos;s training searches — RED-S,
          pelvic floor symptoms, and pregnancy return. They can affect anyone,
          but worth knowing early.{" "}
          <span className="font-medium text-foreground">
            This section is educational, not medical advice — see your doctor or
            a women&apos;s health / sports physio when in doubt.
          </span>
        </p>
      </FadeIn>

      <StaggerChildren className="space-y-6 mb-12">
        {womenRunnerConcerns.map((concern) => (
          <StaggerItem key={concern.title}>
            <Card className="border-violet-500/20 bg-violet-500/[0.03] hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-700 dark:text-violet-300">
                    <concern.icon className="size-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className="text-xs border-violet-500/20"
                      >
                        {concern.area}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{concern.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {concern.symptoms}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-4 sm:grid-cols-2 ml-14">
                  <div className="rounded-xl bg-muted/40 p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      How to avoid
                    </h3>
                    <ul className="space-y-1.5">
                      {concern.avoid.map((tip) => (
                        <li
                          key={tip}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="text-violet-600 dark:text-violet-400 shrink-0">
                            ·
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      How to fix / recover
                    </h3>
                    <ul className="space-y-1.5">
                      {concern.fix.map((tip) => (
                        <li
                          key={tip}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="text-violet-600 dark:text-violet-400 shrink-0">
                            ·
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 ml-14 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Stethoscope className="size-4 text-amber-600 dark:text-amber-500" />
                    When to see a specialist
                  </h3>
                  <ul className="space-y-1.5">
                    {concern.seeSpecialist.map((tip) => (
                      <li
                        key={tip}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-amber-600 dark:text-amber-500 shrink-0">
                          ·
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                {concern.readMore && (
                  <p className="mt-4 ml-14 text-sm">
                    <Link
                      href={concern.readMore.href}
                      className="font-medium text-primary hover:underline"
                    >
                      {concern.readMore.label}
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </>
  );
}
