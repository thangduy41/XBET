// Trong tệp models/Friendship.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FriendshipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const Friendship = model('Friendship', FriendshipSchema);
export default Friendship;
