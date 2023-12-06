const catchAsync = require("../utils/catchAsync");
const Message = require("../models/messageModel");
const handlerFactory = require ("./handlerFactory")



exports.createMessage = handlerFactory.createOne(Message);
  
  
 exports.getMessages = catchAsync(async (req, res) => {

    const messages = await Message.find({
    conversationId: req.params.id,
      });
      res.status(200).json({
        status: "success",
        data: {
          data: messages,
        },
      });
    
  });
  