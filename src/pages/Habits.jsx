import React, { useEffect, useState } from "react";
import { getUserDataByUid } from "../utils/firestoreFunctions";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Habits = () => {
  const { user } = useAuth();
  const [habit, setHabit] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getHabits = async () => {
      try {
        const newHabit = await getUserDataByUid(user.uid);
        setHabit(newHabit.habits);
      } catch (error) {
        console.log("Failed To Get The Data From The Database!!");
      }
    };
    getHabits();
  }, [user]);
  return (
    <>
      <h2 className="text-2xl font-semibold uppercase heading2 mb-8">
        your habits{" "}
      </h2>
      <div className="grid grid-cols-1 gap-10">
        {habit.map((habits) => (
          <div
            className={`${habits.color} w-full ring-1 ring-inset ring-[#e8e8e8] shadow-lg backdrop-blur-sm rounded-lg p-6`}
            key={habits.id}
          >
            <h2 className="text-lg font-semibold uppercase mb-2">
              {habits.title}
            </h2>
            <h2 className="text-sm font-semibold uppercase line-clamp-2">
              {habits.description}
            </h2>
            <button
              type="submit"
              className="md:w-9/12 w-full mt-5 py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-2"
              onClick={() => navigate(`/Habit/${habits.id}`)}
            >
              Check analytics
              <span className="material-symbols-rounded text-emerald-400">
                analytics
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Habits;
