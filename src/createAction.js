function createAction (type, ...maybeArgNamesOrPayloadCreator) {
  const acceptObjectCreator = (payloadObject) => payloadObject
  const collectNamedArgumentsCreator = (...args) => maybeArgNamesOrPayloadCreator.reduce(
    (payload, argumentName, index) => ({ ...payload, [argumentName]: args[index] }),
    {},
  )

  let payloadCreator

  if (maybeArgNamesOrPayloadCreator.length === 0) {
    payloadCreator = acceptObjectCreator
  } else if (maybeArgNamesOrPayloadCreator.length === 1 && typeof maybeArgNamesOrPayloadCreator[0] === 'function') {
    payloadCreator = maybeArgNamesOrPayloadCreator[0]
  } else {
    payloadCreator = collectNamedArgumentsCreator
  }

  function actionCreator (...args) {
    if (payloadCreator === acceptObjectCreator && !(args.length === 0 || (args.length === 1 && typeof args[0] === 'object'))) {
      throw new Error
    }
    if (payloadCreator === collectNamedArgumentsCreator && args.length !== maybeArgNamesOrPayloadCreator.length) {
      throw new Error
    }

    return {
      type,
      ...payloadCreator(...args),
    }
  }

  actionCreator.toString = () => type

  return actionCreator
}

module.exports = createAction