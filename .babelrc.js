module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // modules: false,
        useBuiltIns: 'entry',
        corejs: { version: '3' },
        targets: {
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
    ['react-app'],
  ],
  plugins: [['import', { libraryName: 'antd', style: true }, 'ant']],
};
