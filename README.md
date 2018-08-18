fetchStart()
fetchStart(item.id)
fetchStart(item.id, item.type)
fetchStart({ id: item.id, schema: item.type })


export const fetchStart = createAction()
export const fetchStart = createAction('FETCH_START', 'id', 'schema')
export const fetchStart = createAction('FETCH_START', (id, schema = SCHEMAS.DEFAULT_SCHEMA) => ({ id, schema }))
export const fetchStart = createAction({
    type: 'FETCH_START',
    payloadCreator: (id, schema = SCHEMAS.DEFAULT_SCHEMA) => ({ id, schema })
})
export const fetchStart = createAction({
    type: 'FETCH_START',
    payload: ['id', 'schema'],
})
export const fetchStart = createAction({
    type: 'FETCH_START',
    id: PropTypes.string.isRequired,
    schema: PropTypes.string.isRequired,
})
export const fetchStart = createAction('FETCH_START', {
    id: PropTypes.string.isRequired,
    schema: PropTypes.string.isRequired,
})



export const fetchStart = createAction('FETCH_START', ['id', 'schema'])
export const fetchStart = createAction({
    type: 'FETCH_START',
    payload: [{ field: 'id', type: PropTypes.string, defaultValue: '0' }, 'schema'],
})


reducer()(
    [fetchStart]: (state, { id, schema }) => ({
        ...state,
        id,
        schema,
    }),
)

- Custom key name is better than 'payload' in reducer
- String key names is better than payload creator
- State structure should be in scope
- Consider performance
- Add PropTypes validation for payload?

export const fetchStart = createAction()

fetchStart()
{ type: uuid }

fetchStart(item.id)
{ type: uuid, payload: item.id }

fetchStart(item.id, item.type)
{ type: uuid, payload: [item.id, item.type] }

fetchStart({ id: item.id, schema: item.type })
{ type: uuid, payload: { id: item.id, schema: item.type } }



export const fetchStart = createAction('FETCH_START', 'id', 'schema')

fetchStart()
Error('Invalid number of arguments')

fetchStart(item.id)
Error('Invalid number of arguments')

fetchStart(item.id, item.type)
{ type: uuid, id: item.id, schema: item.type }

fetchStart({ id: item.id, schema: item.type })
Error('Invalid number of arguments')



export const fetchStart = createAction('FETCH_START', ['id', 'schema'])

fetchStart()
Error('Invalid number of arguments')

fetchStart(item.id)
Error('Invalid number of arguments')

fetchStart(item.id, item.type)
{ type: 'FETCH_START', id: item.id, schema: item.type }

fetchStart({ id: item.id, schema: item.type })
Error('Invalid number of arguments')




export const fetchStart = createAction('FETCH_START', (id, schema) => ({ id, schema }))

fetchStart()
{ type: 'FETCH_START', id: undefined, schema: undefined }

fetchStart(item.id)
{ type: 'FETCH_START', id: item.id, schema: undefined }

fetchStart(item.id, item.type)
{ type: 'FETCH_START', id: item.id, schema: item.type }
