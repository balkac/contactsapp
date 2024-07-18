import "./App.css";
import { useEffect, useState, useRef } from "react";
import { getContacts, saveContact, updatePhoto } from "./api/ContactService";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
  });
  const [file, setFile] = useState(undefined);

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = (await getContacts(page, size)).data;
      setData(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
    } catch (error) {
      console.log(error);
    }
  };
  const updateImage = async (formData) => {
    try {
      const { data } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      clearForm();
      getAllContacts();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  const clearForm = () => {
    setFile(undefined);
    fileRef.current.value = null;
    setValues({
      name: "",
      email: "",
      phone: "",
      address: "",
      title: "",
      status: "",
    });
  };

  //whenever this component is rendered, it will call getAllContacts
  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} numberofContacts={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/contacts"} />} />
            <Route
              path="/contacts"
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  getAllContacts={getAllContacts}
                />
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <ContactDetail
                  data={data}
                  updateContact={updateContact}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i
            onClick={() => {
              toggleModal(false);
              clearForm();
            }}
            className="bi bi-x-lg"
          ></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={values.email}
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={onChange}
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  type="text"
                  value={values.status}
                  onChange={onChange}
                  name="status"
                  required
                />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  ref={fileRef}
                  name="photo"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => {
                  toggleModal(false);
                  clearForm();
                }}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
