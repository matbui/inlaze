console.log('JWT_SEED', process.env.JWT_SEED);

export const jwtConstants = {
  secret: process.env.JWT_SEED,
};
