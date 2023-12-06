const Chat = require("../models/chatModel");
const catchAsync = require("../utils/catchAsync");



exports.getChats =  catchAsync (async (req, res) => {

    const chat = await Chat.find({
         members: { $in: [req.params.id] },
      });
      res.status(200).json({
        status: "success",
        data: {
          data: chat,
        },
      });
    
  });