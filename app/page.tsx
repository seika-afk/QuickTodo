"use client"
import { Session } from "@supabase/supabase-js";
import Content from "@/components/Content";
interface Note{
  id: number;
  title: string;
  content: string;
  date: string;


}
import { IoIosAddCircle } from "react-icons/io";

import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";
import Card from "@/components/Card"
import Login from "@/components/Login";
export default function Home() {
  const [write,setWrite]=useState<boolean>(false)
  const[notes,setNotes]=useState<Note[]>([]);

  const [session,setSession]=useState<Session | null>(null)
  useEffect(()=>{
const checkSession = async()=>{
const {data}= await supabase.auth.getSession();
setSession(data.session)

}
checkSession();



  },[]);

  const handleExit=()=>{
setWrite(false)

  }
  const handleclick = async (id:number)=>{
   
const {error} = await supabase.from('notes').delete().eq("id",id);
if(error) console.log(error)
else{ console.log("deletd");
  setNotes((prevNotes)=>prevNotes.filter((note)=>note.id!==id));

}


  }

  useEffect(()=>{
    if(!session) return
const fetchNotes = async()=>{
if(!session) return;


  const {data,error}=await supabase.from('notes').select('*').eq("user_id",session.user.id);
if(error) console.error("Error fetching notes :",error)
else setNotes(data as Note[])

}


fetchNotes();



  },[session]);
  
  
  
  return (
   <div>
<main className="p-5 " >
  <div className="flex justify-center items-center">
<h1 className="navbar text-xl cursor-pointer">Quick Todo</h1>
<IoIosAddCircle onClick={()=>setWrite(true)} className="mx-2 cursor-pointer hover:scale-110 hover:text-green-500 transition-transform duration-200" 
  size={30} />

</div>
<div className="p-10 grid grid-cols-3 gap-3  " >



{notes.map((note:Note)=>(
<Card 
key={note.id}
id={note.id}
title={note.title}
content={note.content}
date={note.date}
onDelete={()=>handleclick(note.id)}

/>



))}

</div>

{write &&(
<div className="absolute top-0 left-0 w-full h-full bg-black/80 rounded bg-opacity-80 flex justify-center shadow-lg items-center z-50">
<Content
onExit={handleExit}
setNotes={setNotes}
session={session} 
/>

</div>

)}

{!session && (
  <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-50">
    <Login setSession={setSession} />
  </div>
)}
</main>




   </div>
  );
}
