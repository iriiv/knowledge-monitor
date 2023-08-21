migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2zk5sx0a1re7b99")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gkycdwih",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dgorvuk5",
    "name": "grade",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "junior",
        "middle",
        "senior"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhwygtgg",
    "name": "text",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2zk5sx0a1re7b99")

  // remove
  collection.schema.removeField("gkycdwih")

  // remove
  collection.schema.removeField("dgorvuk5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhwygtgg",
    "name": "field",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
