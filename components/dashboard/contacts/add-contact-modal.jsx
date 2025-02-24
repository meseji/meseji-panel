import React, { useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  useAddBulkContactsMutation,
  useDownloadSampleCsvMutation,
  useGetAllContactsQuery,
} from "@/lib/features/api/contactsApiSlice";
import { Icon } from "@/components/Icon";

export default function AddContactModal({ refetch }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([
    {
      name: "",
      email: "",
      contact: "",
      company: "",
      type: "",
      status: "",
      source: "",
      category: "",
      tags: "",
    },
  ]);

  // Function for toggle modal
  const toggleModal = () => setModalOpen(!isModalOpen);

  // api calling from client side rtk query
  const [uploadContacts, { isloading }] = useAddBulkContactsMutation();

  const handleAddContact = () => {
    setContacts([
      ...contacts,
      { name: "", email: "", contact: "", company: "", type: "" },
    ]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedContacts = [...contacts];
    updatedContacts[index][name] = value;
    setContacts(updatedContacts);
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleSubmit = async () => {
    try {
      for (const contact of contacts) {
        const { name, email, contact: phone } = contact;

        if (!name || !phone) {
          throw new Error("Name and contact number are required.");
        }
        if (phone.length < 10) {
          throw new Error("Contact number must be at least 10 digits long.");
        }
        const response = await uploadContacts(contacts).unwrap();
        if (response.status) {
          setContacts([]);
          setModalOpen(false);
          refetch();
        }
      }
    } catch (error) {
      console.error("Error adding contacts", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <Button size="md" onClick={toggleModal} icon="plus">
        Add Contacts
      </Button>

      <Modal title="Add Contact" isOpen={isModalOpen} toggleModal={toggleModal}>
        <div className="max-h-[400px] overflow-y-auto space-y-4 p-4">
          {contacts.map((contact, index) => (
            <div key={index} className="space-y-2 pb-4 text-black">
              <div className="grid grid-cols-1 gap-2 lg:gap-6 ">
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={contact.name}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Name"
                    className="w-full border p-2 rounded-md "
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Email"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    value={contact.contact}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Contact"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 lg:gap-6">
                <div>
                  <label
                    htmlFor="Company"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={contact.company}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Company"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={contact.type}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Type"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="source"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Source
                  </label>

                  <input
                    type="text"
                    name="source"
                    value={contact.source}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Source"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={contact.category}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Category"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tags"
                    className="block mb-1 text-sm text-gray-700 font-medium"
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={contact.tags}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Tags"
                    className="py-2 px-4 border rounded-lg w-full"
                  />
                </div>

                {/* <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveContact(index)}
                  >
                    <Icon.trash size={18} />
                  </Button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t mt-2">
          {/* <Button size="md" variant="outline" onClick={handleAddContact}>
            Add More Contact
          </Button> */}
          <Button size="md" disabled={isloading} onClick={handleSubmit}>
            {isloading ? "Loading" : "Save Contact"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
