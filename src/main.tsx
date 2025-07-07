import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HeroUIProvider } from "@heroui/system";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </ThemeProvider>
  </HashRouter>
);
