import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const BRAND = "#B5004A";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>

          <h3 className="font-semibold truncate">
            {friend.fullName}
          </h3>
        </div>

        {/* LANGUAGE BADGES */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* NATIVE */}
          <span
            className="badge text-white text-xs border-0"
            style={{ backgroundColor: BRAND }}
          >
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>

          {/* LEARNING */}
          <span
            className="badge text-xs"
            style={{
              backgroundColor: `${BRAND}15`,
              color: BRAND,
              border: `1px solid ${BRAND}40`,
            }}
          >
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* MESSAGE BUTTON */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn w-full text-white border-0"
          style={{ backgroundColor: BRAND }}
        >
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