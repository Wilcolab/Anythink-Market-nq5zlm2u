//TODO: seeds script should come here, so we'll be able to put some data in our local env
var mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

function makeUser() {
  let user = new User();

  user.username = "user" + String(Math.floor(Math.random() * 1000));
  user.email = "user" + String(Math.floor(Math.random() * 1000)) + "@email.com";
  user.setPassword("password");
  user.bio = "I am a user";
  user.image = "https://picsum.photos/200";

  user.save();

  return user;
}

function makeUsers() {
  for (let i = 0; i < 100; i++) {
    makeUser();
  }
  console.log("done making users");
  return;
}

function getUser() {
  let user = User.findById([Math.floor(Math.random() * 100)]);
  return user;
}

function makeItem() {
  let item = new Item();

  item.title = "this is an item title";
  item.description = "this is an item description";
  item.favorited = Boolean(Math.floor(Math.random() * 2));
  item.favoritesCount = Math.floor(Math.random() * 100);
  item.image = "https://picsum.photos/200";
  item.tagList = [];
  item.slug = "item-slug" + String(Math.floor(Math.random() * 1000));

  item.seller = getUser();

  item.save();

  return item;
}

function makeItems() {
  for (let i = 0; i < 100; i++) {
    makeItem();
  }
  console.log("done making items");
  return;
}

function getItem() {
  let item = User.findById([Math.floor(Math.random() * 100)]);
  return item;
}

function makeComment() {
  let comment = new Comment();
  let item = getItem();

  comment.body = "this is a comment body";
  comment.item = item;
  comment.seller = item.seller;

  comment.save();

  return comment;
}

function makeComments() {
  for (let i = 0; i < 100; i++) {
    makeComment();
  }

  console.log("done making comments");
  return;
}

async function main() {
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);

  makeUsers();
  makeItems();
  makeComments();
}

main()
  .then(() => {
    console.log("Finished DB seeding");
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Error while running DB seed: ${err.message}`);
    process.exit(1);
  });
