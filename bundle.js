/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body,\nhtml {\n  width: 100%;\n  background-color: #efefef;\n  color: #404040;\n  margin: 0;\n}\n\nhtml, .calendar-styling {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  font-size: 45px;\n}\n\n.padding-right-5 {\n  padding-right: 5px;\n}\n\n.margin-above {\n  margin-top: 5%;\n}\n\n.margin-left {\n  margin-left: 1%;\n}\n\n.button-width {\n  width: 40%\n}\n\n.button-width2 {\n  width: 30%;\n}\n\n.text-center {\n  text-align: center;\n}\n\n/* welcomeBanner */\n.welcome-banner {\n  margin: 0px;\n  padding-top: 4px;\n  padding-left: 4px;\n  padding-bottom: 2px;\n  background: linear-gradient(70deg, #f93c43 30%, #caebf2 30%);\n}\n\n.white-font-color {\n  color: #ffffff;\n}\n\n/* requestForm */\n.request-form {\n  background-color: #a9a9a9;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  padding-left: 5px;\n}\n\n.input-style {\n  border-style: solid;\n  border-width: thin;\n  font-size: 18px;\n}\n\n.border-radius-5 {\n  border-radius: 5px;\n}\n\n.destinations-style {\n  background-color: white;\n  width: 15%;\n  color: #666666;\n}\n\n.form-submit-button {\n  font-weight: bold;\n  background-color: #f93c43;\n  align: center;\n}\n\n.font-20 {\n  font-size: 20px;\n}\n\n.calendar-styling{\n  width: 12%;\n}\n\n/* confirmTripWrapper */\n.confirm-trip-wrapper {\n  position: absolute;\n  z-index: 9;\n  top: 50%;\n  left: 50%;\n  margin-top: 20px;\n  transform: translate(-50%, -50%);\n}\n\n.confirm-trip-title {\n  margin-top: 3%;\n  font-size: 60px;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\n\n.trip-box {\n  position: relative;\n  display: flex;\n  margin: 5px;\n  flex: 50%;\n  flex-direction: column;\n  align-items: center;\n  background-color: #ffffff;\n  padding-bottom: 20px;\n}\n\n.shadow {\n  box-shadow: 0 8px 8px -4px #a9a9a9;\n}\n\n.align-row {\n  display: flex;\n  flex-direction: row;\n}\n\n.margin-buttons {\n  color: white;\n  font-size: 40px;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n/* trips-container */\n.trips-wrapper {\n  margin-top: 1%;\n  display: flex;\n  flex: 50%;\n  flex-direction: row;\n  justify-content: space-between;\n  align-content: center;\n  margin-left: 2%;\n  margin-right: 2%;\n  margin-bottom: 1%;\n}\n\n@media (max-width: 900px) {\n  .trips-wrapper {\n    flex-direction: column;\n  }\n}\n\n.trip-box-height {\n  height: 700px;\n}\n\n.destination-image {\n  max-width: 40%;\n  margin-bottom: 10px;\n}\n\n.trip-background {\n  background-color: #efefef;\n}\n\n.trip-container {\n  /* flex: 50%; */\n  position: relative;\n  margin-bottom: 10px;\n  width: 80%;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n\n.trip-display {\n  margin: 1px;\n}\n\n.trip-title {\n  margin-bottom: 10px;\n  font-size: 35px;\n}\n\n.scroll-content {\n  overflow: auto;\n}\n\n/* DOM dynamic */\n.remove {\n  display: none;\n}\n\n.confirm-trip-box {\n  display: flex;\n  padding-top: 3%;\n  margin-top: 1%;\n  margin-right: 3%;\n  flex: 50%;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.trip-request-background {\n  background-color: #caebf2;\n}\n\n.confirm-destination-image {\n  max-width: 55%;\n  max-height: 40%;\n  margin-left: 3%;\n  margin-right: 2%;\n  margin-top: 1%;\n}\n\n.confirm-trip-text {\n  width: 95%;\n  padding-left: 2px;\n  padding-right: 2px;\n  font-size: 20px;\n}\n\n.margin-left-5 {\n  margin-left: 5%;\n}\n\n.no-margin-top {\n  margin-top: 0;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.confirm-trip-text-margin {\n  margin-right: 3%;\n}\n\n.button-row {\n  margin-top: 5%;\n  margin-bottom: 1%;\n}\n\n.no-trip-info {\n  width: 90%;\n  font-size: 30px;\n  padding: 10px;\n}\n\n.total-spent {\n  width: 85%;\n  padding-top: 2%;\n  padding-bottom: 2%;\n}\n\n.blur-all {\n  filter: blur(15px);\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;;EAEE,WAAW;EACX,yBAAyB;EACzB,cAAc;EACd,SAAS;AACX;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE;AACF;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,kBAAkB;AACpB;;AAEA,kBAAkB;AAClB;EACE,WAAW;EACX,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;EACnB,4DAA4D;AAC9D;;AAEA;EACE,cAAc;AAChB;;AAEA,gBAAgB;AAChB;EACE,yBAAyB;EACzB,iBAAiB;EACjB,oBAAoB;EACpB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;EACvB,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA,uBAAuB;AACvB;EACE,kBAAkB;EAClB,UAAU;EACV,QAAQ;EACR,SAAS;EACT,gBAAgB;EAChB,gCAAgC;AAClC;;AAEA;EACE,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,WAAW;EACX,SAAS;EACT,sBAAsB;EACtB,mBAAmB;EACnB,yBAAyB;EACzB,oBAAoB;AACtB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA,oBAAoB;AACpB;EACE,cAAc;EACd,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,8BAA8B;EAC9B,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE;IACE,sBAAsB;EACxB;AACF;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,UAAU;EACV,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA,gBAAgB;AAChB;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,SAAS;EACT,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,UAAU;EACV,eAAe;EACf,aAAa;AACf;;AAEA;EACE,UAAU;EACV,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":["body,\nhtml {\n  width: 100%;\n  background-color: #efefef;\n  color: #404040;\n  margin: 0;\n}\n\nhtml, .calendar-styling {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  font-size: 45px;\n}\n\n.padding-right-5 {\n  padding-right: 5px;\n}\n\n.margin-above {\n  margin-top: 5%;\n}\n\n.margin-left {\n  margin-left: 1%;\n}\n\n.button-width {\n  width: 40%\n}\n\n.button-width2 {\n  width: 30%;\n}\n\n.text-center {\n  text-align: center;\n}\n\n/* welcomeBanner */\n.welcome-banner {\n  margin: 0px;\n  padding-top: 4px;\n  padding-left: 4px;\n  padding-bottom: 2px;\n  background: linear-gradient(70deg, #f93c43 30%, #caebf2 30%);\n}\n\n.white-font-color {\n  color: #ffffff;\n}\n\n/* requestForm */\n.request-form {\n  background-color: #a9a9a9;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  padding-left: 5px;\n}\n\n.input-style {\n  border-style: solid;\n  border-width: thin;\n  font-size: 18px;\n}\n\n.border-radius-5 {\n  border-radius: 5px;\n}\n\n.destinations-style {\n  background-color: white;\n  width: 15%;\n  color: #666666;\n}\n\n.form-submit-button {\n  font-weight: bold;\n  background-color: #f93c43;\n  align: center;\n}\n\n.font-20 {\n  font-size: 20px;\n}\n\n.calendar-styling{\n  width: 12%;\n}\n\n/* confirmTripWrapper */\n.confirm-trip-wrapper {\n  position: absolute;\n  z-index: 9;\n  top: 50%;\n  left: 50%;\n  margin-top: 20px;\n  transform: translate(-50%, -50%);\n}\n\n.confirm-trip-title {\n  margin-top: 3%;\n  font-size: 60px;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\n\n.trip-box {\n  position: relative;\n  display: flex;\n  margin: 5px;\n  flex: 50%;\n  flex-direction: column;\n  align-items: center;\n  background-color: #ffffff;\n  padding-bottom: 20px;\n}\n\n.shadow {\n  box-shadow: 0 8px 8px -4px #a9a9a9;\n}\n\n.align-row {\n  display: flex;\n  flex-direction: row;\n}\n\n.margin-buttons {\n  color: white;\n  font-size: 40px;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n/* trips-container */\n.trips-wrapper {\n  margin-top: 1%;\n  display: flex;\n  flex: 50%;\n  flex-direction: row;\n  justify-content: space-between;\n  align-content: center;\n  margin-left: 2%;\n  margin-right: 2%;\n  margin-bottom: 1%;\n}\n\n@media (max-width: 900px) {\n  .trips-wrapper {\n    flex-direction: column;\n  }\n}\n\n.trip-box-height {\n  height: 700px;\n}\n\n.destination-image {\n  max-width: 40%;\n  margin-bottom: 10px;\n}\n\n.trip-background {\n  background-color: #efefef;\n}\n\n.trip-container {\n  /* flex: 50%; */\n  position: relative;\n  margin-bottom: 10px;\n  width: 80%;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n\n.trip-display {\n  margin: 1px;\n}\n\n.trip-title {\n  margin-bottom: 10px;\n  font-size: 35px;\n}\n\n.scroll-content {\n  overflow: auto;\n}\n\n/* DOM dynamic */\n.remove {\n  display: none;\n}\n\n.confirm-trip-box {\n  display: flex;\n  padding-top: 3%;\n  margin-top: 1%;\n  margin-right: 3%;\n  flex: 50%;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.trip-request-background {\n  background-color: #caebf2;\n}\n\n.confirm-destination-image {\n  max-width: 55%;\n  max-height: 40%;\n  margin-left: 3%;\n  margin-right: 2%;\n  margin-top: 1%;\n}\n\n.confirm-trip-text {\n  width: 95%;\n  padding-left: 2px;\n  padding-right: 2px;\n  font-size: 20px;\n}\n\n.margin-left-5 {\n  margin-left: 5%;\n}\n\n.no-margin-top {\n  margin-top: 0;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.confirm-trip-text-margin {\n  margin-right: 3%;\n}\n\n.button-row {\n  margin-top: 5%;\n  margin-bottom: 1%;\n}\n\n.no-trip-info {\n  width: 90%;\n  font-size: 30px;\n  padding: 10px;\n}\n\n.total-spent {\n  width: 85%;\n  padding-top: 2%;\n  padding-bottom: 2%;\n}\n\n.blur-all {\n  filter: blur(15px);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destinations": () => (/* binding */ destinations),
/* harmony export */   "trips": () => (/* binding */ trips),
/* harmony export */   "travelers": () => (/* binding */ travelers),
/* harmony export */   "addTrip": () => (/* binding */ addTrip)
/* harmony export */ });
//GET requests
const destinations = fetch("http://localhost:3001/api/v1/destinations").then((responses) =>
  responses.json()
);

const trips = fetch(
  "http://localhost:3001/api/v1/trips"
).then((responses) => responses.json());

const travelers = fetch("http://localhost:3001/api/v1/travelers").then((responses) =>
  responses.json()
);

//POST requests
const addTrip = (newTrip) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTrip),
  })
    .then((response) => {
      console.log(response);
      console.log(newTrip)
      if (!response.ok) {
        throw new Error("Please make sure all fields are filled out");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "Failed to fetch") {
        return (errorTag.innerText = "OOPS SORRY something went wrong");
      } else {
        return (errorTag.innerText = error.message);
      }
    });
};




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destinations {
  constructor(destinationsAPI) {
    this.destinationsData = destinationsAPI;
  }

  findDestination(destID) {
    let result = this.destinationsData.destinations.find(
      (dest) => dest.id === destID
    );
    if (!result) {
      return `Destination ${destID} doesn't exist. Please choose a different destination.`;
    } else return result;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destinations);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Destinations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


class Trips {
  constructor(tripsAPI, destinationsAPI) {
    this.tripsData = tripsAPI;
    this.destinationsObj = new _Destinations__WEBPACK_IMPORTED_MODULE_0__.default(destinationsAPI);
  }

  findTrip(tripID) {
    if (!this.tripsData.trips.map((trip) => trip.id).includes(tripID)) {
      return `Trip ${tripID} doesn't exist!`;
    }

    let result = this.tripsData.trips.reduce((acc, data) => {
      if (tripID === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }

  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    let newToday = `${yyyy}/${mm}/${dd}`;
    return newToday;
  }

  requestNewTrip(userId, startDate, tripLength, numTravelers, destID) {
    const newTripID = this.tripsData.trips.length;
    const today = this.todaysDate();

    if (numTravelers > 9) {
      return "Can only request a trip for 9 travelers or less. Please re-enter with the correct number of travelers.";
    } else if (tripLength > 365) {
      return "Cannot request a trip to last more than one year. Please enter a duration for one year or less.";
    } else if (startDate < today) {
      return "Cannot set the start date to earlier than today. Please select a different start date.";
    }

    const newTrip = {
      id: newTripID + 1,
      userID: userId,
      destinationID: destID,
      travelers: numTravelers,
      date: startDate,
      duration: tripLength,
      status: "pending",
      suggestedActivities: [],
    };

    this.tripsData.trips.push(newTrip);
    return newTrip;
  }

  pendingTripCost(tripId) {
    let newTrip = this.tripsData.trips.find((trip) => {
      return trip.id === tripId;
    });

    if (!newTrip) {
      return "Pending trip request doesn't exist. Please request a new trip.";
    }

    let result = this.estimatedTripCost(newTrip);

    return result;
  }

  estimatedTripCost(trip) {
    let tripDestination = this.destinationsObj.destinationsData.destinations.find(
      (dest) => dest.id === trip.destinationID
    );
    let flightCost =
      trip.travelers * tripDestination.estimatedFlightCostPerPerson;
    let lodgingCost =
      trip.duration * tripDestination.estimatedLodgingCostPerDay;
    let totalEstimatedCost = flightCost * 2 + lodgingCost;

    totalEstimatedCost = totalEstimatedCost + totalEstimatedCost * 0.1;

    return totalEstimatedCost;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trips);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


class Travelers {
  constructor(travelersAPI, tripsAPI, destData) {
    this.travelersData = travelersAPI;
    this.tripsObj = new _Trips__WEBPACK_IMPORTED_MODULE_0__.default(tripsAPI, destData);
  }

  findTraveler(travelerId) {
    if(!this.travelersData.travelers.map(traveler => traveler.id).includes(travelerId)) {
      return `Traveler ${travelerId} doesn't exist!`;
    }

    let result = this.travelersData.travelers.reduce((acc, data) => {
      if(travelerId === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }

  travelerAllTrips(travelerId) {
    let result = this.tripsObj.tripsData.trips.filter(trip => {
      if(trip.userID === travelerId) {
        return trip;
      }
    });

    if(result.length === 0) {
      return "No trips to display. Please request a trip.";
    } else return result;
  }



  pastTrips(travelerId) {
    const today = this.tripsObj.todaysDate();
    const allTrips = this.travelerAllTrips(travelerId);
    let result = [];

    allTrips.forEach(trip => {
      if(trip.date < today) {
        result.push(trip);
      }
    });

    if(result.length === 0) {
      return "No previous trips to display.";
    } else return result;
  }

  upcomingTrips(travelerId) {
    const today = this.tripsObj.todaysDate();
    const allTrips = this.travelerAllTrips(travelerId);
    let result = [];

    allTrips.forEach(trip => {
      if(trip.date > today && trip.status === "approved") {
        result.push(trip);
      }
    });

    if(result.length === 0) {
      return "No upcoming trips to display. Please request a trip.";
    } else return result;
  }

  filterPendingTrips(travelerId) {
    let result = this.tripsObj.tripsData.trips.filter(trip => trip.userID === travelerId && trip.status === "pending");
    return result;
  }

  tripsPending(travelerId) {
    const result = this.filterPendingTrips(travelerId);
    if(result.length === 0) {
      return "No pending trips to display. Please request a trip.";
    } else return result;
  }

  totalSpentYear(travelerId) {
    let today = new Date();
    let thisYear = today.getFullYear();
    const travelerTrips = this.travelerAllTrips(travelerId);

    let result = 0;

    travelerTrips.forEach(trip => {
      if(trip.date.includes(thisYear) && trip.status === "approved") {
        result = result + this.tripsObj.estimatedTripCost(trip);
      }
    });

    if(result > 0) {
      return result;
    } else return "There are no trips for this year.";
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Travelers);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Destinations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Travelers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
//imports






//querySelectors
const welcomeBanner = document.getElementById("welcomeBanner");
const pastTrips = document.getElementById("pastTrips");
const upcomingTrips = document.getElementById("upcomingTrips");
const pendingTrips = document.getElementById("pendingTrips");
const totalSpentThisYear = document.getElementById("totalSpentThisYear");
const requestForm = document.getElementById("requestForm");
const tripsWrapper = document.getElementById("tripsWrapper");
const tripRequestStartDate = document.getElementById("tripRequestStartDate");
const tripRequestDuration = document.getElementById("tripRequestDuration");
const tripRequestTravelerNum = document.getElementById(
  "tripRequestTravelerNum"
);
const destinationsId = document.getElementById("destinationsId");
const errorTag = document.getElementById("errorTag");
const confirmTripWrapper = document.getElementById("confirmTripWrapper");
const confirmTripImage = document.getElementById("confirmTripImage");
const confirmTripDest = document.getElementById("confirmTripDest");
const confirmTripDate = document.getElementById("confirmTripDate");
const confirmTripDuration = document.getElementById("confirmTripDuration");
const confirmTripTravelers = document.getElementById("confirmTripTravelers");
const confirmTripCost = document.getElementById("confirmTripCost");
const confirmButton = document.getElementById("confirmButton");
const cancelButton = document.getElementById("cancelButton");
const confirmButtonsRow = document.getElementById("confirmButtonsRow");
const submitButton = document.getElementById("submitButton");
const login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorLogin = document.getElementById("errorLogin");
const confirmInvalidLogin = document.getElementById("confirmInvalidLogin");

//global variables
let travelersRepo;
let user = "";
console.log(user)

//functions
function instantNewTraveler(userId) {
  const traveler = travelersRepo.findTraveler(userId);
  return traveler;
}

function loadDestinations() {
  let result = travelersRepo.tripsObj.destinationsObj.destinationsData.destinations.forEach(
    (dest) => {
      destinationsId.innerHTML += `<option value="${dest.id}">${dest.destination}</option>`;
    }
  );
  return result;
}

function displayTravelersFName(userId) {
  const newTraveler = instantNewTraveler(user);
  const firstName = newTraveler.name.split(" ");

  welcomeBanner.innerHTML = `<h1 class="welcome-banner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
}

function noTripDisplay(selector, trips) {
  if (selector === pastTrips) {
    return selector.innerHTML += `
    <p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${trips}</p>
    `;
  } else if (selector === upcomingTrips) {
    return selector.innerHTML += `
    <p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${trips}</p>`;
  } else if (selector === pendingTrips) {
    return selector.innerHTML += `
    <p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${trips}</p>`;
  }
}

function tripDisplay(selector, trips) {
  return (selector.innerHTML += `
  <div class="trip-container border-radius-5 text-center trip-background shadow">
  <img class="destination-image border-radius-5 shadow" src=${
    travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID)
      .image
  } alt="${
    travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID)
      .destination
  }">
  <p class="trip-display">Destination: ${
    travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID)
      .destination
  }</p>
  <p class="trip-display">Date: ${trips.date}</p>
  <p class="trip-display">Duration: ${trips.duration} Days</p>
  <p class="trip-display">Number of Travelers: ${trips.travelers}</p>
  </div>`);
}

function displayTravelersPastTrips(userId) {
  const previousTrips = travelersRepo.pastTrips(userId);

  if (previousTrips === "No previous trips to display.") {
    noTripDisplay(pastTrips, previousTrips);
  } else {
    previousTrips.forEach((trip) => {
      tripDisplay(pastTrips, trip);
    });
  }
}

function displayTravelersUpcomingTrips(userId) {
  const futureTrips = travelersRepo.upcomingTrips(userId);

  if (futureTrips === "No upcoming trips to display. Please request a trip.") {
    noTripDisplay(upcomingTrips, futureTrips);
  } else {
    futureTrips.forEach((trip) => {
      tripDisplay(upcomingTrips, trip);
    });
  }
}

function displayTravelersPendingTrips(userId) {
  const unapprovedTrips = travelersRepo.tripsPending(userId);

  pendingTrips.innerHTML = `<h2 class="trip-title" >Pending Trips</h2>`;
  if (
    unapprovedTrips === "No pending trips to display. Please request a trip."
  ) {
    noTripDisplay(pendingTrips, unapprovedTrips);
  } else {
    unapprovedTrips.forEach((trip) => {
      tripDisplay(pendingTrips, trip);
    });
  }
}

function displayTravelersTotalSpent(userId) {
  const totalSpent = travelersRepo.totalSpentYear(userId);

  if (totalSpent === "There are no trips for this year.") {
    totalSpentThisYear.innerHTML += `<p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${totalSpent}</p>`;
  } else {
    totalSpentThisYear.innerHTML += `<p class="trip-title trip-background shadow total-spent no-margin-top border-radius-5 text-center">$${totalSpent}</p>`;
  }
}

function hide(e) {
  e.classList.add("remove");
}

function show(e) {
  e.classList.remove("remove");
}

function blur(e) {
  e.classList.add("blur-all");
}

function removeBlur(e) {
  e.classList.remove("blur-all");
}

function confirmTripRequest(trip) {
  blur(tripsWrapper);
  show(confirmTripWrapper);
  hide(errorTag);

  confirmTripImage.innerHTML = "";

  if(trip === "Can only request a trip for 9 travelers or less. Please re-enter with the correct number of travelers.") {
    confirmTripImage.innerHTML += `
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow margin-left-5">
      <section class="confirm-trip-text no-margin-top text-center">
      <p class="trip-display"><b>${trip}</b></p>
      </section>
    </article>`;
    hide(confirmButton);
  } else if(trip === "Cannot request a trip to last more than one year. Please enter a duration for one year or less.") {
    confirmTripImage.innerHTML += `
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow margin-left-5">
      <section class="confirm-trip-text no-margin-top text-center">
      <p class="trip-display"><b>${trip}</b></p>
      </section>
    </article>`;
    hide(confirmButton);
  } else if(trip === "Cannot set the start date to earlier than today. Please select a different start date.") {
    confirmTripImage.innerHTML += `
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow margin-left-5">
      <section class="confirm-trip-text no-margin-top text-center">
      <p class="trip-display"><b>${trip}</b></p>
      </section>
    </article>`;
    hide(confirmButton);
  } else {
    confirmTripImage.innerHTML += `<img class="confirm-destination-image border-radius-5 shadow" src=${
      travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
        .image
    } alt=${
      travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
        .destination
    } id="confirmTripImage">
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow">
      <section class="confirm-trip-text no-margin-top text-center">
    <p class="trip-display" id="confirmTripDest"><b>Destination</b>: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
    <p class="trip-display" id="confirmTripDate"><b>Date</b>: ${trip.date}</p>
    <p class="trip-display" id="confirmTripDuration"><b>Duration</b>: ${trip.duration} Days</p>
    <p class="trip-display" id="confirmTripTravelers"><b>Number of Travelers</b>: ${trip.travelers}</p>
    <p class="trip-display" id="confirmTripCost"><b>Estimated Cost</b>: $${travelersRepo.tripsObj.pendingTripCost(trip.id)}</p>
    </section>
  </article>`;
  }
}

function createNewTripRequest() {
  const newTrip = travelersRepo.tripsObj.requestNewTrip(
    user,
    tripRequestStartDate.value.replaceAll("-", "/"),
    parseInt(tripRequestDuration.value),
    parseInt(tripRequestTravelerNum.value),
    parseInt(destinationsId.value)
  );
  return newTrip;
}

function confirmTrip(trip) {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.addTrip)(trip);
  hide(confirmTripWrapper);
  removeBlur(tripsWrapper);
  show(tripsWrapper);
  displayTravelersPendingTrips(user);
}

function clearInputForms() {
  tripRequestStartDate.value = '';
  tripRequestDuration.value = '';
  tripRequestTravelerNum.value = '';
  destinationsId.value = '';
}

function clearLoginForm() {
  username.value = '';
  password.value = '';
}

function assignUser() {
  let parseUser = username.value.split("r");
  let result = parseUser.pop();

  user = parseInt(result);

  return user;
}

//event listeners
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTrip = createNewTripRequest();

  confirmTripRequest(newTrip);
  confirmButton.addEventListener("click", (e) => {
    confirmTrip(newTrip);
    clearInputForms();
  });
});


cancelButton.addEventListener("click", (e) => {
  show(confirmButton)
  hide(confirmTripWrapper);
  removeBlur(tripsWrapper);
  show(tripsWrapper);
  clearInputForms();
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(username.value === "traveler50" && password.value === "travel") {
    hide(login);
    show(welcomeBanner);
    show(tripsWrapper);
    show(requestForm);
    assignUser();
    if(user === 50) {
      onload()
    }
  } else if(username.value && password.value){
    hide(login)
    show(errorLogin);
  }
});

confirmInvalidLogin.addEventListener("click", (e) => {
  e.preventDefault();
  clearLoginForm();
  hide(errorLogin);
  show(login);
});

//onload display
const onload = (event) => {
  Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_1__.destinations, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.trips, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.travelers])
    .then((data) => {
      travelersRepo = new _Travelers__WEBPACK_IMPORTED_MODULE_4__.default(data[2], data[1], data[0]);
      loadDestinations();
      displayTravelersFName(user);
      displayTravelersPastTrips(user);
      displayTravelersUpcomingTrips(user);
      displayTravelersPendingTrips(user);
      displayTravelersTotalSpent(user);
    })
    .catch((err) => console.log(err));
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map