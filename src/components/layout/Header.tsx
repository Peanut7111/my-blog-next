import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { href: "/", label: "首页", icon: "🏠" },
  { href: "/posts", label: "文章", icon: "📜" },
  { href: "/tags", label: "标签", icon: "🏷️" },
  { href: "/archive", label: "归档", icon: "📅" },
  { href: "/about", label: "关于", icon: "👤" },
];

interface HeaderProps {
  activeNav?: string;
}

export function Header({ activeNav = "/" }: HeaderProps) {
  return (
    <header className="bg-gradient-to-b from-yellow-600 to-yellow-800 border-b-4 border-amber-900 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🔺</span>
            <h1 className="text-2xl font-bold text-amber-900">
              Peanut的冒险日志
            </h1>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <nav className="border-t-2 border-green-600 mt-2">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <ul className="flex flex-wrap gap-2 justify-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                    activeNav === item.href
                      ? "bg-green-600 text-white"
                      : "bg-green-600/80 text-white hover:bg-green-500"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
