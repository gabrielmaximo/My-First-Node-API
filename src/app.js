const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

var repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find((repository) => id === repository.id);

  if (!repository) {
    return response
      .status(400)
      .json({ error: "Repository ID does not exists in array" });
  }

  title ? (repository.title = title) : "";
  url ? (repository.url = url) : "";
  techs ? (repository.techs = techs) : "";

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const repositoryExists = repositories.find(
    (repository) => repository.id === request.params.id
  );

  if (!repositoryExists) {
    return response
      .status(400)
      .json({ error: "Repositort ID does not exists in array" });
  }
  repositories = repositories.filter(
    (repository) => repository.id !== request.params.id
  );

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const repository = repositories.find(
    (repository) => repository.id === request.params.id
  );

  if (!repository) {
    return response
      .status(400)
      .json({ error: "Repositort ID does not exists in array" });
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
