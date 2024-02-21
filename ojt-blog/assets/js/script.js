
const year = new Date().getFullYear();

const firstOfFeb = new Date(year, 1, 1);

function isWeekend(date) {
  const day = date.getDay();
  return day === 5 || day === 6; // Sunday is 0, Saturday is 6
}

// Initialize currentDate to the 1st of February
let currentDate = new Date(firstOfFeb.getTime());
console.log("Start Date:", currentDate.toDateString());

let workingHours = 0;

while (workingHours < 486) {
  if (!isWeekend(currentDate)) {
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day
    workingHours += 8;
    console.log(
      "Working Hours:",
      workingHours,
      "Date:",
      currentDate.toDateString()
    );
  } else {
    currentDate.setDate(currentDate.getDate() + 1); // Skip the weekend, move to Monday
  }
}

const endDate = currentDate;
let timer = setInterval(function () {
  // get today's date
  const today = new Date().getTime();
  const month = new Date().getMonth();
  // get the difference
  let diff;
  diff = endDate - today;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const timer = document.getElementById("timer");
  if(timer){
    document.getElementById("timer").innerHTML =
        '<div class="days"> \
    <div class="numbers">' +
        days +
        '</div>days</div> \
    <div class="hours"> \
    <div class="numbers">' +
        hours +
        '</div>hours</div> \
    <div class="minutes"> \
    <div class="numbers">' +
        minutes +
        '</div>minutes</div> \
    <div class="seconds"> \
    <div class="numbers">' +
        seconds +
        "</div>seconds</div> \
    </div>";
  }
  
}, 1000);


var productGallery = function () {
    var gallery = document.querySelectorAll('.product-gallery');
    if (gallery.length) {
      var _loop3 = function _loop3(i) {
        var thumbnails = gallery[i].querySelectorAll('.product-gallery-thumblist-item:not(.video-item)'),
          previews = gallery[i].querySelectorAll('.product-gallery-preview-item'),
          videos = gallery[i].querySelectorAll('.product-gallery-thumblist-item.video-item');
        for (var n = 0; n < thumbnails.length; n++) {
          thumbnails[n].addEventListener('click', changePreview);
        }

        // Changer preview function
        function changePreview(e) {
          e.preventDefault();
          for (var _i = 0; _i < thumbnails.length; _i++) {
            previews[_i].classList.remove('active');
            thumbnails[_i].classList.remove('active');
          }
          this.classList.add('active');
          gallery[i].querySelector(this.getAttribute('href')).classList.add('active');
        }

      };
      for (var i = 0; i < gallery.length; i++) {
        _loop3(i);
      }
    }
  }();