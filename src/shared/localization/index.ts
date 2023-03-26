import LocalizedStrings from "react-native-localization";

// These set of localized strings is a great way to standardize and keep
// consistancy of language and wordings across the application.
// The code below is from the provided boilerplate with en-US and tr-TR
/*
export const localStrings = new LocalizedStrings({
  "en-US": {
    noLocationService: "Location Service Not Available",
    logout: "Logout",
    yes: "Yes",
    no: "No",
    cancel: "Cancel",
    areYouSure: "Are you sure?",
    logoutDesc: "You are about to log out, confirm?",
    noInternet: "No Internet Connection",
  },
  "tr-TR": {
    noLocationService: "Lokasyon Servisi Kapalı",
    logout: "Çıkış",
    yes: "Evet",
    no: "Hayır",
    cancel: "İptal",
    areYouSure: "Emin misiniz?",
    logoutDesc: "Çıkış yapmak üzeresiniz onaylıyor musunuz?",
    noInternet: "İnternet Bağlantısı Yok",
  },
});
// ? Set the language manually
localStrings.setLanguage("en-US");
*/

export const localString = new LocalizedStrings({
  "en-US": {
    appName: "Polyamanita",

    register: "register",
    signin: "sign in",
    logout: "logout",
    confirm: "confirm",
    cancel: "cancel",
    username: "display name",
    email: "email",
    password: "password",
    confirmation: "confirmation",
    profile: "profile",
    accept: "accept",

    permissions: {
      camera: "Access to camera",
      location: "Access to your current location",
      files: "Access to your files",
    },

    initialStackHeaderMessages: {
      permissions:
        "We will need these permissions to give you a better user experience.",
      initial: "Welcome to Polyamanita, the mushroom foraging app.",
      register: "Join the mushroom crew.",
      signin: "Continue your trek.",
      confirmation:
        "We have sent a 5-digit pin to your email!\nConfirm the pin below.",
      incorrectUserPass: "Invalid email or password.",
    },

    sectionHeaders: {
      // profile-screen
      content: "content",
      preferences: "preferences",
      about: "about",
      account: "account",
    },

    tabBarLabels: {
      map: "Map",
      snap: "Snap",
      journal: "Journal",
      community: "Community",
    },

    mapScreen: {},
    snapScreen: {
      analyze: "Analyze",
      capture: "Capture",
    },
    journalScreen: {},
  },
});
