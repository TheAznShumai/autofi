import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongod = new MongoMemoryServer();

const setupDatabase = async () => {

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);

  const uri = await mongod.getConnectionString();
  mongoose.connect(uri);
  mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running."
    );
    process.exit();
  });

  return mongod;
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
  }
}

export { setupDatabase, closeDatabase, clearDatabase };