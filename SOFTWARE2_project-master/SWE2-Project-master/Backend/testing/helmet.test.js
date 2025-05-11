const request = require("supertest");
const app = require("../app"); // path to your app.js

describe("Helmet Middleware", () => {
  it("should set various HTTP security headers", async () => {
    const res = await request(app).get("/auth");
    
    // Helmet adds many headers, test some common ones
    expect(res.headers["x-dns-prefetch-control"]).toBe("off");
    expect(res.headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(res.headers["x-xss-protection"]).toBe("0"); // Helmet disables deprecated header by default
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });
});
