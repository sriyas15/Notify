import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addNotesHandler = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    try {

      setLoading(true);

      await api.post(`/notes`, { title, content });

      toast.success("Successfully added a note");
      
      setTitle("");
      setContent("");
      navigate("/");

    } catch (error) {

      console.log("Server error", error);
      toast.error("Something went wrong while adding the note");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-theme=""
      className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8"
    >
      <div className="card bg-base-100 shadow-xl w-full max-w-lg">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center mb-4">
            <Link to="/" className="flex items-center text-secondary">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back</span>
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-primary text-center mb-6">
            🌲 Create a New Note
          </h2>

          {/* Form */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your note title..."
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="textarea textarea-bordered w-full bg-base-200 resize-none"
            />
          </div>

          <button
            onClick={addNotesHandler}
            disabled={loading}
            className={`btn btn-primary w-full mt-6`}
          >
            {loading ? "Saving..." : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
