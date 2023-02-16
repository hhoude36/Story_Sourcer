<div>
<h1>Story Sourcer</h2>
</div>

A crowd sourced bank of stories that can be used by language teachers who utilize the Comprehensible Input teaching method. Its goal is to allow teachers to share adapted stories with one another, saving them precious class planning time.

## Motivation

Prior to my career as a developer, I worked as a language teacher using a method called Comprehensible Input (CI). CI is based around stories and storytelling. Teachers use all sorts of stories from folktales to ones they made up. The stories are adapted into language that the student's can understand, requiring the teacher to translate them into simpler vocabulary.

As a teacher, this was something I spent a ton of time doing. With Story Sourcer, teachers can share their adapted stories with one another. The stories can then be filtered by various criteria such as the target age of students, the story's source, or the length of the story to ensure they can find stories that meet their student's needs.

## Screenshots 
![alt GIF of funcitoning site](https://res.cloudinary.com/dqfviar71/image/upload/v1676581484/ezgif.com-gif-maker_mguc5x.gif)

***

## Features 
- Bcrypt Encoding

## Technical Framework and Language Usage:
- Sequelize
- PostgreSQL
- Embedded JavaScript
- Express
- HTML
- Bootstrap
- CSS

## Build Status
Deployed@**[Story Sourcer](https://story-sourcer.onrender.com)**

## Usage
Sign-in and/or Sign-up.

***

## Future Goals
- [ ] Ability to upload images.
- [ ] Allow users to save and favorite stories.
- [ ] Add admin login capabilities including deleting stories.
- [ ] User profiles.
- [ ] Ability to search by creator.

## Challenges
- Time managing just one(1) week to complete in a bootcamp setting.
- Learning to upload images. I initially tried to upload images to the database directly, which was not very efficient. Since I've learned to use cloud based photo storage and instead upload a link to the database. I look forward to implementing this into this project. 
- Developing the filter function, allowing a user to search based on multiple criteria. Snippet below. 

    `app.post('/search', async function(req, res){
    const {theTitle, theAge, theMood, theLength, theLevel, theSource} = req.body;
    let results = await Stories.findAll({
    where: {
    [Sequelize.Op.and]: [
    {title: {[Sequelize.Op.iLike]:'%' + theTitle + '%'}},
    // // {alt_title: {[Sequelize.Op.iLike]:'%' + theTitle + '%'}},
    {age: {[Sequelize.Op.iLike]:'%' + theAge + '%'}},
    {source: {[Sequelize.Op.iLike]:'%' + theSource + '%'}},
    {mood: {[Sequelize.Op.iLike]:'%' + theMood + '%'}},
    {length: {[Sequelize.Op.iLike]:'%' + theLength + '%'}},
    {level: {[Sequelize.Op.iLike]:'%' + theLevel + '%'}}
    ]}})
    res.render("search", {results})
    })
    `


## Triumphs
- Solidifying my understanding of postgreSQL, Express, and embedded JavaScript
- Using a framework for the design for the first time. 
- Incorporating user and password authentication. 

***
