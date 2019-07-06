(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['create-action'] = {}));
}(this, function (exports) { 'use strict';

  const acceptObject = (payloadObject) => payloadObject;
  const acceptNamedArgs = (maybeArgNamesOrPayloadCreator, ...args) => maybeArgNamesOrPayloadCreator.reduce(
    (payload, argumentName, index) => ({ ...payload, [argumentName]: args[index] }),
    {},
  );

  const transformArgsForPayloadCreatorByCase = {
    0: (argNames, object) => [object],
    1: (argNames, ...args) => args,
    2: (argNames, ...args) => [argNames, ...args]
  };

  const validateByCase = {
    0: (args) => (args.length === 0 || (args.length === 1 && typeof args[0] === 'object')),
    1: () => true,
    2: (args, argNames) => (args.length === argNames.length),
  };

  function createAction (type, ...maybeArgNamesOrPayloadCreator) {
    let payloadCreatorCase;
    let payloadCreator;

    if (maybeArgNamesOrPayloadCreator.length === 0) {
      payloadCreator = acceptObject;
      payloadCreatorCase = 0;
    } else if (maybeArgNamesOrPayloadCreator.length === 1 && typeof maybeArgNamesOrPayloadCreator[0] === 'function') {
      payloadCreator = maybeArgNamesOrPayloadCreator[0];
      payloadCreatorCase = 1;
    } else {
      payloadCreator = acceptNamedArgs;
      payloadCreatorCase = 2;
    }

    function actionCreator (...args) {
      if (!validateByCase[payloadCreatorCase](args, maybeArgNamesOrPayloadCreator)) {
        throw new Error
      }

      return {
        type,
        ...payloadCreator(
          ...transformArgsForPayloadCreatorByCase[payloadCreatorCase](maybeArgNamesOrPayloadCreator, ...args),
        ),
      }
    }

    actionCreator.toString = () => type;

    return actionCreator
  }

  exports.createAction = createAction;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
