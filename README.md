# Angular <loading> element

***

## Requirements

* [AngularJS v1.0.0+](http://angularjs.org/)

## Usage

* Load

```html
<script src="angular-loading.js"></script>
```

* Include module dependency

```javascript
angular.module('myApp', ['angularLoading']);
```

* Use

```html
<loading until="expr == true" timeout="3"></loading>
```

## Documentation

Put the element inside the place where you want it to appear until some resource is done loading.

Ex:

```html
<div class="parent">
	<loading until="items.length > 0"></loading>
	<ul>
		<li ng-repeat="item in items">{{item.name}}</li>
	</ul>
</div>
```

The element will hide itself when some items are loaded and the array is greater than 0. Of course you could write it as `until="items.length"` =)

### Attributes

* **until** - Expression to be evaluated that mantains the element showing until it becomes false. In that case, it hides itself
* **timeout** - If for any reason the loading element show hide itself after so many seconds have passed.

### Transclude

The element supports `transcluding` with anything that shoud be shown until some resource is done loading. It could be a simple rotating gif, a complete element with a loading message or nothing at all.

### CSS

You can define a `.loading` class anywhere on your CSS to style the loading element. If you don't want to use a transcluding element, it could be a styled background gif.

## Contributing

Clone the repo, npm install, bower install, grunt test
