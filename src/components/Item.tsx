import { Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useState } from "react";

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));
