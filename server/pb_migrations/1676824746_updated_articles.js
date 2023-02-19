migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w5nmq5j7",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht")

  // remove
  collection.schema.removeField("w5nmq5j7")

  return dao.saveCollection(collection)
})
