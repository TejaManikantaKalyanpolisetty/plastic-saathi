// // server/index.js

// require('dotenv').config();
// console.log("DEBUG ENV:", process.env);
// console.log("DEBUG MONGODB_URI:", process.env.MONGODB_URI);

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();

// // No fetch import needed in Node 18+ (Node 20+ includes fetch globally)

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB Atlas using connection string in .env
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log(' Connected to MongoDB'))
// .catch((err) => console.error(' MongoDB connection error:', err));

// // Import models
// const PlasticType = require('./PlasticType.js');
// const SearchLog = require('./SearchLog.js');

// // Test route
// app.get('/', (req, res) => {
//   res.send('Plastic Saathi API running!');
// });

// // GET all plastic types, with optional search and Wikipedia fallback
// app.get('/api/plastic-types', async (req, res) => {
//   try {
//     const search = req.query.search;
//     console.log("Backend received search param:", search);

//     // Log search term (if any)
//     if (search) {
//       SearchLog.create({ term: search }).catch((err) => {
//         console.error("Failed to log search term:", err);
//       });
//     }

//     // Build MongoDB query if searching
//     let query = {};
//     if (search) {
//       const regex = new RegExp(search, 'i');
//       query = {
//         $or: [
//           { name: regex },
//           { code: regex },
//           { description: regex },
//           { examples: regex }
//         ]
//       };
//     }

//     // Search database
//     const types = await PlasticType.find(query);

//     // If found in DB, return
//     if (types.length > 0) {
//       return res.json(types);
//     }

//     // If not found, try Wikipedia
//     if (search) {
//       const wikiTitle = encodeURIComponent(search.trim().replace(/\s+/g, '_'));
//       const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;
//       try {
//         const wikiRes = await fetch(wikiUrl); // Built-in fetch (Node 20+)
//         if (wikiRes.ok) {
//           const wikiData = await wikiRes.json();
//           if (wikiData.extract) {
//             // Wikipedia result found!
//             return res.json([{
//               name: wikiData.title,
//               description: wikiData.extract,
//               wikipediaUrl: wikiData.content_urls?.desktop?.page,
//               image: wikiData.thumbnail?.source,
//               _fromWikipedia: true
//             }]);
//           }
//         }
//       } catch (wikiErr) {
//         console.error("Wikipedia fetch error:", wikiErr);
//       }
//     }

//     // If neither DB nor Wikipedia finds a result
//     res.status(404).json({ error: "No results found in database or Wikipedia." });
//   } catch (err) {
//     console.error("API ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch plastic types" });
//   }
// });

// // POST create a new plastic type
// app.post('/api/plastic-types', async (req, res) => {
//   try {
//     const { name, code, description, examples } = req.body;
//     const type = new PlasticType({ name, code, description, examples });
//     await type.save();
//     res.json(type);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to add plastic type" });
//   }
// });

// // Port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


// server/index.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log('DEBUG MONGODB_URI is set:', Boolean(process.env.MONGODB_URI));

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PlasticType = require('./PlasticType.js');
const SearchLog = require('./SearchLog.js');

const app = express();
app.use(cors());
app.use(express.json());

// --- Mongo connect ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Health
app.get('/', (req, res) => res.send('Plastic Saathi API running!'));

// --- Search plastics (your original logic, with logging) ---
app.get('/api/plastic-types', async (req, res) => {
  try {
    const search = req.query.search;
    console.log("Backend received search param:", search);

    // Log term globally (no user id yet)
    if (search) {
      SearchLog.create({ term: search }).catch((err) =>
        console.error("Failed to log search term:", err)
      );
    }

    // Build query
    let query = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      query = {
        $or: [
          { name: regex },
          { code: regex },
          { description: regex },
          { examples: regex }
        ]
      };
    }

    const types = await PlasticType.find(query);

    if (types.length > 0) return res.json(types);

    // Wikipedia fallback
    if (search) {
      const wikiTitle = encodeURIComponent(search.trim().replace(/\s+/g, '_'));
      const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;
      try {
        const wikiRes = await fetch(wikiUrl);
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract) {
            return res.json([{
              name: wikiData.title,
              description: wikiData.extract,
              wikipediaUrl: wikiData.content_urls?.desktop?.page,
              image: wikiData.thumbnail?.source,
              _fromWikipedia: true
            }]);
          }
        }
      } catch (wikiErr) {
        console.error("Wikipedia fetch error:", wikiErr);
      }
    }

    res.status(404).json({ error: "No results found in database or Wikipedia." });
  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Failed to fetch plastic types" });
  }
});

// --- Create plastic type (unchanged) ---
app.post('/api/plastic-types', async (req, res) => {
  try {
    const { name, code, description, examples } = req.body;
    const type = new PlasticType({ name, code, description, examples });
    await type.save();
    res.json(type);
  } catch (err) {
    res.status(400).json({ error: "Failed to add plastic type" });
  }
});

// --- NEW: Global history (latest N) ---
app.get('/api/search-history', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const logs = await SearchLog.find({})
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    res.json(logs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- NEW: Global popular searches (aggregate) ---
app.get('/api/top-searches', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '10', 10), 100);
    const rows = await SearchLog.aggregate([
      { $group: { _id: '$term', count: { $sum: 1 }, lastAt: { $max: '$timestamp' } } },
      { $sort: { count: -1, lastAt: -1 } },
      { $limit: limit }
    ]);
    res.json(rows.map(r => ({ term: r._id, count: r.count, lastAt: r.lastAt })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Start ---
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
