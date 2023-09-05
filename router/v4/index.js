const express = require("express");
const router = express.Router();

var cookieParser = require("cookie-parser");
router.get("/login", (req, res) => {
  console.log(req.url);
  res.render("./UI/login.ejs");
});
router.get("/", (req, res) => {
  console.log(req.url);
  res.send(req.session);
});
router.get("/home", (req, res) => {
  console.log(req.url);
  res.render("./UI/home.ejs");
});
router.post("/getLogin", async (req, res) => {
  var headers = new Headers();
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  await fetch("http://localhost:3000/api/login", {
    method: "POST",
    mode: "same-origin",
    redirect: "follow",
    credentials: "same-origin", // Don't forget to specify this if you need cookies
    headers: headers,
    body: JSON.stringify(req.body),
  }).then(async (data) => {
    let user = await data.json();
    req.session.user = user;
    await fetch("http://localhost:3000/api/tests/", {
      headers: headers,
    }).then(async (test) => {
      let i = await test.json();
      if (!user.auth) {
        return res.redirect("/v4/login");
      } else {
        res.render("./UI/home.ejs", {
          user: user,
          test_Data: i,
        });
      }
    });
  });
});

router.get("/logout", async (req, res) => {
  let logout = await fetch("http://localhost:3000/api/logout", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  req.session.destroy();
  console.log(await logout.json());
  console.log(req.session);
  res.redirect("/v4/login");
});
router.get("/startTest/:id", async function (req, res) {
  test_id = req.params.id;
  user_id = req.session.user._id;
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  await fetch(`http://localhost:3000/api/tests?id=${test_id}`, {
    headers: headers,
  }).then(async (test) => {
    let i = await test.json();
    console.log(i.status);
    if (i[0].status === "FINISHED") {
      return res.send("TEST FINISHED");
    } else if (i[0].status === "UPCOMING") {
      return res.send("NOT STARTED YET");
    } else {
      let codingQuestion = [];
      let codingQuestionFeched = [];
      let multipleQuestion = [];
      codingQuestion.push(i[0].questions.coding);
      for (const i of codingQuestion[0]) {
        await fetch(`http://localhost:3000/api/questions/${"coding"}/${i}`, {
          headers: headers,
        }).then(async (question) => {
          let question_data = await question.json();
          codingQuestionFeched.push(question_data);
        });
      }
      // console.log(codingQuestionFeched);
      multipleQuestion.push(i[0].questions.multiple_choice);
      let multipleQuestionFetched = [];
      for (const i of multipleQuestion[0]) {
        await fetch(
          `http://localhost:3000/api/questions/${"multiple_choice"}/${i}`,
          {
            headers: headers,
          }
        ).then(async (question) => {
          let question_data = await question.json();
          multipleQuestionFetched.push(question_data);
        });
      }
      await fetch('http://localhost:3000/api/k',{
        method: 'POST',
        headers:headers,
        body: JSON.stringify({user_id:req.session.user._id})
      }).then(async (f)=> {
        let user = await f.json()
        console.log(f)
        res.render("./UI/testPage.ejs", {
          test_id: test_id,
          user: user,
          test_end: i[0].end_time,
          test : i[0],
          user: req.session.user,
          codingQuestion_data: codingQuestionFeched,
          multipleQuestion_data: multipleQuestionFetched,
        });
      })
    }
  });
});
router.post("/data", async function (req, res) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  if (req.body.test) {
    await fetch(`http://localhost:3000/api/submission/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req.body.test),
    });
  }
  if (req.body.coding) {
    for (const i of req.body.coding) {
      fetch(`http://localhost:3000/api/submission/code`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(i),
      }).then(async (result) => {
        console.log(await result.json());
      });
    }
  }
  res.render("./UI/feedback.ejs");
});
router.get("/result", async function (req, res) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  await fetch("http://localhost:3000/api/result/getall", {
    headers: headers,
  }).then(async (f) => {
    let k = await f.json();
    console.log(k);
    res.render("./UI/result.ejs");

  })

  
});
module.exports = router;
