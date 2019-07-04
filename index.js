(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['create-action'] = {}));
}(this, function (exports) { 'use strict';

  function createAction (type, ...maybeArgNamesOrPayloadCreator) {
    let payloadCreatorCase;
    let payloadCreator;

    if (maybeArgNamesOrPayloadCreator.length === 0) {
      payloadCreator = (payloadObject) => payloadObject;
      payloadCreatorCase = 0;
    } else if (maybeArgNamesOrPayloadCreator.length === 1 && typeof maybeArgNamesOrPayloadCreator[0] === 'function') {
      payloadCreator = maybeArgNamesOrPayloadCreator[0];
      payloadCreatorCase = 1;
    } else {
      payloadCreator = (...args) => maybeArgNamesOrPayloadCreator.reduce(
        (payload, argumentName, index) => ({ ...payload, [argumentName]: args[index] }),
        {},
      );
      payloadCreatorCase = 2;
    }

    function actionCreator (...args) {
      if (payloadCreatorCase === 0 && !(args.length === 0 || (args.length === 1 && typeof args[0] === 'object'))) {
        throw new Error
      }
      if (payloadCreatorCase === 2 && !(args.length === maybeArgNamesOrPayloadCreator.length)) {
        throw new Error
      }

      return {
        type,
        ...payloadCreator(...args),
      }
    }

    actionCreator.toString = () => type;

    return actionCreator
  }

  exports.createAction = createAction;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
