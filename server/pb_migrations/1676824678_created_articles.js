migrate((db) => {
  const collection = new Collection({
    "id": "x87e604fsng8zht",
    "created": "2023-02-19 16:37:58.659Z",
    "updated": "2023-02-19 16:37:58.659Z",
    "name": "articles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "daa9lnh1",
        "name": "content",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x87e604fsng8zht");

  return dao.deleteCollection(collection);
})
