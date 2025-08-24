// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const PlasticType = require('./PlasticType');

const types = [
  {
    name: "PET",
    code: "PET",
    description: "Polyethylene Terephthalate",
    examples: "Water bottles, soft drink bottles, food jars"
  },
  {
    name: "HDPE",
    code: "HDPE",
    description: "High-Density Polyethylene",
    examples: "Milk jugs, detergent bottles, pen barrels"
  },
  {
    name: "PVC",
    code: "PVC",
    description: "Polyvinyl Chloride",
    examples: "Pipes, clear food packaging, shrink wrap"
  },
  {
    name: "LDPE",
    code: "LDPE",
    description: "Low-Density Polyethylene",
    examples: "Plastic bags, food wraps, squeezable bottles"
  },
  {
    name: "PP",
    code: "PP",
    description: "Polypropylene",
    examples: "Yogurt cups, bottle caps, straws"
  },
  {
    name: "PS",
    code: "PS",
    description: "Polystyrene",
    examples: "Disposable cutlery, foam cups, food trays"
  },
  {
    name: "OTHER",
    code: "OTHER",
    description: "Other / Mixed Plastics",
    examples: "Baby bottles, sunglasses, CDs, DVDs"
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await PlasticType.deleteMany({}); // optional: clean old data
  await PlasticType.insertMany(types);
  console.log("✅ All plastic types seeded!");
  mongoose.disconnect();
}

seed();
