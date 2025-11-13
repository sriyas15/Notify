import Notes from "../model/Note.js";

export const getNotes = async(req,res)=>{

    try {
        
        const notes = await  Notes.find({});
        res.status(200).json(notes);

    } catch (error) {
        console.error("Cannot get notes",error);
        res.status(500).json({message:"Internal server error"});
    }

}

export const getNotesById = async(req,res)=>{

    try {
        
        const note = await Notes.findById(req.params.id);

        if(!note) return res.status(404).json({message:"Note was not found"});

        res.status(200).json(note);

    } catch (error) {
        
        console.error("Cannot get notes",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}

export const uploadNotes = async(req,res)=>{
    
    try {
        
        const { title,content } = req.body;
    
        const newNotes = new Notes({ title,content });

        await newNotes.save();
        
        res.status(201).json({message:"Note created Successfully"});

    } catch (error) {
        
        console.error("Cannot upload notes",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateNotes = async(req,res)=>{

    try {
        
        const { title,content } = req.body;
        const update = await Notes.findByIdAndUpdate(req.params.id,{ title,content });

        if(!update) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Updated successfully"});

    } catch (error) {
        
        console.error("Cannot update notes",error);
        res.status(500).json({message:"Internal Server Error"});

    }

}

export const deleteNotes = async(req,res)=>{
    
    try {
        
        const deleteNotes = await Notes.findByIdAndDelete(req.params.id);

        if(!deleteNotes) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        
        console.error("Cannot delete notes",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

