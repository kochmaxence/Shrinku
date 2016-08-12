class AbstractAdapter {
  findByUrl() {
    throw new Error('Not implemented.');
  }

  findByHash() {
    throw new Error('Not implemented.');
  }

  find() {
    throw new Error('Not implemented.');
  }

  save() {
    throw new Error('Not implemented.');
  }
}

module.exports = AbstractAdapter;
