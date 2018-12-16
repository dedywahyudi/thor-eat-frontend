module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'target="_blank"',
          replace: 'rel="noopener noreferrer" target="_blank"',
        }
      }
    ]
  }
};
