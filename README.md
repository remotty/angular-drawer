# angular-drawer

An angular directive wrapper for drawer.

## Getting started

(1) Get angular-drawer via [Bower](http://bower.io/)

```sh
$ bower install angular-drawer
```
or add bower.json
```sh
$ bower install angular-drawer --save
```

(2) add css & javascript link to html

```html
...
<link rel="stylesheet" href="bower_components/angular-drawer/dist/styles/angular-drawer.min.css">
...
<script src="bower_components/angular-drawer/dist/angular-drawer.min.js"></script>
...
```

(3) add `'angular-drawer'` to your main module's list of dependencies

```javascript
var myApp = angular.module('myApp', ['angular-drawer']);
```

(4) enjoy!

## Quick example

### view

default - left drawer

```
<div drawer>
  Left Drawer
</div>
```

right drawer

```
<div drawer="right">
  right Drawer
</div>
```

open drawer

```
<a ng-click="openLeftDrawer();">
  open
</a>
```

## Customizing

TODO: customizing guide

## Contributing

1. Fork it ( https://github.com/remotty/angular-drawer/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### setup

```
$ bower install
$ npm install
$ node_modules/protractor/bin/webdriver-manager update
```

### test

```
$ gulp test
```

### build

```
$ gulp
```
