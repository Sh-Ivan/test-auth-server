const tokenService = require('./service/token-service');

const tokens = tokenService.generateTokens({ a: 'payload' });
console.log(tokens);

const accessToken = tokenService.validateAccessToken(tokens.accessToken);
console.log(accessToken);

const refreshToken = tokenService.validateRefreshToken(tokens.refreshToken);
console.log(refreshToken);

let savedToken = tokenService.saveToken(3, tokens.refreshToken);
console.log(savedToken);
savedToken = tokenService.saveToken(3, tokens.refreshToken);
console.log(savedToken);
