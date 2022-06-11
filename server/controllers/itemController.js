const Item = require('../models/itemModels')

const itemController = {}

itemController.postItem = (req, res, next) => {
    const {name, price, details} = req.body

    Item.create({name, price, details})
        .then(newItem =>{
            console.log(newItem)
            return next()
        })
        .catch(err => {
            next({
                log: `itemController.postItem: ERROR: ${err}`,
                err:  {err: 'Error occured in itemController.postItem'}
            })
        })
}

itemController.findItem = (req, res, next) => {
    const { name } = req.body
    Item.find({name})
        .then(foundItem => {
            if (foundItem.length === 0) {
                res.locals.item = foundItem
                res.locals.succsess = true
                return next()
            }
            else {
                res.locals.success = false
                return next()
            }
            
        })
        .catch(err => {
            next({
                log: `itemController.findItem: ERROR: ${err}`,
                err:  {err: 'Error occured in itemController.findItem'}
            })
        })
}

itemController.updateItem = (req, res, next) => {
    const {name, price, details} = req.body

    Item.updateOne({name, price, details})
        .then(updatedItem => {
            console.log(updatedItem)
            return next()
        })
        .catch(err => {
            next({
                log: `itemController.updateItem: ERROR: ${err}`,
                err:  {err: 'Error occured in itemController.updateItem'}
            })
        })
}

itemController.deleteItem = (req, res, next) => {
    const {name} = req.body

    Item.deleteOne({name})
        .then(item => {
            return next()
        })
        .catch(err => {
            next({
                log: `itemController.deleteItem: ERROR: ${err}`,
                err:  {err: 'Error occured in itemController.deleteItem'}
            })
        })
}


module.exports = itemController