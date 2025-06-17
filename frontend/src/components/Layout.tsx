import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <header className="p-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">🧠 Chat App</h1>
        <ThemeToggle />
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
