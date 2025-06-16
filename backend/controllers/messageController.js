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
