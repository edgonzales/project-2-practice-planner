const PracticeModel = require("../models/practice");
const DrillModel = require('../models/drill');

// https://mongoosejs.com/docs/api/model.html <-- All the methods are listed here
module.exports = {
  index,
  new: newPractice,
  create,
  show,
  deletePractice
};

async function index (req, res) {
    console.log(req.user);
    try {
        const practiceDocuments = await PracticeModel.find({}).populate('drills').exec();
        // practiceDocuments.forEach( function(p){ 
        //   console.log('drills in practice ------->', p.drills);     
        // });
        res.render('practices/index.ejs', {practiceDocs: practiceDocuments});
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}

async function show(req, res){
  try {
      const practiceDocument = await PracticeModel.findById(req.params.id)
        .populate('user');
      console.log('practiceDocument:', practiceDocument);
      res.render("practices/show", { practice: practiceDocument });
    } catch(err){
      console.log(err)
      res.send(err)
    }
}

async function newPractice(req, res) {
    try {
        const drillDocuments = await DrillModel.find({});
        res.render("practices/new", {drillDocs: drillDocuments});
    } catch (err) {
        console.log(err);
        res.render(err);
    }
  }

  async function create (req, res){
    try {
        console.log(req.body);
        req.body.user = req.user;
        const practiceDoc = await PracticeModel.create(req.body);
        res.redirect("/practices"); 
      } catch (err) {
        console.log(err)
        res.send(err);
        // optionally
        //next(err);
      }
  }

  async function deletePractice(req, res) {
    console.log(req.params)
    try {
      await PracticeModel.findByIdAndDelete(req.params.id);
      res.redirect("/practices")
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }