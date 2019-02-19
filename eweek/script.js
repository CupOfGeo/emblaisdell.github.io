//SMOOTHING
AFRAME.registerComponent("listener", {
  init: function() {
    this.target = document.querySelector('#target'); // your video
    this.prevPosition = null; // initially there is no position or rotation
    this.prevRotation = null;
  },

  tick: function() {
    if (this.el.object3D.visible) {
      this.target.setAttribute('visible', 'true')

      if(!this.prevPosition && !this.prevRotation) {
        // there are no values to lerp from - set the initial values
        this.target.setAttribute('position', this.el.getAttribute('position'))
        this.target.setAttribute('rotation', this.el.getAttribute('rotation'))
      } else {
        // use the previous values to get an approximation
        this.target.object3D.position.lerp(this.prevPosition, 0.1)

        // this (below) may seem ugly, but the rotation is a euler, not a THREE.Vector3,
        // so to use the lerp function i'm doing some probably unnecessary conversions
        let rot = this.target.object3D.rotation.toVector3().lerp(this.prevRotation, 0.1)
        this.target.object3D.rotation.setFromVector3(rot)
      }
      // update the values
      this.prevPosition = this.el.object3D.position
      this.prevRotation = this.el.object3D.rotation
    } else {
     // the marker dissapeared - reset the values
     this.target.setAttribute('visible', 'false')
     this.prevPosition = null;
     this.prevRotation = null;
   }
  }
})


// MEMES
var memes = [
  {
    pos:[-6,0],
    name:"meme00.jpg"
  },
  {
    pos:[6,0],
    name:"meme02.jpg"
  }
];

function addImage(image){
  var position = image.pos[0]+" "+image.pos[1]+" 0";
  console.log(position);
  $('<a-image />', {
    id: image.name+"_hiro",
    class: "",
    position: position,  // doesn't seem to do anything, known issue
    scale: "4 4 4",
    rotation: "-90 0 0",
    src: image.name,
    appendTo : $('#hiro-marker')
  });
  document.getElementById(image.name+"_hiro").setAttribute("position", position); // this does set position as a workaround
  $('<a-image />', {
    id: image.name,
    class: "",
    position: position,  // doesn't seem to do anything, known issue
    scale: "4 4 4",
    rotation: "-90 0 0",
    src: image.name,
    appendTo : $('#banner-marker')
  });
  document.getElementById(image.name).setAttribute("position", position); // this does set position as a workaround
}


$(function(){
  $.each(memes,function(i,meme){
    console.log(meme);
    addImage(meme);
  });
});


//cursor
document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
  var keyCode = e.keyCode;
  console.log("key press "+keyCode);
  if(keyCode==13){ // enter
    $("#cursor").attr("visible","true");
  }
}
