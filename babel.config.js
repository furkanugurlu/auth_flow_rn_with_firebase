module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: [
            "API_KEY",
            "AUTH_DOMAIN",
            "PROJECT_ID",
            "STORAGE_BUCKET",
            "MESSAGEING_SENDER_ID",
            "APP_ID",
          ],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
