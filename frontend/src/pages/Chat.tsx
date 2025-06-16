import { useEffect, useRef } from "react";

const Chat = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const messages = Array(20)
    .fill(0)
    .map((_, i) => ({
      id: i,
      text: `This is message ${i + 1}`,
      sender: i % 2 === 0 ? "bot" : "user",
    }));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Chat with Bot</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs p-3 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
