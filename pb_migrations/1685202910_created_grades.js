migrate((db) => {
  const collection = new Collection({
    "id": "ztqfjxduw4jeinz",
    "created": "2023-05-27 15:55:10.594Z",
    "updated": "2023-05-27 15:55:10.594Z",
    "name": "grades",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "46lkurca",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "yzftnlxg",
        "name": "percentile",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100
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
  const collection = dao.findCollectionByNameOrId("ztqfjxduw4jeinz");

  return dao.deleteCollection(collection);
})
