migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kwu0eis8",
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
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // remove
  collection.schema.removeField("kwu0eis8")

  return dao.saveCollection(collection)
})
