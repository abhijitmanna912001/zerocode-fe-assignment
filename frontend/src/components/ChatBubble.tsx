interface ChatBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  isUser,
  timestamp,
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="text-sm">{content}</p>
        <div className="text-[10px] text-right opacity-70 mt-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
