# Notes about specific combinations

## *object-fit-images* + `srcset`

💚 You'll need to load [*picturefill*](https://github.com/scottjehl/picturefill) in this order:

0. Load _object-fit-images.js_
1. Load _picturefill.js_
2. Call `objectFitImages(...)`

This will keep these combinations working correctly:

* `srcset` + Edge 12
* `srcset` + `object-position` + Safari 8.x

Otherwise `srcset` will be discarded in both cases.

## *object-fit-images* + `picture`

💔 Not supported. Feature tracked here: https://github.com/fregante/object-fit-images/issues/3

## Can I Use

* [`object-fit`](http://caniuse.com/#feat=object-fit)
* [`srcset`](http://caniuse.com/#feat=srcset)
* [`picture`](http://caniuse.com/#feat=picture)
