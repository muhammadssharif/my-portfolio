import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export default async function LegacyResumeSkillsRedirect() {
  const locale = await getLocale();
  redirect({ href: "/work", locale });
}
