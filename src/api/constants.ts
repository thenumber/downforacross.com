const REMOTE_SERVER =
  process.env.NODE_ENV === 'development' ? 'api-staging.foracross.com' : 'api.foracross.com';
const REMOTE_SERVER_URL = `https://${REMOTE_SERVER}`;
if (window.location.protocol === 'https' && process.env.NODE_ENV === 'development') {
  throw new Error('Please use http in development');
}

export const SERVER_URL =
  process.env.REACT_APP_LOCAL_SERVER === undefined ? REMOTE_SERVER_URL : process.env.REACT_APP_LOCAL_SERVER;
// socket.io server is same as api server
export const SOCKET_HOST = SERVER_URL;
