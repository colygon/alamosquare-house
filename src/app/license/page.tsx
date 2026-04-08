import { readFile } from "fs/promises";
import { join } from "path";
import type { Metadata } from "next";
import { LicenseContent } from "@/components/LicenseContent";
import { LicenseSignForm } from "@/components/LicenseSignForm";

export const metadata: Metadata = {
  title: "License Agreement | Alamo Square House",
  description:
    "Review and sign the Alamo Square House shared living space license agreement.",
};

export default async function LicensePage() {
  const markdown = await readFile(
    join(process.cwd(), "public", "license-agreement.md"),
    "utf-8"
  );

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            License Agreement
          </h1>
          <p className="mt-3 text-muted">
            Alamo Square House &mdash; San Francisco, CA
          </p>
        </div>

        {/* License Text */}
        <LicenseContent markdown={markdown} />

        {/* Signing Form */}
        <LicenseSignForm />
      </section>
    </main>
  );
}
