import { dbCollection } from "../../model/db/mongodbClient.js";
import { doesCollectionExistInDb } from "../../model/db/mongodbUtils.js";

/**
 * Classe BaseIndexer de base
 */
export class BaseIndexer {
  /**
   * Constructeur
   * @param {array} collectionName Nom de la collection
   * @param {array} indexesList Liste des indexs à créer
   */
  constructor(collectionName, indexesList) {
    this.indexesList = indexesList;
    this.collectionName = collectionName;
  }

  /**
   * Méthode de création des indexs
   */
  async createIndexs() {
    const isCollectionInDb = await doesCollectionExistInDb(this.collectionName);
    const collection = await dbCollection(this.collectionName);

    if (isCollectionInDb === true) {
      await Promise.all(
        this.indexesList().map(([index, options]) => {
          return collection.createIndex(index, options);
        })
      );
    }
  }

  /**
   * Méthode de destruction des indexs
   */
  async dropIndexs() {
    const isCollectionInDb = await doesCollectionExistInDb(this.collectionName);
    if (isCollectionInDb === true) {
      await dbCollection(this.collectionName).dropIndexes();
    }
  }
}
