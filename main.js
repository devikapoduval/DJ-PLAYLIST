songFIREWORK = ""
songROAR = ""
leftwristX = ""
leftwristY = ""
rightwristX = ""
rightwristY = ""
song1_status = ""
song2_status = ""
scoreLeftWrist = ""
scoreRightWrist = ""
function preload() {
  songFIREWORK = loadSound("FIREWORK.mp3");
  songROAR = loadSound("ROAR.mp3");
}

function setup() {
  canvas = createCanvas(300, 250);
  canvas.center();
  video = createCapture(VIDEO)
  video.hide()
  video.size(300, 250)
  poseNet = ml5.poseNet(video, modelloaded)
  poseNet.on('pose', gotPoses)
}

function modelloaded() {
  console.log("Posenet is Intialized")
}


function draw() {
  image(video, 0, 0, 300, 250)
  song1_status = songROAR.isPlaying()
  song2_status= songFIREWORK.isPlaying()
  //if (scoreRightWrist > 0.2) {
    console.log("Right wrist score = " + scoreRightWrist);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightwristX, rightwristY, 20);
    songROAR.stop();

    if (song1_status == false) {
      songFIREWORK.play();
      document.getElementById("song").innerHTML = "Playing - FIREWORK"
    }
 // }
  //if (scoreLeftWrist > 0.2) {
    console.log("Left wrist score = " + scoreLeftWrist);
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftwristX, leftwristY, 20);
    songFIREWORK.stop();

    if (song2_status == false) {
      songROAR.play();
      document.getElementById("song").innerHTML = "Playing -ROAR "
    }
 // }
}



function gotPoses(result) {
  if (result.length > 0) {
    console.log(result);
    scoreLeftWrist = result[0].pose.keypoints[9].score;
    leftwristY = result[0].pose.leftWrist.y;
    leftwristX = result[0].pose.leftWrist.x
    rightwristY = result[0].pose.rightWrist.y
    rightwristX = result[0].pose.rightWrist.x
    console.log("leftWristX= " + leftwristX)
    console.log("leftWristY= " + leftwristY)
    console.log("rightWristX= " + rightwristX)
    console.log("rightWristY= " + rightwristY)
  }

}