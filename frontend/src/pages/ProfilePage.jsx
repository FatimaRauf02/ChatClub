import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { MapPinIcon, PencilIcon, CheckIcon, XIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const BRAND = "#B5004A";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [viewPhoto, setViewPhoto] = useState(false);

  const { mutate: changePassword, isPending: changingPassword } = useMutation({
    mutationFn: async (passwordData) => {
      const res = await axiosInstance.put("/auth/change-password", passwordData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed! Please login again.");
      queryClient.clear();
      axiosInstance.post("/auth/logout");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    },
  });

  const { mutate: updateProfile, isPending: updating } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put("/auth/update-profile", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setEditField(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update");
    },
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    changePassword({ newPassword });
  };

  const startEdit = (field, value) => {
    setEditField(field);
    setEditValue(value || "");
  };

  const saveEdit = () => {
    if (!editValue.trim()) {
      toast.error("Field cannot be empty");
      return;
    }
    updateProfile({ [editField]: editValue });
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ profilePic: reader.result });
    };
    reader.readAsDataURL(file);
    setShowPhotoMenu(false);
  };

  const renderField = (label, field, value, isSelect = false, options = []) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold opacity-50 uppercase">{label}</p>
        {editField !== field && (
          <button
            onClick={() => startEdit(field, value)}
            className="p-1 rounded hover:opacity-70 transition"
            style={{ color: BRAND }}
          >
            <PencilIcon className="size-3.5" />
          </button>
        )}
      </div>

      {editField === field ? (
        <div className="flex items-center gap-2">
          {isSelect ? (
            <select
              className="flex-1 px-3 py-1.5 rounded-lg border text-sm outline-none"
              style={{ borderColor: BRAND }}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            >
              <option value="">Select...</option>
              {options.map((opt) => (
                <option key={opt} value={opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="flex-1 px-3 py-1.5 rounded-lg border text-sm outline-none"
              style={{ borderColor: BRAND }}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
          )}
          <button
            onClick={saveEdit}
            disabled={updating}
            className="p-1.5 rounded-lg text-white"
            style={{ backgroundColor: BRAND }}
          >
            {updating ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <CheckIcon className="size-4" />
            )}
          </button>
          <button
            onClick={cancelEdit}
            className="p-1.5 rounded-lg bg-gray-200 text-gray-600"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      ) : (
        <p className="font-medium capitalize">{value || "—"}</p>
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-2xl space-y-6">

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">My Profile</h2>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body p-6 space-y-6">

            {/* AVATAR + NAME */}
            <div className="flex items-center gap-5">

              {/* AVATAR WITH CLICK MENU */}
              <div className="relative">
                <div
                  className="avatar cursor-pointer"
                  onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                >
                  <div
                    className="w-20 rounded-full border-4"
                    style={{ borderColor: BRAND }}
                  >
                    <img src={authUser?.profilePic} alt="Profile" />
                  </div>
                </div>

                {/* CAMERA ICON OVERLAY */}
                <div
                  className="absolute bottom-0 right-0 p-1 rounded-full text-white cursor-pointer"
                  style={{ backgroundColor: BRAND }}
                  onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                >
                  <CameraIcon className="size-3.5" />
                </div>

                {/* PHOTO MENU DROPDOWN */}
                {showPhotoMenu && (
                  <div className="absolute left-0 top-24 bg-white rounded-xl shadow-xl z-50 overflow-hidden w-44 border border-gray-100">
                    <button
                      className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition"
                      onClick={() => {
                        setViewPhoto(true);
                        setShowPhotoMenu(false);
                      }}
                    >
                      👁️ View Photo
                    </button>
                    <div className="border-t border-gray-100" />
                    <label className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition cursor-pointer block">
                      📷 Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold">{authUser?.fullName}</h3>
                <p className="text-sm opacity-60">{authUser?.email}</p>
                {authUser?.location && (
                  <div className="flex items-center gap-1 text-xs opacity-60 mt-1">
                    <MapPinIcon className="size-3" />
                    {authUser.location}
                  </div>
                )}
              </div>
            </div>

            {/* VIEW PHOTO MODAL */}
            {viewPhoto && (
              <div
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                onClick={() => setViewPhoto(false)}
              >
                <div className="relative max-w-sm w-full">
                  <img
                    src={authUser?.profilePic}
                    alt="Profile"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
                    onClick={() => setViewPhoto(false)}
                  >
                    <XIcon className="size-5 text-gray-700" />
                  </button>
                </div>
              </div>
            )}

            <div className="divider my-0" />

            {/* EDITABLE FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {renderField("Full Name", "fullName", authUser?.fullName)}
              {renderField("Email", "email", authUser?.email)}
              {renderField("Location", "location", authUser?.location)}

              <div className="space-y-1">
                <p className="text-xs font-semibold opacity-50 uppercase">Password</p>
                <p className="font-medium">••••••••</p>
              </div>

              {renderField(
                "Native Language",
                "nativeLanguage",
                authUser?.nativeLanguage,
                true,
                LANGUAGES
              )}

              {renderField(
                "Learning Language",
                "learningLanguage",
                authUser?.learningLanguage,
                true,
                LANGUAGES
              )}
            </div>

            {/* BIO */}
            <div className="divider my-0" />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold opacity-50 uppercase">Bio</p>
                {editField !== "bio" && (
                  <button
                    onClick={() => startEdit("bio", authUser?.bio)}
                    className="p-1 rounded hover:opacity-70 transition"
                    style={{ color: BRAND }}
                  >
                    <PencilIcon className="size-3.5" />
                  </button>
                )}
              </div>

              {editField === "bio" ? (
                <div className="space-y-2">
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ borderColor: BRAND }}
                    rows={3}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      disabled={updating}
                      className="btn btn-sm text-white border-none"
                      style={{ backgroundColor: BRAND }}
                    >
                      {updating ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button onClick={cancelEdit} className="btn btn-sm btn-ghost">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm">{authUser?.bio || "—"}</p>
              )}
            </div>

            <div className="divider my-0" />

            {/* CHANGE PASSWORD */}
            <button
              className="btn w-full text-white border-none"
              style={{ backgroundColor: BRAND }}
              onClick={() => setShowPasswordBox(!showPasswordBox)}
            >
              {showPasswordBox ? "Cancel" : "Change Password"}
            </button>

            {showPasswordBox && (
              <form onSubmit={handleChangePassword} className="space-y-3 mt-2">
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ borderColor: "#e5e7eb" }}
                    onFocus={(e) => (e.target.style.borderColor = BRAND)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-white font-semibold text-sm"
                  style={{ backgroundColor: BRAND }}
                  disabled={changingPassword}
                >
                  {changingPassword ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;