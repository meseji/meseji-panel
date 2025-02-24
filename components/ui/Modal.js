import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@/components/Icon";

const Modal = ({ isOpen, title, toggleModal, children, button }) => {
  if (!isOpen) return null;

  return (
    <div className=" fixed z-[80] overflow-x-hidden ">
      <div className="fixed inset-0 z-[80] bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-full h-full max-h-screen lg:min-w-96 lg:max-w-full lg:w-auto lg:h-auto lg:max-h-full flex flex-col overflow-y-hidden bg-white border shadow-sm rounded-xl">
          <div className="flex justify-between items-center py-3 px-4 border-b ">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <button
              onClick={toggleModal}
              type="button"
              className="size-8 inline-flex justify-center items-center rounded-full border border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50"
              // aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <Icon.cancel className="size-5" />
            </button>
          </div>
          <div className="flex flex-col justify-between overflow-y-auto">
            {children} {button}
          </div>
          {/* <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <Button>Hello</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

// ------------------ This is Example of how to use the Modal Component -------------------
// import React, { useState } from "react";
// import Modal from "@/components/ui/Modal";

// export function UsableModal() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const toggleModal = () => setModalOpen(!isModalOpen);

//   return (
//     <>
//       <Button size="md" variant="outline" onClick={toggleModal}>
//         Modal Title
//       </Button>

//       <Modal
//         title="Upload Contact"
//         isOpen={isModalOpen}
//         toggleModal={toggleModal}
//       >
//         <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t mt-2">
//           <Button>Close</Button> <Button>Done</Button>
//         </div>
//       </Modal>
//     </>
//   );
// }
