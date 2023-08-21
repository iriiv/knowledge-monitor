migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // remove
  collection.schema.removeField("xm9hgkmu")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
