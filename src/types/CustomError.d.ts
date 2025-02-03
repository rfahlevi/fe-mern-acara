interface CustomError extends Error {
  response?: {
    data: {
      meta: {
        message: string;
        status: number;
      };
    };
  };
}

export type { CustomError };
