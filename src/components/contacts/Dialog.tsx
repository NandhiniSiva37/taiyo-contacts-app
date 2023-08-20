import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveContact, editContact } from "../../redux/reducer";

function Dialog(props: any) {
  const dispatch = useDispatch();
  const [contactData, setContactData] = useState({
    firstName: props.data.firstName,
    lastName: props.data.lastName,
    status: props.data.status,
  });

  const handleSaveContact = () => {
    if (props.data.id !== "") {
      dispatch(editContact({ index: props.data.id, contactData }));
    } else {
      dispatch(saveContact(contactData));
    }

    props.handleYes();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStatus = event.target.value;
    setContactData((prevData) => ({
      ...prevData,
      status: selectedStatus,
    }));
  };

  return (
    <form>
      <div
        className="relative z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="backdrop-brightness-50 backdrop-blur-sm fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity">
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative bg-white border-2 border-mainGrey text-left overflow-hidden shadow-xl transform transition-all w-[550px] sm:min-w-fit">
                <div className="bg-white">
                  <div className="sm:items-start">
                    <div className="flex items-center justify-center h-16 p-4 pt-4 bg-mainGrey">
                      <span className="font-normal text-xl text-heading1 text-center">
                        {props.title}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 space-y-4">
                      <div className="flex justify-between w-80">
                        <label>First Name :</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          onChange={(e) =>
                            setContactData((prevData) => ({
                              ...prevData,
                              firstName: e.target.value,
                            }))
                          }
                          value={contactData.firstName}
                        />
                      </div>
                      <div className="flex justify-between w-80">
                        <label>Last Name :</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          onChange={(e) =>
                            setContactData((prevData) => ({
                              ...prevData,
                              lastName: e.target.value,
                            }))
                          }
                          value={contactData.lastName}
                        />
                      </div>
                      <div className="flex justify-between w-80">
                        <label>Status :</label>
                        <div className="flex items-center space-x-4 mr-14">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="status"
                              value="active"
                              className="text-blue-500"
                              onChange={handleStatusChange}
                              checked={contactData.status === "active"}
                            />
                            <span className="text-gray-700">Active</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="status"
                              value="inactive"
                              className="text-blue-500"
                              onChange={handleStatusChange}
                              checked={contactData.status === "inactive"}
                            />
                            <span className="text-gray-700">Inactive</span>
                          </label>
                        </div>
                      </div>
                      <button
                        className="px-2 py-1.5 mt-4 bg-blue text-white text-sm rounded w-[8rem] "
                        onClick={() => handleSaveContact()}
                      >
                        {props.data.id !== ""
                          ? "Save Contact"
                          : "Save Editted Contact"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Dialog;
