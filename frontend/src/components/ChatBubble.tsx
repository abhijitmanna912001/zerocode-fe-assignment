import { Trash2 } from "lucide-react";

interface ChatBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: string;
  onDelete?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  isUser,
  timestamp,
  onDelete,
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`relative px-4 py-2 rounded-lg max-w-xs ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm flex-1 break-words">{content}</p>

          {isUser && onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-300 cursor-pointer hover:text-red-400 ml-2"
              title="Delete message"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        <div className="text-[10px] text-right opacity-70 mt-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
