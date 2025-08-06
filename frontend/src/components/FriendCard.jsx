import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  // Handle null/undefined friend object
  if (!friend) {
    console.warn("FriendCard received null or undefined friend");
    return null;
  }

  // Provide fallback values for required fields
  const friendName = friend.fullName || "Unknown User";
  const friendId = friend._id;
  const profilePic = friend.profilePic || "https://via.placeholder.com/150x150/4A5568/FFFFFF?text=User";
  const nativeLanguage = friend.nativeLanguage || "Unknown";
  const learningLanguage = friend.learningLanguage || "Unknown";

  // Don't render if we don't have a valid ID
  if (!friendId) {
    console.warn("FriendCard received friend without valid ID:", friend);
    return null;
  }

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img 
              src={profilePic} 
              alt={friendName}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150x150/4A5568/FFFFFF?text=User";
              }}
            />
          </div>
          <h3 className="font-semibold truncate">{friendName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(nativeLanguage)}
            Native: {nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(learningLanguage)}
            Learning: {learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friendId}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
