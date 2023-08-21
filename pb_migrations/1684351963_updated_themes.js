migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("09nguv1kzhhw15v")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ascrtfk",
    "name": "done",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("09nguv1kzhhw15v")

  // remove
  collection.schema.removeField("3ascrtfk")

  return dao.saveCollection(collection)
})
