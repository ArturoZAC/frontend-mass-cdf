export const getEnvs = () => {
  return {
    BASE_URL: import.meta.env.BASE_URL,
    BASE_URL_IMAGES: import.meta.env.BASE_URL_IMAGES,
  };
};
