const createAction = require('./createAction')
const PropTypes = require('prop-types')

it('Creates action object', () => {
    const fetchStart = createAction('FETCH_START', 'id', 'type')
    expect(fetchStart('1', 'cat')).toMatchSnapshot()
})

it('Invalid number of parameters throws Error', () => {
    const fetchStart = createAction('FETCH_START', 'id', 'type')
    expect(fetchStart).toThrow(Error)
})

it('toString returns action type', () => {
    const creator = createAction('INIT_APPLICATION')
    expect(creator.toString()).toEqual('INIT_APPLICATION')
})

it('Accepts payload creator function', () => {
    const setSidebarExpanded = createAction(
        'SET_SIDEBAR_EXPANDED',
        (expanded = false, id) => ({ expanded, id }),
    )
    expect(setSidebarExpanded()).toMatchSnapshot()
})

it('Provides one unnamed argument as payload object', () => {
    const fetchStart = createAction('FETCH_START')
    expect(fetchStart({ id: '2', schema: 'TOY' })).toMatchSnapshot()
})

it('Provides all unnamed arguments as payload array', () => {
    const fetchStart = createAction('FETCH_START')
    expect(fetchStart('2', 'TOY')).toMatchSnapshot()
})

describe('Accepts configuration object', () => {
    it('Accepts argument names as payload property', () => {
        const fetchStart = createAction({
            type: 'FETCH_START',
            payload: ['id', 'schema'],
        })
        // const fetchStart = (id = '0', schema) => ({
            // type: 'FETCH_START',
            // id,
            // schema,
        // })
        expect(fetchStart('guest', 'cat')).toMatchSnapshot()
    })

    it('Throws Error with invalid number of parameters', () => {
        const fetchStart = createAction({
            type: 'FETCH_START',
            payload: ['id', 'schema'],
        })
        expect(() => fetchStart('guest')).toThrow(Error)
    })

    it('toString returns action type', () => {
        const creator = createAction('INIT_APPLICATION')
        expect(creator.toString()).toEqual('INIT_APPLICATION')
    })

    it('Accepts payload creator as payload property', () => {
        const fetchStart = createAction({
            type: 'FETCH_START',
            payload: (id, schema = SCHEMAS.DEFAULT_SCHEMA) => ({ id, schema })
        })
        expect(fetchStart('guest', 'cat')).toMatchSnapshot()
    })

    it('Validates arguments by using PropTypes', () => {
        const fetchStart = createAction({
            type: 'FETCH_START',
            id: PropTypes.string.isRequired,
            schema: PropTypes.string.isRequired,
        })
        fetchStart(1,2)
    })
})



// arguments | config
//




// export const fetchStart = createAction({
//     type: 'FETCH_START',
//     payloadCreator: (id, schema = SCHEMAS.DEFAULT_SCHEMA) => ({ id, schema })
// })
// export const fetchStart = createAction({
//     type: 'FETCH_START',
//     id: PropTypes.string.isRequired,
//     schema: PropTypes.string.isRequired,
// })

// export const fetchStart = createAction({
//     type: 'FETCH_START',
//     payload: ['id', 'schema'],
// })
// export const fetchStart = createAction('FETCH_START', {
//     id: PropTypes.string.isRequired,
//     schema: PropTypes.string.isRequired,
// })



// export const fetchStart = createAction('FETCH_START', (id, schema = SCHEMAS.DEFAULT_SCHEMA) => ({ id, schema }))
// export const fetchStart = createAction('FETCH_START', 'id', 'schema')

// export const fetchStart = createAction()
