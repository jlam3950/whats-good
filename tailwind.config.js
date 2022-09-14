module.exports = {
  mode: 'jit',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      // colors: {
      //   transparent: 'transparent',
      //   current: 'currentColor',
      //   'cc': '#264653',
      //   'pg': '#2A9D8F',
      //   'yel': '#E9C46A',
      //   'sb': '#F4A261',
      //   'bs': '#E76F51',
      // }
  }
}