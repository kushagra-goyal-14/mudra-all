const { StatusCodes } = require("http-status-codes");
const crudRepo = require("./crud");
const Transaction = require("../models/transaction");
class transactionRepo extends crudRepo {
  constructor() {
    super(Transaction);
  }
  async findByuserId(id) {
    try {
      const res = await Transaction.find({ userId: id });
      return res;
    } catch (error) {
      console.log("something went wrong in the repository leayer " + error);
      throw error;
    }
  }
  async findBycategory({ userId, name }) {
    try {
      const res = await Transaction.find({ category: name, userId });
      return res;
    } catch (error) {
      console.log("something went wrong in the repository leayer " + error);
      throw error;
    }
  }
  async filterBydate({ fyear, fmonth, fdate, tyear, tmonth, tdate, userId }) {
    try {
      const res = await Transaction.find({
        userId,
        createdAt: {
          $gte: new Date(`${fyear}-${fmonth}-${fdate}T00:00:00.000+00:00`),
          $lt: new Date(`${tyear}-${tmonth}-${tdate}T23:59:59.999+00:00`),
        },
      });

      console.log(res);
      return res;
    } catch (error) {
      console.log("something went wrong in the repository leayer " + error);
      throw error;
    }
  }
  async customApi({ fyear, fmonth, fdate }) {
    try {
      const tmonth = fmonth - 3;
      const res = await Transaction.find({
        createdAt: {
          $gte: new Date(`${fyear}-${tmonth}-${fdate}T00:00:00.000+00:00`),
          $lt: new Date(`${fyear}-${fmonth}-${fdate}T23:59:59.999+00:00`),
        },
      });

      console.log(res);
      return res;
    } catch (error) {
      console.log("something went wrong in the repository leayer " + error);
      throw error;
    }
  }
}
module.exports = transactionRepo;
