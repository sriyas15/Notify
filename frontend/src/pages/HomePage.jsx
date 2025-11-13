import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import NavBar from '../components/NavBar';
import NoteCard from '../components/NoteCard'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import {LoaderIcon} from 'lucide-react'
import NoNotes from '../components/NoNotes';

const HomePage = () => {

  const [ isRateLimited,setIsRateLimited ] = useState(false);
  const [ isLoading,setIsLoading ] = useState(true);
  const [ notes,setNotes ] = useState([]);

  useEffect(()=>{

    const fetchNotes = async()=>{

      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in Fetching ",error);

        if(error.response.status === 429) setIsRateLimited(true);
        else toast.failed("Cannot fetch the notes");
      }
      finally{
        setIsLoading(false)
      }
      
    }
    fetchNotes();
  },[])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <NavBar/>
      { isRateLimited && <RateLimitedUI/>}
      
      { notes.length === 0 && !isRateLimited && (
        <div>
          <NoNotes/>
        </div>
      )}

      <div className='max-w-7xl mx-auto pt-4 mt-6'>

          {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
              {notes.map((note)=>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>
          )}
      </div>

    </div>
    
  )
}

export default HomePage