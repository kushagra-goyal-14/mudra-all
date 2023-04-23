const { StatusCodes } = require("http-status-codes");
const { transactionService } = require("../services/index");

class transactionController {
  constructor() {
    this.transactionservice = new transactionService();
  }
  create = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.transactionservice.createTransaction({
        title: payload.title,
        amount: payload.amount,
        type: payload.type,
        category: payload.category,
        userId: req.user,
      });
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created a new Transaction",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };
  findbycategory = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.transactionservice.findbycategory({
        name: payload.category,
        userId: req.user,
      });
      return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Successfully recieved new Transaction",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };
  filterBydate = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.transactionservice.filterbyDateTransaction({
        fyear: payload.fyear,
        fmonth: payload.fmonth,
        fdate: payload.fdate,
        tyear: payload.tyear,
        tmonth: payload.tmonth,
        tdate: payload.tdate,
        userId: req.user,
      });
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully filtered with date",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };
  get = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.transactionservice.getTransaction({
        id: req.user,
      });
      return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Successfully recieved a new Transaction",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };

  getAll = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.transactionservice.getallTransaction({
        id: req.user,
      });
      return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Successfully recieved a all the Transactions",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };
  custom = async (req, res) => {
    try {
      const payload = req.body;
      const response = await this.transactionservice.customCall({
        // title: payload.title,
        // amount: payload.amount,
        // type: payload.type,
        // category: payload.category,
        userId: req.user,
      });
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully recieved a new Prediction",
        data: response,
        err: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
        data: {},
        err: error,
      });
    }
  };
}

module.exports = new transactionController();
