migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  collection.name = "estimates"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fx1wobjh",
    "name": "results",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ea0f08jp6gdb9hb")

  collection.name = "results"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fx1wobjh",
    "name": "estimates",
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
