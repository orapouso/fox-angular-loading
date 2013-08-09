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
<loading while="expr === false" timeout="3"></loading>
```

## Documentation

Put the element inside the place where you want it to appear while some resource is loading.

Ex:

```html
<div class="parent">
	<loading while="items.length === 0"></loading>
	<ul>
		<li ng-repeat="item in items">{{item.name}}</li>
	</ul>
</div>
```

### Attributes

* **while** - Expression to be evaluated that mantains the element showing while it is false. When the expression becomes true, the element hides itself.
* **timeout** - If for any reason the loading element show hide itself after so many seconds have passed.

### Transclude

The element supports `transcluding` with anything that shoud be shown while some resource is loading. It could be a simple rotating gif, a complete element with a loading message or nothing at all.

### CSS

You can define a `.loading` class anywhere on your CSS to style the loading element. If you don't want to use a transcluding element, it could be a styled background gif.

