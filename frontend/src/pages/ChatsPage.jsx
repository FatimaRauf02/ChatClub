import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends, getStreamToken } from "../lib/api";
import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";
import { StreamChat } from "stream-chat";
import useAuthUser from "../hooks/useAuthUser";

const BRAND = "#B5004A";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatsPage = () => {
  const { authUser } = useAuthUser();
  const [unreadCounts, setUnreadCounts] = useState({});
  const [chatClient, setChatClient] = useState(null);

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser || friends.length === 0) return;

    const initAndFetchUnread = async () => {
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        if (!client.userID) {
          await client.connectUser(
            { id: authUser._id, name: authUser.fullName },
            tokenData.token
          );
        }

        setChatClient(client);

        // Fetch unread counts for each friend
        const counts = {};
        for (const friend of friends) {
          const channelId = [authUser._id, friend._id].sort().join("-");
          const channel = client.channel("messaging", channelId);
          await channel.watch();
          counts[friend._id] = channel.countUnread();
        }
        setUnreadCounts(counts);
      } catch (error) {
        console.error("Error fetching unread counts:", error);
      }
    };

    initAndFetchUnread();
  }, [tokenData, authUser, friends]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-2xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Chats</h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span
              className="loading loading-spinner loading-lg"
              style={{ color: BRAND }}
            />
          </div>
        ) : friends.length === 0 ? (
          <div className="card bg-base-200 p-8 text-center space-y-3">
            <MessageCircleIcon className="size-12 mx-auto opacity-30" />
            <h3 className="font-semibold text-lg">No chats yet</h3>
            <p className="text-sm opacity-60">
              Add friends to start chatting with them
            </p>
            <Link
              to="/"
              className="btn btn-sm text-white border-none mt-2"
              style={{ backgroundColor: BRAND }}
            >
              Find Friends
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {friends.map((friend) => {
              const unread = unreadCounts[friend._id] || 0;

              return (
                <Link
                  key={friend._id}
                  to={`/chat/${friend._id}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-base-200 hover:shadow-md transition-all duration-200"
                >
                  {/* AVATAR */}
                  <div className="relative">
                    <div className="avatar">
                      <div
                        className="w-12 rounded-full border-2"
                        style={{ borderColor: BRAND }}
                      >
                        <img src={friend.profilePic} alt={friend.fullName} />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{friend.fullName}</p>
                    <p className="text-xs opacity-50 capitalize">
                      {friend.nativeLanguage} → {friend.learningLanguage}
                    </p>
                  </div>

                  {/* UNREAD BADGE */}
                  <div className="flex items-center gap-2">
                    {unread > 0 && (
                      <span
                        className="text-white text-xs font-bold rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: BRAND,
                          minWidth: "22px",
                          height: "22px",
                          padding: "0 6px",
                        }}
                      >
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                    <div
                      className="btn btn-sm text-white border-none"
                      style={{ backgroundColor: BRAND }}
                    >
                      <MessageCircleIcon className="size-4" />
                      Chat
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;