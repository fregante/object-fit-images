# Detailed support of object-fit-images

> OFI in short

OFI is meant to add support of `object-fit` and `object-position` to **IEdge 9-13, Android 4.4-**, but I might edit it to add `object-position` support to **Safari OSX/iOS**

## Responsive images support

### `object-fit-images` + `srcset` 

💚 Supported in the browsers above, with [`picturefill`](https://github.com/scottjehl/picturefill) where necessary, but:

* 💔 In Edge 12, OFI picks the `src` attribute instead of what's in `srcset` because [`currentSrc` is not supported](https://blogs.windows.com/msedgedev/2015/06/08/introducing-srcset-responsive-images-in-microsoft-edge/)
* 💛 If I add Safari support for `object-position` to OFI, Safari might suffer of the above issue

### `object-fit-images` + `picture`

💚 Supported in the browsers above, with [`picturefill`](https://github.com/scottjehl/picturefill) where necessary, but:

* 💔 Edge 13+ overrides OFI's fix with what's in `<source>` (maybe I can fix it by removing `<source>` tags but then it'd lose responsiveness)
* 💛 If I add Safari support for `object-position` to OFI, Safari might suffer of the above issue

## Can I Use

* [`object-fit`](http://caniuse.com/#feat=object-fit)
* [`srcset`](http://caniuse.com/#feat=srcset)
* [`picture`](http://caniuse.com/#feat=picture)

## Additional comparisons with alternatives

### Performance

|                                 | object-fit-images                                              | [tonipinel/object-fit-polyfill](https://github.com/tonipinel/object-fit-polyfill)           | [jonathantneal/fitie](https://github.com/jonathantneal/fitie)
:---                              | :---                                                           | :---                                                                                        | :---
Size                              | 1.3KB                                                          | 1.8KB                                                                                       | 1.5KB
Update wait                       | 💚 No wait, applied before image load                           | 💚 No wait, applied before image load                                                        | 💔 Wait until full image load
Additional DOM elements necessary | 💚 No                                                           | 💔 Yes, a wrapping element is added                                                          | 💔 Yes, a wrapping element is added
Performance overhead              | 💰                                                              | 💰💰💰                                                                                         | 💰💰
Technique description             | Transparent `src` image; Image in `<img>`'s `background`       | Wrapper element with style copied from `<img>`; CSS+JS positioning; Original `<img>` hidden | Wrapper element with style copied from `<img>`; JS positioning

### Ease of use

|                                 | object-fit-images                                              | [tonipinel/object-fit-polyfill](https://github.com/tonipinel/object-fit-polyfill)           | [jonathantneal/fitie](https://github.com/jonathantneal/fitie)
:---                              | :---                                                           | :---                                                                                        | :---
Object-fit definition             | 💛 In CSS, via `font-family` property [*](readme.md#usage)               | 💔 Via `data` attribute in HTML (`data-object-fit="cover"`)                                  | 💔 Via class in HTML (`class="cover"`)
Support changes in `@media` query | 💚 Optional, with `{watchMQ:true}`                              | 💔 No                                                                                        | 💔 No
Updates on resize                 | 💚 Unnecessary                                                  | 💚 Unnecessary                                                                               | 💔 Yes, manually
Fix new elements automatically    | 💚 Optional, with  `objectFitImages()` or `objectFitImages(false)`  | 💔 Impossible                                                                                | 💛 Manually
`<img>` `src` changes             | 💚 Automatically reflected                                      | 💔 Image not updated at all                                                                  | 💔 Fix not updated
Other limitations                 | 💔 Any `onload` events on `<img>` will fire again when it fixes | 💚 I didn't find any                                                                         | 💔 Some CSS declaration might be broken because partially moved to the wrapper


Runner-ups:
- [anselmh/object-fit](https://github.com/anselmh/object-fit) is deprecated, doesn't support Edge and clocks in at 14KB.
- [@primozcigler/neat-trick](https://medium.com/@primozcigler/neat-trick-for-css-object-fit-fallback-on-edge-and-other-browsers-afbc53bbb2c3) requires jQuery and Modernizr, + more cons similar to the other two.
