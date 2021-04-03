const galleryMock = require("./gallery-2270.json");
const galleryController = require("./gallery");

describe("fetch gallery", () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = { json: jest.fn() };
  });
  test("fetch gallery", async () => {
    galleryController.fetchGallery(req, res).then(() => {
      expect(res.json.mock.calls[0][0]).toStrictEqual(galleryMock);
    });
  });
});
