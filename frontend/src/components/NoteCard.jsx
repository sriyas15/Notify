import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from "react-router-dom"
import { formatDate } from '../lib/utils'
import api from '../lib/api'

const NoteCard = ({ note,setNotes }) => {

    const deleteNotes = async()=>{

    if( !window.confirm("You want to delete the notes?") ) return;

    try {
      
      await api.delete(`/notes/${note._id}`);
      toast.success("Deleted Successfully");
      setNotes((prev)=> prev.filter((other)=> other._id !== note._id))

    } catch (error) {
      console.log("Something error ",error);
      toast.error("Server Error");
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      state={{note}}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#4A00FF]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.updatedAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error" onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                deleteNotes();
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard