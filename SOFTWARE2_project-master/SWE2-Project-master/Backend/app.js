const express = require("express");
const app = express();
//const mongoSanitize = require('express-mongo-sanitize');
app.use(express.json()); // Required to parse JSON

// هذا يمنع مفاتيح مثل $gt أو __proto__ من الوصول لقاعدة البيانات
//app.use(mongoSanitize());

//const methodOverride = require("method-override");
//app.use(methodOverride("_method"));
//const sanitizeObject = require("./helpers/sanitizeObject");
const helmet = require("helmet");
//const xss = require("xss"); // <-- Import this
//const mongoSanitize = require('express-mongo-sanitize');

///const testSanitizeRoute = require('./routes/sanitized.route');
//app.use('/api', testSanitizeRoute);

//app.use(xss());
app.use(helmet());

const rateLimiter = require("./middlewares/rateLimiter");
app.use("/auth", rateLimiter);

const xss = require("xss");

app.post("/test", (req, res) => {
  const comment = req.body.comment;
  const sanitizedComment = xss(comment); // ← sanitize manually here
  res.json({ sanitized: sanitizedComment });
});

// Sanitize all input data from req.body, req.query, and req.params
/*app.use((req, res, next) => {
  req.body = sanitizeObject(req.body);
  req.query = sanitizeObject(req.query);
  req.params = sanitizeObject(req.params);
  next();
});*/

const logger = require("./utils/logger");
app.use(logger);
const isAuthenticated = require("./middlewares/authenticate");
const session = require("express-session");
const productRoutes = require("./routes/product.route");
const userRoutes = require("./routes/user.route");
const discountRoutes = require("./routes/discount.route");
const authRoutes = require("./routes/auth.route");
const pageRoutes = require("./routes/pages.route");

//console.log("Mongo URI:", process.env.connect_DB);

app.set("view engine", "ejs");
app.use(express.static("public"));
//app.use(express.static("views"));
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api", productRoutes);

app.use("/api", userRoutes);

app.use("/api", discountRoutes);

app.use("/", authRoutes);

app.use("/", pageRoutes);

/*app.get('/', (req, res) => {
   res.send('Product deleted successfully'); // or res.render('index') if you have a view
 });*/

/*app.listen(process.env.PORT, () => {

  console.log(`Server is running on port ${process.env.PORT}`);
}
);*/

// const express = require("express");
// const app = express();
// const session = require("express-session");
// const productRoutes = require('./routes/product.route');
// const userRoutes = require('./routes/user.route');
// const discountRoutes = require('./routes/discount.route');
// const authRoutes = require('./routes/authentication.route');
// const pageRoutes = require('./routes/pages.route');

// app.set("view-engine", "ejs");
// app.use(express.static("views"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "secret_key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// // app.use("/api/users", require("./routes/usersApi/getRoutes"));
// // app.use("/api/users", require("./routes/usersApi/postRoutes"));
// // app.use("/api/users", require("./routes/usersApi/putRoutes"));
// // app.use("/api/users", require("./routes/usersApi/deleteRoutes"));

// // app.use("/api/products", require("./routes/productsApi/getRoutes"));
// // app.use("/api/products", require("./routes/productsApi/postRoutes"));
// // app.use("/api/products", require("./routes/productsApi/putRoutes"));
// // app.use("/api/products", require("./routes/productsApi/deleteRoutes"));

// // app.use("/", require("./routes/view/authRoutes"));
// // app.use("/", require("./routes/view/viewRoutes"));

// // app.use("/api/discount", require("./routes/discountApi/applyDiscount"));
// // app.use("/api/discount", require("./routes/discountApi/removeDiscount"));

// app.use('/api', productRoutes);

// app.use('/api', userRoutes);

// app.use('/api', discountRoutes);

// app.use('/', authRoutes);

app.use("/", pageRoutes);

app.get("/protected", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

module.exports = app;
