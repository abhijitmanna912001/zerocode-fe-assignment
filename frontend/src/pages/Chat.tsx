import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import { useAuthStore } from "../store/authStore";

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${API}/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { deletedIds } = res.data;

      setMessages((prev) =>
        prev.filter((msg) => !deletedIds.includes(msg._id))
      );
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
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
  );
};

export default Chat;
