import "./App.css";
import { Container, CssBaseline, Stack, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme, DarkTheme } from "./components/Themes";
import { useState, useEffect } from "react";
import { MaterialUISwitch } from "./components/Switch";
import ToDos from "./components/ToDos";
import { useMediaQuery } from "@mui/material";

type mode = "dark" | "light"

function App() {
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
        <Stack alignItems={"center"}>
          <MaterialUISwitch
            sx={{ m: 1, opacity: 0.7 }}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            checked={mode === "light" ? false : true}
          />
          <h1>ToDo List:</h1>
          <ToDos />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
