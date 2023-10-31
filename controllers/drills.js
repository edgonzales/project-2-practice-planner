const DrillModel = require("../models/drill");

module.exports = {
  index,
  new: newDrill,
  create,
  show,
  deleteDrill
};

async function index (req, res) {
    console.log(req.user);
    try {
        const drillDocuments = await DrillModel.find({}).populate('user')
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
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        console.log('req.body:', req.body);
        const drillDoc = await DrillModel.create(req.body);
        console.log('<-----drill created in DB------>', drillDoc); 
        res.redirect("/drills");
    } catch (err) {
        console.log(err);
        next(err);
    }
  }

  async function show(req, res){
    try {
        const drillDocument = await DrillModel.findById(req.params.id);
        console.log('DRILL DOCUMENT ---->', drillDocument)
        res.render("drills/show", { drill: drillDocument });

      } catch(err){
        console.log(err)
        res.send(err)
      }
  }

  async function deleteDrill(req, res) {
	console.log(req.params)
  try {
    await DrillModel.findByIdAndDelete(req.params.id);
	res.redirect("/drills")
	
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}