const requiredEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

export const ENV = {
  get NODE_FE_URL() {
    return requiredEnv(process.env.NODE_FE_URL, "NODE_FE_URL")
  },
  get NODE_BE_URL() {
    return requiredEnv(process.env.NODE_BE_URL, "NODE_BE_URL");
  },
  get NODE_BE_PORT() {
    return requiredEnv(process.env.NODE_BE_PORT, "NODE_BE_PORT");
  },
  get JWT_SECRET() {
    return requiredEnv(process.env.NODE_JWT_SECRET, "NODE_JWT_SECRET")
  },
  get NODE_ENV() {
    return requiredEnv(process.env.NODE_ENV, "NODE_ENV");
  },
  get DATABASE_URL() {
    return requiredEnv(process.env.DATABASE_URL, "DATABASE_URL");
  },
};
