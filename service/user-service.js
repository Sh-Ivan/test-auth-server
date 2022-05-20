const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });

    const { id, isActivated } = user;

    const tokens = tokenService.generateTokens({ id, email, isActivated });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const { id, isActivated } = user;
    const tokens = tokenService.generateTokens({ id, email, isActivated });

    await tokenService.saveToken(id, tokens.refreshToken);
    return { ...tokens, user: { id, email, isActivated } };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const { id, email, isActivated } = user;
    const tokens = tokenService.generateTokens({ id, email, isActivated });

    await tokenService.saveToken(id, tokens.refreshToken);
    return { ...tokens, user: { id, email, isActivated } };
  }
}

module.exports = new UserService();
