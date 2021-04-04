var router = require("express").Router();

const galleryController = require("../../controllers/gallery");

/**
 * @openapi
 * /gallery/{galleryId}/:
 *   get:
 *     tags:
 *       - Gallery
 *     name: Gallery
 *     summary: Get data for a specified gallery Id(Gallery information is hardcoded for now).
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: galleryId
 *         in: path
 *         schema:
 *          type: string
 *         required: true
 *         examples:
 *           demo:
 *            value: 1662ba2b-605f-4c63-84ce-59b2eb9c5679
 *            summary: demo gallery Id
 *     responses:
 *       200:
 *         description: Found the gallery and request was a success
 *       401:
 *         description: Not found in db
 */
router.get("/:galleryId", galleryController.fetchGallery);

module.exports = router;
