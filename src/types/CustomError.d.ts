interface CustomError extends Error {
    message: string,
    response?: {
        data: {
            message: string
        }
    }
}

export type { CustomError }