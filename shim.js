global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

// This file removes the following error
// Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills
// https://github.com/facebook/jest/issues/4545
// You can track the issue in the above link.
// shim means fitting things
