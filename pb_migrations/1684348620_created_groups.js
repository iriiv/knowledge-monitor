migrate((db) => {
  const collection = new Collection({
    "id": "33bevmbq73d3ohm",
    "created": "2023-05-17 18:37:00.771Z",
    "updated": "2023-05-17 18:37:00.771Z",
    "name": "groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pq8exyty",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
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
  const collection = dao.findCollectionByNameOrId("33bevmbq73d3ohm");

  return dao.deleteCollection(collection);
})
