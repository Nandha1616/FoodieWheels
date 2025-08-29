export const handleError = (res, context, error,) => {
    res.status(500).json({
        message: `Error occurred during ${context}`,
        error: error.message || "An unknown error occurred",
    });
};