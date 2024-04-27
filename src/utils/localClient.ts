const PREFIX = 'DECOR_STORE_';

const client = {
  read: <T>(key: string): T | null => {
    const data = window.localStorage.getItem(key);

    try {
      return data && JSON.parse(data);
    } catch (error) {
      return null;
    }
  },

  write: <T>(key: string, data: T): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  init: <T>(key: string, initialData: T): T => {
    return client.read(key) || initialData;
  },
};

export function getClient(postfix: string) {
  const key = PREFIX.concat(postfix);

  return {
    read: <T>(): T | null => client.read(key),
    write: <T>(data: T): void => client.write(key, data),
    init: <T>(initialData: T): T => client.init(key, initialData),
  };
}
