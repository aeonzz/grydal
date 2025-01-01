export const fetcher = async (url: string) => {
  return fetch(url).then((res) => res.json());
};
