module.exports = {
    initSession : function(req, res, next){
        if(!req.session.housing){
            //comment out just for testing
            req.session.userId = 1;
            req.session.housing = {
                name: '',
                description: '',
                address: '',
                city : '',
                state: '',
                zip: '',
                image: '',
                loan: 0,
                mortage: 0,
                rent: 0

            }
            
        }
        next();
    },
    updateNewHousing: function(req, res, next){
		console.log(req.body);
        req.session.housing = Object.assign(req.session.housing, req.body);
        res.status(200).send(req.session.housing)
    },
    newHousing: function(req, res, next){
        res.status(200).send(req.session.housing)
    },
    addProperty: function(req,res,next){
        const dbInstance = req.app.get('db');
        
        const { name, description, address, city, state, zip, image, loan, mortgage, rent} = req.session.housing;
        const {userId} = req.session;
        dbInstance.addProperty([ userId, name, description, address, city, state, zip, image, loan, mortgage, rent]).then(_=>{
            req.session.housing = {
                name: null,
                description: null,
                address: null,
                city : null,
                state: null,
                zip: null,
                image: null,
                loan: null,
                mortage: null,
                rent: null
            }
            dbInstance.getProperties(req.session.userId).then(properties => {
                res.status(200).send(properties);
            }).catch(err => {
                console.log(err);
                res.status(500).send();
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    },
    getAllProperties:  function(req,res,next){
        const dbInstance = req.app.get('db');
        // console.log(dbInstance.functions);
        dbInstance.getProperties(req.session.userId).then(properties => {
            res.status(200).send(properties);
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        });
    },
    deleteProperty : function(req,res,next){
        const dbInstance = req.app.get("db");
        console.log(req.params.id);
        dbInstance.deleteProperty(req.params.id).then(_ => {
            dbInstance.getProperties(req.session.userId).then(properties => {
                res.status(200).send(properties);
            }).catch(err => {
                console.log(err);
                res.status(500).send();
            });      
            // return all properties associated with logged in user
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        });
    },
    filterProperties:  function(req,res,next){
        const dbInstance = req.app.get("db");
        dbInstance.getProperties(req.session.userId).then(properties => {
            const filteredProperties = properties.filter(property => 
                req.query.amount
                ?
                property.rent > req.query.amount
                :
                true)
            res.status(200).send(filteredProperties);
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        });
    }
}