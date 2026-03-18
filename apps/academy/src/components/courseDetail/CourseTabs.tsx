interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CourseTabs = ({ activeTab, setActiveTab }: Props) => {
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "author", label: "Author" },
    { value: "faq", label: "FAQ" },
    { value: "announcements", label: "Announcements" },
    { value: "reviews", label: "Reviews" },
  ];

  return (
    <div className="border-b">
      <div className="flex gap-6 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-3 text-sm font-medium border-b-2 tracking-wide ${
              activeTab === tab.value
                ? "border-blue-950 text-blue-950"
                : "border-transparent text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
