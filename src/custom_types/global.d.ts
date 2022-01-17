// declare global {
//   let _mongoClientPromise: string;

import { MongoClient } from "mongodb";

// }
export {};

// declare global {
//   namespace NodeJS {
//     interface Global {
//       _mongoClientPromise: Promise<any>;
//     }
//   }
// }

declare global {
  let _mongoClientPromise: Promise<MongoClient>;
}
