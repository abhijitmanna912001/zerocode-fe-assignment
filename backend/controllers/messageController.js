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
  try {
    const message = await Message.findById(req.params.id);

    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
