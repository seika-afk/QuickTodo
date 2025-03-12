"use client";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { FaSave } from "react-icons/fa";

interface Note {
    id: number; // Add this
  title: string;
  content: string;
  date: string;
  user_id: string;
}

interface ContentProps {
  onExit: () => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  session: Session | null;
}

const Content: React.FC<ContentProps> = ({ onExit, setNotes, session }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!session) return;
    
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content, date: new Date().toISOString(), user_id: session.user.id }])
      .select();

    if (error) {
      console.error("Error saving note:", error);
    } 

      if (data && data.length > 0) {
  setNotes((prev) => [...prev, data[0] as Note]); // Ensure proper type
}
  };

  return (
    <div className="relative bg-[#1E352F] shadow rounded p-6 w-[70%]">
      <button
        onClick={onExit}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
      >
        ✖
      </button>

      <textarea
        className="w-full h-[10vh] text-2xl p-4 border-none focus:outline-none resize-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <hr />
      <textarea
        className="w-full flex flex-grow h-[60vh] p-4 border-none focus:outline-none resize-none"
        placeholder="Text here :>"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex flex-row mt-auto my-5">
        <FaSave
          onClick={handleSave}
          className="mx-2 cursor-pointer hover:scale-110 hover:text-green-500 transition-transform duration-200"
          size={40}
        />
      </div>
    </div>
  );
};

export default Content;
