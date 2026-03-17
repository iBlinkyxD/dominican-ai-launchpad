import { X, Mail } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail?: string;
}

const EmailModal = ({ isOpen, onClose, currentEmail = 'alex.assenmachers@gmail.com' }: EmailModalProps) => {
  if (!isOpen) return null;

  const handleSave = () => {
    // Handle email update logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Edit Email Address</h3>
          <button 
            className="text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Current Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                defaultValue={currentEmail}
                disabled
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
              />
            </div>
            {/* <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium text-red-600">Unverified</span>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Send verification email
              </button>
            </div> */}
          </div>

          {/* New Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Enter new email address"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              A verification email will be sent to your new address
            </p>
          </div>

          {/* Password Confirmation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Enter your password to confirm"
            />
            <p className="text-xs text-gray-500 mt-1">
              For security, please confirm your password
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#002D62] text-white rounded-lg hover:bg-[#003d7a] transition font-medium text-sm"
          >
            Update Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailModal