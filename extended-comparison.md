# Additional comparisons with alternatives

Continues from [readme.md](README.md#comparison-table-with-alternative-solutions)

## Performance

|                                 | object-fit-images                                              | [tonipinel/object-fit-polyfill](https://github.com/tonipinel/object-fit-polyfill)           | [jonathantneal/fitie](https://github.com/jonathantneal/fitie)
:---                              | :---                                                           | :---                                                                                        | :---
Size                              | 1.6KB                                                          | 1.9KB                                                                                       | 1.5KB
Update wait                       | 💚 No wait, applied before image load                           | 💚 No wait, applied before image load                                                        | 💔 Wait until full image load
Additional DOM elements necessary | 💚 No                                                           | 💔 Yes, a wrapping element is added                                                          | 💔 Yes, a wrapping element is added
Performance overhead              | 💰                                                              | 💰💰💰                                                                                         | 💰💰
Technique description             | Transparent `src` image; Image in `<img>`'s `background`       | Wrapper element with style copied from `<img>`; CSS+JS positioning; Original `<img>` hidden | Wrapper element with style copied from `<img>`; JS positioning

## Ease of use

|                                 | object-fit-images                                              | [tonipinel/object-fit-polyfill](https://github.com/tonipinel/object-fit-polyfill)           | [jonathantneal/fitie](https://github.com/jonathantneal/fitie)
:---                              | :---                                                           | :---                                                                                        | :---
Object-fit definition             | 💛 In CSS, via `font-family` property [*](readme.md#usage)               | 💔 Via `data` attribute in HTML (`data-object-fit="cover"`)                                  | 💔 Via class in HTML (`class="cover"`)
Support changes in `@media` query | 💚 Optional, with `{watchMQ:true}`                              | 💔 No                                                                                        | 💔 No
`onresize` listener               | 💚 Unnecessary, [unless you use `scale-down`](https://github.com/bfred-it/object-fit-images/commit/6170255cc6ebcaebf560e695fc63354ca150f315)                                                   | 💚 Unnecessary                                                                               | 💔 Yes, manually
Fix new elements automatically    | 💚 Optional, with  `objectFitImages()` or `objectFitImages(false)`  | 💔 Impossible                                                                                | 💛 Manually
`<img>` `src` changes             | 💚 Automatically reflected                                      | 💔 Image not updated at all                                                                  | 💔 Fix not updated
Other limitations                 | 💔 Any `onload` events on `<img>` will fire again when it fixes | 💚 I didn't find any                                                                         | 💔 Some CSS declaration might be broken because partially moved to the wrapper


Runner-ups:
- [anselmh/object-fit](https://github.com/anselmh/object-fit) is deprecated, doesn't support Edge and clocks in at 14KB.
- [@primozcigler/neat-trick](https://medium.com/@primozcigler/neat-trick-for-css-object-fit-fallback-on-edge-and-other-browsers-afbc53bbb2c3) requires jQuery and Modernizr, + more cons similar to the other two.
