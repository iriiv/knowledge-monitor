migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  collection.name = "estimates2"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  collection.name = "estimates"

  return dao.saveCollection(collection)
})
