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

  const payloadCreatorByCase = {
    0: () => acceptObject,
    1: ([payloadCreator]) => payloadCreator,
    2: () => acceptNamedArgs,
  };

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

  const getPayloadCreatorCase = (maybeArgNamesOrPayloadCreator) => {
    if (maybeArgNamesOrPayloadCreator.length === 0) {
      return 0
    } else if (maybeArgNamesOrPayloadCreator.length === 1 && typeof maybeArgNamesOrPayloadCreator[0] === 'function') {
      return 1
    } else {
      return 2
    }
  };

  function createAction (type, ...maybeArgNamesOrPayloadCreator) {
    const payloadCreatorCase = getPayloadCreatorCase(maybeArgNamesOrPayloadCreator);
    const payloadCreator = payloadCreatorByCase[payloadCreatorCase](maybeArgNamesOrPayloadCreator);

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
