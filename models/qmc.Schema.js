import { model, Schema } from "mongoose";

const QMC = new Schema(
  {
    about: String,
    address: String,
    age: Number,
    balance: String,
    company: String,
    email: String,
    eyeColor: String,
    favoriteFruit: String,
    friends: {
      id: Number,
      name: String,
    },
    greeting: String,
    guid: String,
    index: Number,
    isActive: Boolean,
    latitude: String,
    longitude: String,
    name: {
      first: String,
      last: String,
    },
    phone: String,
    picture: String,
    range: Number,
    registered: String,
    tags: String,
  },
  { collection: "QueryMongoCompass" }
);
export default model("QMC", QMC);
