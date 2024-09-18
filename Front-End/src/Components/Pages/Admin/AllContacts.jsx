import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap"; // Import the Spinner component
import API_BASE_URL from "../../context/API_BASE_URL";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/contact`);
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Fetch contacts error:", error);
        setError("Failed to fetch contacts. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Delete contact error:", error);
      setError("Failed to delete contact. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Queries</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id}> {/* Assuming each contact has a unique _id */}
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No contacts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContacts;
