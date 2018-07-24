import { env } from 'process';

export function isProduction() {
  return (env.NODE_ENV || '').toLowerCase() === 'production';
}

export const environment = {
  port: isProduction() ? parseInt(env.PORT, 10) : 3000,
  production: isProduction(),
  mssql_url: isProduction() ? env.MSSQL_URL || env.SQLAZURECONNSTR_MSSQL_URL : 'mssql://vmltang_sugar:P@ssw0rd!!@localhost:1433/vmltang_sugar'
};
