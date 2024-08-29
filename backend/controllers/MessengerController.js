import {Conversation} from "../models/conversation.js";
import {Message} from "../models/message.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(201).json({
            success: true,
            newMessage
        });
    } catch (error) {
        return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}

export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.find({
            participants: {$all: [senderId, receiverId]}
        });
        if(!conversation) return res.status(200).json({messages: [], success: true});
        return res.status(200).json({
            success: true,
            messages: conversation?.messages
        })

    }catch (error){
        return res.status(401).json({
            error: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
            success: false
        })
    }
}