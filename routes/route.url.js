import express from "express";


import  {urlShortener,redirectId} from '../controllers/controller.url.js'

const urlRoute= express.Router();

urlRoute.post('/shorten',urlShortener)
urlRoute.get('/:shortId',redirectId)


export default urlRoute;