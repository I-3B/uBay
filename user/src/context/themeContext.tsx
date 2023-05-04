import { createTheme } from "@mui/material";
import themeConstants from "../constants/themeConstants";

const theme = (language: string) => {
  const theme = createTheme({
    typography: {
      fontFamily: "MontserratArabic",
      fontSize: 12,
    },

    direction: language === "ar" ? "rtl" : "ltr",
    palette: {
      primary: {
        main: themeConstants.primary,
        "50": themeConstants.primary05,
        "100": themeConstants.primary1,
        "200": themeConstants.primary2,
        "300": themeConstants.primary3,
        "400": themeConstants.primary4,
        "500": themeConstants.primary5,
        "600": themeConstants.primary6,
        "700": themeConstants.primary7,
        "800": themeConstants.primary8,
        "900": themeConstants.primary9,
      },
      secondary: {
        main: themeConstants.secondary,
        "50": themeConstants.secondary05,
        "100": themeConstants.secondary1,
        "200": themeConstants.secondary2,
        "300": themeConstants.secondary3,
        "400": themeConstants.secondary4,
        "500": themeConstants.secondary5,
        "600": themeConstants.secondary6,
        "700": themeConstants.secondary7,
        "800": themeConstants.secondary8,
        "900": themeConstants.secondary9,
      },
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
  theme.shadows[1] = `0 0 5px RGBA( 73, 113, 116, 0.3)`;
  return theme;
};
export default theme;
