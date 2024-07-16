import "./App.css";
import { useEffect, useState } from "react";
import { getContacts } from "./api/ContactService";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactList from "./components/ContactList";
function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  const toggleModal = (show) => {
    console.log("Toggle Modal", show);
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
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
