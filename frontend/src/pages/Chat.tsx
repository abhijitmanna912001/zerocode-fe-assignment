import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import ChatBubble from "../components/ChatBubble";

interface Message {
  _id: string;
  text: string;
  sender: string;
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

        const normalizedMessages = res.data.map((msg: any) => ({
          _id: msg._id,
          text: msg.content,
          sender: msg.sender,
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
        text: msg.content,
        sender: msg.sender,
      }));

      setMessages((prev) => [...prev, ...newMessages]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg._id}
            text={msg.text}
            isUser={msg.sender === user?._id}
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
