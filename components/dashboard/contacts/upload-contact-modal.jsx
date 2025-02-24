import React, { useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useAddBulkContactsMutation } from "@/lib/features/api/contactsApiSlice";
import * as XLSX from "xlsx";
import Table from "@/components/ui/Table";
import Loading from "@/app/dashboard/loading";
import { useToast } from "@/components/shared/toast/ToastContext";
import { ApiError } from "next/dist/server/api-utils";

export default function UploadContactModal({ refetch }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [columns, setColumns] = useState([]);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();
  // Function for toggle modal
  const toggleModal = () => setModalOpen(!isModalOpen);

  // api calling from client side rtk query
  const [uploadContacts, { isloading }] = useAddBulkContactsMutation();

  // function for click event
  const handleDownloadSampleExcel = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts/downloadSampleExcel`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel file", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Remove white spaces from the header row
      const headerRow = jsonData.shift().map((item) => item.trim());

      // Map rows to objects
      const excelObjects = jsonData.map((row) =>
        row.reduce((obj, value, columnIndex) => {
          const trimmedValue = typeof value === "string" ? value.trim() : value;
          return {
            ...obj,
            [headerRow[columnIndex]]: trimmedValue,
          };
        }, {})
      );

      setContacts(excelObjects);
      setColumns(headerRow);
    };

    reader.readAsArrayBuffer(file);

    fileInputRef.current.value = "";
  };

  const handleUploadCsv = async () => {
    if (contacts.length === 0) {
      console.error("No contacts to upload.");
      return;
    }
    try {
      const filteredContacts = contacts
        .filter((contact) => contact["Contact"])
        .reduce((acc, contact) => {
          const isDuplicate = acc.some(
            (existingContact) =>
              existingContact["Contact"] === contact["Contact"]
          );
          if (!isDuplicate) {
            acc.push(contact);
          }
          return acc;
        }, []);

      const transformContacts = filteredContacts.map((contact) => {
        return {
          name: contact["Name"],
          email: contact["Email"],
          contact: String(contact["Contact"]),
          company: contact["Company"],
          type: contact["Type"],
          status: contact["Status"],
          source: contact["Source"],
          category: contact["Category"],
          tags: contact["Tags"],
        };
      });

      if (transformContacts.length === 0) {
        console.error("No valid contacts to upload.");
        return;
      }

      const response = await uploadContacts(transformContacts).unwrap();
      if (response.status) {
        setContacts([]);
        setColumns([]);
        setModalOpen(false);
        refetch();
        console.log("Contact Succssfully saved");
      }
    } catch (error) {
      addToast(error.data?.message || "An error occurred", "error");
      console.error("Error uploading Excel file", error);
    }
  };
  return (
    <>
      <Button size="md" variant="outline" onClick={toggleModal}>
        Import Contact
      </Button>

      <Modal
        title="Upload Contact"
        isOpen={isModalOpen}
        toggleModal={toggleModal}
      >
        <div className="p-4 overflow-y-auto max-h-[400px]">
          {" "}
          {/* <div className="flex justify-between py-3 px-4 gap-2">
            <input
              type="file"
              onChange={(e) => handleFileChange(e)}
              accept=".xlsx"
              ref={fileInputRef}
            />
          </div> */}
          {contacts.length === 0 ? (
            <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden items-center">
              <div className="px-4 py-6">
                <div className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    accept=".xlsx"
                    ref={fileInputRef}
                    className="hidden"
                    id="file-input"
                  />

                  <label for="file-input" className="cursor-pointer">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                      Upload file
                    </h5>
                    <p className="font-normal text-sm text-gray-400 md:px-6">
                      Choose file size should be less than{" "}
                      <b className="text-gray-600">500kb</b>
                    </p>
                    <p className="font-normal text-sm text-gray-400 md:px-6">
                      and should be in <b className="text-gray-600">xlsx</b>{" "}
                      format.
                    </p>
                    <span
                      id="filename"
                      className="text-gray-500 bg-gray-200 z-50"
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <Table columns={columns} data={contacts} />
          )}
        </div>

        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t mt-2">
          <p className="text-sm"></p>
          <Button
            icon="download"
            size="md"
            variant="outline"
            className="flex items-center"
            onClick={() => handleDownloadSampleExcel()}
          >
            Sample
          </Button>
          <Button size="md" variant="outline" onClick={() => setContacts([])}>
            {"Clear"}
          </Button>
          <Button
            size="md"
            disabled={isloading}
            onClick={() => handleUploadCsv()}
          >
            {isloading ? <Loading /> : "Upload"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
