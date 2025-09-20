import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("nature");
  const [pageNo, setPageNo] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPhotos = async (query, page = 1, showToast = true) => {
    if (!query) {
      toast.error("Please enter a search term!", { className: "text-sm" });
      return;
    }
    try {
      setLoading(true);
      const options = { headers: { Authorization: API_KEY } };

      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options
      );

      // Handle no results
      if (res.data.photos.length === 0) {
        setPhotos([]);
        if (showToast) toast.info("No images found!", { className: "text-sm" });
        return;
      }

      if (page === 1) {
        setPhotos(res.data.photos);
      } else {
        setPhotos((prev) => [...prev, ...res.data.photos]);
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 300);
      }
      if (showToast) toast.success("Photos loaded", { className: "text-sm" });
    } catch (err) {
      toast.error("Please try again!", { className: "text-sm" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos(searchTerm, 1, false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageNo(1);
    getPhotos(searchTerm, 1);
  };

  const handleLoadMore = () => {
    const nextPage = pageNo + 1;
    setPageNo(nextPage);
    getPhotos(searchTerm, nextPage);
  };

  const handleDownload = async (url, photographer) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `photo-${photographer}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Photo downloaded successfully!", { className: "text-sm" });
    } catch (err) {
      toast.error("Failed to download photo.", { className: "text-sm" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-12 items-center text-3xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative">
      <h1 className="text-4xl text-gray-800 py-6 font-extrabold animate__animated animate__fadeInDown">
        📸 Image Gallery
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center w-full">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your idea..."
            required
            className="w-72 bg-white/70 shadow-sm rounded-l-lg text-sm 
                       px-6 py-2 text-gray-700 placeholder-gray-400
                       backdrop-blur-sm border border-gray-200
                       focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <button
            type="submit"
            className="border-0 py-2 px-10 text-sm font-medium text-white 
                       bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300
                       rounded-r-lg hover:scale-105 hover:shadow-md
                       transition-all duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* Gallery */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-10/12">
        {photos.length === 0 && !loading && (
          <p className="text-gray-600 text-lg col-span-full text-center animate__animated animate__fadeIn">
            No images found. Try another search 🔍
          </p>
        )}
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white/60 backdrop-blur-md shadow-md 
                       rounded-2xl border border-gray-200 overflow-hidden 
                       hover:scale-105 transition-transform duration-300 
                       animate__animated animate__zoomIn relative"
          >
            <img
              src={photo.src.medium}
              alt={photo.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-gray-700 text-sm flex justify-between items-center">
              <span>{photo.photographer}</span>
              <i
                className="ri-download-line cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() =>
                  handleDownload(photo.src.original, photo.photographer)
                }
                title="Download Photo"
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Loader inside gallery */}
      {loading && (
        <div className="my-6 flex justify-center w-full">
          <i className="ri-loader-line animate-spin text-3xl text-gray-600"></i>
        </div>
      )}

      {/* Floating Button (disabled if no photos) */}
      {photos.length > 0 && !loading && (
        <button
          onClick={handleLoadMore}
          className="fixed bottom-6 right-6 bg-gradient-to-r 
                     from-indigo-400 via-purple-400 to-pink-400
                     text-white p-4 rounded-full shadow-lg 
                     hover:scale-110 transition-transform duration-200"
        >
          <i className="ri-add-line text-2xl"></i>
        </button>
      )}

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default App;
