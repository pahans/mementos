var router = require("express").Router();

const pastBookController = require("../../controllers/past-book");

/**
 * @openapi
 * /past-book/{bookId}/:
 *   get:
 *     tags:
 *       - Past Books
 *     name: Get Past Books
 *     summary: Get data for a specified past book Id
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         in: path
 *         schema:
 *          type: string
 *         required: true
 *         examples:
 *           demo:
 *            value: demo-book-id
 *            summary: demo book Id
 *     responses:
 *       200:
 *         description: Found the pastbook and request was a success
 *       401:
 *         description: Not found in db
 */
router.get("/:bookId", pastBookController.fetchPastBook);
/**
 * @openapi
 * /past-book/{bookId}/:
 *   post:
 *     tags:
 *       - Past Books
 *     name: Get Past Books
 *     summary: Get data for a specified past book Id
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         in: path
 *         schema:
 *          type: string
 *         required: true
 *         examples:
 *           demo:
 *            value: demo-book-id
 *            summary: demo book Id
 *       - name: galleryId
 *         in: body
 *         schema:
 *          type: string
 *         required: true
 *         examples:
 *           demo:
 *            value: 1662ba2b-605f-4c63-84ce-59b2eb9c5679
 *            summary: demo gallery Id
 *       - name: selectedPictures
 *         in: body
 *         schema:
 *          type: array
 *          items:
 *            type: object
 *         required: true
 *         examples:
 *           demo:
 *            value: [
 *               {
 *                "id": "204900001",
 *                  "message": "",
 *                  "picture": "https://www.filepicker.io/api/file/c5XwmVekSQO2CIabnudN",
 *                  "pictureSmall": "",
 *                  "pictureMedium": "",
 *                  "pictureStored": "",
 *                  "timestamp": 1578391381
 *                }
 *              ]
 *            summary: selectedPictures
 *     responses:
 *       200:
 *         description: Found the gallery and request was a success
 *       401:
 *         description: Not found in db
 */
router.post("/:bookId", pastBookController.updatePastBook);

module.exports = router;
