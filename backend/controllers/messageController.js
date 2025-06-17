import { Message } from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Message is Required" });
  }

  try {
    const userMessage = await Message.create({
      sender: "user",
      content,
      user: req.user._id,
    });

    const botMessage = await Message.create({
      sender: "bot",
      content: `Echo: ${content}`,
      user: req.user._id,
    });

    res.status(201).json([userMessage, botMessage]);
  } catch (error) {
    console.error("Error sending message", error.message);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort(
      "createdAt"
    );
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findOne({ _id: id, user: req.user._id });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    const botReply = await Message.findOne({
      user: req.user._id,
      sender: "bot",
      createdAt: { $gt: message.createdAt },
    }).sort({ createdAt: 1 });

    if (botReply) {
      await botReply.deleteOne();
    }

    res
      .status(200)
      .json({ deletedIds: [message._id, botReply?._id].filter(Boolean) });
  } catch (error) {
    console.error("Failed to delete message:", error.message);
    res.status(500).json({ message: "Failed to delete message" });
  }
};
