migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht")

  collection.listRule = null

  return dao.saveCollection(collection)
})
