"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BodyMetricsFields } from "@/components/profile/body-metrics-fields";
import {
  bodyMetricsFromStored,
  bodyMetricsToStored,
  emptyBodyMetricsForm,
  type BodyMetricsFormValues,
} from "@/lib/body-metrics-form";

type ProfileModalContextValue = {
  openProfile: () => void;
};

const ProfileModalContext = createContext<ProfileModalContextValue | null>(null);

export function useProfileModal() {
  const ctx = useContext(ProfileModalContext);
  if (!ctx) {
    throw new Error("useProfileModal must be used within ProfileModalProvider");
  }
  return ctx;
}

type ProfileData = {
  name: string | null;
  email: string;
  age: number | null;
  gender: string | null;
  weightKg: number | null;
  heightCm: number | null;
};

export function ProfileModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [form, setForm] = useState<BodyMetricsFormValues>(emptyBodyMetricsForm);

  const openProfile = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);
    setError("");

    fetch("/api/user/profile")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json() as Promise<ProfileData>;
      })
      .then((data) => {
        if (cancelled) return;
        setProfile(data);
        setForm(
          bodyMetricsFromStored({
            gender: data.gender,
            age: data.age,
            weightKg: data.weightKg,
            heightCm: data.heightCm,
          })
        );
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your profile. Try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  async function handleSave() {
    setSaving(true);
    setError("");
    const stored = bodyMetricsToStored(form);

    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stored),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Failed to save profile");
      return;
    }

    setProfile(data);
    setOpen(false);
    window.dispatchEvent(new CustomEvent("profile-updated"));
  }

  function close() {
    if (saving) return;
    setOpen(false);
    setError("");
  }

  return (
    <ProfileModalContext.Provider value={{ openProfile }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={close}
        >
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="w-full max-w-md border-border/60 shadow-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="size-5" />
                </div>
                <div>
                  <CardTitle id="profile-modal-title">Your profile</CardTitle>
                  <CardDescription>
                    {profile?.name || profile?.email || "Body metrics for HR zones"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : (
                <BodyMetricsFields
                  idPrefix="profile"
                  values={form}
                  onChange={setForm}
                />
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleSave}
                  disabled={loading || saving}
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={close}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </ProfileModalContext.Provider>
  );
}
