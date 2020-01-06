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
                h:25
            }
        };

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

    generate() {
        let map = new Array(this.h).fill(1).map(() => new Array(this.w).fill(1));
        let xMid = this.w / 2 | 1;
        let yMid = this.h / 2 | 1;
        let queue = [
            [xMid, yMid]
        ];
        map[yMid][xMid] = 0;
        while (queue.length){
            let [x,y] = queue.last();
            let arounds = [
                [x-2, y],
                [x+2, y],
                [x, y-2],
                [x, y+2]
            ].filter(pos => map[pos[1]] && map[pos[1]][pos[0]]);
            let next = arounds.rand();
            if (next){
                map[next[1]][next[0]] = 0;
                map[(next[1] + y)/2][(next[0]+x)/2] = 0;
                queue.push(next)
            }else queue.pop();
        }

        map[1][0] = 0;
        map[this.h - 2][this.w - 1] = 0;
        this.maps.push(map);
        return (this.maps.length < 6) ? this.generate() : this.maps;
    }

    select (index) {
        this.map = JSON.parse(JSON.stringify(this.maps[index]));
    }


    //create music
    playAudio (name, loop = false) {
        let $audio = $(`<audio src="music/${name}.mp3" autoplay ${loop ? 'loop' : ''}></audio>`).on('ended', function () {
            this.remove()
        }).appendTo('body')
        let audio = $audio.get(0)
        audio.volume = +this.volume
        return $audio
    }
}