import "./App.css";
import { Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme, DarkTheme } from "./components/Themes";
import { useState, useEffect } from "react";
import { MaterialUISwitch } from "./components/Switch";
import MainBlock from "./components/MainBlock";
import { useMediaQuery } from "@mui/material";
import { FormattedMessage } from "react-intl";
import LanguageChanger from "./components/LanguageChanger";

function App() {
  type theme = "dark" | "light";
  const prefersDarkMode = useMediaQuery<string>("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<theme>(prefersDarkMode ? "dark" : "light");
  useEffect(
    () => setMode(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pt: 3, pb: 10 }}>
        <Stack
          mt={1}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <LanguageChanger />
          <MaterialUISwitch
            sx={{ opacity: 0.7 }}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            checked={mode === "light" ? false : true}
          />
        </Stack>
        <Stack mt={10} mb={2} alignItems="center">
          <h2>
            <FormattedMessage id="title" defaultMessage="ToDo List:" />
          </h2>
        </Stack>
        <MainBlock />
      </Container>
    </ThemeProvider>
  );
}

export default App;
