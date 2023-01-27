//TODO: seeds script should come here, so we'll be able to put some data in our local env
var mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

async function makeUser(i) {
  let user = new User();

  user.username = "user" + String(i);
  user.email = "user" + String(i) + "@email.com";
  user.setPassword("password");
  user.bio = "I am a user";
  user.image = "https://picsum.photos/200";

  await user.save();

  return user;
}

async function makeUsers() {
  for (let i = 0; i < 100; i++) {
    let user = await makeUser(i);
  }
  console.log("done making users");
  return;
}

async function makeItem(user) {
  let item = new Item();

  item.title = "this is an item title";
  item.description = "this is an item description";
  item.favorited = Boolean(Math.floor(Math.random() * 2));
  item.favoritesCount = Math.floor(Math.random() * 100);
  item.image = "https://picsum.photos/200";
  item.tagList = [];
  item.slug = "item-slug" + String(user._id);

  item.seller = user;

  await item.save();

  return item;
}

async function makeItems() {
  const users = await User.find();

  for (let i = 0; i < 100; i++) {
    let item = await makeItem(users[i]);
  }
  console.log("done making items");
  return;
}

async function makeComment(item) {
  let comment = new Comment();

  comment.body = "this is a comment body";
  comment.item = item;
  comment.seller = item.seller;

  await comment.save();

  return comment;
}

async function makeComments() {
  let items = await Item.find();

  for (let i = 0; i < 100; i++) {
    await makeComment(items[i]);
  }

  console.log("done making comments");
  return;
}

async function main() {
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  const conn = mongoose.connection;
  conn.once("open", () => {
    conn.db.dropDatabase();
    console.log("DB dropped");
  });

  await makeUsers();
  await makeItems();
  await makeComments();
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
