import { useRef, useState } from "react";
import { ChevronLeft, Rocket, Upload, X, ImagePlus } from "lucide-react";
import type { CourseForm } from "./types";

interface Props {
  form: CourseForm;
  setForm: (f: CourseForm) => void;
  onFileSelect: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Thumbnail({ form, setForm, onFileSelect, onNext, onBack }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    onFileSelect(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm({ ...form, thumbnailPreview: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function clearThumbnail() {
    setForm({ ...form, thumbnailPreview: "" });
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const courseTitle = form.title || form.description.slice(0, 50) || "Untitled Course";

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-full">
      <div className="w-full max-w-lg space-y-6">

        {/* Heading */}
        <div className="text-center">
          <div className="w-14 h-14 bg-[#0B1E40] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImagePlus className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Course Thumbnail</h2>
          <p className="text-sm text-gray-400 mt-1">
            Upload a cover image for <span className="text-gray-700 font-medium">{courseTitle}</span>
          </p>
        </div>

        {/* Upload area */}
        {form.thumbnailPreview ? (
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={form.thumbnailPreview}
              alt="Thumbnail preview"
              className="w-full aspect-video object-cover"
            />
            <button
              onClick={clearThumbnail}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="text-white text-xs font-medium underline underline-offset-2 hover:no-underline"
              >
                Replace image
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
              dragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <Upload className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP — recommended 1280×720</p>
            </div>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

          <div className="flex items-center gap-3">
            {!form.thumbnailPreview && (
              <button
                onClick={onNext}
                className="text-sm text-gray-400 hover:text-gray-600 transition font-medium"
              >
                Skip for now
              </button>
            )}
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2 bg-[#0B1E40] text-white rounded-lg hover:bg-[#0B1E40]/90 transition font-semibold text-sm shadow-md"
            >
              <Rocket className="h-4 w-4" />
              {form.thumbnailPreview ? "Continue" : "Continue without thumbnail"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
