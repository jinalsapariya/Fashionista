// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
// Use MongoDB
var mongodb = require("mongodb");
const { stringify } = require("querystring");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The products collection
var PRODUCTS_COLLECTION = "products";
var USER_COLLECTION = "users";

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Local database URI.
const LOCAL_DATABASE = "mongodb+srv://jinal123:jinal123@mongocluster.mzvuj.mongodb.net/tcsdb?retryWrites=true&w=majority";
// Local port.
const LOCAL_PORT = 8080;

// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function(error, client) {

    // Check if there are any problems with the connection to MongoDB database.
    if (error) {
        console.log(error);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    database = client.db();
    console.log("Database connection done.");

    // Initialize the app.
    var server = app.listen(process.env.PORT || LOCAL_PORT, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function(req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/products"
 *  GET: finds all products
 */
app.get("/api/products", function(req, res) {
    database.collection(PRODUCTS_COLLECTION).find({}).toArray(function(error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/products"
 *   POST: creates a new product
 */
app.post("/api/products", function(req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).insertOne(product, function(err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.get("/api/getProduct", function(req, res) {

    // '/getUserByEmail?email='+email
    console.log(req.query.name);
    const pname = req.query.name;
    const query = { name: "" + pname };
    console.log(query);

    database.collection(PRODUCTS_COLLECTION).findOne(query, function(err, result) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(result);
            res.status(201).json(result);
        }
    });
    // console.log(product);
});

/*  "/api/products/:id"
 *   DELETE: deletes product by id
 */
app.delete("/api/products/:id", function(req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

// --------------------------------------------------- User APIs--------------------------------------------------------------

app.post("/api/user", function(req, res) {
    var user = req.body;
    database.collection(USER_COLLECTION).insertOne(user, function(err, doc) {
        if (err) {
            manageError(res, err.message, "Failed to create new user.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
})

app.get("/api/loginUser", function(req, res) {
    database.collection(USER_COLLECTION).findOne({
        email: "" + req.query.email,
        password: "" + req.query.password
    }, function(err, result) {
        if (err) {
            manageError(res, err.message, "");
        } else {
            console.log(result);
            res.status(201).json(result);
            console.log(result.type);
        }
    })
})

// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}