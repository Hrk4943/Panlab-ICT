import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try{
            const  collection=firestore.collection("users")
            const response=await collection.get()
            const userData=response.docs.map((docs)=>docs.data())
            setUsers(userData)
        }
    catch (error) {
        console.error("Error fetching and storing data:", error);
      }
    };
    fetchData();
  }, []);


const handleEditStatus = (userId, currentStatus) => {
    setEditUserId(userId);
    setEditStatus(currentStatus);
  };

const handleSaveStatus = async(userId) => {
    const collection = firestore.collection("users");
    await collection.doc(userId.toString()).update({ status: editStatus });
    const data=await collection.get()
    const updatedData=data.docs.map((doc)=> doc.data())
    setUsers(updatedData)
    setEditUserId(null);
  };


  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>
                  {editUserId === user.id ? (
                    <>
                      <input
                        type="text"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      />
                      <button onClick={() => handleSaveStatus(user.id)}>
                        Save
                      </button>
                    </>
                  ) : (
                    null
                  )}
                  {editUserId === user.id ? null : (
                    <button onClick={() => handleEditStatus(user.id, user.status)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserDetails;
