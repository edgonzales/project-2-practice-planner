const DrillModel = require("../models/drill");

module.exports = {
  index,
  new: newDrill,
  create
};

async function index (req, res) {
    console.log(req.user);
    try {
        const drillDocuments = await DrillModel.find({});
        console.log(drillDocuments, '<------drill documents');
        res.render('drills/index.ejs', {drillDocs: drillDocuments});
        
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}

function newDrill(req, res) {
    res.render("drills/new");
  }

async function create(req, res) {
    try {
        const drillDoc = await DrillModel.create(req.body);
        console.log('<-----drill created in DB------>', drillDoc); 
        res.redirect("/drills");
    } catch (err) {
        console.log(err);
        next(err);
    }
  }