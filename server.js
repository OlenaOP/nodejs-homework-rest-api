const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://olena:1122334455@cluster0.2foazvd.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
