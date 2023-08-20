import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/reducer";
import Dialog from "./Dialog";

function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector((state: any) => state.contacts.contacts);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    status: "",
    id: "",
  });
  const handleEdit = (value: any, index: number) => {
    const contactWithId = {
      ...value,
      id: index,
    };
    setEditData(contactWithId);
    setOpenModal(true);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };
  return (
    <div className="flex flex-col text-center">
      <button
        type="button"
        className="mx-auto px-4 py-2.5 my-4 bg-blue text-white text-sm rounded md:w-[8rem]"
        onClick={() => {
          setEditData({
            firstName: "",
            lastName: "",
            status: "",
            id: "",
          });
          setOpenModal(true);
        }}
      >
        Create Contact
      </button>
      {openModal && (
        <Dialog
          title="Create Contact Screen"
          data={editData}
          handleYes={() => setOpenModal(false)}
        />
      )}
      <div className="ml-4 md:ml-72  flex flex-wrap pt-4">
        {contacts?.map((c: any, index: number) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 m-2 p-2 md:p-5 font-medium border rounded border-minGrey bg-eventBlue">
            <div>
              <h3 className="text-center">Contact {index + 1}</h3>
              {c.firstName} {c.lastName}
              <div className="flex justify-center md:justify-between mt-2">
                <button
                  className="px-2 py-1.5 m-1 bg-eveGreen text-white text-sm rounded w-full md:w-[8rem] "
                  onClick={() => handleEdit(c, index)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1.5 m-1 bg-red text-white text-sm rounded w-full md:w-[8rem] "
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
