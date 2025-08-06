import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading: loadingFriends, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="card bg-error/10 border border-error/20 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2 text-error">Failed to load friends</h3>
            <p className="text-base-content opacity-70">
              {error?.message || "Something went wrong while loading your friends list."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h1>
            <p className="text-base-content opacity-70 mt-1">
              Connect and practice languages with your friends
            </p>
          </div>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : !friends || friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Friends</div>
                <div className="stat-value text-primary">{friends.length}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => {
                // Add null check for friend object
                if (!friend || !friend._id) {
                  console.warn("Invalid friend object:", friend);
                  return null;
                }
                return <FriendCard key={friend._id} friend={friend} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;