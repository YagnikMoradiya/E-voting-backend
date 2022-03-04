/**
 * Class representing an API Resonse.
 */
class APIResponse {
  data;
  message;
  status;
  error;

  constructor(data = null, message = '', status = 200, error = null) {
    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }

    if (status) {
      this.status = status;
    }

    if (error) {
      this.error = error;
    }
  }
}

export default APIResponse;
