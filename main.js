var $container = $("#flip_container");
var cards = [];

var size = 49;
var finished = 0;
var step_delay = 0;

function openCard(i, j, path, counter) {
  path = path || [];
  counter = counter || 0;

  // if (counter % 25 == 0) {
  //   $(".open").each(function() {
  //     var value = parseInt($(this).text());
  //     value = value > 5 ? value - 5 : value;
  //     var c = Math.floor((255 / 30) * (value + 6));
  //     $(this).text(value).css({backgroundColor: "rgb("+c+","+c+","+c+")"});
  //   });
  //   counter = 0;
  // }

  cards[i][j].$el.addClass("open");
  var value = parseInt(cards[i][j].$el.text());

  var c = Math.floor((255 / 30) * (value + 6));
  cards[i][j].$el.css({backgroundColor: "rgb("+c+","+c+","+c+")"});

  var next_i = i, next_j = j;
  if (value % 4 == 0) {
    next_i = Math.max(0, next_i-1);;
  } else if (value % 4 == 1) {
    next_j = Math.min(size-1, next_j+1);
  } else if (value % 4 == 2) {
    next_i = Math.min(size-1, next_i+1);
  } else if (value % 4 == 3) {
    next_j = Math.max(0, next_j-1);
  }
  // next can be opened
  if (!cards[next_i][next_j].$el.is(".open")) {
    window.setTimeout(function() {
      path.push([i, j]);
      openCard(next_i, next_j, path, counter+1);
    }, step_delay);
    return;
  }

  // try next direction, until full rotation
  var new_value = value + 5;
  cards[i][j].$el.text(new_value);
  if (new_value < 20) {
    window.setTimeout(function() {
      openCard(i, j, path, counter+1);
    }, step_delay);
    return;
  }

  finished++;
  var c = Math.floor((255 / (size*size)) * finished);
  cards[i][j].$el.css({backgroundColor: "rgb("+c+","+c+",0)"});

  // backtrace
  if (path.length > 0) {
    var previous_step = path.pop();
    window.setTimeout(function() {
      openCard(previous_step[0], previous_step[1], path, counter+1);
    }, step_delay);
    return;
  }
}

for (let i = 0; i < size; i++) {
  cards[i] = [];
  for (let j = 0; j < size; j++) {
    cards[i][j] = {
      y: i,
      x: j
    };
    cards[i][j].$el = $("<div class='flip_card' data-coords='" + i + ";" + j + "'>" +
      (Math.floor(Math.random() * 4)) +
    "</div>").on("click", function() {
      openCard(i, j);
    });
    $container.append(cards[i][j].$el);
  }
  $container.append("<div class='flip_end_of_row'></div>");
}


// cards[Math.floor(size/2)][Math.floor(size/2)].$el.addClass("open");
