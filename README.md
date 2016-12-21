# object-fit-images

> Polyfill `object-fit` and `object-position` on images on IE9, IE10, IE11, Edge, Safari, ...

[![gzipped size](https://badges.herokuapp.com/size/github/bfred-it/object-fit-images/master/dist/ofi.browser.js?gzip=true&label=gzipped%20size)](#readme) [![Travis build status](https://api.travis-ci.org/bfred-it/object-fit-images.svg)](https://travis-ci.org/bfred-it/object-fit-images) [![npm version](https://img.shields.io/npm/v/object-fit-images.svg)](https://www.npmjs.com/package/object-fit-images) 

This adds support for `object-fit` and `object-position` to **IEdge 9-13, Android < 5, Safari < 10** and skips browsers that already support them.

Take a look at the [demo.](http://bfred-it.github.io/object-fit-images/demo/) 

## Main features

- CPU-light code
- No additional elements are created or necessary
- Once set, position is taken care by the browser
- You can normally get and set the `<img>`'s `src` attribute: `img.src = 'other-image.jpg'`
- `srcset` support

## Comparison table with alternative solutions

### Support


                  | bfred-it<br>/object-fit-images🌟                                                                                         | [constancecchen<br>/object-fit-polyfill](https://github.com/constancecchen/object-fit-polyfill) | [tonipinel<br>/object-fit-polyfill](https://github.com/tonipinel/object-fit-polyfill) | [jonathantneal<br>/fitie](https://github.com/jonathantneal/fitie)
:---              | :---                                                                                                      | :---                                                                                            | :---                                                                                  | :---
Browsers          | <sub>IEdge 9-14, Android<5, Safari<10</sub>                                                                          | <- Same                                                                                         | "All browsers"                                                                        | IE 8-11
Tags              | `img`                                                                                                     | `image` `video` `picture`                                                                     | `img`                                                                                 | `img` `video`
`cover/contain`   | 💚                                                                                                         | 💚                                                                                               | 💚                                                                                     | 💚
`fill`            | 💚                                                                                                         | 💚                                                                                               | 💚                                                                                     | 💚
`none`            | 💚                                                                                                         | 💚                                                                                               | 💚                                                                                     | 💔
`scale-down`      | 💚 <sub>using [`{watchMQ:true}`](#apply-on-resize)</sub>                                                             | 💚                                                                                               | 💔                                                                                     | 💔
`object-position` | 💚                                                                                                         | 💚                                                                                               | 💔                                                                                     | 💔
`srcset` support  | 💚 Native or [picturefill](https://github.com/scottjehl/picturefill) <sub>[notes](detailed-support-tables.md)</sub> | 💚                                                                                               | 💔                                                                                     | 💔
Extra elements    | 💚 No                                                                                                      | 💔 Yes                                                                                           | 💔 Yes                                                                                 | 💔 Yes
Settings    | 💚 via CSS                                                                                                      | 💔 via HTML                                                                                           | 💔 via HTML                                                                                 | 💔 via HTML


## Usage

You will need 3 things

0. one or more `<img>` elements with `src` or `srcset`  

	```html
	<img class='your-favorite-image' src='image.jpg'>
	```
	
0. CSS defining `object-fit` and a special `font-family` property to allow IE to read the correct value

	```css
	.your-favorite-image {
		object-fit: contain;
		font-family: 'object-fit: contain;'
	}
	```
	
	or, if you also need `object-position`
	
	```css
	.your-favorite-image {
		object-fit: cover;
		object-position: bottom;
		font-family: 'object-fit: cover; object-position: bottom;'
	}
	```
	
	To generate the `font-family` automatically, you can use the [PostCSS plugin](https://github.com/ronik-design/postcss-object-fit-images) or the [SCSS/SASS/Less mixins.](/preprocessors)
	
	If you set the `font-family` via javascript (which must be followed by calling `objectFitImages()`), make sure to include the quotes [**in** the property.](https://github.com/bfred-it/object-fit-images/issues/29#issuecomment-227491892)

0. the activation call before `</body>`, or _on DOM ready_

	```js
	objectFitImages();
	// if you use jQuery, the code is: $(function () { objectFitImages() });
	```
	
	This will fix all the images on the page **and** also all the images added later (auto mode).
	
	Alternatively, only fix the images you want, once:
	
	```js
	// pass a selector
	objectFitImages('img.some-image');
	```
	
	```js
	// an array/NodeList
	var someImages = document.querySelectorAll('img.some-image');
	objectFitImages(someImages);
	```
	
	```js
	// a single element
	var oneImage = document.querySelector('img.some-image');
	objectFitImages(oneImage);
	```
	
	```js
	// or with jQuery
	var $someImages = $('img.some-image');
	objectFitImages($someImages);
	```
	
	You can call `objectFitImages()` on the same elements more than once without issues, for example to manually request an update of the `object-fit` value.

## Apply on `resize`

You don't need to re-apply it on `resize`, unless:

* You're using `scale-down`, or
* <a id="media-query-affects-object-fit-value">your media queries change the value of `object-fit`,</a> like this

	```css
	                            img { object-fit: cover }
	@media (max-width: 500px) { img { object-fit: contain } }
	```

In one of those cases, use the `watchMQ` option:

```js
objectFitImages('img.some-image', {watchMQ: true});
// or objectFitImages(null, {watchMQ: true}); // for the auto mode
```

## Install

```sh
npm install --save object-fit-images
```

```js
var objectFitImages = require('object-fit-images');
```

If you don't use browserify/webpack, include this instead:

```html
<script src="dist/ofi.browser.js"></script>
```

or from CDN:

```html
<script src="https://unpkg.com/object-fit-images@2.5.9/dist/ofi.browser.js"></script>
```

## API

### `objectFitImages([images, [options]])`

<table>
    <tr>
        <th>parameter</th>
        <th>description</th>
    </tr>
    <tr>
        <th><code>images</code></th>
        <td>
            Type: <code>string</code>, <code>element</code>, <code>array</code>, <code>NodeList</code>, <code>null</code><br>
            Default: <code>null</code><br><br>

            The images to fix. More info in the <a href="#usage">Usage</a> section 

        </td>
    </tr>
    <tr>
        <th><code>options</code></th>
        <td>
            
            Type: <code>object</code><br>
            Default: <code>{}</code><br>
            Example: <code>{watchMQ:true}</code><br><br>
            
            <table>
                <tr>
                    <th><code>watchMQ</code></th>
                    <td>
                        Type: <code>boolean</code><br>
                        Default: <code>false</code>

                        This enables the automatic re-fix of the selected images when the window resizes. You only need it <a href="#apply-on-resize">in some cases</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
