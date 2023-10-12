import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  let textDb = await openDB('jate', 1);
  let  txn = textDb.transaction('jate', 'readwrite');
  let  dbStore = txn.objectStore('jate');
  let  req = dbStore.put({ id: 1, value: content });
  let  result = await req;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  let  textDb = await openDB('jate', 1);
  let  txn = textDb.transaction('jate', 'readonly');
  let  DbStore = txn.objectStore('jate');
  let  req = DbStore.get(1);
  let  result = await req;
  return result?.value;
};


initdb();
