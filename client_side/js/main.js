const view = new View("main");
const maze = new Maze();

//info btn
$("[data-info]").on("click",function () {
    let info = $(this).data("info");
    switch (info) {
        case "prev":
            view.layerBack();
            break;
        case "home":
            view.layerUpdate("main");
            break;
        case "volume":
            maze.volume = !maze.volume;
            $(this)[`${maze.volume  ? 'add' : 'remove'}Class`]("active");
            break;
        case "play":
            maze.playing = !maze.playing;
            $(this)[`${maze.playing  ? 'add' : 'remove'}Class`]("active");
            break;
        case "sign":

            break;
    }
});


// click to switch layer
$("[data-layer]").on("click",function () {
    view.layerUpdate($(this).data("layer"));
});


// set logo class
let $logo = $(".logo");
view.listen("main", ()=> {
    $logo.addClass("logo-start")
},()=>{
    $logo.removeClass("logo-start")
});


// select level
$("[data-level]").on("click",function () {
    let level = $(this).data("level");
    maze.setLevel(level);
    view.layerUpdate("manage")
});

let preview = $(".preview");
view.listen("manage",()=>{
    $(".label").text(maze.levels).attr("class",`label label-${maze.color}`)
    maze.generate();
    preview.each((index,box)=>{
        $(box).find("img").remove();
        drawMaze(maze.maps[index],$(box),8,8)
    })
});

$('[data-select]').on("click",function () {
    maze.select($(this).data("select"));
    view.layerUpdate("game");
});

view.listen("game",()=>{
    drawMaze(maze.map,$(".map-box"),25,25)
});

