export const errors = {
    NotFoundById: (id: string) => {
        return {
            statusCode: 404,
            message: `User with ID ${id} not found`,
            error: 'Not Found',
            code: 'NOT_FOUND'
        };
    },
    DuplicateKeyError: (duplicateKey : string) => {
        return {
            statusCode: 409,
            message: `Duplicate key error: ${duplicateKey}`,
            error: 'Conflict',
            code: 'CONFLICT'
        };
    }
};

