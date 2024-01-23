const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Order {
  constructor(products, userId) {
    this.products = products;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    db.collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this.userId) },
        { $set: { cart: { items: [] } } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    return db
      .collection("orders")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("orders")
      .find({ userId: new mongodb.ObjectId(userId) })
      .toArray()
      .then((order) => {
        console.log("order", order);
        return order;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Order;
