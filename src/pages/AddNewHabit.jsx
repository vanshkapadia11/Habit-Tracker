import React, { useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../utils/firestoreFunctions";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid"; // install this if not yet: npm install uuid

const AddNewHabit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [useTitle, setUseTitle] = useState("");
  const [useDesc, setUseDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colorArray = [
    "bg-red-100",
    "bg-orange-100",
    "bg-amber-100",
    "bg-yellow-100",
    "bg-lime-100",
    "bg-green-100",
    "bg-emerald-100",
    "bg-teal-100",
    "bg-cyan-100",
    "bg-sky-100",
    "bg-blue-100",
    "bg-indigo-100",
    "bg-violet-100",
    "bg-purple-100",
    "bg-fuchsia-100",
    "bg-pink-100",
    "bg-rose-100",
  ];

  const handleSubmit = async () => {
    if (!useTitle.trim() || !useDesc.trim()) {
      alert("Please fill both title and description!");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color for your habit!");
      return;
    }

    const newHabit = {
      id: uuidv4(),
      title: useTitle.trim(),
      description: useDesc.trim(),
      createdAt: Date.now(),
      progress: Array(21).fill(false), // 21-day tracker
      completed: false,
      color: selectedColor, // ✅ Save selected color
    };

    try {
      await addUserData(user.uid, newHabit); // assumes this adds to Firestore
      navigate("/"); // go to dashboard or homepage
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <section className="container">
        <div className="my-16">
          <button
            type="button"
            className="w-1/2 mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-2"
            onClick={() => navigate(-1)}
          >
            back!
            <span className="material-symbols-rounded text-red-400">
              arrow_back
            </span>
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase flex items-center gap-3">
            <span className="material-symbols-rounded text-green-500 text-3xl">
              format_quote
            </span>
            it only takes 21 days for a person to convert a idea into a habit!!!
          </h2>
        </div>

        <div className="mt-16 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold uppercase heading1">
            Add A new habit
          </h2>

          <div className="mt-8 w-full md:w-1/2">
            <label className="text-sm font-semibold uppercase mb-2">
              Title!!
            </label>
            <input
              type="text"
              value={useTitle}
              onChange={(e) => setUseTitle(e.target.value)}
              className="w-full uppercase p-3 mb-6 border rounded-lg outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />

            <label className="text-sm font-semibold uppercase mb-2">
              Desc of habit!!
            </label>
            <textarea
              rows={10}
              value={useDesc}
              onChange={(e) => setUseDesc(e.target.value)}
              className="w-full uppercase p-3 mb-6 border rounded-lg outline-none text-sm font-semibold dark:bg-[#242424] dark:ring-[#2a2a2a] ring-1 ring-[#e8e8e8] ring-inset"
              required
            />
            <h2 className="text-sm font-semibold mb-5 uppercase">
              Select A Color!
            </h2>
            <div className="mb-10 flex flex-wrap gap-3">
              {colorArray.map((color, id) => (
                <div
                  key={id}
                  onClick={() => setSelectedColor(color)}
                  className={`${color} w-9 h-9 rounded-lg cursor-pointer border-2 ${
                    selectedColor === color
                      ? "border-black dark:border-white scale-110"
                      : "border-transparent"
                  } transition-all duration-200`}
                ></div>
              ))}
            </div>

            <button
              type="submit"
              className="md:w-9/12 w-full mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              Start Your New Life Today!!
              <span className="material-symbols-rounded text-emerald-400">
                call_made
              </span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddNewHabit;
