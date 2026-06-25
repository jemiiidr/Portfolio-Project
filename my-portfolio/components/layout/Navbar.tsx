import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-7 py-7 md:px-10 md:py-8">
      <nav className="flex items-center justify-between" aria-label="Main navigation">
        <Link
          href="/"
          aria-label="Go to home page"
          className="grid size-11 place-items-center rounded-full bg-cream text-blk1 transition duration-300 hover:scale-105 md:size-12"
        >
          <span className="-skew-x-12 text-xl font-black tracking-[-0.12em] md:text-2xl">
            JD
          </span>
        </Link>

        <div className="flex items-center gap-7 text-xs font-medium uppercase tracking-[-0.03em] text-muted-cream md:gap-10 md:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition duration-300 hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}