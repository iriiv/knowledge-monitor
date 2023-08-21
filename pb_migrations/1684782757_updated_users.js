migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("h8vnxjer")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eiyo71xt",
    "name": "expert",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "09nguv1kzhhw15v",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h8vnxjer",
    "name": "groups",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "33bevmbq73d3ohm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("eiyo71xt")

  return dao.saveCollection(collection)
})
