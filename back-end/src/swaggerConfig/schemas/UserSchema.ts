export const userSchema  = {
    type: "object",
    required: ['username', 'email', 'password', 'passwordConfirm'],
    properties:{
        _id: {
            type: 'string',
            description: 'The user id'
        },
        username: {
            type: 'string',
            description: 'The username of the user',
            example: 'Test User',
        },
        admin: {
            type: 'boolean',
            description: 'Indicates if the user is an admin',
            example: false,
        },
        emailConfirmed: {
            type: 'boolean',
            description: 'Indicates if the user\'s email is confirmed',
            example: false,
        },
        email: {
            type: 'string',
            description: 'The email of the user',
            format: 'email',
            example: 'test@example.com',
        },
        photo: {
            type: 'string',
            description: 'The user\'s profile photo',
            example: 'profile.jpg',
        }
    }
}
