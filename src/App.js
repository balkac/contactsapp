import "./App.css";
import { useEffect, useState } from "react";
import { getContacts } from "./api/ContactService";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = await getContacts(page, size);
      setData(response.data);
      console.log(response.data);
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

  return <Header toggleModal={toggleModal} numberofContacts={50} />;
}

export default App;
