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
        this.maps = [];
        Object.assign(this, this.levels[level]);
        this.level = level;
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
        this.answer = this.getAnswer();
        this.key = this.getKey();
    }

    init($board){
        this.$board = $board;
        this.player = {x : 0, y : 0};
        this.playing = true;
        this.tips = false;
        this.time = 0;
        this.used = 0;
        this.render();
        if (this.$bgm) this.$bgm.remove();
        this.$bgm = this.playAudio("8",true);
    }

    getAnswer(){
        let queue = [
            ['0_1']
        ];
        let been = ['0_1'];
        let target = `${this.w-1}_${this.h -2}`;
        while (queue.length){
            let path = queue.shift();
            let last = path.last();
            if (last === target) return path;

            let [x,y] = last.split("_").map( num => +num);
            let arounds = [
                [x - 1, y],
                [x + 1, y],
                [x ,y - 1],
                [x ,y + 1]
            ];
            for(let i = 0,len = arounds.length;i < len; i++ ){
                let [nextX,nextY] = arounds[i];
                if (this.map[nextY] && this.map[nextY][nextX] === 0){
                    let nextStr = `${nextX}_${nextY}`;
                    if (!been.includes(nextStr)){
                        queue.push(path.concat(nextStr));
                        been.push(nextStr);
                    }
                }
            }
        }
    }

    getKey(){
        while (true){
            let randX = rand(1,this.w-2);
            let randY = rand(1,this.h-2);
            if (this.map[randY][randX] === 0 && !this.answer.includes(`${randX}_${randY}`)){
                return [randX,randY]
            }
        }
    }

    render(){
        this.$board.css({
            "width" : this.w * 30,
            "height" : this.h * 30
        }).empty();
        for (let y = 0; y < this.h; y++){
            for (let x = 0; x < this.w; x++){
                if (this.map[y][x]) $(`<div class="box" style="top:${y * 30}px;left: ${x * 30}px"></div>`).appendTo(this.$board);
                else if (this.answer.includes(`${x}_${y}`)) $(`<div class="tips" style="top:${y * 30}px;left: ${x * 30}px"></div>`).appendTo(this.$board)
            }
        }
        this.map[this.h - 2][this.w - 1] = 1;
        this.$player = $('<div class="player" style="transform: translate(0,30px)"></div>').appendTo(this.$board);
        this.$key = $(`<div class='key' style='left:${(this.key[0])*30}px; top:${(this.key[1])*30}px'></div>`).appendTo(this.$board);
        this.$door = $(`<div class="door" style="left:${(this.w-1)*30}px; top:${(this.h-2)*30}px"></div>`).appendTo(this.$board)
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

    set volume(val){
        this._volume = val;
    }




    set tips(val){
        this._tips = val;
        if (this.$board) this.$board[`${val ? 'add' : "remove"}Class`]("show-tips")
    }

    get tips(){ return this._tips}

}