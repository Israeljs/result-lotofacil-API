import express from "express";
import allResultsController from '../controllers/allResultsController.js'

const router = express.Router()

// router.get('/:id', allResultsController.getResult)
router.get('/', allResultsController.getAllResults)

module.exports = router
