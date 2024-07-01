import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  console.log(theme)
  return (
    <div className={theme}>
      <div className={`  ${theme === "dark" ? 'dark:text-gray-200 dark:bg-[rgb(16,23,42)]' : "bg-white text-gray-700"}   min-h-screen`}>
        {children}
      </div>
    </div>
  );
}
