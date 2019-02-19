import axios from "axios";

const isResponseOk = (response) => {
  let ok = true;
  if(parseInt(response.status) !== 200) {
    return false;
  }
  return ok;
};

export default {
  async getRequest (url, params = {}) {
    let response = await axios.get(url, {params});
    if(isResponseOk(response)) {
      return response;
    } else {
      throw new Error(response);
    }
  },
  async postRequest (url, body) {
    let response = await axios.post(url, body);
    if (isResponseOk(response)) {
      return response;
    } else {
      throw new Error(response);
    }
  },
  async deleteRequest (url, body) {
    let response = await axios.delete(url, body);
    if (isResponseOk(response)) {
      return response;
    } else {
      throw new Error(response);
    }
  },
  async putRequest (url, body) {
    let response = await axios.put(url, body);
    if (isResponseOk(response)) {
      return response;
    } else {
      throw new Error(response);
    }
  }
}