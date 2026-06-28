const isDevMode = process.env.NEXT_PUBLIC_ENVIRONMENT;
const NOENV = "NO_ENV_ENVIRONMENT";

const getUrlBackend = () => {
  if (!isDevMode) return NOENV;
  if (isDevMode) return process.env.NEXT_PUBLIC_API_URL_DEV;
  return process.env.NEXT_PUBLIC_API_URL;
};

const getUrlSso = () => {
  if (!isDevMode) return NOENV;
  if (isDevMode) return process.env.NEXT_PUBLIC_SSO_URL_DEV;
  return process.env.NEXT_PUBLIC_SSO_URL;
};

const getUrlWebSocket = () => {
  if (!isDevMode) return NOENV;
  if (isDevMode) return process.env.NEXT_PUBLIC_SOCKET_URL_DEV;
  return process.env.NEXT_PUBLIC_SOCKET_URL;
};

const API_ENDPOINT = {
  API: getUrlBackend(),
  SSO: getUrlSso(),
  SOCKET: getUrlWebSocket(),
};

export default API_ENDPOINT;
