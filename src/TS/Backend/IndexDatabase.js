// Open a database named 'MyDatabase' with version 1
const request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an object store named 'templates' with a unique key 'id'
  if (!db.objectStoreNames.contains("templates")) {
    db.createObjectStore("templates", { keyPath: "id" });
  }
};


export default request