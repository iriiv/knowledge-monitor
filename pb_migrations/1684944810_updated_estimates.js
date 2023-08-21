migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ql759jwh",
    "name": "confirmed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // remove
  collection.schema.removeField("ql759jwh")

  return dao.saveCollection(collection)
})
