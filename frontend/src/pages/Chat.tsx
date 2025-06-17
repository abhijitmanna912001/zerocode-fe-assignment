import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";

interface Message {
  _id: string;
  content: string;
  sender: string;
  createdAt: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token, user } = useAuthStore();

  const API = import.meta.env.VITE_API_URL;

  // 🧠 Prompt templates
  const templates = [
    "Hello! How can I help you?",
    "Tell me a joke.",
    "Translate 'Good morning' to Spanish.",
    "What's the weather today?",
  ];

  // ✅ Fetch messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const normalizedMessages = res.data
          .filter((msg: any) => msg.content && msg.createdAt)
          .map((msg: any) => ({
            _id: msg._id,
            content: msg.content,
            sender: msg.sender,
            createdAt: msg.createdAt,
          }));

        setMessages(normalizedMessages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    if (token) fetchMessages();
  }, [API, token]);

  // ✅ Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        `${API}/messages`,
        { content: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newMessages = res.data.map((msg: any) => ({
        _id: msg._id,
        content: msg.content,
        sender: msg.sender,
        createdAt: msg.createdAt,
      }));

      setMessages((prev) => [...prev, ...newMessages]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // ✅ Delete message
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message and the corresponding bot reply?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await axios.get(`${API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const normalizedMessages = res.data
        .filter((msg: any) => msg.content && msg.createdAt)
        .map((msg: any) => ({
          _id: msg._id,
          content: msg.content,
          sender: msg.sender,
          createdAt: msg.createdAt,
        }));

      setMessages(normalizedMessages);
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Failed to delete. Try again.");
    }
  };

  // ✅ Export chat as .txt
  const handleExport = () => {
    if (messages.length === 0) return alert("No messages to export.");

    const chatText = messages
      .map((msg) => {
        const sender =
          msg.sender === user?._id || msg.sender === "user" ? "You" : "Bot";
        const time = new Date(msg.createdAt).toLocaleString();
        return `[${time}] ${sender}: ${msg.content}`;
      })
      .join("\n\n");

    const blob = new Blob([chatText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "chat-export.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  // ✅ Auto scroll to bottom on message change
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <Layout>
      <div className="flex flex-col h-screen p-4">
        {/* ✅ Export Chat Button */}
        <button
          onClick={handleExport}
          className="self-end mb-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export Chat
        </button>

        {/* ✅ Prompt Templates */}
        <div className="flex flex-wrap gap-2 mb-3">
          {templates.map((text, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInput(text)}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {text}
            </button>
          ))}
        </div>

        {/* ✅ Messages Display */}
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg._id}
              content={msg.content}
              isUser={msg.sender === user?._id || msg.sender === "user"}
              timestamp={msg.createdAt}
              onDelete={() => handleDelete(msg._id)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* ✅ Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Chat;
