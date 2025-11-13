import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Trash2Icon } from "lucide-react";
import api from "../lib/api";

const NotePage = () => {
  const location = useLocation();
  const { note } = location.state || {};

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  const deleteNotes = async () => {
    if (!window.confirm("You want to delete the note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log("Something error ", error);
      toast.error("Server Error");
    }
  };

  const updateHandler = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      await api.put(`/notes/${note._id}`, { title, content });
      toast.success("Note Updated Successfully 🌱");
      navigate("/");
    } catch (error) {
      console.error("Error in Updating", error);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div
      data-theme="forest"
      className="min-h-screen flex items-center justify-center bg-base-200 p-6"
    >
      <div className="relative bg-base-100 w-full max-w-md rounded-2xl shadow-2xl border border-base-300 p-8">
        <Link to={"/"} className="absolute top-3 left-5">
          <ArrowLeft className="text-base-content w-5 h-5 mr-2" />
        </Link>

        <button
          onClick={deleteNotes}
          className="absolute top-2 right-5 btn btn-error btn-outline"
        >
          <Trash2Icon className="h-5 w-5" />
          Delete Note
        </button>

        <h1 className="text-2xl font-bold text-center text-primary mt-10 mb-6">
          Edit Note
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-base-content mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-base-content mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="textarea textarea-bordered w-full bg-base-100"
            />
          </div>

          <button
            onClick={updateHandler}
            className="btn btn-primary w-full shadow-md hover:scale-[1.02] transition-transform"
          >
            Update Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
