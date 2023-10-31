const DrillModel = require("../models/drill");

module.exports = {
  index,
  new: newDrill,
  create,
  show
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
        // we want to replace all of the id's of the performers in movieDocuments cast array
        // with the actual performer docs!
        // .populate takes name of the key on the model that contains the id's
        const drillDocument = await DrillModel.findById(req.params.id);
        console.log('DRILL DOCUMENT ---->', drillDocument)
        res.render("drills/show", { drill: drillDocument });

      } catch(err){
        console.log(err)
        res.send(err)
      }
  }