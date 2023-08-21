migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dqn1kjoe",
    "name": "value",
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
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dqn1kjoe",
    "name": "result",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
