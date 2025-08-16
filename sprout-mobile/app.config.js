// app.config.js
export default {
  expo: {
    name: "sprout-mobile",
    slug: "sprout-mobile",
    scheme: "sprout",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    ios: { supportsTablet: true },
    android: {},
    web: { bundler: "metro" },
    extra: {
      EXPO_PUBLIC_API_URL: "http://192.168.1.30:8000",
    },
  },
};
