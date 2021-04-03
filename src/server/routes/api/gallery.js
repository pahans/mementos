var router = require("express").Router();

const galleryController = require("../../controllers/gallery");

/**
 * @swagger
 * /gallery:
 *   get:
 *     tags:
 *       - Gallery
 *     name: Gallery
 *     summary: Get data for a specified gallery Id
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *     responses:
 *       200:
 *         description: Found the gallery and request was a success
 *       401:
 *         description: Not found in db
 */
router.get("/", galleryController.fetchGallery);

module.exports = router;
