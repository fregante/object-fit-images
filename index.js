'use strict';
const ಠ = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, used as accessor and replacing image
const propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
const testImg = new Image();
const supportsObjectFit = 'object-fit' in testImg.style;
const supportsObjectPosition = 'object-position' in testImg.style;
const supportsCurrentSrc = typeof testImg.currentSrc === 'string';
const nativeGetAttribute = testImg.getAttribute;
const nativeSetAttribute = testImg.setAttribute;
let autoModeEnabled = false;

function getStyle(el) {
	const style = getComputedStyle(el).fontFamily;
	let parsed;
	const props = {};
	while ((parsed = propRegex.exec(style)) !== null) {
		props[parsed[1]] = parsed[2];
	}
	return props;
}

function fixOne(el, requestedSrc) {
	if (el[ಠ].parsingSrcset) {
		return;
	}
	const style = getStyle(el);
	style['object-fit'] = style['object-fit'] || 'fill'; // default value

	// If the fix was already applied, don't try to skip fixing,
	// - because once you go ofi you never go back.
	// - Wait, that doesn't rhyme.
	// - This ain't rap, bro.
	if (!el[ಠ].s) {
		// fill is the default behavior so no action is necessary
		if (style['object-fit'] === 'fill') {
			return;
		}

		// Where object-fit is supported and object-position isn't (Safari < 10)
		if (
			!el[ಠ].skipTest && // unless user wants to apply regardless of browser support
			supportsObjectFit && // if browser already supports object-fit
			!style['object-position'] // unless object-position is used
		) {
			return;
		}
	}

	let src = el[ಠ].ios7src || el.currentSrc || el.src;

	if (requestedSrc) {
		// explicitly requested src takes precedence
		// TODO: this still should overwrite srcset
		src = requestedSrc;
	} else if (el.srcset && !supportsCurrentSrc && window.picturefill) {
		const pf = window.picturefill._;
		// prevent infinite loop
		// fillImg sets the src which in turn calls fixOne
		el[ಠ].parsingSrcset = true;

		// parse srcset with picturefill where currentSrc isn't available
		if (!el[pf.ns] || !el[pf.ns].evaled) {
			// force synchronous srcset parsing
			pf.fillImg(el, {reselect: true});
		}

		if (!el[pf.ns].curSrc) {
			// force picturefill to parse srcset
			el[pf.ns].supported = false;
			pf.fillImg(el, {reselect: true});
		}
		delete el[ಠ].parsingSrcset;

		// retrieve parsed currentSrc, if any
		src = el[pf.ns].curSrc || src;
	}

	// store info on object for later use
	if (el[ಠ].s) {
		el[ಠ].s = src;
		if (requestedSrc) {
			// the attribute reflects the user input
			// the property is the resolved URL
			el[ಠ].srcAttr = requestedSrc;
		}
	} else {
		el[ಠ] = {
			s: src,
			srcAttr: requestedSrc || nativeGetAttribute.call(el, 'src'),
			srcsetAttr: el.srcset
		};
		el.src = ಠ;

		try {
			// remove srcset because it overrides src
			if (el.srcset) {
				el.srcset = '';

				// restore non-browser-readable srcset property
				Object.defineProperty(el, 'srcset', {
					value: el[ಠ].srcsetAttr
				});
			}

			keepSrcUsable(el);
		} catch (err) {
			el[ಠ].ios7src = src;
		}
	}

	el.style.backgroundImage = 'url("' + src + '")';
	el.style.backgroundPosition = style['object-position'] || 'center';
	el.style.backgroundRepeat = 'no-repeat';

	if (/scale-down/.test(style['object-fit'])) {
		// `object-fit: scale-down` is either `contain` or `auto`
		if (!el[ಠ].i) {
			el[ಠ].i = new Image();
			el[ಠ].i.src = src;
		}

		// naturalWidth is only available when the image headers are loaded,
		// this loop will poll it every 100ms.
		// There's currently no check to prevent this loop from starting twice
		// as a consequence of calling ofi() twice on the same image, but it's light
		// and causes no issues, so it's not worth ensuring that it doesn't.
		(function loop() {
			// https://bugs.chromium.org/p/chromium/issues/detail?id=495908
			if (el[ಠ].i.naturalWidth) {
				if (el[ಠ].i.naturalWidth > el.width || el[ಠ].i.naturalHeight > el.height) {
					el.style.backgroundSize = 'contain';
				} else {
					el.style.backgroundSize = 'auto';
				}
				return;
			}
			setTimeout(loop, 100);
		})();
	} else {
		el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
	}
}

function keepSrcUsable(el) {
	const descriptors = {
		get() {
			return el[ಠ].s;
		},
		set(src) {
			delete el[ಠ].i; // scale-down's img sizes need to be updated too
			fixOne(el, src);
			return src;
		}
	};
	Object.defineProperty(el, 'src', descriptors);
	Object.defineProperty(el, 'currentSrc', {get: descriptors.get}); // it should be read-only
}

function hijackAttributes() {
	if (!supportsObjectPosition) {
		HTMLImageElement.prototype.getAttribute = function (name) {
			if (this[ಠ] && (name === 'src' || name === 'srcset')) {
				return this[ಠ][name + 'Attr'];
			}
			return nativeGetAttribute.call(this, name);
		};

		HTMLImageElement.prototype.setAttribute = function (name, value) {
			if (this[ಠ] && (name === 'src' || name === 'srcset')) {
				this[name === 'src' ? 'src' : name + 'Attr'] = String(value);
			} else {
				nativeSetAttribute.call(this, name, value);
			}
		};
	}
}

export default function fix(imgs, opts) {
	const startAutoMode = !autoModeEnabled && !imgs;
	opts = opts || {};
	imgs = imgs || 'img';
	if (supportsObjectPosition && !opts.skipTest) {
		return false;
	}

	// use imgs as a selector or just select all images
	if (typeof imgs === 'string') {
		imgs = document.querySelectorAll('img');
	} else if (!'length' in imgs) {
		imgs = [imgs];
	}

	// apply fix to all
	for (let i = 0; i < imgs.length; i++) {
		imgs[i][ಠ] = imgs[i][ಠ] || opts;
		fixOne(imgs[i]);
	}

	if (startAutoMode) {
		document.body.addEventListener('load', e => {
			if (e.target.tagName === 'IMG') {
				fix(e.target, {
					skipTest: opts.skipTest
				});
			}
		}, true);
		autoModeEnabled = true;
		imgs = 'img'; // reset to a generic selector for watchMQ
	}

	// if requested, watch media queries for object-fit change
	if (opts.watchMQ) {
		window.addEventListener('resize', fix.bind(null, imgs, {
			skipTest: opts.skipTest
		}));
	}
}

fix.supportsObjectFit = supportsObjectFit;
fix.supportsObjectPosition = supportsObjectPosition;

hijackAttributes();
