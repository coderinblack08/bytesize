migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1elqln22",
    "name": "url",
    "type": "url",
    "required": true,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht")

  // remove
  collection.schema.removeField("1elqln22")

  return dao.saveCollection(collection)
})
