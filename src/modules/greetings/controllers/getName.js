const ERROR_STATUS = 400;

const GetNameController = (request, response) => {
  const { name } = request.query;
  if (name) {
    response.send(`<p>Hello ${name}!</p>`)
  } else {
    response.status(ERROR_STATUS).json({ error: 'Name undefined' })
  }
}

export default GetNameController