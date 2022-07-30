class TestController {
  async test(req, res, next) {
    try {
      const authSuccess = { auth: 'You are logged in' };
      return res.json(authSuccess);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TestController();
