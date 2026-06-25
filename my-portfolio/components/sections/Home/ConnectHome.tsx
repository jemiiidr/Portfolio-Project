import Link from "next/link";
import { contactInfo, socialLinks } from "@/lib/connect";

export default function ConnectHome() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-blk2 px-6 py-28 text-cream md:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_24rem] lg:items-start">
        <div>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.45em] text-muted-cream">
            Connect
          </p>

          <div className="grid gap-x-20 gap-y-6 md:grid-cols-2">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.name}: ${social.handle}`}
                className="group relative flex w-fit items-center gap-6"
              >
                <span className="grid size-5 place-items-center rounded-sm bg-logic text-[0.55rem] font-black uppercase leading-none text-blk2 transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:rounded-full">
                  {social.icon}
                </span>

                <span className="relative z-10 text-4xl font-black leading-none tracking-[-0.06em] text-cream transition duration-300 group-hover:-translate-y-1 group-hover:text-logic md:text-5xl">
                  {social.name}
                </span>

                <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-5 -translate-y-1/2 overflow-hidden whitespace-nowrap bg-logic px-4 py-2 text-sm font-black tracking-tight text-blk2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 max-md:hidden">
                  <span className="block translate-y-full transition duration-300 group-hover:translate-y-0">
                    {social.handle}
                  </span>
                </span>

                <span className="absolute -inset-x-3 -inset-y-2 z-0 scale-x-0 bg-logic/10 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
              </Link>
            ))}

            
          </div>
        </div>
        
        {/* Email and Phone */}
        <div className="mt-12 space-y-5 text-base font-medium">
          {contactInfo.map((contact) => (
            <div key={contact.label}>
              <p className="font-black text-cream">{contact.label}:</p>

              <a
                href={contact.href}
                className="text-muted-cream transition duration-300 hover:text-logic"
              >
                {contact.value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}