// import { pushArgsToAction } from './pushArgsToAction'
const PropTypes = require('prop-types')

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

function createAction (typeOrConfig, ...maybeArgnames) {
  let payloadCreator
  let type = typeOrConfig
  let argNames = maybeArgnames
  let propTypes = {}

  if (typeof typeOrConfig === 'object') {
    type = typeOrConfig.type

    if ('payload' in typeOrConfig) {
      if (typeof typeOrConfig.payload === 'function') {
        payloadCreator = typeOrConfig.payload
      } else {
        argNames = typeOrConfig.payload
      }
    } else {
      const { type: type1, ...asdf } = typeOrConfig
      argNames = Object.keys(asdf)
      propTypes = asdf
    }
  }




  if (typeof argNames[0] === 'function') {
    payloadCreator = argNames[0]
  }

  function actionCreator (...args) {
    const map = argNames.reduce((all, current, index) => Object.assign(all, {
      [argNames[index]]: current,
    }), {})
      // ({
      // ...all,
      // [argNames[index]]: current,
    // }), {}),
    // const map = pushArgsToAction({}, argNames, args)

    PropTypes.checkPropTypes(
        propTypes,
        map,
        'argument',
        type,
    )


    if (payloadCreator) {
        return {
            type,
            ...payloadCreator(...args),
        }
    }

    if (argNames.length === 0 && args.length !== 0) {
      const payload = args.length === 1 ? args[0] : args
      return {
        type,
        payload,
      }
    }

    if (args.length < argNames.length) {
      const message = (
        `Trying to create an action ${type} ` +
        'with invalid number of parameters. ' +
        `Expected ${argNames.length}: ${JSON.stringify(argNames)}, ` +
        `received ${args.length}: ${JSON.stringify(args)}.`
      )
      throw new Error(message)
    }

    return pushArgsToAction({ type }, argNames, args)
  }

  actionCreator.toString = () => type

  return actionCreator
}

module.exports = createAction
