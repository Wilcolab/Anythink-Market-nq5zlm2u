require("dotenv").config();
const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");

const User = mongoose.model("User");
const Item = mongoose.model("Item");

const connectToDatabase = () => {
  const connection = process.env.MONGODB_URI || "mongodb://localhost:27017/anythink-market";
  mongoose.connect(connection);
  mongoose.set("debug", true);
};

async function main() {
  connectToDatabase();
  const verifiedUser = new User({
    username: 'verifiedUser',
    email: `verifiedUser@gmail.com`,
    isVerified: true
  });
  await verifiedUser.save();

  const notVerifiedUser = new User({
      username: 'notVerifiedUser',
      email: 'notVerifiedUser@gmail.com',
      isVerified: false,
    }
  );
  await notVerifiedUser.save();

  const itemForVerifiedUser = new Item({
    slug: `verified_seller_item`,
    title: `Verified seller item`,
    description: `description for the item`,
    seller: verifiedUser,
  });
  await itemForVerifiedUser.save();

  const itemForNotVerifiedUser = new Item({
    slug: `not_verified_seller_item`,
    title: `Not Verified seller item`,
    description: `description for the item`,
    seller: notVerifiedUser,
  });
  await itemForNotVerifiedUser.save();
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
