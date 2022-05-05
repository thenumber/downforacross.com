import qs from 'querystringify';

export const isSimpleView = (location) => {
  if (!location.search) return false;
  return qs.parse(location.search).simple === 'true';
};
