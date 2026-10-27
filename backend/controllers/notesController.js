import Note from "../models/Note.js"
const getAllNotes = async (req,res)=>{
    try{
        const notes= await Note.find().sort({createdAt:-1}) // to sort in order ofcreation
        res.status(200).json(notes)  
    } catch(err){
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error fetching note"});
    }
};


const createNote = async (req,res)=>{
    // res.status(201).json({message: "Note created successfully"})
    try{
        const {title, content} = req.body
        const newNote = new Note({title, content})
        const savedNote= await newNote.save()
        res.status(201).json(savedNote)
    } catch(err){
        res.status(500).json({message: "error"})
    }
    
}
const updateNote = async (req,res)=>{
    try{
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
    res.status(200).json({message: "Note updated successfully"})
    } catch(err){
        res.status(500).json({message: "error in update"})
    }
}

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found"});
        }
        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });

    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({
            message: "Error in delete"
        });
    }
};


export {getAllNotes ,getNoteById, 
    createNote , updateNote, deleteNote }