import { PageLink } from '../types/pageLink';

export const getPathLink = (object: PageLink, value: string) => {
  return Object.keys(object).find(key => object[key] === value);
};
