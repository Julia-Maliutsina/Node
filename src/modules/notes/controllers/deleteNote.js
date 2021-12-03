import Notes from "./dbModel.js";

const DeleteNoteController = (request, response) => {
  const noteId = request.params.id;
  Notes.deleteOne({ _id: noteId })
  .then((res) => {
  const deleteNoteResponse = {
    success: true, 
    id: noteId,   
  };
  response.send(deleteNoteResponse);
  })
};

export default DeleteNoteController;