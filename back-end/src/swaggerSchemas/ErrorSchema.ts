export const errorSchema  = {
    type: "object",
    properties:{
        status: {
            type: 'string',
            description: 'The user id'
        },
        error: {
            type: 'object',
            properties:{
                statusCode: {
                    type: 'number'
                },
                status: {
                    type: 'string'
                },
                isOperational: {
                    type: 'boolean'
                },
            }
        },
        message: {
            type: 'string'
        },
        stack: {
            type: 'string',
        },
    }
}