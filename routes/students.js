//already mounted on /students

const router = require("express").Router();
const Student = require("../db/models/student");

router.get("/", async (req, res) => {
  const students = await Student.findAll();
  res.send(students);
});

router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send("Student Not Found");
    }
});


router.post("/", async (req, res) => {;
  const newStudent = await Student.create(req.body);
  res.status(201).send(newStudent);
});

router.put("/:id", async (req, res) => {;
    // studentToUpdate = await Student.findById(req.params.id)
    // updatedStudent = await studentToUpdate.create(req.body)
    // res.send(updatedStudent);//NO

    let updateStudent = await Student.update(req.body, {
        where: { id: req.params.id}
    })
    let updatedStudentInfo = await Student.findById(req.params.id)
    
    res.send(updatedStudentInfo)

    //COULD DO THIS INSTEAD
    // let updateStudent = await Student.update(req.body, {
    //     where: { id: req.params.id},
    //     returning: true,
    //     plain: true,
    // })
    // res.send(updateStudent[1])
});

router.delete('/:id', async (req,res) => {
    studentToDelete = await Student.destroy({where: {id: req.params.id}})
    res.status(204).send()

})



module.exports = router;
