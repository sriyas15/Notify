import { PlusIcon,Sun,Moon } from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {

  const [ theme,setTheme ] = useState("light");

  const toggleTheme = ()=>{

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme",newTheme);
  }

  return (
    <header className="bg-base-300 border-b border-base-content/10">

        <div className='max-w-6xl mx-auto p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Notify</h1>
                <div className='flex items-center gap-5'>
                  <Link to={'/create'} className="btn btn-primary">
                    <PlusIcon className='h-5 w-5'/>
                    <span>New Note</span>
                  </Link>
                <button className='btn btn-ghost' onClick={toggleTheme}>
                  {theme === "light" ? <Sun/> : <Moon/> }
                </button>
                 
                </div>
            </div>
        </div>

    </header>
  )
}

export default NavBar