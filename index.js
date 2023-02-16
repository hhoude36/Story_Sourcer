const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3000;
const Sequelize = require('sequelize');
const { Users, Stories, Reviews } = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config
// const multer = require('multer');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
    session({
        secret:'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure:false,
            maxAge: 259200000
        }
    }));
    app.set('view engine', 'ejs');
    app.listen(portNumber, function(req, res){
    })

//images
//============================================
    const createStory = async (req, res) => {
        try {
         const story = await Stories.create({
          title: req.body.title,
          description: req.body.description,
          userId: req.body.userId,
           //add the lines below
          imageType: req.file.mimetype,
          imageName: req.file.originalname,
          imageData: req.file.buffer, 
           //add the lines above
         });
          return res.status(201).json({ story });
         } catch (error) {
          return res.status(500).json({ error: error.message });
         }
        };


        const getAllStories = async (req, res) => {
            console.log("getAllStories")
            try {
             const stories = await Stories.findAll({
             include: [
              {
               model: Stories,
               as: "createdBy",
               },
              ],
             })
           .then(stories => {
            console.log(stories)
            stories.map(story => {
                console.log(story)
               const storyImage = story.imageData.toString('base64')
               story['imageData'] = storyImage
              });
             return stories;
            })
            .then(stories => {
            return res.status(200).json({stories: stories})
           })
           } catch (error) {
            return res.status(500).send(error.mesage);
           }
           };


//checking auth for passwords
//============================================




function checkAuth(req, res, next) {
    // if there is user info in the session, continue
    if (req.session.user) {
      next();
    // or if the user is accessing the login page, same
    } else if (req.path == '/login') {
      next();
    // otherwise, redirect to login page
    }
    else if (req.path == '/register') {
        next();
    } else {
      res.redirect('/login');
    }
  }


  //registration page
//============================================
app.get('/register', async function(req, res){
    res.render("register")
})

app.post('/register', async function(req, res){
    const {theFirstName, theLastName, theUsername, thePassword}= req.body;
    console.log(thePassword, "the password");
    console.log(salt, "salt");

    let theHashedPassword = bcrypt.hashSync(thePassword,salt);

    let theNewUser = await Users.create({
        username: theUsername,
        password: theHashedPassword,
        first_name: theFirstName,
        last_name: theLastName,
    },
    )
    console.log(theNewUser, "new user")
    res.redirect('/login')
})

//index
app.get('/', async function(req,res){
    res.redirect("/login");
            });

//login page
//============================================
app.get('/login', async function(req,res){
    res.render("login");
            });


app.post('/login', async function(req,res){
    const {loginUsername, loginPassword} = req.body;
    let theUser = await Users.findOne({
        where: {username: loginUsername}
        })
        let theResult = await bcrypt.compare(req.body.loginPassword, theUser.password)
        if(theResult){
            req.session.user = theUser;
            res.redirect('/dashboard');
        }
        else{
            res.redirect('/login')
        }
     
            });

  
//dashboard
//============================================
app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard.ejs', {Users: req.session.user,});
   });


//search results
//============================================
app.get('/search', async function(req, res){
    const getAllStories = async (req, res) => {
        console.log("getAllStories")
        try {
         const stories = await Stories.findAll({
        //  include: [
        //   {
        //    model: Stories,
        //    as: "createdBy",
        //    },
        //   ],
         })
       .then(stories => {
        console.log(stories)
        stories.map(story => {
            console.log(story)
           const storyImage = story.imageData.toString('base64')
           story['imageData'] = storyImage
          });
         return stories;
        })
        .then(stories => {
        return res.status(200).json({stories: stories})
       })
       } catch (error) {
        return res.status(500).send(error.mesage);
       }
       };    
       
       res.render("search");
})

//FILTERING
app.post('/search', async function(req, res){
    const {theTitle, theAge, theMood, theLength, theLevel, theSource} = req.body;
    let results = await Stories.findAll({
    where: {
            [Sequelize.Op.and]: [
                {title: {[Sequelize.Op.iLike]:'%' + theTitle + '%'}},
            //     // {alt_title: {[Sequelize.Op.iLike]:'%' + theTitle + '%'}},
                {age: {[Sequelize.Op.iLike]:'%' + theAge + '%'}},
                {source: {[Sequelize.Op.iLike]:'%' + theSource + '%'}},
                {mood: {[Sequelize.Op.iLike]:'%' + theMood + '%'}},
                {length: {[Sequelize.Op.iLike]:'%' + theLength + '%'}},
                {level: {[Sequelize.Op.iLike]:'%' + theLevel + '%'}}
            ]
            }
        })
    // console.log(results);
    res.render("search", {results})
    })

    
//individual stories
//============================================ 
app.get('/story/:storyid', async function(req, res){
        const {storyid} = req.params;
        let theStory = await Stories.findByPk(storyid);
        const theReviews = await Reviews.findAll({
            include: Users,
            where:{
                story_id: storyid
            }
        });
        console.log(theReviews)
        res.render("story", {theStory, theReviews});
    })


    app.post('/story/:storyid', async function(req, res){
        const {storyid} = req.params;
        // console.log(req.session.user);
        let theStory = await Stories.findByPk(storyid);
    //this is where you are searching for the results of the input form in the body.  You need to name the input in the ejs so it can be searched for. 
        const {theNewRating, theNewReview} = req.body;

        let updatedUser = Reviews.create({
            reviewAuthor_id: req.session.user.id,
            story_id: storyid,
            rating: theNewRating,
            text: theNewReview,
        },
        res.redirect('/dashboard')
        )
         })

//add a story 
//============================================
app.get('/add', async function(req, res){
        res.render("add");
    })

app.post('/add', async function(req, res){
        const {theTitle, theAge, storyImage, theSource, theMood, theLevel, theLength, theText, theNotes} = req.body;
        console.log(req.file);

        let theNewStory = Stories.create({
            author_id: req.session.user.id,
            title: theTitle,
            age: theAge,
            mood: theMood,
            length: theLength,
            level: theLevel,
            source: theSource,
            text: theText,
            comments: theNotes,
            imageData: storyImage
        },
        res.redirect('/dashboard')
        )
         })

//error page
//============================================
app.get('/error', async function(req, res){
    res.render("error");
})

// //error page
// //============================================
// app.get('/*', async function(req, res){
//     res.send("Woops!");
// })


// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

// const addAStoryButton = document.getElementById('addAStory')
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// addAStory.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })