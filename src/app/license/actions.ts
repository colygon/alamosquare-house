"use server";

import { headers } from "next/headers";
import { createSupabaseClient } from "@/lib/supabase";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function signLicenseAgreement(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const amountOption = formData.get("amountOption") as string | null;
  const customAmount = formData.get("customAmount") as string | null;
  const agreed = formData.get("agreed");

  // Validation
  const errors: Record<string, string> = {};

  if (!name || name.trim().length === 0) {
    errors.name = "Full name is required.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "A valid email address is required.";
  }

  if (!phone || phone.trim().length < 7) {
    errors.phone = "A valid phone number is required.";
  }

  let monthlyAmount: number;
  if (amountOption === "custom") {
    const parsed = parseInt(customAmount || "", 10);
    if (isNaN(parsed) || parsed < 1) {
      errors.amount = "Please enter a valid custom amount.";
    }
    monthlyAmount = parsed;
  } else if (amountOption === "2500" || amountOption === "3000") {
    monthlyAmount = parseInt(amountOption, 10);
  } else {
    errors.amount = "Please select a monthly amount.";
    monthlyAmount = 0;
  }

  if (!agreed) {
    errors.agreed = "You must agree to the license terms.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below.", errors };
  }

  // Capture request metadata
  const hdrs = await headers();
  const ipAddress =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    null;
  const userAgent = hdrs.get("user-agent") || null;

  // Insert into Supabase
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("license_agreements").insert({
    name: name!.trim(),
    email: email!.trim().toLowerCase(),
    phone: phone!.trim(),
    monthly_amount: monthlyAmount,
    agreement_version: "1.0",
    ip_address: ipAddress,
    user_agent: userAgent,
  });

  if (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    success: true,
    message: `Thank you, ${name!.trim()}! Your license agreement has been signed successfully.`,
  };
}
