import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import { Trash2Icon } from "lucide-react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const BRAND = "#B5004A";

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  const handleClearMessages = async () => {
    if (!channel) return;
    try {
      setClearing(true);
      await channel.truncate();
      toast.success("Chat cleared successfully!");
      setShowClearConfirm(false);
    } catch (error) {
      console.error("Error clearing chat:", error);
      toast.error("Could not clear chat. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh] flex flex-col">

      {/* CLEAR CHAT BUTTON BAR */}
      <div
        className="flex items-center justify-end px-4 py-2 border-b"
        style={{ backgroundColor: "#fff", borderColor: "#f8bbd0" }}
      >
        <button
          className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition hover:opacity-80"
          style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
          onClick={() => setShowClearConfirm(true)}
        >
          <Trash2Icon className="size-4" />
          Clear Chat
        </button>
      </div>

      {/* CONFIRM MODAL */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Clear All Messages?</h3>
            <p className="text-sm text-gray-500">
              This will permanently delete all messages in this chat. This cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                className="flex-1 py-2 rounded-lg border text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 rounded-lg text-white text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: BRAND }}
                onClick={handleClearMessages}
                disabled={clearing}
              >
                {clearing ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "Clear Chat"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT */}
      <div className="flex-1 overflow-hidden">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className="w-full relative h-full">
              <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList
                  messageActions={["edit", "delete", "react", "reply"]}
                />
                <MessageInput focus />
              </Window>
            </div>
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;