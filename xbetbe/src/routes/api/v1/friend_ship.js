// Trong tệp routes/friendships.js
import express from 'express';
import {FriendShip, User } from '../../../schemas/index.js';

const router = express.Router();
router.get('/friendships', async (req,res)=> {
  const existingRequest = await FriendShip.findOne({});
  return res.status(200).json({msg: existingRequest})
})
// Gửi lời mời kết bạn
router.post('/friendships/send-request', async (req, res) => {
  try {
    const { userId, friendId } = req.body;  
    const existingRequest = await FriendShip.findOne({ user: friendId, friend: userId });

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const friendship = new FriendShip({ user: friendId, friend: userId });
    await friendship.save();

    res.json({ message: 'Friend request sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Chấp nhận lời mời kết bạn
router.post('/friendships/accept-request', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    console.log(friendId)
    const friendship = await FriendShip.findOneAndUpdate(
      { user: userId, friend: friendId, status: "pending"},
      { $set: { status: 'accepted' } },
      { new: true }
    );
    console.log(friendship)
    

    if (!friendship) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Từ chối lời mời kết bạn
router.post('/friendships/reject-request', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await FriendShip.findOneAndRemove({ user: friendId, friend: userId, status: 'pending' });

    res.json({ message: 'Friend request rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Xoá bạn
router.post('/friendships/remove-friend', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await FriendShip.findOneAndRemove(
      { $or: [{ user: userId, friend: friendId }, { user: friendId, friend: userId }] }
    );

    res.json({ message: 'Friend removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API để lấy danh sách bạn bè của một người dùng
router.get('/friends/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Lấy danh sách bạn bè và trạng thái mối quan hệ
    const friends = await FriendShip.find({
      $or: [{ user: userId, status: 'accepted' }, { friend: userId, status: 'accepted' }],
    });

    // Lấy thông tin người dùng của từng bạn bè
    const friendIds = friends.map((friendship) => friendship.user.toString() !== userId
      ? friendship.user
      : friendship.friend
    );
    
    const friendsInfo = await User.find({ _id: { $in: friendIds } })
      .select('username fullname profilePicture');

    res.json(friendsInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/friendships/hints/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Lấy danh sách bạn bè và trạng thái mối quan hệ của người dùng
    const userFriends = await FriendShip.find({
      $or: [{ user: userId, status: 'accepted' }, { friend: userId, status: 'accepted' }],
    }).select('user friend');

    // Lấy danh sách người dùng không phải là bạn bè và không phải chính người dùng
    const nonFriendsIds = userFriends.map((friendship) => (
      friendship.user.toString() === userId ? friendship.friend : friendship.user
    ));

    const hints = await User.find({
      _id: { $nin: nonFriendsIds, $ne: userId },
    }).select('username');

    res.json(hints);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error 123' });
  }
});

// API để lấy danh sách các lời mời kết bạn của một người dùng
router.get('/friendships/friend-requests/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Lấy danh sách lời mời kết bạn chưa được chấp nhận của người dùng
    const friendRequests = await FriendShip.find({
      user: userId,
      status: 'pending',
    }).populate('friend', 'username');

    res.json(friendRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API để lấy danh sách bạn bè của một người dùng
router.get('/friendships/friends/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Lấy danh sách bạn bè và trạng thái mối quan hệ của người dùng
    const userFriends = await FriendShip.find({
      $or: [{ user: userId, status: 'accepted' }, { friend: userId, status: 'accepted' }],
    }).populate('user friend', 'username');

    const friends = userFriends.map(friendship => {
      const friendUser = friendship.user._id.toString() === userId
        ? friendship.friend
        : friendship.user;
      return { id: friendUser._id, username: friendUser.username };
    });

    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;
