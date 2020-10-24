// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyCL_BM_Ae8LMQyFmKeYQ0ZIH_kreP7JG0s",
	authDomain: "fir-487bf.firebaseapp.com",
	databaseURL: "https://fir-487bf.firebaseio.com",
	projectId: "fir-487bf",
	storageBucket: "fir-487bf.appspot.com",
	messagingSenderId: "222737337682",
	appId: "1:222737337682:web:5eac38dff6b02174a73e8b",
	measurementId: "G-8H7MMJ56RZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const settings = {};
db.settings(settings);


function GoogleLogIn() {
	console.log("Success!!!!!");
	//afterlog();
	//userdet(result.additionalUserInfo.profile);
	var base = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(base).then(function(result) {
		console.log(result);
		console.log("new = " + result.additionalUserInfo.isNewUser);
		console.log("signed!!!!!");
		afterlog();
		userdet(result.additionalUserInfo.profile);
		if (result.additionalUserInfo.isNewUser) {
			databnew(result.additionalUserInfo.profile);
		}
		else {
			databold(result.additionalUserInfo.profile);
		}
	}).catch(function(err) {
		console.log(err);
		console.log("Fail?????");
	})
}

function GoogleLogOut() {
	console.log("log out!!!!!");
	firebase.auth().signOut();
	console.log("yess lo out");
	beforelog();
}

function afterlog() {
	document.getElementById("vueSearch").style.display = "inline-block";
	document.getElementById("logoutbut").style.display = "inline-block";
	document.getElementById("user").style.display = "inline-block";
	document.getElementById("loginbut").style.display = "none";
}

function beforelog() {
	document.getElementById("vueSearch").style.display = "none";
	document.getElementById("logoutbut").style.display = "none";
	document.getElementById("user").style.display = "none";
	document.getElementById("loginbut").style.display = "inline-block";
}

function userdet(r) {
	var use = '<div style="display: inline-block; margin: 40px; vertical-align: middle">';
	use += '<input type="image" src="' + r.picture + ' style="height: 60px; width: 60px; border-radius: 60px;"></div>';
	use += '<div class="userde">' + r.name + '<br>' + r.email + '</div>';
	document.getElementById('user').innerHTML = use;
}

function databnew(r) {
	console.log("database baby!!!!!!!!!!");
	db.collection("users").add({
		name: r.name,
		email: r.email,
		picture: r.picture
	});
	console.log("database added!!!!!!!!!!");
}

function databold(r) {
	console.log("database baby!!!!!!!!!!");
	db.collection("users").where("email", "==", r.email).get().then(function(querySnapshot) {
		querySnapshot.forEach(function(document) {
			document.ref.update({
				name: r.name,
				email: r.email,
				picture: r.picture
			});
		});
	});
	console.log("database added!!!!!!!!!!");
}
