import {useState, useRef} from "react";
import type {ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import {User, Camera, Trash2, Pencil} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import {useAuth} from "../../context/AuthContext";
import Layout from "../../components/layout/Layout";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const {isDark} = useTheme();
  const {user, logout} = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email ?? "",
    password: "",
  });
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    setError(null);
    setSuccess(null);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // TODO: PATCH /api/me avec formData
      await new Promise((r) => setTimeout(r, 500));
      setSuccess("Profile updated successfully.");
    } catch {
      setError("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (!confirmed) return;
    try {
      await fetch("/api/delete_account", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email: user?.email, password: formData.password}),
      });
      logout();
      navigate("/");
    } catch {
      setError("Error deleting account.");
    }
  };

  return (
    <Layout>
      <div className={`profile-page ${isDark ? "dark" : "light"}`}>
        <div className={`profile-card ${isDark ? "dark" : "light"}`}>

          {/* Avatar + username */}
          <div className="profile-top">
            <div className="profile-avatar-wrap">
              <div className={`profile-avatar ${isDark ? "dark" : "light"}`}>
                {previewPhoto
                  ? <img src={previewPhoto} alt="avatar" className="profile-avatar-img"/>
                  : <User size={36} strokeWidth={1.5}/>
                }
              </div>
              <button
                className="profile-camera-btn"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
              >
                <Camera size={14}/>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="profile-file-input"
              />
            </div>

            <div className={`profile-username-box ${isDark ? "dark" : "light"}`}>
              <span className="profile-username">{user?.username}</span>
              <Pencil size={14} className="profile-username-icon"/>
            </div>
          </div>

          {/* Form */}
          <form className="profile-form" onSubmit={handleSubmit}>

            {error && <p className="profile-error">{error}</p>}
            {success && <p className="profile-success">{success}</p>}

            {/* Email */}
            <div className={`profile-field ${isDark ? "dark" : "light"}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`profile-input ${isDark ? "dark" : "light"}`}
              />
              <Pencil size={14} className="profile-field-icon"/>
            </div>

            {/* Password */}
            <div className={`profile-field ${isDark ? "dark" : "light"}`}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••••••"
                className={`profile-input ${isDark ? "dark" : "light"}`}
              />
              <Pencil size={14} className="profile-field-icon"/>
            </div>

            <button
              type="submit"
              className="profile-save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* Delete account */}
          <button
            className="profile-delete-btn"
            onClick={handleDeleteAccount}
          >
            <Trash2 size={16}/>
            Delete account
          </button>

        </div>
      </div>
    </Layout>
  );
}