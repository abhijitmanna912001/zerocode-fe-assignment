import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border border-gray-300 dark:border-gray-600"
      title="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 cursor-pointer" />
      ) : (
        <Moon className="w-5 h-5 cursor-pointer" />
      )}
    </button>
  );
};

export default ThemeToggle;
