module.exports = app => {
    const router = require("express").Router();
    const listEndpoints = require("express-list-endpoints");
    const controller = require("../controllers/controller");
    const homeController = require("../controllers/home");
    const uploadController = require("../controllers/upload");
    const authController = require("../controllers/auth");
    const middlewareAuth = require("../middleware/auth");

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    
    router.post("/churches", middlewareAuth.auth, controller.createChurch);
    router.post("/article", middlewareAuth.auth, controller.createArticle);
    router.post("/faq", middlewareAuth.auth, controller.createFaq);

    // Retrieve all Churches (filtered fields)
    router.get("/churches", middlewareAuth.auth, controller.churchFindAll);

    // Retrieve a single Church with id
    router.get("/churches/:id", middlewareAuth.auth, controller.churchFindOne);
    
    // Retrieve list of questions faq
    router.get("/faq", middlewareAuth.auth, controller.faqFindAll);

    // Retrieve a single FAQ with id
    router.get("/faq/:id", middlewareAuth.auth, controller.faqFindOne);

    // Retrieve list of articles
    router.get("/article", middlewareAuth.auth, controller.articleFindAll);

    // Retrieve a single article with id
    router.get("/article/:id", middlewareAuth.auth, controller.articleFindOne);

    // Retrieve list of weather
    router.get("/weather", middlewareAuth.auth, controller.weatherFindAll);

    // Retrieve dashboard data
    router.get("/dashboard", middlewareAuth.auth, controller.dashboardFindAll);

    // Retrieve overview data
    router.get("/overview", middlewareAuth.auth, controller.overviewFindAll);

    // Retrieve data gempa
    router.get("/gempa", middlewareAuth.auth, controller.gempaFindAll);

    // Retrieve data chart
    router.get("/chart", middlewareAuth.auth, controller.chartFindAll);

    // Retrieve data total
    router.get("/total", middlewareAuth.auth, controller.totalFindAll);

    // Retrieve data Vaccine
    router.get("/vaccine", middlewareAuth.auth, controller.vaccineFindAll);

    // Retrieve list of covid-19
    router.get("/covid", middlewareAuth.auth, controller.covidFindAll);

    // PUT
    router.put("/churches/:id", middlewareAuth.auth, controller.updateChurch);
    router.put("/article/:id", middlewareAuth.auth, controller.updateArticle);
    router.put("/faq/:id", middlewareAuth.auth, controller.updateFaq);

    // DELETE
    router.delete("/churches/:id", middlewareAuth.auth, controller.deleteChurch);
    router.delete("/article/:id", middlewareAuth.auth, controller.deleteArticle);
    router.delete("/faq/:id", middlewareAuth.auth, controller.deleteFaq);

    app.use("/api/", router);
};