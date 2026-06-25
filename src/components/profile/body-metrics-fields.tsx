"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GENDER_OPTIONS } from "@/lib/gender";
import type {
  BodyMetricsFormValues,
  HeightUnit,
  WeightUnit,
} from "@/lib/body-metrics-form";
import { cn } from "@/lib/utils";

type BodyMetricsFieldsProps = {
  values: BodyMetricsFormValues;
  onChange: (values: BodyMetricsFormValues) => void;
  idPrefix?: string;
  optional?: boolean;
};

function UnitToggle<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="inline-flex rounded-lg border border-input p-0.5"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={cn(
            "rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
            value === opt.value
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const spinHide =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export function BodyMetricsFields({
  values,
  onChange,
  idPrefix = "body",
  optional = false,
}: BodyMetricsFieldsProps) {
  const suffix = optional ? " (optional)" : "";

  function patch(partial: Partial<BodyMetricsFormValues>) {
    onChange({ ...values, ...partial });
  }

  function setWeightUnit(unit: WeightUnit) {
    if (unit === values.weightUnit || values.weight.trim() === "") {
      patch({ weightUnit: unit });
      return;
    }
    const n = parseFloat(values.weight);
    if (Number.isNaN(n)) {
      patch({ weightUnit: unit });
      return;
    }
    const converted =
      unit === "kg"
        ? String(Math.round((n / 2.20462) * 10) / 10)
        : String(Math.round(n * 2.20462));
    patch({ weightUnit: unit, weight: converted });
  }

  function setHeightUnit(unit: HeightUnit) {
    if (unit === values.heightUnit) return;

    if (unit === "cm") {
      const ft = parseInt(values.heightFt || "0", 10);
      const inches = parseInt(values.heightIn || "0", 10);
      const totalInches = ft * 12 + inches;
      const cm =
        totalInches > 0 ? String(Math.round(totalInches * 2.54)) : "";
      patch({ heightUnit: unit, heightCm: cm, heightFt: "", heightIn: "" });
      return;
    }

    const cm = parseFloat(values.heightCm);
    if (Number.isNaN(cm) || cm <= 0) {
      patch({ heightUnit: unit, heightCm: "" });
      return;
    }
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    patch({
      heightUnit: unit,
      heightFt: String(feet),
      heightIn: String(inches === 12 ? 0 : inches),
      heightCm: "",
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-gender`}>Gender{suffix}</Label>
        <select
          id={`${idPrefix}-gender`}
          value={values.gender}
          onChange={(e) =>
            patch({ gender: e.target.value as BodyMetricsFormValues["gender"] })
          }
          className={cn(
            "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "dark:bg-input/30"
          )}
        >
          <option value="">Select (optional)</option>
          {GENDER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-age`}>Age{suffix}</Label>
        <Input
          id={`${idPrefix}-age`}
          type="number"
          min={13}
          max={100}
          placeholder="e.g. 32"
          value={values.age}
          onChange={(e) => patch({ age: e.target.value })}
          className={spinHide}
        />
        <p className="text-xs text-muted-foreground">
          Used for heart rate zone estimates
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={`${idPrefix}-weight`}>Weight{suffix}</Label>
          <UnitToggle
            value={values.weightUnit}
            options={[
              { value: "lbs", label: "lbs" },
              { value: "kg", label: "kg" },
            ]}
            onChange={setWeightUnit}
            ariaLabel="Weight unit"
          />
        </div>
        <Input
          id={`${idPrefix}-weight`}
          type="number"
          min={values.weightUnit === "lbs" ? 50 : 25}
          max={values.weightUnit === "lbs" ? 550 : 250}
          step={values.weightUnit === "kg" ? 0.1 : 1}
          placeholder={values.weightUnit === "lbs" ? "e.g. 165" : "e.g. 75"}
          value={values.weight}
          onChange={(e) => patch({ weight: e.target.value })}
          className={spinHide}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label>Height{suffix}</Label>
          <UnitToggle
            value={values.heightUnit}
            options={[
              { value: "ft", label: "ft / in" },
              { value: "cm", label: "cm" },
            ]}
            onChange={setHeightUnit}
            ariaLabel="Height unit"
          />
        </div>
        {values.heightUnit === "cm" ? (
          <Input
            id={`${idPrefix}-height-cm`}
            type="number"
            min={100}
            max={260}
            placeholder="e.g. 175"
            value={values.heightCm}
            onChange={(e) => patch({ heightCm: e.target.value })}
            className={spinHide}
          />
        ) : (
          <div className="flex gap-2">
            <Input
              id={`${idPrefix}-height-ft`}
              type="number"
              min={3}
              max={8}
              placeholder="ft"
              value={values.heightFt}
              onChange={(e) => patch({ heightFt: e.target.value })}
              className={cn("w-20", spinHide)}
            />
            <Input
              id={`${idPrefix}-height-in`}
              type="number"
              min={0}
              max={11}
              placeholder="in"
              value={values.heightIn}
              onChange={(e) => patch({ heightIn: e.target.value })}
              className={cn("w-20", spinHide)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
