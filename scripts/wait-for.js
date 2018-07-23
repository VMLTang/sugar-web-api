const process = require('process');
const sql = require('mssql');

async function waitForMssql() {
  await new Promise((resolve, reject) => {
    let retries = 0;
    const interval = setInterval(async () => {
      try {
        const connection = await sql.connect(process.env.MSSQL_URL);
        clearInterval(interval);
        resolve();
      } catch (error) {
        console.error('MSSQL connection error: ', error);

        if (retries < 10) {
          retries += 1;
        } else {
          clearInterval(interval);
          reject(new Error('Could not connect to MSSQL server.'));
        }
      } finally {
        await sql.close();
      }
    }, 1000);
  });
}

Promise.all([
  waitForMssql()
]).catch(error => {
  process.exit(1);
});
