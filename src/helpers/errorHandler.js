const errorHandler = (jsonError) => {
  if (jsonError.status === 'error') {
    throw new Error(jsonError.message);
  }
}

export default errorHandler;
