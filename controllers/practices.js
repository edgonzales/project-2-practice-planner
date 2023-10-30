const PracticeModel = require("../models/practice");

// ^ MovieModel can perform CRUD On our DB
// https://mongoosejs.com/docs/api/model.html <-- All the methods are listed here
module.exports = {
  index
};

async function index (req, res) {
    console.log(req.user);
    try {
        const practiceDocuments = await PracticeModel.find({});
        console.log(practiceDocuments, '<------practice documents');
        res.render('practices/index.ejs', {practiceDocs: practiceDocuments});
        
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}