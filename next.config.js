const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withFonts = require('next-fonts')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
require('dotenv').config()
const path = require('path')
const withTM = require('next-transpile-modules')(['three'])
const nextConfig = {
  webpack (config) {
    // Returns environment variables as an object
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }, {})

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }

    /** Allows you to create global constants which can be configured
     * at compile time, which in our case is our environment variables
     */
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    })

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      })
    )

    config.plugins.push(new webpack.DefinePlugin(env))

    return config
  },
  env: {}
}

module.exports = withTM({
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(glb|gltf|fbx|glsl|vs|fs|vert|frag|OBJ|COLLADA)$/,
      use: {
        loader: 'file-loader'
      }
    })
  }
})

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'gif', 'svg', 'ico']
  }],
  withFonts, withSass, withCss, withLess
], nextConfig)
