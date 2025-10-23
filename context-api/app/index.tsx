import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from "./context/ThemeContext";

export default function Page() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
