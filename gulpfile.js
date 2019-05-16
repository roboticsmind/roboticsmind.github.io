'use strict';

const argv = require('yargs').argv;
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const mkdirp = require('mkdirp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const uglify = require('gulp-uglify');
const vinylPaths = require('vinyl-paths');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const DEFAULT_DEV_TOOL = '#eval-source-map';
const DEFAULT_DEV_HOST = '0.0.0.0';
const DEFAULT_DEV_PORT = 8080;

gulp.task('reset-index-html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./'));
});

gulp.task('clean-build', ['reset-index-html'], () => {
  return gulp.src('./build/**/*.*', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('webpack-dev-server', ['clean-build'], callback => {
  const devConfig = Object.create(webpackConfig);
  const devtool = DEFAULT_DEV_TOOL;
  const host = DEFAULT_DEV_HOST;
  const port = DEFAULT_DEV_PORT;

  devConfig.devtool = devtool;
  devConfig.plugins = devConfig.plugins.concat(
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  );

  new WebpackDevServer(webpack(devConfig), {
    historyApiFallback: true,
    quiet: argv.quiet,
    contentBase: './',
    publicPath: '/build',
    stats: {
      colors: true
    }
  }).listen(port, host, function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', `Webpack dev server running on port ${port}`);
  });
});

gulp.task('webpack-build', ['clean-build'], callback => {
  const devConfig = Object.create(webpackConfig);
  devConfig.plugins = devConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: !argv.quiet
      },
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );

  webpack(devConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log('[webpack-build]', stats.toString({
      colors: true,
      chunks: !argv.quiet
    }));
    mkdirp('./logs', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-build', err);
      }
    });
    try {
      fs.writeFileSync('./logs/webpack-build-stat.json', JSON.stringify(stats.toJson()));
    }
    catch (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log('[webpack-build]', 'Log file is saved.');
    callback();
  });
});

gulp.task('version-js', ['webpack-build'], () => {
  return gulp.src('./build/bundle.js')
    .pipe(rev())
    .pipe(gulp.dest('./build'))
    .pipe(rev.manifest('manifest.json'))
    .pipe(gulp.dest('./build'));
});

gulp.task('version-import-js', ['version-js'], () => {
  return gulp.src('./src/index.html')
    .pipe(revReplace({ manifest: gulp.src('./build/manifest.json') }))
    .pipe(gulp.dest('./'));
});

gulp.task('clear-js', ['version-import-js'], () => {
  return gulp.src('./build/bundle.js', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('clear-manifest', ['version-import-js'], () => {
  return gulp.src('./build/manifest.json', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('post-webpack-build', ['clear-js', 'clear-manifest']);


// Main tasks:
gulp.task('develop', ['webpack-dev-server']);
gulp.task('build', ['webpack-build', 'post-webpack-build'])

gulp.task('default', ['develop']);
