export default function StatusBadge({ status, language }) {
  const badgeClasses = {
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    PENDING: "bg-blue-100 text-blue-800",
    DRAFT: "bg-gray-100 text-gray-800",
  };

  const iconPaths = {
    APPROVED: (
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    REJECTED: (
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    ),
    PENDING: (
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    ),
    DRAFT: (
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
        <line x1="12" y1="2" x2="12" y2="12"></line>
      </svg>
    ),
  };

  return (
    <span
      className={`py-1 px-1 lg:px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${badgeClasses[status]}`}
    >
      {iconPaths[status]}
      <span className="text-[10px]">
        <span className="text-[10px]">{language ? language : status}</span>
      </span>
    </span>
  );
}
