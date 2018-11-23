module.exports = {
    //"extends": "airbnb-base",
    "extends": [
      "airbnb-base",
      //"eslint:recommended",
      "plugin:react/recommended"
    ],
    "rules":  {
        "semi": "off",
        "no-undef": "off",
        "arrow-body-style": "off",
        "no-console": "off", //eccessivo
        "camelcase": "off",
        'max-len': [1, 150, 2, {ignoreComments: true}],
        "import/extensions": "always",
      }
};
