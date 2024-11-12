import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
