migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  collection.name = "values"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wwmvxef0plhgip6")

  collection.name = "results"

  return dao.saveCollection(collection)
})
