import type { ContactInfo, SocialLink } from "@/types/connect";

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    handle: "@jmi.drosa",
    href: "https://www.instagram.com/jmi.drosa/",
    icon: "ig",
  },
  {
    name: "LinkedIn",
    handle: "Jamie Del Rosario",
    href: "https://www.linkedin.com/in/jamiedelrosario/",
    icon: "in",
  },
  {
    name: "Facebook",
    handle: "Del Rosario Jamie",
    href: "https://www.facebook.com/JmiGdR/",
    icon: "fb",
  },
  {
    name: "Github",
    handle: "@jemiiidr",
    href: "https://github.com/jemiiidr",
    icon: "gh",
  },
];

export const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    value: "drosario.jamie@gmail.com",
    href: "mailto:drosario.jamie@gmail.com",
  },
  {
    label: "Phone",
    value: "+639472907289",
    href: "tel:+639472907289",
  },
];