const express = require('express')

const server = express()

// configura a api para receber dados em formato json
server.use(express.json())

const projects = []

const p = {
  id: "0",
  title: "novo projeto",
  tasks: ['teste1', 'teste2', 'teste3']
}
projects.push(p)

// listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json({projects})
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json({message: "Projeto cadastrado"})
})

server.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  // retorna o projeto de mesmo id
  const project = projects.find(p => p.id == id)

  project.title = title

  return res.json({message: "sucess", project})

})

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params

  const index = projects.findIndex(p => p.id == id)

  projects.splice(index, 1)

  return res.json({message: "excluido com sucesso", projects})

})

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params
  const { title} = req.body

  // pega um referencia para um indice especifico do array
  const project = projects.find(p => p.id == id)
  project.tasks.push(title)

  return res.json({ message: "Task adicionada", project })

})

// configura a porta local
server.listen(3333)