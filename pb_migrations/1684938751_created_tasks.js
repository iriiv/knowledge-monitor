migrate((db) => {
  const collection = new Collection({
    "id": "2zk5sx0a1re7b99",
    "created": "2023-05-24 14:32:31.932Z",
    "updated": "2023-05-24 14:32:31.932Z",
    "name": "tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jhwygtgg",
        "name": "field",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2zk5sx0a1re7b99");

  return dao.deleteCollection(collection);
})
