// mongoose is a JavaScript library that provides a schema-based solution to model your application data.
// means mongoose is language to write the schema for the data of mongoDB
// here we write the schema for the user data in which format and what data we want to store in the database as mongoDB  is noSQL database so we need to make its structure schema here only in project and it directly stores in our DB in this formst e assign in schema , we can use atalas also web based mongoDB and we can use compass also for local mongoDB , we are using compass and with that no change in syntax of this schema writing
//  in models we write schemas for the data we want to store in the database and we can use it in our project by importing it in the file where we want to use it
// more files in models folder can be there as if like we are making multi role based project in that case we can make different schemas for different roles like admin, user, etc. and we can use them in our project by importing them in the file where we want to use it
// or like somthing diff anything we need to store in DB for that schema is written in this folder only with different files of schemas for different stuctures according to the need

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
