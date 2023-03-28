import { createTheme, ThemeProvider } from "@mui/material";
import i18n from "i18next";
import { FC, PropsWithChildren } from "react";
import themeConstants from "./themeConstants";

const MaterialThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "MontserratArabic",
      fontSize: 12,
    },

    direction: i18n.language === "ar" ? "rtl" : "ltr",
    palette: {
      primary: {
        main: themeConstants.primary,
        "50": themeConstants.primary05,
        "100": themeConstants.primary1,
        "900": themeConstants.primary9,
      },
      secondary: { main: themeConstants.secondary },
      background: { default: themeConstants.background },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::-webkit-scrollbar": {
            width: 8,
            height: 8,
          },
          "::-webkit-scrollbar-track": {
            background: themeConstants.primary05,
          },
          "::-webkit-scrollbar-thumb": {
            background: themeConstants.primary,
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: themeConstants.primary9,
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: themeConstants.primary,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            "& fieldset": {
              borderColor: themeConstants.primary,
            },
            "&:hover fieldset": {
              borderColor: themeConstants.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: themeConstants.primary,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label": {
              color: themeConstants.primary9,
              "&.Mui-focused": {
                color: themeConstants.primary,
              },
            },
            "& .MuiOutlinedInput-root": {},
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: themeConstants.primary,
            ".MuiTableCell-root": {
              color: "white",
            },
          },
        },
      },

      MuiLink: {
        styleOverrides: {
          root: {
            color: themeConstants.primary,
            textDecorationColor: themeConstants.primary,
            "&,*": {
              transition: "0.2s",
            },
            "&:hover": {
              color: themeConstants.secondary,
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default MaterialThemeProvider;
