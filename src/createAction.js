function pushArgsToAction (
    action,
    argNames,
    args
) {
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })

    return action
}

function createAction (type, ...maybeArgNamesOrPayloadCreator) {
  let payloadCreator

  if (maybeArgNamesOrPayloadCreator.length !== 0 && typeof maybeArgNamesOrPayloadCreator[0] === 'function') {
    payloadCreator = maybeArgNamesOrPayloadCreator[0]
  }

  function actionCreator (...args) {
    if (payloadCreator) {
        return {
            type,
            ...payloadCreator(...args),
        }
    }

    if (maybeArgNamesOrPayloadCreator.length === 0 && args.length === 1) {
      // check is object
      return {
        type,
        ...args[0],
      }
    }

    if (args.length !== maybeArgNamesOrPayloadCreator.length) {
      const message = (
        `Trying to create an action ${type} ` +
        'with invalid number of parameters. ' +
        `Expected ${maybeArgNamesOrPayloadCreator.length}: ${JSON.stringify(maybeArgNamesOrPayloadCreator)}, ` +
        `received ${args.length}: ${JSON.stringify(args)}.`
      )
      throw new Error(message)
    }

    return pushArgsToAction({ type }, maybeArgNamesOrPayloadCreator, args)
  }

  actionCreator.toString = () => type

  return actionCreator
}

module.exports = createAction
