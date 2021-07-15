/* eslint-disable */

const path = require('path');
const fs = require('fs');
const { name } = require('./package');
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
// const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const paths = require('react-scripts/config/paths');
const {
  override,
  useBabelRc,
  addLessLoader,
  addBabelPlugin,
  fixBabelImports,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra');

// const isMicro = !!process.env.REACT_APP_MICRO;
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const antdThemeOptions = {
  stylesDir: path.join(__dirname, './src/themes/less'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/themes/less/variables.less'),
  mainLessFile: path.join(__dirname, './src/themes/less/index.less'),
  themeVariables: [
    '@btn-primary-bg',
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@layout-header-height',
    '@layout-header-background',
    '@border-color-base',
  ],
  indexFileName: 'index.html',
  lessUrl: '/libs/less.min.js',
  generateOnce: false, // generate color.less on each compilation
};

module.exports = {
  webpack: override(
    useBabelRc(),
    // yarn link 的时候会导致 Error: Invalid hook call.,通 Alias 可以解决这个问题
    addWebpackAlias({
      'final-form': require.resolve('./src/_final-form/index.js'),
      'react/jsx-runtime': require.resolve('./node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': require.resolve('./node_modules/react/jsx-dev-runtime'),
      react: require.resolve('./node_modules/react'),
    }),
    // customize-cra plugins here
    // isEnvProduction && addBabelPlugin(['transform-remove-console']),

    // fixBabelImports('antd', { style: true }),
    // addWebpackPlugin(new AntDesignThemePlugin(antdThemeOptions)),
    addLessLoader({
      sourceMap: true,
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          // "@primary-color": "#1DA57A", // for example, you use Ant Design to change theme color.
          '@primary-color': '#1b62b7',
          '@layout-header-background': '#1b62b7',
          '@layout-header-height': '48px',
          '@layout-header-padding': '0 12px',
          '@menu-collapsed-width': '49px',
        },
      },
    }),
    (config) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.jsonpFunction = `webpackJsonp_${name}`;
      config.output.globalObject = 'window';

      return config;

      // return config;
    },
  ),
  // paths: function (paths, env) {
  //   // ...add your paths config
  //   paths.appTemplate = resolveApp('src/index.ejs');
  //   return paths;
  // },
  // devServer: (configFunction) => (proxy, allowedHost) => {
  //   const config = configFunction(proxy, allowedHost);
  //   return config;
  // },
};
