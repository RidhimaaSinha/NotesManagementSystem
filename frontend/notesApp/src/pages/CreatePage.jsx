import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-400">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="mb-4 btn btn-ghost bg-base-300 rounded-md hover:shadow-md hover:shadow-slate-800">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl border border-base-300/60 rounded-2xl">
            <div className="card-body">
              <h2 className="card-title font-semibold text-2xl mb-4">Create a New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-6">
                  <label className="label mx-3 my-1">
                    <span className="label-text font-bold text-lg text-base-content text-base">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 transition-all m-2 p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label my-1 mx-3">
                    <span className="label-text font-bold text-lg text-base-content text-base">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-64 w-full focus:outline-none focus:border-primary 
                  focus:ring-2 focus:ring-primary/20 transition-all m-2 p-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary px-3" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;