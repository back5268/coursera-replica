import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDatabse = () => {
  const user = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const database = process.env.MONGO_DATABASE;
  const post = process.env.MONGO_PORT;
  const host = process.env.MONGO_HOST;

  const account = user ? `${user}:${password}@` : "";
  const url = `mongodb://${account}${host}:${post}/${database}`;
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB connect successful!"));
  } catch (error) {
    console.log(error);
  }
};
