import { createTheme } from "@mui/material/styles";
import { grey, purple, lightGreen } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: purple[500],
    },
    info: {
      main: grey[500],
    }
  },
});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: lightGreen[500],
    },
    info: {
      main: grey[500],
    }
  },
});
