'use strict';

var writeFile = require('../index');
var expect = require('expect.js');
var rimraf = require('rimraf');
var root = process.cwd();

var fs = require('fs');
var broccoli = require('broccoli');

var builder;

describe('broccoli-file-creator', function(){
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('creates the file specified', function(){
    var content = 'ZOMG, ZOMG, HOLY MOLY!!!';
    var tree = writeFile('/somewhere/something.js', content);

    builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      expect(fs.readFileSync(dir + '/somewhere/something.js', {encoding: 'utf8'})).to.eql(content);
    });
  })
});
