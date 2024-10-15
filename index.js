const express = require("express")
const app = express();
const router = express.Router();
const path = require("path")
const logger = require("morgan")
const multer = require("multer") // for uploading files to the server

const upload = multer(({ dest: "./public/uploads" })) // destination for files to get uploaded
const port = 3001;

// Built-in middleware  --> Built in middleware of the ExpressJS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public"))) // used to display statis files

// Application-level middle ware

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
    next();
}

app.use(loggerMiddleware);

// Third party middleware
app.use(logger("dev"));

// Router-level middleware

app.use("/api/users", router);

const fakeAuth = (req, res, next) => {
    const authStatus = true;
    if (authStatus) {
        console.log("User Authenticated", authStatus)
        next();
    } else {
        res.status(401);
        throw new Error("User is not Authenticated");
    }
};

const getUsers = (req, res) => {
    res.json({ message: "Get all users" })
}

const createUser = (req, res) => {
    console.log("Request from the Client to create new User : ", req.body);
    res.json({ message: "Create new user" })
}

router.use(fakeAuth); // fakeAuth as middleware , checking first what is sent
router.route("/").get(getUsers).post(createUser);

// Error-handling middleware   --> /* changning the error response into a json string instead of HTML  */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    switch (statusCode) {
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
            })
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
            })
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: err.message,
            })
            break;

        default:
            break;
    }

}

// Uploading Files to the server
app.post("/upload", upload.single("image"), (req, res, next) => {
    console.log(req.file, req.body)
    res.send(req.file)
}, (err, req, res, next) => {
    res.status(404).send({ err: err.message })
})

app.all("*", (req, res) => {
    res.status(404);
    throw new Error("Route not Found");
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running on Port: ${port}`)
})