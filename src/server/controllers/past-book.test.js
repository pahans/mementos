const mockingoose = require("mockingoose");

const pastBookModel = require("../models/past-book");
const pastBookController = require("./past-book");

describe("fetch pastbook", () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {}, params: {bookId: "demo-book-id"}};
    res = { json: jest.fn() };
  });
  test("fetch pastbook - with data", async () => {
    const _doc = {
      _id: "demo-book-id",
      selectedPictures: [
        {
          id: 204900001,
          message: "",
          picture: "https://www.filepicker.io/api/file/c5XwmVekSQO2CIabnudN",
          pictureSmall: "",
          pictureMedium: "",
          pictureStored: "",
          timestamp: 1578391381,
        },
        {
          id: 204900002,
          message: "",
          picture: "https://www.filepicker.io/api/file/oTUic0PTS4KiBJFbahbl",
          pictureSmall: "",
          pictureMedium: "",
          pictureStored: "",
          timestamp: 1578391381,
        },
      ],
    };

    mockingoose(pastBookModel).toReturn(_doc, "findOne");

    await pastBookController.fetchPastBook(req, res).then(() => {
      expect(res.json.mock.calls[0][0].toJSON()).toStrictEqual(_doc);
    });
  });

  test("fetch pastbook - no data", async () => {
    mockingoose(pastBookModel).toReturn(null, "findOne");
    await pastBookController.fetchPastBook(req, res).then(() => {
      expect(res.json.mock.calls[0][0]).toStrictEqual({ selectedPictures: [] });
    });
  });
});

describe("update pastbook", () => {
  let res;
  let req;
  beforeEach(() => {
    req = { body: { selectedPictures: [] }, params: {bookId: "demo-book-id"} };
    jest.clearAllMocks();
    res = { json: jest.fn() };
  });

  test("update pastbook", async () => {
    await pastBookController.updatePastBook(req, res).then(() => {
      expect(res.json.mock.calls[0][0]).toStrictEqual({ status: "success" });
    });
  });
});
