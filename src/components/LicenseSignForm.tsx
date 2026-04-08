"use client";

import { useActionState, useState } from "react";
import { signLicenseAgreement } from "@/app/license/actions";
import type { ActionState } from "@/app/license/actions";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function LicenseSignForm() {
  const [state, formAction, pending] = useActionState(
    signLicenseAgreement,
    initialState
  );
  const [amountOption, setAmountOption] = useState<string>("");

  if (state.success) {
    return (
      <div className="mt-10 rounded-xl border border-card-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <svg
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Agreement Signed
        </h3>
        <p className="text-muted">{state.message}</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-light transition"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-xl border border-card-border bg-card p-6 md:p-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Sign the License Agreement
      </h2>

      {state.message && !state.success && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
          <p className="text-red-400 text-sm">{state.message}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full legal name"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-400">{state.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
          />
          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-400">{state.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="(555) 123-4567"
            className="w-full rounded-lg border border-card-border bg-background px-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
          />
          {state.errors?.phone && (
            <p className="mt-1 text-sm text-red-400">{state.errors.phone}</p>
          )}
        </div>

        {/* Monthly Amount */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Monthly License Fee
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              className={`flex items-center justify-center rounded-lg border px-4 py-3 cursor-pointer transition ${
                amountOption === "2500"
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-card-border bg-background text-muted hover:border-muted"
              }`}
            >
              <input
                type="radio"
                name="amountOption"
                value="2500"
                checked={amountOption === "2500"}
                onChange={(e) => setAmountOption(e.target.value)}
                className="sr-only"
              />
              <span className="font-semibold">$2,500</span>
              <span className="ml-1 text-sm text-muted">/mo</span>
            </label>

            <label
              className={`flex items-center justify-center rounded-lg border px-4 py-3 cursor-pointer transition ${
                amountOption === "3000"
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-card-border bg-background text-muted hover:border-muted"
              }`}
            >
              <input
                type="radio"
                name="amountOption"
                value="3000"
                checked={amountOption === "3000"}
                onChange={(e) => setAmountOption(e.target.value)}
                className="sr-only"
              />
              <span className="font-semibold">$3,000</span>
              <span className="ml-1 text-sm text-muted">/mo</span>
            </label>

            <label
              className={`flex items-center justify-center rounded-lg border px-4 py-3 cursor-pointer transition ${
                amountOption === "custom"
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-card-border bg-background text-muted hover:border-muted"
              }`}
            >
              <input
                type="radio"
                name="amountOption"
                value="custom"
                checked={amountOption === "custom"}
                onChange={(e) => setAmountOption(e.target.value)}
                className="sr-only"
              />
              <span className="font-semibold">Custom</span>
            </label>
          </div>

          {amountOption === "custom" && (
            <div className="mt-3">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
                <input
                  type="number"
                  name="customAmount"
                  min="1"
                  required
                  placeholder="Enter amount"
                  className="w-full rounded-lg border border-card-border bg-background pl-8 pr-4 py-3 text-foreground placeholder:text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm">/mo</span>
              </div>
            </div>
          )}

          {state.errors?.amount && (
            <p className="mt-1 text-sm text-red-400">{state.errors.amount}</p>
          )}
        </div>

        {/* Agreement Checkbox */}
        <div className="rounded-lg border border-card-border bg-background p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreed"
              value="true"
              required
              className="mt-1 h-4 w-4 rounded border-card-border accent-accent"
            />
            <span className="text-sm text-muted leading-relaxed">
              I have read and agree to the terms of the License Agreement above.
              I understand this is a license to use the shared living space and
              does not constitute a lease or create a landlord-tenant
              relationship.
            </span>
          </label>
          {state.errors?.agreed && (
            <p className="mt-2 text-sm text-red-400">{state.errors.agreed}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-accent px-8 py-3 font-semibold text-white hover:bg-accent-light transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing...
            </span>
          ) : (
            "Sign Agreement"
          )}
        </button>
      </form>
    </div>
  );
}
