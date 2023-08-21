migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pro0zoau",
    "name": "verified",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  // remove
  collection.schema.removeField("pro0zoau")

  return dao.saveCollection(collection)
})
