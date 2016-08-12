class AbstractAdapter {
  findByUrl() {
    return Promise.reject(new Error('Not implemented.'));
  }

  findByHash() {
    return Promise.reject(new Error('Not implemented.'));
  }

  find() {
    return Promise.reject(new Error('Not implemented.'));
  }

  save() {
    return Promise.reject(new Error('Not implemented.'));
  }
}

module.exports = AbstractAdapter;
