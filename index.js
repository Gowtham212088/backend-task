import express from "express";
import { response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv" // importing dotenv
import cors from "cors"
import bcrypt from "bcrypt"


dotenv.config();

// console.log(process.env);

const app = express();

const PORT = process.env.PORT;
// const PORT = 4000;
app.use(cors())
 
app.use(express.json()); // Express Midware


// const MONGO_URL = "mongodb://127.0.0.1"
const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb+srv://gowtham:Welcome123@cluster0.oyjmb.mongodb.net";

async function createConnection() {
  const client = new MongoClient(MONGO_URL);

  await client.connect();

  console.log("Mongo DB connected to the server 😎😍");

  return client;
}

const client = await createConnection();

// To Create mentor

app.get("/getMentor", async (request, response) => {
  const getMentor = await client
    .db("student_mentor")
    .collection("mentor")
    .find({})
    .toArray();

  response.send(getMentor);
});

app.get("/getMentor/:id", async (request, response) => {
  const { id } = request.params;

  const mentId = await client
    .db("student_mentor")
    .collection("mentor")
    .findOne({ id: id });

 
     response.send(mentId)
   

  // response.send(studId)
});

// To Create mentor

app.post("/mentor", async (request, response) => {
  const mentor = request.body;

  const mentors = await client
    .db("student_mentor")
    .collection("mentor")
    .insertOne(mentor);

  response.send(mentors);
});

// To Create a list of mentors

app.post("/manyMentors", async (request, response) => {
  const allMentors = request.body;

  const addMen = await client
    .db("student_mentor")
    .collection("mentor")
    .insertMany(allMentors);

  response.send(addMen);
});

// To Read a student

app.get("/getStudent", async (request, response) => {
  const getStudents = await client
    .db("student_mentor")
    .collection("students")
    .find({})
    .toArray();

  response.send(getStudents);
  // console.log(getStudents);
});

// Get Student by ID

app.get("/students/:id", async (request, response) => {
  const { id } = request.params;

  const studId = await client
    .db("student_mentor")
    .collection("students")
    .findOne({ id: id });

  studId
    ? response.send(studId)
    : response.status(404).send({ message: "Such a mentor is not available " });

  // console.log(studId);
});

// Delete students by ID

app.delete("/delStudent/:id", async (request, response) => {
  const { id } = request.params;

  const deleStudent = await client
    .db("student_mentor")
    .collection("students")
    .deleteOne({ id: id });

  deleStudent
    ? response.send(deleStudent)
    : response
        .status(404)
        .send({ message: "Such a mentor is not available to delete" });
});

// To Create student

app.post("/AddStudent", async (request, response) => {
  const student = request.body;

  const students = await client
    .db("student_mentor")
    .collection("students")
    .insertOne(student);

  response.send(students);
});

// Add many students

app.post("/add/Students", async (request, response) => {
  const studData = request.body;

  const manyStud = await client
    .db("student_mentor")
    .collection("students")
    .insertMany(studData);

  response.send(manyStud);
});

// To delete multiple/All mentor

app.delete("/delMentors/:desingnation", async (request, response) => {
  const { desingnation } = request.params;

  const deleteMentors = await client
    .db("student_mentor")
    .collection("mentor")
    .deleteMany({ desingnation: desingnation });

  response.send(deleteMentors);
});

// To delete single document

app.delete("/delMen/:id", async (request, response) => {
  const { id } = request.params;

  const Delete = await client
    .db("student_mentor")
    .collection("mentor")
    .deleteOne({ id: id });

  response.send(Delete);
});

// select one mentor and add multiple  students

app.post(`/mentee's`, async (request, response) => {
  // const getStud = await client.db("student_mentor").collection("students").find({name:})

  const addMentee = await client
    .db("student_mentor")
    .collection("mentor")
    .insertOne();

  response.send(addMentee);
});

// To asign a mentor 

app.put("/asign/student/:id",async(request,response)=>{

 const {id} = request.params

 const {student} = request.body

 const stud = await client.db("student_mentor").collection("mentor").updateOne({id:id},{$set:{student}}) 
  
      response.send(stud)

  })

// Api to change the mentors details

app.put("/mentors/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, Id } = req.body;
  const updateMentor = await client
    .db("student_mentor")
    .collection("mentor")
    .updateOne({ id: id }, { $set: { name, email, id } });
  res.send(updateMentor);
});



app.listen(PORT, () => console.log(`app started on port ${PORT}`));

// async function genPassword (password){
//       const salt = await bcrypt.genSalt(10)
//       const hashPassword = await bcrypt.hash(password,salt)
//       console.log({salt,hashPassword});
// }
// genPassword("getpassword")
