const DeleteNoteController = (request, response) => {
  const noteId = request.params.id;
  const deleteNoteResponse = {
    success: true, 
    id: noteId,   
  };
  response.send(deleteNoteResponse);
};

export default DeleteNoteController;