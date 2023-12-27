import express from 'express';
import {User, Group} from '../../../schemas/index.js';

const router = express.Router();

// Tạo nhóm mới
router.post('/groups', async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const group = new Group({ name, description, members });
    await group.save();
    return res.json({...group._doc, ok: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Thêm thành viên vào nhóm
router.post('/groups/:groupId/members', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { memberId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const user = await User.findById(memberId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    group.members.push({user: user._id, isOwner: false});
    await group.save();

    return res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Tham gia nhóm
router.post('/groups/:groupId/join', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!group.members.includes(user._id)) {
      group.members.push(user._id);
      await group.save();
    }

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rời nhóm
router.post('/groups/:groupId/leave', async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(group.members)
    group.members = group.members.filter(memberId => memberId.user.toString() !== user._id.toString());
    await group.save();

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API để xem danh sách nhóm của một người dùng
router.get('/users/:userId/groups', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const groups = await Group.find({ 'members.user': userId });
      res.json({data: groups, ok: true});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API để lấy chi tiết thông tin của một nhóm
router.get('/groups/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API để lấy danh sách thành viên của một nhóm
router.get('/groups/:groupId/members', async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate('members.user', 'username'); // Sử dụng populate để lấy thông tin user
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const members = group.members.map((member) => {
      return {
        userId: member.user._id,
        username: member.user.username, // Thêm thông tin username vào danh sách thành viên
        isOwner: member.isOwner,
      };
    });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/groups/:groupId/non-members', async (req, res) => {
  try {
    const { groupId } = req.params;

    // Lấy danh sách thành viên của nhóm
    const group = await Group.findById(groupId).select('members.user');

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Lấy danh sách người dùng chưa tham gia vào nhóm
    const existingMembers = group.members.map((member) => member.user);
    const nonMembers = await User.find({ _id: { $nin: existingMembers } }).select('username');

    res.json(nonMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API để tìm kiếm các nhóm theo tên
router.get('/groups/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Sử dụng regex để tìm kiếm theo tên, không phân biệt chữ hoa/chữ thường
    const regex = new RegExp(query, 'i');

    const groups = await Group.find({ name: regex });

    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
