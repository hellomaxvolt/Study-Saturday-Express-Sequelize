const router = require("express").Router();
const Student = require("../db/models/student");
const Test = require("../db/models/test");

router.get("/", async (theirRequest, myResponse, goToNext) => {
  try {
    const allTests = await Test.findAll();
    myResponse.send(allTests);
  } catch (error) {
    goToNext(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const specificTest = await Test.findById(req.params.id);
    if (specificTest) {
      res.send(specificTest);
    } else {
      res.status(404).send("Test Not Found");
    }
  } catch (error) {
    next(err);
  }
});

router.post("/student/:Id", async (req, res, next) => {
  try {
    const testToInsert = await Test.create(req.body);
    const studentToInsertTestInto = await Student.findById(req.params.Id);
    console.log("MAGIC METHODS", Object.keys(testToInsert.__proto__));
    const studentTest = await testToInsert.setStudent(studentToInsertTestInto);
    res.status(201).send(studentTest);
  } catch (error) {
    next(error);
  }

  // res.send(studentToInsertTestInto.save(testToInsert))
});

router.delete("/:id", async (req, res, next) => {
   testToDelete = await Test.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = router;
