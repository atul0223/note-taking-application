import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import FloatingInput from "../components/FloatingInput";
export default function Dashboard() {
    
    type Note = {
  _id: string;
  title: string;
  content: string;
};

    const[notes, setNotes] = useState<Note[]>([]);
    const[loading, setLoading] = useState<boolean>(false);
    const[newNoteTitle, setNewNoteTitle] = useState<string>("");
    const[newNoteContent, setNewNoteContent] = useState<string>("");
    const [creatingNote, setCreatingNote] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const navigate =useNavigate()
    const fetchNotes = async() => {
         await axios.get(`${BACKEND_URL}/user/getUser`,{ withCredentials: true })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error("Error fetching user:", error);
                navigate("/SignIn");
            });
        await axios.get(`${BACKEND_URL}/user/getNotes`,{ withCredentials: true })
            .then(response => {
               
                setNotes(response.data.notes);

            })
            .catch(error => {
                console.error("Error fetching notes:", error);
                navigate("/SignIn");
            });
    }
    useEffect(() => {
        fetchNotes();
    }, []);
      const handleChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
          setter(value);
      
        };
    const handleSignOut = async() => {
        await axios.post(`${BACKEND_URL}/user/signout`, { withCredentials: true })
            .then(() => {
          
                setUser(null);
                setNotes([]);
                navigate("/SignIn");
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
    }
    const handleDeleteNote = async(id: string) => {
        await axios.delete(`${BACKEND_URL}/user/deleteNote/${id}`, { withCredentials: true })
            .then(() => {
         
                setNotes(notes.filter(note => note._id !== id));
            })
            .catch(error => {
                console.error("Error deleting note:", error);
            });
    }
  return (
    <div className="p-6 w-full min-h-screen select-none sm:w-2/3 md:w-1/2 sm:m-auto sm:border-1 sm:border-gray-200 lg:w-1/3 sm:rounded-xl sm:shadow-xl shadow-black">
      <div className="grid grid-cols-6">
        <img src="/image.png" alt="" className="w-10 h-10 col-span-1" />
        <h1 className="text-2xl flex items-center justify-end col-span-2">Dashboard</h1>
        <h1 className="col-span-3 flex items-center justify-end text-blue-500 underline cursor-pointer" onClick={handleSignOut}>Sign Out</h1>
      </div>
      <div className="mt-10 mb-4 flex justify-between items-center p-4 w-full h-34 shadow-md border-gray-200 rounded-xl border-1">
        <div>
            <h1 className="text-xl font-bold mb-4   ">Welcome, {user?.name}{"!"}</h1>
            <h2 className="">Email: {user?.email}</h2></div>
      </div>
       <div className="rounded-xl overflow-hidden mt-5 mb-7 pt-2">
                {creatingNote && <form className="bg-white p-4 " onSubmit={async(e) => {
                  e.preventDefault();
                  setLoading(true);
                 await axios.post(`${BACKEND_URL}/user/createNote`, {
                      title: newNoteTitle,
                      content: newNoteContent
                  }, { withCredentials: true })
                      .then(response => {
                          setNotes([...notes, response.data.note]);
                          setNewNoteTitle("");
                          setNewNoteContent("");
                      })
                      .catch(error => {
                          console.error("Error creating note:", error);
                      })
                      .finally(() => {
                          setLoading(false);
                          setCreatingNote(false);
                      });
                    
                      
                }}>
                <FloatingInput

                  readOnly={false}
                  key="note"
                  label="title"
                  value={newNoteTitle}
                  onChange={handleChange(setNewNoteTitle)} />
                <FloatingInput
                  readOnly={false}
                  key="noteContent"
                  label="Note Content"
                  value={newNoteContent}
                  onChange={handleChange(setNewNoteContent)} />
                  <button
                type="submit"
                className={`w-full h-12 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition`}
               
              >
                {loading ? "Loading..." : "Create Note"}
              </button>
                </form>
                
                }
                <div className="w-full flex justify-end">
              <button
                type="submit"
                className={`w-full h-12 ${creatingNote ?  "bg-red-500" : "bg-blue-500"} ${creatingNote ? "ml-4 mr-4" : ""} text-white rounded-xl ${creatingNote ? "hover:bg-red-600" : "hover:bg-blue-600"} transition`}
                onClick={() => setCreatingNote(!creatingNote)}
              >
                {creatingNote ? "Cancel" : "Create Note"}
              </button></div>
            </div>
    <div>
        <h1 className="text-xl mb-3  ">Notes</h1>
    {notes?.map(note => (
  <details
    key={note?._id}
    className="cursor-pointer select-none p-4 w-full shadow-md border-gray-200 rounded-xl border-1 mb-2"
  >
    <summary className="flex justify-between items-center h-6">
      <h2>{note?.title}</h2>
      <BsTrash
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // prevent toggle when deleting
          handleDeleteNote(note._id);
        }}
      />
    </summary>

    <div className="mt-2 text-sm text-gray-600">
      {note?.content}
    </div>
  </details>
))}
     
    </div>
    </div>
  )
}
