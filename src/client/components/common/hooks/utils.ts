/**
 * Retrieves an error message from the given data or response.
 *
 * @param {any} data - The data object containing potential error information.
 * @param {Response} response - The Response object from the fetch API.
 * @returns {string} The error message.
 */
export const getErrorMessage = (data: any, response: Response): string => {
  if (data.message) {
    return data.message;
  }

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors[0].error.message;
  }

  return response.statusText;
};
