import { MongoClient } from "mongodb";

export {};

declare global {
  let _mongoClientPromise: Promise<MongoClient>;
}
