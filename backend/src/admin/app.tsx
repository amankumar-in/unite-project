// src/admin/app.js
import AuthLogo from "./extensions/logo.png";
import MenuLogo from "./extensions/logo.png";
import favicon from "./extensions/logo.png";

export default {
  config: {
    // Change the login page logo
    auth: {
      logo: AuthLogo,
    },
    // Change the favicon
    head: {
      favicon: favicon,
      title: "UNITE | Admin Panel", // This changes the page title
    },
    // Change the main navigation logo
    menu: {
      logo: MenuLogo,
    },
    // Customize the translations
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to UNITE Console", // Changes the welcome message
        "Auth.form.welcome.subtitle": "Log in to your account", // Changes the subtitle
        // You can add more translation overrides here
      },
    },
    // Customize the theme colors
    theme: {
      light: {
        colors: {
          primary100: "#f6ecfc",
          primary200: "#e0c1f4",
          primary500: "#ac73e6",
          primary600: "#9736e8",
          primary700: "#8312d1",
        },
      },
      dark: {
        colors: {
          primary100: "#271131",
          primary200: "#3b1a4a",
          primary500: "#8547b5",
          primary600: "#9e5ccf",
          primary700: "#b27fdb",
        },
      },
    },
  },
  bootstrap() {},
};
