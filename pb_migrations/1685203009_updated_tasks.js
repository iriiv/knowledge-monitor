migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2zk5sx0a1re7b99")

  // remove
  collection.schema.removeField("dgorvuk5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8gw1n2vc",
    "name": "grade",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "ztqfjxduw4jeinz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2zk5sx0a1re7b99")

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

  // remove
  collection.schema.removeField("8gw1n2vc")

  return dao.saveCollection(collection)
})
