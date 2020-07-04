const webpack = require('webpack'),

         glob = require('glob');

let config = {

  entry: {

    // Auto-detect all pages in directory.

    'myPages': glob.sync('./resources/assets/**/*.js'),

  },

 output: {

    path: '/home/murph/Projects/enxoERT/dist',

    filename: 'bundle--[name].js'

  },

};

module.exports = config;