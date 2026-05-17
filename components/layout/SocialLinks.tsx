import Link from "next/link";
import { siteContent } from "@/content/portfolio";
import { IconGithub, IconLinkedin, IconMail } from "@/components/ui/icons";

const socialItems = [
  { href: `mailto:${siteContent.links.email}`, label: "Email", icon: IconMail, external: false },
  { href: siteContent.links.github, label: "GitHub", icon: IconGithub, external: true },
  { href: siteContent.links.linkedin, label: "LinkedIn", icon: IconLinkedin, external: true }
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {socialItems.map((item) => (
        <SocialLink key={item.label} {...item} />
      ))}
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
  external
}: (typeof socialItems)[number]) {
  const className = "icon-btn social-link-btn";

  if (external) {
    return (
      <Link href={href} target="_blank" rel="noreferrer" className={className} aria-label={label} title={label}>
        <Icon size={18} />
      </Link>
    );
  }

  return (
    <a href={href} className={className} aria-label={label} title={label}>
      <Icon size={18} />
    </a>
  );
}
