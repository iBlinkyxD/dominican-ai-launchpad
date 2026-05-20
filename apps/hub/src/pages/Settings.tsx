import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Camera, Edit, Mail, Phone, Save, CreditCard, Loader2 } from "lucide-react";
import { uploadAvatar, updateProfile, getSubscription, cancelSubscription, reactivateSubscription, StripeSubscription } from "@/api/user";
import { useAuth } from "@packages/auth";
import toast, { Toaster } from "react-hot-toast";
import PasswordModal from "@/components/PasswordModal";
import EmailModal from "@/components/EmailModal";

const Settings = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditEmailModal, setShowEditEmailModal] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tabFromUrl = params.get("tab");

  const validTabs = ["profile", "security", "notifications", "billing"];

  if (tabFromUrl && validTabs.includes(tabFromUrl)) {
    setActiveSettingsTab(tabFromUrl);
  } else {
    setActiveSettingsTab("profile");
  }
}, [location.search]);

  const [subscription, setSubscription] = useState<StripeSubscription | null>(null);
  const [subLoading, setSubLoading] = useState(false);
  const [subActing, setSubActing] = useState(false);

  useEffect(() => {
    if (activeSettingsTab !== "billing") return;
    setSubLoading(true);
    getSubscription()
      .then(setSubscription)
      .catch(() => setSubscription(null))
      .finally(() => setSubLoading(false));
  }, [activeSettingsTab]);

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure? Your access will continue until the end of the billing period.")) return;
    setSubActing(true);
    try {
      await cancelSubscription();
      setSubscription(prev => prev ? { ...prev, cancel_at_period_end: true } : prev);
      toast.success("Subscription will be cancelled at the end of the billing period.");
    } catch {
      toast.error("Failed to cancel subscription.");
    } finally {
      setSubActing(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setSubActing(true);
    try {
      await reactivateSubscription();
      setSubscription(prev => prev ? { ...prev, cancel_at_period_end: false } : prev);
      toast.success("Subscription reactivated successfully.");
    } catch {
      toast.error("Failed to reactivate subscription.");
    } finally {
      setSubActing(false);
    }
  };

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file); // store file for later upload
    setAvatarPreview(URL.createObjectURL(file)); // show preview
  };

  const handleAvatarUpload = async () => {
    if (!avatar) {
      toast.error("Please select an image first");
      return;
    }

    try {
      const userId = user?.id;
      if (!userId) return;

      const avatarUrl = await uploadAvatar(userId, avatar);

      setAvatarPreview(avatarUrl);
      setAvatar(null);

      toast.success("Avatar uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload avatar");
    }
  };

  const handleSave = async () => {
    const promise = updateProfile({
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
    });

    toast.promise(promise, {
      loading: "Updating profile...",
      success: "Profile updated successfully",
      error: "Failed to update profile",
    });

    await promise;
  };

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>Please login</p>;

  const firstInitial = user.first_name?.charAt(0).toUpperCase() || "";
  console.log(user);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-semibold mb-2">Settings</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          {/* Settings Sidebar */}
          <div className="hidden lg:block w-56 border-r border-gray-200 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSettingsTab("profile")}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                  activeSettingsTab === "profile"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                My Profile
              </button>
              <button
                onClick={() => setActiveSettingsTab("security")}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                  activeSettingsTab === "security"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveSettingsTab("notifications")}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                  activeSettingsTab === "notifications"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveSettingsTab("billing")}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                  activeSettingsTab === "billing"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Billing
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8">
            {activeSettingsTab === "profile" && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  My Profile
                </h2>

                {/* Profile Picture */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Profile Picture
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                        {avatarPreview || user.profile_picture_url ? (
                          <img
                            src={avatarPreview || user.profile_picture_url}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                            {firstInitial}
                          </div>
                        )}
                      </div>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        id="avatar-upload"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />

                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-[#002D62] rounded-full flex items-center justify-center hover:bg-[#003d7a] transition shadow-lg cursor-pointer"
                      >
                        <Camera className="h-4 w-4 text-white" />
                      </label>
                    </div>
                    <div>
                      <button
                        onClick={handleAvatarUpload}
                        disabled={!avatar}
                        className={`px-4 py-2 rounded-lg text-sm font-medium mb-2 ${
                          avatar
                            ? "bg-blue-700 text-white hover:bg-blue-950"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Upload Photo
                      </button>
                      <p className="text-xs text-gray-500">
                        JPG, PNG or GIF. Max size 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="text"
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-[#002D62] text-white rounded-lg hover:bg-[#003d7a] transition font-semibold text-sm flex items-center gap-2 shadow-md"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {activeSettingsTab === "security" && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  Security
                </h2>

                {/* Email Address */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Email address
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        The email address associated with your account.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-900">
                          {user.email}
                        </span>
                        {/* <span className="text-xs font-medium text-red-600">
                          Unverified
                        </span> */}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowEditEmailModal(true)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border rounded-full px-4 py-2 font-medium"
                    >
                      <span>Edit</span>
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Password
                      </h3>
                      <p className="text-sm text-gray-600">
                        Set a unique password to protect your account.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowChangePasswordModal(true)}
                      className="text-sm text-gray-700 hover:text-gray-900 border rounded-full px-4 py-2 font-medium"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* 2-step verification */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        2-step verification
                      </h3>
                      <p className="text-sm text-gray-600">
                        Make your account extra secure. Along with your
                        password, you'll need to enter a code
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={twoFactorEnabled}
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Deactivate my account */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Deactivate my account
                      </h3>
                      <p className="text-sm text-gray-600">
                        This will shut down your account. Your account will be
                        inactive when you sign in again.
                      </p>
                    </div>
                    <button className="text-sm text-gray-700 hover:text-gray-900 my-auto font-medium">
                      Deactivate
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Delete Account
                      </h3>
                      <p className="text-sm text-gray-600">
                        This will delete your account. Your account will be
                        permanently deleted from Prodeal.
                      </p>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700 my-auto font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSettingsTab === "notifications" && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Notifications
                </h2>
                <p className="text-gray-600">
                  Manage your notification preferences here.
                </p>
              </>
            )}

            {activeSettingsTab === "billing" && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Billing</h2>

                {subLoading ? (
                  <div className="flex items-center gap-3 text-gray-500 py-12">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading subscription...</span>
                  </div>
                ) : !subscription ? (
                  <div className="border border-gray-200 rounded-xl p-8 text-center">
                    <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No active subscription found.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Subscription card */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">1-on-1 Tutoring</h3>
                          <p className="text-sm text-gray-500 mt-0.5">Monthly subscription</p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          subscription.cancel_at_period_end
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}>
                          {subscription.cancel_at_period_end ? "Cancelling" : "Active"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Amount</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {(subscription.amount / 100).toLocaleString("en-US", { style: "currency", currency: subscription.currency.toUpperCase() })}
                            <span className="text-gray-400 font-normal"> / {subscription.interval}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">
                            {subscription.cancel_at_period_end ? "Access until" : "Next billing date"}
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(subscription.current_period_end * 1000).toLocaleDateString("en-US", {
                              year: "numeric", month: "long", day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {subscription.cancel_at_period_end && (
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
                          Your subscription is set to cancel. You'll keep access until the end of the billing period.
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {subscription.cancel_at_period_end ? "Reactivate Subscription" : "Cancel Subscription"}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {subscription.cancel_at_period_end
                          ? "Changed your mind? Reactivate and keep uninterrupted access."
                          : "You can cancel anytime. Access continues until the end of the current billing period."}
                      </p>
                      {subscription.cancel_at_period_end ? (
                        <button
                          onClick={handleReactivateSubscription}
                          disabled={subActing}
                          className="flex items-center gap-2 px-5 py-2 bg-[#002D62] text-white text-sm font-medium rounded-lg hover:bg-[#003d7a] transition disabled:opacity-50"
                        >
                          {subActing && <Loader2 className="w-4 h-4 animate-spin" />}
                          Reactivate Subscription
                        </button>
                      ) : (
                        <button
                          onClick={handleCancelSubscription}
                          disabled={subActing}
                          className="flex items-center gap-2 px-5 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                        >
                          {subActing && <Loader2 className="w-4 h-4 animate-spin" />}
                          Cancel Subscription
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Change Password Modal */}
          <PasswordModal
            isOpen={showChangePasswordModal}
            onClose={() => setShowChangePasswordModal(false)}
          />

          {/* Edit Email Modal */}
          <EmailModal
            isOpen={showEditEmailModal}
            onClose={() => setShowEditEmailModal(false)}
            currentEmail={user.email}
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
