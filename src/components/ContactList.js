import React from "react";
import Contact from "./Contact";

const ContactList = (data, currentpage, getAllContacts) => {
  return (
    <main className="main">
      {data?.content?.length === 0 && (
        <div>No Contacts. Please add a new contact</div>
      )}

      <ul className="contact__list">
        {data?.content.length > 0 &&
          data.content.map((contact) => (
            <Contact contact={contact} key={contact.id} />
          ))}
        s
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <a
            onClick={() => getAllContacts(currentpage - 1)}
            className={0 === currentpage ? "disabled" : ""}
          >
            Previous Page
          </a>

          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <a
                onClick={() => getAllContacts(page)}
                className={currentPage === page ? "active" : ""}
                key={page}
              >
                {page + 1}
              </a>
            ))}

          <a
            onClick={() => getAllContacts(currentpage + 1)}
            className={data.totalPages === currentpage + 1 ? "disabled" : ""}
          >
            Next Page
          </a>
        </div>
      )}
    </main>
  );
};

export default ContactList;
