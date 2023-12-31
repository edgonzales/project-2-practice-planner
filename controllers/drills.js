const DrillModel = require("../models/drill");

module.exports = {
  index,
  new: newDrill,
  create,
  show,
  deleteDrill,
  edit,
  update
};

async function index (req, res) {
    try {
        const drillDocuments = await DrillModel.find({}).populate('user')
        res.render('drills/index.ejs', {drillDocs: drillDocuments});
        
    } catch (err) {
        res.render(err);
    }
}

function newDrill(req, res) {
    res.render("drills/new");
  }

async function edit(req, res) {
  try {
    const drillDocument = await DrillModel.findById(req.params.id);
    res.render('drills/edit', {drill: drillDocument});
  } catch (error) {
    res.send(err)
  }
}

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        const drillDoc = await DrillModel.create(req.body);
        res.redirect("/drills");
    } catch (err) {
        next(err);
    }
  }

  async function show(req, res){
    try {
        const drillDocument = await DrillModel.findById(req.params.id);
        res.render("drills/show", { drill: drillDocument });
      } catch(err){
        res.send(err)
      }
  }

  async function deleteDrill(req, res) {
  try {
    await DrillModel.findByIdAndDelete(req.params.id);
	res.redirect("/drills")
  } catch (err) {
    res.send(err);
  }
}

async function update (req, res) {
  try {
    const updateDrill = await DrillModel.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res.redirect("/drills");
  } catch (err) {
    res.send(err);
  }
}