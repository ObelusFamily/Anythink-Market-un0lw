const crypto = require('crypto');
const mongoose = require('mongoose');

const NUMBER_OF_ITEMS = 42;

mongoose.connect(process.env.MONGODB_URI);
require('./models/User');
require('./models/Item');

const User = mongoose.model('User');
const Item = mongoose.model('Item');

async function createUser() {
  const userUniqueId = crypto.randomUUID().split('-')[0];
  const user = new User();
  user.username = `test${userUniqueId}`;
  user.email = `test+${userUniqueId}@test.com`;
  user.setPassword('1234');
  try {
    await user.save();
    console.log(`user ${user.username} created`);
    return user._id;
  } catch (err) {
    console.log(err, "Couldn't create user");
  }
}

function createItem(userId) {
  const itemUniqueId = crypto.randomUUID().split('-')[0];
  const item = new Item();
  item.slug = `itemSlug${itemUniqueId}`;
  item.title = 'just tile';
  item.description = 'some description';
  item.image = 'https://placebear.com/200/200';
  item.tagList = ['bear', 'test'];
  item.seller = userId;
  try {
    item.save();
    console.log(`item ${item.slug} created`);
  } catch (err) {
    console.log(err, "Couldn't create item");
  }
}

async function populate() {
  const userId = await createUser();
  for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
    createItem(userId);
  }
  console.log(`populated database with a user and ${NUMBER_OF_ITEMS} items`);
}

populate();

process.exit();
