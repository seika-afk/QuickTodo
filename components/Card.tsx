"use client"
import {CiTrash } from "react-icons/ci";

interface cardprops{

    id:number;
    title:string;
content:string;
date:string;
onDelete:(id:number)=>void;



}




const Card:React.FC<cardprops>=({id,title,content,date,
    onDelete


})=>{


return (
<div className="bg-[#335145]
    hover:shadow-[0_0_20px_#00916E] 
     hover:scale-105
     transition-all
     duration-300 
     ease-in-out 
     flex
 overflow-hidden
     h-[300px]
     flex-col
    text-white p-5 rounded-lg shadow-md">
<h2>{title}</h2>
<p className="truncate max-w-xs flex-row break-words text-white">{content}</p>
<span className="text-sm text-gray-300">{new Date(date).toLocaleDateString()}</span> 

<div className=" flex flex-row mt-auto my-5  ">
<CiTrash onClick={()=>onDelete(id)} className="p-1  hover:rounded mx-2 cursor-pointer hover:bg-[#1E352F]" size={40}/>
</div></div>


)

}
export default Card
