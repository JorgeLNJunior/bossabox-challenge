export const jwtConstants = {
  secret: process.env.APP_SECRET || 'nQHexa5jIb',
};

export const mongoConstants = {
  uri: process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/app',
};
