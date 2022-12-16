module.exports = (api) => {
  const env = api.env();
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
  ];
  if (env === "development") {
    plugins.push("react-hot-loader/babel");
  }
  // api.cache.using(()=>env==='development');
  api.cache.never();
  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          debug: false,
          spec: true,
          loose: false,
          modules: false,
        },
      ],
    ],
    plugins,
  };
};
