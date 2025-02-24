import StatusBadge from "@/components/shared/badge/status-badge";
import { cn } from "@/lib/utils/cn";
import { truncateText } from "@/lib/utils/utils";

export default function TemplateTable({ templates, className }) {
  return (
    <div className={cn({ className }, "w-full mx-auto h-[90vh]")}>
      <div className="flex flex-col">
        <div className=" min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div className="sm:col-span-1">
                <label
                  for="hs-as-table-product-review-search"
                  className="sr-only"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="hs-as-table-product-review-search"
                    name="hs-as-table-product-review-search"
                    className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Search"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                    <svg
                      className="shrink-0 size-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 md:grow">
                <div className="flex justify-end gap-x-2">
                  {/* filter and other button */}
                </div>
              </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-5 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Name
                      </span>
                    </div>
                  </th>

                  <th scope="col" className="px-5 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Id
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Category
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Template
                      </span>
                    </div>
                  </th>

                  <th scope="col" className="px-5 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Language
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Status
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Action
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {templates?.map((template, idx) => {
                  const headerComponent = template?.components?.find(
                    (c) => c.type === "HEADER"
                  );
                  const bodyComponent = template?.components?.find(
                    (c) => c.type === "BODY"
                  );
                  const urlComponent = template?.components?.find(
                    (c) => c.type === "HEADER" && c.format === "IMAGE"
                  );
                  return (
                    <tr key={idx} className="bg-white hover:bg-gray-50">
                      <td className="size-px whitespace-nowrap align-top">
                        <div className="flex items-center gap-x-4 p-2">
                          <span className="block text-sm font-meduim text-gray-800">
                            {truncateText(template?.name, 20)}
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap align-top">
                        <div className="flex items-center gap-x-4 p-2">
                          <span className="block text-sm font-meduim text-gray-800">
                            {template?.id}
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap align-top">
                        <div className="flex items-center gap-x-4 p-2">
                          <span className="block text-sm font-meduim text-gray-800">
                            {template?.category}
                          </span>
                        </div>
                      </td>
                      <td className="h-px w-72 min-w-72 align-top">
                        <div className="p-2">
                          {/* <img
                            className="inline-block size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                            alt="Product Image"
                          /> */}
                          <span className="block text-sm font-semibold text-gray-800">
                            {truncateText(headerComponent?.text, 25)}
                          </span>
                          <span className="block text-sm text-gray-500">
                            {truncateText(
                              bodyComponent?.text || "No Body Content",
                              80
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="size-px whitespace-nowrap align-top">
                        <div className="block p-2">
                          <span className="text-sm text-gray-600">
                            {template?.language}
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap align-top">
                        <div className="block p-2">
                          <StatusBadge status={template?.status} />
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap align-top">
                        <div className="flex items-center gap-x-4">
                          {" "}
                          <div className="block p-2">Edit</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
              <div className="max-w-sm space-y-3">
                <select className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option selected>5</option>
                  <option>6</option>
                </select>
              </div>

              <div>
                <div className="inline-flex gap-x-2">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Prev
                  </button>

                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Next
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
