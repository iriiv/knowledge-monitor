migrate((db) => {
  const collection = new Collection({
    "id": "ea0f08jp6gdb9hb",
    "created": "2023-05-17 18:45:47.239Z",
    "updated": "2023-05-17 18:45:47.239Z",
    "name": "estimates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b12yatnk",
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
        "id": "mltmycaq",
        "name": "theme",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "09nguv1kzhhw15v",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "xm9hgkmu",
        "name": "values",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "wwmvxef0plhgip6",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "g2yxcxw8",
        "name": "delta",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "9bg29v3o",
        "name": "confirmed",
        "type": "bool",
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
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb");

  return dao.deleteCollection(collection);
})
