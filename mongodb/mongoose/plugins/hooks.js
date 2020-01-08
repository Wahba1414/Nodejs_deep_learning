module.exports = function (schema, options) {
  // Add some pre and post hooks for save (document hooks)
  schema.pre('save', function (next) {
    this.createdDate = new Date();

    next();
  });

  schema.post('save', function (doc) {
    console.log(`Post save: doc ID: ${doc._id}`);
  });
}