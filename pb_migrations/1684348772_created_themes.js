migrate((db) => {
  const collection = new Collection({
    "id": "09nguv1kzhhw15v",
    "created": "2023-05-17 18:39:32.796Z",
    "updated": "2023-05-17 18:39:32.796Z",
    "name": "themes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "85exfyfo",
        "name": "description",
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
        "id": "9rmoqmk0",
        "name": "title",
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
        "id": "lijxnrb6",
        "name": "icon",
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
        "id": "ycxeamp1",
        "name": "link",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "sbc4dihr",
        "name": "topics",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "r34xjb6fvpih0cc",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
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
  const collection = dao.findCollectionByNameOrId("09nguv1kzhhw15v");

  return dao.deleteCollection(collection);
})
