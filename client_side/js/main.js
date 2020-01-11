const view = new View("main");
const maze = new Maze();

//win
maze.win = function(){
    
};

//lose
maze.lose = function(){

};

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
            $(this)[`${maze.volume  ? 'remove' : 'add'}Class`]("active");
            break;
        case "play":
            maze.playing = !maze.playing;
            $(this)[`${maze.playing  ? 'remove' : 'add'}Class`]("active");
            break;
        case "sign":
            maze.tips = !maze.tips;
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

// create maze preview
let preview = $(".preview");
view.listen("manage",()=>{
    $(".label").text(maze.level).attr("class",`label label-${maze.color}`)
    maze.generate();
    preview.each((index,box)=>{
        $(box).empty();
        drawMaze(maze.maps[index],$(box),8,8)
    })
});

//Determine the maze
$('[data-select]').on("click",function () {
    maze.select($(this).data("select"));
    maze.name = prompt("Input your name first");
    if (maze.name) view.layerUpdate("game");
});

// generate maze
view.listen("game",()=>{
    maze.init($(".map-box"));
    $(".info").addClass("show-info");
    $(".text").addClass("show-info");
},()=>{
    $(".info").removeClass("show-info");
    $(".text").removeClass("show-info");
});


