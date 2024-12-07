```javascript
const pipeline = [
  {
    $lookup: {
      from: "collectionB",
      localField: "_id",
      foreignField: "foreignKey",
      as: "results",
    },
  },
  {
    $unwind: "$results",
  },
  {
    $addFields: {
      safeField: {
        $ifNull: ["$results.someField", null],
      },
    }
  },
  {
    $match: {
      "safeField": {
        $exists: true,
      },
    },
  },
];

const cursor = collectionA.aggregate(pipeline);

cursor.forEach((doc) => {
  // Process documents
  console.log(doc);
});
```