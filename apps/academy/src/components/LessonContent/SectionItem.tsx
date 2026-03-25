export const SectionItem = ({ section, expanded, onToggle }) => {
  return (
    <div className="border-b">
      <button onClick={onToggle} className="w-full p-4 flex justify-between">
        <span>{section.title}</span>
        {expanded ? "▲" : "▼"}
      </button>

      {expanded &&
        section.lessons.map((lesson) => (
          <div key={lesson.title} className="px-6 py-2 text-sm">
            {lesson.title}
          </div>
        ))}
    </div>
  );
};