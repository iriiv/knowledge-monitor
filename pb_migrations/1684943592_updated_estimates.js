migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8htfghvl",
    "name": "file",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8htfghvl",
    "name": "project",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
