import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, RefreshCw, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { BackgroundGradient } from '../components/ui/background-gradient';

/**
 * Profile page component.
 *
 * Allows the authenticated user to update their personal information, change
 * their avatar, sync collection data from external sources, and permanently
 * delete their account.
 *
 * NOTE: The submit, sync, and delete handlers currently log to the console and
 * show browser `alert`/`confirm` dialogs. These are stubs that should be
 * replaced with real API calls (PATCH /users/me, DELETE /users/me, etc.) once
 * the endpoints are available.
 */
export default function Profile() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();

  // All editable profile fields are kept in a single state object so a single
  // `handleInputChange` handler can update any field by name without writing a
  // dedicated setter per field.
  const [formData, setFormData] = useState({
    password: '',
    email: user?.email || '',
  });

  // `previewPhoto` holds a base64 data URL so the avatar preview updates
  // immediately after the user picks a file, without uploading to the server.
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Generic change handler for all text/email/password inputs.
   * Uses the input's `name` attribute to key into `formData` so one function
   * serves every field in the form.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Reads the selected image file and stores it as a base64 data URL in
   * `previewPhoto` so the avatar preview is instant (no upload round-trip).
   * The actual upload will happen on form submit when the backend endpoint is
   * ready.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Submits updated profile data to the API.
   *
   * Currently a stub — replace `console.log` and `alert` with a real
   * PATCH /users/me request and proper error handling.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Updating profile:', formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Triggers a manual sync of the user's collection data with external APIs.
   *
   * Currently a stub — replace with a POST /sync request.
   */
  const handleSyncData = async () => {
    try {
      console.log('Syncing data...');
      alert('Data synced successfully!');
    } catch (error) {
      console.error('Sync error:', error);
      alert('Error syncing data');
    }
  };

  /**
   * Permanently deletes the user's account after an explicit confirmation.
   *
   * A native `window.confirm` is used as a quick guard. When the real DELETE
   * endpoint is integrated, a custom modal with a typed confirmation (e.g.
   * "type your username to confirm") would be safer for an irreversible action.
   */
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );

    if (confirmDelete) {
      try {
        console.log('Deleting account...');
        alert('Account deleted');
        // Redirect to the landing page so the user is not stuck on a page
        // that requires an authenticated session that no longer exists.
        navigate('/');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting account');
      }
    }
  };

  return (
    <div className={`flex h-full items-center justify-center px-3 py-4 md:py-8 transition-colors duration-500 ${isDark
        ? 'bg-slate-900'
        : 'bg-gradient-to-br from-[#e0f2fe] to-[#ddd6fe] bg-fixed'
      }`}>
      <BackgroundGradient className="rounded-3xl">
        <div className={`card w-full shadow-2xl border-2 rounded-3xl max-h-[70vh] md:max-h-[calc(100vh-200px)] flex flex-col ${
          isDark
            ? 'bg-slate-800 border-gray-700'
            : 'bg-base-100 border-gray-100'
        }`}>
          <div className={`card-body px-3! py-2! md:px-16! md:py-8! rounded-3xl overflow-y-auto ${
            isDark
              ? 'bg-gradient-to-bl from-slate-800 to-slate-900'
              : 'bg-gradient-to-bl from-blue-50 to-white'
          }`}>
            {/*<h2 className="card-title text-2xl justify-center mb-6">Profile</h2>*/}

            <form onSubmit={handleSubmit} className="w-full">
              {/* Two-column layout: username on the left, avatar on the
                  right so the photo stays visually associated with the
                  identity fields it represents. */}
              <div className="flex gap-3 items-start mb-3 md:mb-6">
                {/* Left column - Username (read-only) */}
                <div className="flex-1 space-y-2 md:space-y-4">
                  {/* Username */}
                  <div className="form-control w-full">
                    <label className="label pb-1">
                      <span className={`label-text text-sm ${isDark ? 'text-gray-300' : ''}`}>Username</span>
                    </label>
                    <div className={`input input-bordered input-sm md:input-md w-full flex items-center ${
                      isDark ? 'bg-slate-700 border-gray-600 text-gray-400' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {user?.username}
                    </div>
                  </div>
                </div>

                {/* Right column - Profile photo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="avatar">
                    <div className={`w-20 md:w-24 rounded-full ring ring-primary ring-offset-2 ${
                      isDark ? 'ring-offset-slate-800' : 'ring-offset-base-100'
                    }`}>
                      {previewPhoto ? (
                        <img src={previewPhoto} alt="Profile preview" />
                      ) : (
                        // Fallback gradient avatar shown until the user picks
                        // a photo or the existing avatar is loaded from the API.
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                          <User size={40} />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* The file input is hidden and triggered by clicking the
                      camera icon label, which is standard for custom-styled
                      file pickers. */}
                  <label className="cursor-pointer">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-focus">
                        <Camera size={16} />
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Password */}
              <div className="form-control w-full form-field-spacing">
                <label className="label pb-1">
                  <span className={`label-text text-sm ${isDark ? 'text-gray-300' : ''}`}>Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  className={`input input-bordered input-sm md:input-md w-full ${
                    isDark ? 'bg-slate-700 border-gray-600 text-gray-100' : ''
                  }`}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div className="form-control w-full form-field-spacing">
                <label className="label pb-1">
                  <span className={`label-text text-sm ${isDark ? 'text-gray-300' : ''}`}>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  className={`input input-bordered input-sm md:input-md w-full ${
                    isDark ? 'bg-slate-700 border-gray-600 text-gray-100' : ''
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="btn btn-sm md:btn-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 w-full form-field-spacing"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>

            {/* Sync Data Button — lives outside the form so it does not
                accidentally trigger form submission when clicked. */}
            <button
              onClick={handleSyncData}
              className={`btn btn-sm md:btn-md btn-outline w-full form-field-spacing gap-2 mt-3 md:mt-6 ${
                isDark
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-900/30 hover:border-blue-300'
                  : 'btn-info'
              }`}
            >
              <RefreshCw size={18} />
              Sync Data
            </button>

            {/* Delete Account Button — styled in red to signal a destructive
                action and separated from the save button to reduce accidental
                clicks. */}
            <button
              onClick={handleDeleteAccount}
              className={`btn btn-sm md:btn-md btn-outline w-full form-field-spacing gap-2 ${
                isDark
                  ? 'border-red-400 text-red-400 hover:bg-red-900/30 hover:border-red-300'
                  : 'btn-error'
              }`}
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
