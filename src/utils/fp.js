export const set = (attr, val) => obj => obj.set(attr, val);

export const get = (attr, alt = '') => state => state.get
  ? state.get(attr, alt)
  : state[attr] || alt;

export const getIn = (path, alt = '') => state => state.getIn
  ? state.getIn(path, alt)
  : path.reduce((memo, p) => memo && memo[p] || alt, state);
