import { AlertTriangle, Info } from "lucide-react";

export interface DialogConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default" | "info";
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

export const ConfirmDialog = ({
  config,
  onClose,
}: {
  config: DialogConfig | null;
  onClose: () => void;
}) => {
  if (!config) return null;

  const { title, message, confirmText = "OK", cancelText, variant = "default", onConfirm, onCancel } = config;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const confirmCls =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-[#002D62] hover:bg-[#003d7a] text-white";

  const Icon = variant === "info" ? Info : AlertTriangle;
  const iconCls = variant === "danger" ? "text-red-500" : variant === "info" ? "text-blue-500" : "text-amber-500";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cancelText ? handleCancel : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 space-y-4">
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconCls}`} />
          <div>
            {title && <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>}
            <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          {cancelText && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${confirmCls}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
