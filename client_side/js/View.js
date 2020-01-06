class View {
    constructor(home) {
        this.fns = {};
        this.histiry = [];
        this.layerUpdate(home)
    }

    layerUpdate(name){
        if (this.last === name) return;
        this.histiry.push(name);
        this.layerOut(this.prev);
        this.layerIn(this.last);
    }

    layerBack(){
        if (this.histiry.length < 2) return;
        this.layerOut(this.last);
        this.layerIn(this.prev);
        this.histiry.pop();
    }

    layerOut(name){
        let $layer = this.$layer(name);
        $layer.fadeOut().css("display","none");
        this.do_out(name);
    }

    layerIn(name){
        let $layer = this.$layer(name);
        $layer.fadeIn().css("display","flex");
        this.do_in(name);
    }

    listen(name,inCallback = null,outCallback = null){
        this.fns[name] = {};
        if (inCallback) this.fns[name].in = inCallback;
        if (outCallback) this.fns[name].out = outCallback;
    }

    do_in(name){
        if (this.fns[name] && this.fns[name].in) this.fns[name].in();
    }

    do_out(name){
        if (this.fns[name] && this.fns[name].out) this.fns[name].out();
    }

    get prev(){
        return this.histiry.prev();
    }

    get last(){
        return this.histiry.last();
    }

    $layer(name){
        return $(`.layer-${name}`)
    }
}