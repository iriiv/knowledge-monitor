migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r34xjb6fvpih0cc")

  // remove
  collection.schema.removeField("zeaowbne")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fr4bbl6l",
    "name": "link",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("r34xjb6fvpih0cc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zeaowbne",
    "name": "link",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("fr4bbl6l")

  return dao.saveCollection(collection)
})
