const express = require('express')
const app = express()
const port = 5000
let {people} = require('./data')

// static assets
app.use(express.static('./public'))

// parse form data 
app.use(express.urlencoded({ extended : false }))

app.use(express.json())

app.get('/api/people', (req, res)=>{
    res.status(200).json({success: true, data: people})
})

app.post('/api/people', (req, res)=>{
    const {name} =req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).json({success:true, person:name})
})

app.post('/api/postman/people', (req, res)=>{
    const {name} =req.body
    if(!name){
        return res
        .status(400)
        .json({success:false, msg:'please provide name value'})
    }
    res.status(201).json({success:true, data: [...people, name]})
})

app.post('/Contact', (req, res)=>{
    const {name} = req.body
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide credentials')
})

app.put('/api/people/:id', (req, res)=>{
    const {id} = req.params
    const {name} = req.body
    // console.log(id, name)
    // res.send('Hello World')

    const person = people.find((person)=>person.id === Number(id))

    if(!person){
        return res
        .status(404)
        .json({success: false, msg: `no person with id ${id}`})
    }
    const newPeople = people.map((person)=>{
        if (person.id === Number(id)){
            person.name =name
        }
        return person
    })
    res.status(200).json({success: true, data: newPeople})
})

app.listen(port, ()=>{
    console.log(`Serving at http://localhost:${port}`)
})
