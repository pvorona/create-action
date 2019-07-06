const acceptObject = (payloadObject) => payloadObject
const acceptNamedArgs = (maybeArgNamesOrPayloadCreator, ...args) => maybeArgNamesOrPayloadCreator.reduce(
  (payload, argumentName, index) => ({ ...payload, [argumentName]: args[index] }),
  {},
)

const transformArgsForPayloadCreatorByCase = {
  0: (argNames, object) => [object],
  1: (argNames, ...args) => args,
  2: (argNames, ...args) => [argNames, ...args]
}

export function createAction (type, ...maybeArgNamesOrPayloadCreator) {
  let payloadCreatorCase
  let payloadCreator

  if (maybeArgNamesOrPayloadCreator.length === 0) {
    payloadCreator = acceptObject
    payloadCreatorCase = 0
  } else if (maybeArgNamesOrPayloadCreator.length === 1 && typeof maybeArgNamesOrPayloadCreator[0] === 'function') {
    payloadCreator = maybeArgNamesOrPayloadCreator[0]
    payloadCreatorCase = 1
  } else {
    payloadCreator = acceptNamedArgs
    payloadCreatorCase = 2
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
      ...payloadCreator(
        ...transformArgsForPayloadCreatorByCase[payloadCreatorCase](maybeArgNamesOrPayloadCreator, ...args),
      ),
    }
  }

  actionCreator.toString = () => type

  return actionCreator
}
