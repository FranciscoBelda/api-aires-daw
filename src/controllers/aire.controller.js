const AireModel = require('../models/aire.model');

const aireCtrl = {};

aireCtrl.getAires = async (req, res) => {
    const aire = await AireModel.find()
    .then(data => {
        res.status(200).json({
            status: true,
            message: 'Te he creado tu puto aire',
            data
        })
    })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

aireCtrl.getAire = async (req, res) => {
    const aire = await AireModel.findById(req.params.id)
    .then(data => {
        if (data) {
            res.status(200).json({
                status: true,
                data
            })
        }else {
            res.status(404).json({
                status: false,
                message: 'Aire Not Found'
            })
        }
    })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


aireCtrl.addAire = async (req, res) => {
    const newAire = new AireModel(req.body);
    await newAire.save()
    .then(() => {
            res.status(201).json({
                status: true,
                message: 'Aire creado por ejemplo'
            })
    })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


aireCtrl.updateAire = async (req, res) => {
    const {id} = req.params;
    const aire = await AireModel.findByIdAndUpdate(
        id,
        {$set: req.body},
        {new: true} // DEVUELVE EL ELEMENTO ACTUALIZADO EN VEZ DE EL ORIGINAL
    )
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    data,
                    message: 'Aire updated'
                })
            }else {
                res.status(404).json({
                    status: false,
                    message: 'Aire Not Found'
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


aireCtrl.deleteAire = async (req, res) => {
    const {id} = req.params;
    const aire = await AireModel.findByIdAndDelete(
        id
    )
        .then(data => {
            if (data) {
                res.status(200).json({
                    status: true,
                    data,
                    message: 'Aire deleted'
                })
            }else {
                res.status(404).json({
                    status: false,
                    message: 'Aire Not Found'
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

aireCtrl.getAireByAll = async (req, res) => {

    const aire = await AireModel.find(
        {
            $or: [
                {marca: {$regex: req.params.valor}},
                {modelo: {$regex: req.params.valor}},
                {color: {$regex: req.params.valor}},
                {energia: {$regex: req.params.valor}},
            ]
        }
    )
        .then(data => {
                res.status(200).json({
                    status: true,
                    data,
                    message: 'Lista que contiene: '+req.params.valor
                })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


aireCtrl.getAireByModelo = async (req, res) => {

    const aire = await AireModel.find(
                {modelo: {$regex: req.params.valor}}
    )
        .then(data => {
                res.status(200).json({
                    status: true,
                    data,
                    message: 'Lista que contiene: '+req.params.valor
                })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


aireCtrl.getAireByModDesc = async (req, res) => {

    const aire = await AireModel.find(
                {modelo: {$regex: req.params.valor}, descripcion: {$regex: req.params.valor}}
    )
        .then(data => {
                res.status(200).json({
                    status: true,
                    data,
                    message: 'Lista que contiene modelo y descripcion con: '+req.params.valor
                })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}


aireCtrl.getAireByPrecio = async (req, res) => {

    const aire = await AireModel.find(
                {precio: {$gt: req.params.precio}}
    )
        .then(data => {
                res.status(200).json({
                    status: true,
                    data,
                    message: 'Lista que contiene precios superiores a: '+req.params.precio
                })
        })
        .catch(error => {
            res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

module.exports = aireCtrl;