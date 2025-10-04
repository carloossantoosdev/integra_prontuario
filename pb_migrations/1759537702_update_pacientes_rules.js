/// <reference path="../pb_data/types.d.ts" />
migrate(
  app => {
    const collection = app.findCollectionByNameOrId('pbc_4080049865');

    // Liberando todas as operações (desenvolvimento)
    collection.listRule = '';
    collection.viewRule = '';
    collection.createRule = '';
    collection.updateRule = '';
    collection.deleteRule = '';

    return app.save(collection);
  },
  app => {
    const collection = app.findCollectionByNameOrId('pbc_4080049865');

    // Revertendo para as regras originais
    collection.listRule = null;
    collection.viewRule = null;
    collection.createRule = null;
    collection.updateRule = null;
    collection.deleteRule = null;

    return app.save(collection);
  }
);
