const app = require("./app");
const connectWithDb = require('./config/database')


connectWithDb()

app.listen(process.env.PORT , () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
  });
  