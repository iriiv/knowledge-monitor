migrate((db) => {
  const collection = new Collection({
    "id": "h542ep0thq3fjqa",
    "created": "2023-05-24 16:03:09.529Z",
    "updated": "2023-05-24 16:03:09.529Z",
    "name": "confirmations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "opadp81g",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "afcjiwat",
        "name": "estimate",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ea0f08jp6gdb9hb",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("h542ep0thq3fjqa");

  return dao.deleteCollection(collection);
})
