interface CourseOverviewProps {
  description: string | null;
  shortDescription: string | null;
}

export const CourseOverview = ({ description, shortDescription }: CourseOverviewProps) => {
  const hasContent = description || shortDescription;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Course</h3>
        {hasContent ? (
          <>
            {shortDescription && (
              <p className="text-gray-600 mb-3 text-sm">{shortDescription}</p>
            )}
            {description && (
              <p className="text-gray-600 text-sm">{description}</p>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-sm">No description available.</p>
        )}
      </div>
    </div>
  );
};
