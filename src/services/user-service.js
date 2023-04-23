const { userRepo } = require("../repository/index");
class userService {
  constructor() {
    this.userRepo = new userRepo();
  }
  signup = async (data) => {
    try {
      const user = await this.userRepo.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  };

  signin = async (data) => {
    try {
      const user = await this.userRepo.getUserByEmail(data.email);
      if (!user) {
        throw new Error(
          //   {
          //     message: "Invalid data sent from the client",
          //     explanation: "No registered user found for the given email",
          //   },
          StatusCodes.NOT_FOUND
        );
      }
      const passwordMatch = user.comparePass(data.password);
      if (!passwordMatch) {
        throw new Error(
          //   {
          //     message: "Invalid data sent from the client",
          //     explanation: "Password given is not correct, please try again!",
          //   },
          "new error"
        );
      }
      const jwtToken = user.createToken();
      return {
        token: jwtToken,
        username: user.username,
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userService;
