 var config = {
    apiKey: "AIzaSyDmi6qgpfnoCZ8a2FM2APfX74dXfiJ9PFY",
    authDomain: "takethatfordata-8f719.firebaseapp.com",
    databaseURL: "https://takethatfordata-8f719.firebaseio.com",
    projectId: "takethatfordata-8f719",
    storageBucket: "takethatfordata-8f719.appspot.com",
    messagingSenderId: "211430446462"
  };
  firebase.initializeApp(config);
  var db = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //This code creates the player selection buttons
    var ref = db.ref("/users/" + user.uid + "/teams");
	ref.on("child_added", function (snapshot) {
	  var ss = snapshot.val();
	  var reff = db.ref("/users/" + user.uid + "/teams/" + snapshot.key + "/season_" +
	    ss.active_season + "/players/");
	  reff.on("child_added", function (snapshot_player) {
	    snap = snapshot_player.val();
	    var ele = document.createElement("li");

		var a = document.createElement("a");
		a.href = "#";
		ele.appendChild(a);
		
	    var v = document.createTextNode(snap.firstname + " " + snap.lastname);
		a.appendChild(v);
	    //ele.value = snap.firstname + " " + snap.lastname;
		//ele.name = snapshot_player.key;
		ele.onclick = function() {
		  document.getElementById("player").innerHTML = ele.value;
		  document.getElementById("playerkey").innerHTML = ele.name;
		};
		var playerlist = document.getElementById("playerbuttons");
		playerlist.appendChild(ele);
	  });
	});
	
	//Fill Team, Season, Game info
	ref.on("child_added", function (snapshot) {
		var ss = snapshot.val();
		document.getElementById("teamname").innerHTML = ss.name;
		document.getElementById("active_season").innerHTML = "Season " + ss.active_season;
		var str = ss.active_game.split("_");
		document.getElementById("active_game").innerHTML = "Game: " + decodeURIComponent(str[0]);
		/*  
		var reff = db.ref("/users/" + user.uid + "/teams/" + snapshot.key + "/season_" 
		  + ss.active_season + "/games/" + ss.active_game);
		reff.once("value", function(snap) {
			document.getElementById("active_game").innerHTML = "Game: " + snap.date + " vs " + snap.opponent;
		});*/
	});
	
	//Creates stat labels with plus minus buttons
	/*
	var ref = db.ref("/statistics");
	ref.on("child_added", function (snapshot) {
	  var element = document.createElement("div");
	  element.innerHTML = snapshot.key;
      element.name = snapshot.key;
	  element.id = snapshot.key;
	  
	  var plus = document.createElement("input");
	  plus.type = "button";
	  plus.value = "+";
	  plus.id = snapshot.key;
	  plus.onclick = function() {
	    plusminus(this.id, true);
	  };
	  
	  var minus = document.createElement("input");
	  minus.type = "button";
	  minus.value = "-";
	  minus.onclick = function() {
	    plusminus(this.id, false);
	  };
	  
	  element.appendChild(plus);
	  element.appendChild(minus);
	  var form = document.getElementById("statbuttons");
	  form.appendChild(element);
	});
	*/
  } else {
    console.log("Error not logged in");
  }
});