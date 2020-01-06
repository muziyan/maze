class Maze {
    constructor() {
        //game difficulty
        this.levels = {
            easy:{
                color:"success",
                step:200,
                w:25,
                h:25
            },
            normal:{
                color:"warning",
                step:250,
                w:35,
                h:25
            },
            herd:{
                color:"danger",
                step:350,
                w:45,
                h:24
            }
        }

        //maze data
        this.maps = [];
        this.map = null;
        this.key = null;
        this.answer = null;
        this.player = {x:0,y:0};


        //game setting
        this.playing = false;
        this.volume = true;
        this.tips = false;

        //game info
        this.name = '';
        this.time = 0;
        this.uesd = 0;

        //add keyboard event
        this.keys = {};

        //music
        window.onload = ()=> this.$bgm = this.playAudio("7",true);
    }


    //maps data process
    setLevel(level){
        this.mpas = [];
        Object.assign(this,this.levels[level]);
        this.levels = level;
    }

    generate(){
        let map = new Array(this.h).fill(1).map(() => new Array(this.w).fill(1));
        console.log(map)
    }




    //create music
    playAudio(name,loop = false){
        let $audio = $(`<audio src="./music/${name}.mp3" autoplay ${loop ? 'loop' : ""}></audio>`).on("ended",function () {
            this.remove();
        })
        let audio = $audio.get(0);
        audio.volume = +this.volume;
        return $audio;
    }
}