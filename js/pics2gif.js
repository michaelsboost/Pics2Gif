// load svg file
function previewFiles() {
  var files   = openfile.files;
  
  function loadfile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.src = e.target.result;
      dimensions.src = e.target.result;
      animWidth.value = dimensions.width;
      animHeight.value = dimensions.height;
      imgframes.appendChild(img);
      scripttxt.className = "bounceInUp bounceInUp1s blacktxt";
      btns.className = "bounceInUp bounceInUp1s";
    };
    reader.readAsDataURL(file);
  }
  
  if (files) {
    [].forEach.call(files, loadfile);
  }
};
function dropfile(event) {
  var dt    = event.dataTransfer;
  var files = dt.files;
  var count = files.length;
  
  for (var i = 0; i < files.length; i++) {
    if (files[i].type === "image/svg+xml") {
      alertify.alert("Sorry SVG files are not allowed. Please convert it to a PNG!").set("basic", true);;
      return false;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.src        = e.target.result;
      dimensions.src = e.target.result;
      animWidth.value = dimensions.width;
      animHeight.value = dimensions.height;
      imgframes.appendChild(img);
      scripttxt.className = "bounceInUp bounceInUp1s blacktxt";
      btns.className = "bounceInUp bounceInUp1s";
    };
    reader.readAsDataURL(files[i]);
  }
};

openfile.onchange = function() {
  previewFiles();
  
  dropflash.classList.remove("hide");
  $("#dropflash").fadeOut();
};
read.ondragover   = function(e) {
  this.style.opacity = ".5";
  return false;
};
read.ondragend    = function() {
  read.style.opacity = "1";
  return false;
};
read.ondrop       = function(e) {
  e.preventDefault();
  read.style.opacity = "1";
  dropflash.classList.remove("hide");
  $("#dropflash").fadeOut();
  dropfile(event);
  return false;
};

// create the gif animation
creategif.onclick = function() {
  // hide elements
  read.classList.add("hide");
  scripttxt.classList.add("hide");
  creategif.classList.add("hide");
  
  // show process and then display result
  showprocess.classList.remove("hide");
  var images = [];
  $("#imgframes img").each(function() {
    images.push($(this).attr("src"));
  });
  
  gifshot.createGIF({
    images: images,
    gifWidth: animWidth.value,
    gifHeight: animHeight.value,
    interval: animRate.value, // seconds
    progressCallback: function(captureProgress) { console.log('progress: ', captureProgress); },
    completeCallback: function() { console.log('completed!!!'); },
    numWorkers: 2,
  },function(obj) {
    if(!obj.error) {
      var image = obj.image;
      result.src = image;
      showit.classList.remove("hide");
      exportgif.classList.remove("hide");
      showprocess.classList.add("hide");
    }
  });
};

// export gif animation
exportgif.onclick = function() {
  this.href = result.src;
};

// initiate animation when values change
animRate.style.width    = ((animRate.value.length + 1) * 30) + "px";
animWidth.style.width   = ((animWidth.value.length + 1) * 30) + "px";
animHeight.style.width  = ((animHeight.value.length + 1) * 30) + "px";
animRate.onkeydown    = function(e) {
  this.style.width  = ((this.value.length + 1) * 22) + "px";
}
animWidth.onkeydown   = function(e) {
  this.style.width  = ((this.value.length + 1) * 22) + "px";
}
animHeight.onkeydown  = function(e) {
  this.style.width  = ((this.value.length + 1) * 22) + "px";
}