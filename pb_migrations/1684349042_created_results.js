migrate((db) => {
  const collection = new Collection({
    "id": "wwmvxef0plhgip6",
    "created": "2023-05-17 18:44:02.861Z",
    "updated": "2023-05-17 18:44:02.861Z",
    "name": "results",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rmrsitww",
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
        "id": "i2bsm4yl",
        "name": "topic",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "r34xjb6fvpih0cc",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "dqn1kjoe",
        "name": "result",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6");

  return dao.deleteCollection(collection);
})
