migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r34xjb6fvpih0cc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mhfyxhob",
    "name": "weight",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r34xjb6fvpih0cc")

  // remove
  collection.schema.removeField("mhfyxhob")

  return dao.saveCollection(collection)
})
