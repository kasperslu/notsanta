import axios from 'axios';

async function request(method = 'get', path = '/', data = {}) {
  const url = `https://notsanta.com${path}`;
  const res = await axios({
    method,
    url,
    data,
  });
  return res.data;
};

export default {
  async getSecretSanta(id) {
    return request('get', `/api/secret-santa/${id}`);
  },

  async postSecretSanta(data) {
    return request('post', '/api/secret-santa', data);
  },

  async putSecretSanta(id, name) {
    return request('put', `/api/secret-santa/${id}`, { name });
  },
};
