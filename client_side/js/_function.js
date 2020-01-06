let rand = (min, max) => Math.random() * (max - min + 1) + min >> 0;

Array.prototype.last = function () {
    return this.length ? this[this.length - 1] : false;
};

Array.prototype.prev = function () {
    return this.length > 1 ? this[this.length - 2] : false;
};

Array.prototype.rand = function () {
    return this.length ? this[rand(0,this.length - 1)] : false;
};