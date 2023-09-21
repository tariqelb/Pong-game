module.exports = {
  presets: [
    '@babel/preset-env',        // Transpile to the latest JavaScript syntax
    '@babel/preset-react',      // Transpile JSX
    '@babel/preset-typescript'  // Transpile TypeScript
  ],
  plugins: [
    // Add any additional Babel plugins here if needed
	'@babel/plugin-proposal-private-property-in-object'
  ],
};

