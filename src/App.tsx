import "./App.css";
import {
  Container,
  CssBaseline,
  Stack,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme, DarkTheme } from "./components/Themes";
import { useState, useEffect, useContext } from "react";
import { MaterialUISwitch } from "./components/Switch";
import ToDos from "./components/ToDos";
import { useMediaQuery } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Context } from "./components/Localisation";
import LanguageChanger from "./components/LanguageChanger";

function App() {
  type mode = "dark" | "light";
  const context = useContext(Context);
  const prefersDarkMode = useMediaQuery<string>("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<mode>(prefersDarkMode ? "dark" : "light");
  useEffect(
    () => setMode(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Stack mt={1} direction={"row"} alignItems={"center"} justifyContent={'space-between'}>
          <select value={context.locale} onChange={context.selectLanguage}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
          {/* <LanguageChanger /> */}
          <MaterialUISwitch
            sx={{ opacity: 0.7 }}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            checked={mode === "light" ? false : true}
          />
        </Stack>
        <Stack mt={15} mb={2} alignItems="center">
          <h1>
            <FormattedMessage id="title" defaultMessage="ToDo List:" />
          </h1>
        </Stack>
        <ToDos />
      </Container>
    </ThemeProvider>
  );
}

export default App;
