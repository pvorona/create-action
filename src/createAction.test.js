const createAction = require('./createAction')

//  defaults with payload creator
// action = createAction('type', { a: 1, b: undefined })
// action() === { type: 'type', a: 1, b: undefined }
// action({ b: 2 }) === { type: 'type', a: 1, b: 2 }
// action({ a: 2 }) === { type: 'type', a: 2, b: undefined }
//
//
//  general use
// action = createAction('type', 'a', 'b')
// action() === throw Error
// action(1) === throw Error
// action(1, 2, 3) === throw Error
// action(1, 2) === { typ: 'type', a: 1, b: 2 }
//
//
//
//  default named
// action = createAction('type', (a = 1, b) => ({ a, b }))
// action = createAction('type', 'a', 'b')
// action = createAction('type', ['a', 1], ['b', 2])


// todo
// throw when only type is configured and more that 1 object is passed into creator

it('toString return action type', () => {
    const fetchItemsStart = createAction('FETCH_ITEMS_START')
    expect(fetchItemsStart.toString()).toEqual('FETCH_ITEMS_START')
})

it('Call without arguments', () => {
    const fetchItemsStart = createAction('FETCH_ITEMS_START')
    expect(fetchItemsStart()).toEqual({ type: 'FETCH_ITEMS_START' })
})

it('Call with payload object', () => {
    const fetchItemsSuccess = createAction('ON_NEW_TAGS')
    expect(fetchItemsSuccess(
        { color: 'red', group: 3, id: 5 })
    ).toEqual(
        { color: 'red', group: 3, id: 5, type: 'ON_NEW_TAGS' }
    )
})

it('Call with something that is not object', () => {
    const fetchItemsSuccess = createAction('ON_NEW_TAGS')
    expect(() => fetchItemsSuccess(3)).toThrow(Error)
})

it('Named arguments call', () => {
    const fetchItemStart = createAction('FETCH_ITEM_START', 'id', 'type')
    expect(fetchItemStart(1, 'machine')).toEqual({ type: 'FETCH_ITEM_START', id: 1, type: 'machine' })
})

it('Named arguments Throws Error with invalid number of parameters', () => {
    const fetchItemStart = createAction('FETCH_ITEM_START', 'id', 'type')
    expect(() => fetchItemStart()).toThrow(Error)
    expect(() => fetchItemStart(1)).toThrow(Error)
    expect(() => fetchItemStart(1, 2, 3)).toThrow(Error)
})

it('Accepts payload creator function', () => {
    const action = createAction('FETCH_START', (total, error = false) => ({ total, error }))
    expect(action(10)).toEqual({ type: 'FETCH_START', total: 10, error: false })
    expect(action(10, true)).toEqual({ type: 'FETCH_START', total: 10, error: true })
})
