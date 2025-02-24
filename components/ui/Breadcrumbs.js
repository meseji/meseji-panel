"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon";

const formatSegment = (segment) => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Breadcrumb({ customName }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center whitespace-nowrap">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const route = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const label =
            isLast && customName ? customName : formatSegment(segment);

          return (
            <li key={route} className="inline-flex items-center">
              {!isLast ? (
                <Link
                  href={route}
                  className="flex items-center text-sm text-gray-500 hover:text-blue-600"
                >
                  {label}
                  <Icon.right className="size-4 mx-1" />
                </Link>
              ) : (
                <span className="inline-flex items-center text-sm font-semibold text-gray-800 truncate">
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
