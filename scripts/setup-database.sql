-- MongoDB setup script (run in MongoDB shell)
-- This is for reference - MongoDB will create collections automatically

-- Create database
use dashboard-app;

-- Create collections with indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.otps.createIndex({ "email": 1 });
db.otps.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

-- Sample data structure for reference
/*
users collection:
{
  _id: ObjectId,
  email: String,
  verified: Boolean,
  lastLogin: Date,
  createdAt: Date
}

otps collection:
{
  _id: ObjectId,
  email: String,
  otp: String,
  verified: Boolean,
  expiresAt: Date,
  createdAt: Date
}
*/
