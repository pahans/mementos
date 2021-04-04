var router = require("express").Router();

const pastBookController = require("../../controllers/past-book");

/**
 * @swagger
 * /past-book:
 *   get:
 *     tags:
 *       - Past Books
 *     name: Past Books
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
router.get("/:bookId", pastBookController.fetchPastBook);
/**
 * @swagger
 * /past-book:
 *   post:
 *     tags:
 *       - Past Books
 *     name: Past Books
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
router.post("/:bookId", pastBookController.updatePastBook);

module.exports = router;
