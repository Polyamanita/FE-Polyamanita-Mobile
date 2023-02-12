import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "redux/store";

LogBox.ignoreAllLogs();

const App = () => {
  // Themeing
  const scheme = useColorScheme();
  const isDarkMode = scheme === "light";

  React.useEffect(() => {
    // Status Bar
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    StatusBar.setBackgroundColor("rgba(26,32,55,0.24)");
    StatusBar.setTranslucent(true);

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
