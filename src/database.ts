export let db = [
  {
    id: "1",
    username: "John",
    password: "123abc"
  },
  {
    id: "2",
    username: "Jane",
    password: "admin"
  }
];

export const updateDB = (newDB: typeof db): typeof db => {
  db = newDB;
  return db;
};
