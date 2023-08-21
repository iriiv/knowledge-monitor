migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9bg29v3o",
    "name": "done",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9bg29v3o",
    "name": "confirmed",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
