"use client";
import AddContactModal from "@/components/dashboard/contacts/add-contact-modal";
import UploadContactModal from "@/components/dashboard/contacts/upload-contact-modal";
import Title from "@/components/ui/Title";
import { useGetAllContactsQuery } from "@/lib/features/api/contactsApiSlice";
import React, { useCallback, useState, useEffect } from "react";
import { Icon } from "@/components/Icon";
import ExportButton from "@/components/ui/ExportButton";
import FilterButton from "@/components/ui/FilterButton";
import BroadCastContactModal from "@/components/dashboard/contacts/boradcast-contact-modal";
import MainHeader from "@/components/dashboard/shared/MainHeader";
import BroadCast from "@/components/dashboard/contacts/broadcast";
import Link from "next/link";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 100 });
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);

  

  const {
    data: getAllContacts,
    error,
    isLoading,
    refetch,
  } = useGetAllContactsQuery({
    searchTerm: query,
    page: pagination.page,
    limit: pagination.limit,
  });

  // for search functionality
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, setSearchTerm]);

  const handleChangeSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // handle changes for checkbox data
  const handleCheckboxChange = (e, user) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setContacts([...contacts, user]);
    } else {
      setContacts(contacts.filter((contact) => contact._id !== user._id));
    }
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectedAll(isChecked);
    if (isChecked) {
      setContacts(getAllContacts?.data || []);
    } else {
      setContacts([]);
    }
  };

  const isRowSelected = (user) =>
    contacts.some((contact) => contact._id === user._id);

  const options = [
    { label: "Name", value: "name" },
    { label: "Age", value: "age" },
    { label: "Address", value: "address" },
  ];

  const handleFilterChange = (selectedValues) => {
    console.log("Selected Filter Values:", selectedValues);
  };

  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <MainHeader title="Contacts">
        <BroadCastContactModal contacts={contacts} setContacts={setContacts} />
        <BroadCast contacts={contacts} setContacts={setContacts}/>
        <UploadContactModal refetch={refetch} />
        <AddContactModal refetch={refetch} />
      </MainHeader>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 ">
              <div className="flex py-3 px-4 justify-between">
                <div className="relative max-w-xs">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    name="table-search"
                    id="table-search"
                    className="py-2 px-3 ps-9 block w-full text-gray-800 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Search for items"
                    value={searchTerm}
                    onChange={handleChangeSearch}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <Icon.search className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ExportButton />{" "}
                  <FilterButton
                    menuItems={options}
                    placeholder="View"
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <table className="w-full text-left bg-zinc-100 text-gray-500">
                <thead className="text-sm text-gray-700 bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          checked={selectedAll}
                          onChange={handleSelectAllChange}
                          className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-lime-500 dark:focus:ring-lime-600 focus:ring-2"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-2 py-2  ">
                      Name
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Number
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Email
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Company
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Type
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Status
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Source
                    </th>
                    <th scope="col" className="px-2 py-2">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Tags
                    </th>

                    <th scope="col" className="px-2 py-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm ">
                  {getAllContacts?.data?.map((user, index) => (
                    <tr
                      key={index}
                      className={`bg-white border-b hover:bg-lime-50 ${
                        isRowSelected(user) ? "bg-lime-50" : ""
                      }`}
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            value={user._id}
                            checked={isRowSelected(user)}
                            className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 cursor-pointer"
                            onChange={(e) => handleCheckboxChange(e, user)}
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2">{user?.name}</td>
                      <td className="px-2 py-2">{user?.contact}</td>
                      <td className="px-2 py-2">{user?.email}</td>
                      <td className="px-2 py-2">{user?.company}</td>
                      <td className="px-2 py-2">{user?.type}</td>
                      <td className="px-2 py-2">{user?.status}</td>
                      <td className="px-2 py-2">{user?.source}</td>
                      <td className="px-2 py-2">{user?.category}</td>
                      <td className="px-2 py-2">{user?.tags}</td>

                      <td className="flex items-center px-4 py-2">
                        <Link
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
