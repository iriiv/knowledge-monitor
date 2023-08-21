migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r34xjb6fvpih0cc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1p9akxuz",
    "name": "criteria",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r34xjb6fvpih0cc")

  // remove
  collection.schema.removeField("1p9akxuz")

  return dao.saveCollection(collection)
})
