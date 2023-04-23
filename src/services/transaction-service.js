const { transactionRepo, userRepo } = require("../repository/index");
class transactionService {
  constructor() {
    this.transactionRepo = new transactionRepo();
    this.userRepo = new userRepo();
  }

  async createTransaction(data) {
    try {
      const ans = await this.transactionRepo.create(data);
      return ans;
    } catch (error) {
      console.log("soemthing went wrong at service layer");
      throw error;
    }
  }
  async filterbyDateTransaction(data) {
    try {
      const ans = await this.transactionRepo.filterBydate(data);
      return ans;
    } catch (error) {
      console.log("soemthing went wrong at service layer");
      throw error;
    }
  }
  async findbycategory(data) {
    try {
      const ans = await this.transactionRepo.findBycategory(data);
      return ans;
    } catch (error) {
      console.log("soemthing went wrong at service layer");
      throw error;
    }
  }
  async getTransaction({ id }) {
    try {
      const ans = await this.transactionRepo.get(id);
      return ans;
    } catch (error) {
      console.log("soemthing went wrong at service layer");
      throw error;
    }
  }
  async getallTransaction(data) {
    try {
      const ans = await this.transactionRepo.findByuserId(data.id);
      return ans;
    } catch (error) {
      console.log("soemthing went wrong at service layer");
      throw error;
    }
  }

  async customCall({ userId }) {
    try {
      let ans = await fetch("https://flask-app-kw4t.onrender.com/predict", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(ans);
      ans = await ans.json();
      console.log(ans);
      const res = await this.userRepo.get(userId);
      res.prev_predction = ans;
      await res.save();
      console.log(res);
      return res;
    } catch (error) {
      console.log("soemthing went wrong at service layer");
      throw error;
    }
  }
}
module.exports = transactionService;
