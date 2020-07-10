var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var user = req.body
        var bestFriendIndex = 0;
        var minimumDifference = 1000;

        for(var i = 0; i < friends.length; i++) {
          var totalDifference = 0;
          for(var j = 0; j < friends[i].scores.length; j++) {
            totalDifference += Math.abs(user.scores[j] - friends[i].scores[j]);
          }
          //if new min change index and update min/
          if(totalDifference < minimumDifference) {
            bestFriendIndex = i;
            minimumDifference = totalDifference;
          }
        }

        friends.push(user); 
        res.json(friends[bestFriendIndex]);
      
    });

};
