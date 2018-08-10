var friends = require('../data/friends.js');

module.exports = function(app) {

    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res){
        // friends.push(req.body);
        console.log(req.body);
        // res.json(true);

        var bestMatch = {
            name: "",
            photo:"",
            friendDifference: 100
        };


        var newFriend = req.body;
        var userScores = newFriend.scores;

        // console.log(newFriend scores);
        console.log(userScores); 

        //create a variable that calculates the difference between the new friend's score and the scores of every other user in the database
        var totalDifference = 0;

        //loop through each friend
        for(var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            //loop through the scores of each friend
            for (var j  = 0; j < friends[i].scores[j]; j++){
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if(totalDifference <= bestMatch.friendDifference){

                    //connect bestMatch to the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // push the new friends's data into the friends.js database.
        friends.push(newFriend);
        
        //return a JSON with best match to rend to HTML page
        res.json(bestMatch);
        
    })
}