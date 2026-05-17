import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export default async function LegacyContactEmailRedirect() {
  const locale = await getLocale();
  redirect({ href: "/contact", locale });
}
