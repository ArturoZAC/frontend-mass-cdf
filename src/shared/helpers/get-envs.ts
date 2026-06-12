export const getEnvs = () => {
  return {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    BASE_URL_IMAGES: import.meta.env.VITE_BASE_URL_IMAGES,
  };
};
