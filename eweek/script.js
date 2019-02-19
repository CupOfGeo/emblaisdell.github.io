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
  })
});
