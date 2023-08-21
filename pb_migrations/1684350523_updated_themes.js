migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("09nguv1kzhhw15v")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twnlqdvh",
    "name": "group",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "33bevmbq73d3ohm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("09nguv1kzhhw15v")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twnlqdvh",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "33bevmbq73d3ohm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
