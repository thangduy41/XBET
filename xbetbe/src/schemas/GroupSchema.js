import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
});

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
  },
  members: [MemberSchema],
}, {
  timestamps: true,
});

const Group = model('Group', GroupSchema);
export default Group;
