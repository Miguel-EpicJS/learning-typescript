import express, { Express } from "express";
import routes from "./routes/posts";

const router: Express = express();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    next();
});

router.use("/", routes);

router.use((req, res, next) => {
    const error: Error = new Error("not found");
    return res.status(404).json({
        message: error.message
    });
});

const PORT: any = process.env.PORT ?? 3000;
router.listen(PORT, () => console.log(`The server is running on port ${PORT}`));