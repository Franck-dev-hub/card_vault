import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Camera, RefreshCw, Trash2, ChevronDown } from 'lucide-react';
import { BackgroundGradient } from '../components/ui/background-gradient';

export default function Profile() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    password: '',
    email: '',
    language: '',
    cash: ''
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleSyncData = async () => {
    try {
      console.log('Syncing data...');
      alert('Data synced successfully!');
    } catch (error) {
      console.error('Sync error:', error);
      alert('Error syncing data');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );
    
    if (confirmDelete) {
      try {
        console.log('Deleting account...');
        alert('Account deleted');
        navigate('/');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting account');
      }
    }
  };

  return (
    <div className="flex h-full items-center justify-center px-4 py-4 md:py-8">
      <BackgroundGradient className="rounded-3xl">
        <div className="card w-full bg-base-100 shadow-2xl border-2 border-gray-100 rounded-3xl min-h-[calc(100vh-220px)] md:min-h-0 md:max-h-[calc(100vh-200px)] flex flex-col">
          <div className="card-body px-6! py-4! md:px-16! md:py-8! bg-linear-to-bl from-blue-50 to-white rounded-3xl overflow-y-auto">
            {/*<h2 className="card-title text-2xl justify-center mb-6">Profile</h2>*/}

            <form onSubmit={handleSubmit} className="w-full">
              {/* Layout avec champs à gauche et photo à droite */}
              <div className="flex gap-4 items-start mb-6">
                {/* Colonne gauche - Champs Name et Lastname */}
                <div className="flex-1 space-y-4">
                  {/* Name */}
                  <div className="form-control w-full">
                    <label className="label pb-1">
                      <span className="label-text text-sm">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder=""
                      className="input input-bordered w-full"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Lastname */}
                  <div className="form-control w-full">
                    <label className="label pb-1">
                      <span className="label-text text-sm">Lastname</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder=""
                      className="input input-bordered w-full"
                      value={formData.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Colonne droite - Photo de profil */}
                <div className="flex flex-col items-center gap-2">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {previewPhoto ? (
                        <img src={previewPhoto} alt="Profile preview" />
                      ) : (
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                          <User size={40} />
                        </div>
                      )}
                    </div>
                  </div>
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
                  <span className="label-text text-sm">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Mail */}
              <div className="form-control w-full form-field-spacing">
                <label className="label pb-1">
                  <span className="label-text text-sm">Mail</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Language (Select) */}
              <div className="form-control w-full form-field-spacing">
                <label className="label pb-1">
                  <span className="label-text text-sm">Language (Select)</span>
                </label>
                <div className="relative">
                  <select
                    name="language"
                    className="select select-bordered w-full appearance-none"
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a language</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
              </div>

              {/* Cash (Select) */}
              <div className="form-control w-full form-field-spacing">
                <label className="label pb-1">
                  <span className="label-text text-sm">Cash (Select)</span>
                </label>
                <div className="relative">
                  <select
                    name="cash"
                    className="select select-bordered w-full appearance-none"
                    value={formData.cash}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a currency</option>
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="jpy">JPY (¥)</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
              </div>

              {/* Save Button (optionnel si auto-save) */}
              <button
                type="submit"
                className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 w-full form-field-spacing"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>

            {/* Sync Data Button */}
            <button
              onClick={handleSyncData}
              className="btn btn-outline btn-info w-full form-field-spacing gap-2 mt-6"
            >
              <RefreshCw size={18} />
              Sync Data
            </button>

            {/* Delete Account Button */}
            <button
              onClick={handleDeleteAccount}
              className="btn btn-outline btn-error w-full form-field-spacing gap-2"
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