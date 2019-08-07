//测试snake的首位互换。
var arrayobject = [];
var settime = 5;
var timer = 5;

cc.Class({
    extends: cc.Component,

    properties: {
        PREFAB: cc.Prefab,
        parent: cc.Node,
        autoload: false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        arrayobject.push(cc.instantiate(this.PREFAB));
        console.log(arrayobject.length);
        arrayobject[0].parent = this.parent || this.node;
        arrayobject[0].x = 300;
        arrayobject[0].y = 300;
       
        arrayobject.push(cc.instantiate(this.PREFAB));
        console.log(arrayobject.length);
        arrayobject[1].parent = this.parent || this.node;
        arrayobject[1].x = 320;
        arrayobject[1].y = 300;
        

        /*if (arrayobject.length != 0){
            arrayobject.push(arrayobject[0]);
            arrayobject[0].x += 20;
        }
        console.log(arrayobject.length);

        console.log("数组中的第一个元素：" + arrayobject[0]);
        arrayobject.shift();
        console.log("删除元素后数组的长度：" + arrayobject.length);
        console.log("删除第一个元素后数组的第一个元素：" + arrayobject[0]);*/
    },

    update (dt) {
        if(timer >= 0){
            timer -= dt;
        }else{
            timer = settime;

            if (arrayobject.length != 0){
                arrayobject.push(arrayobject[0]);
                arrayobject[0].x += 40;
            }
            console.log(arrayobject.length);
    
            console.log("数组中的第一个元素：" + arrayobject[0]);
            arrayobject.shift();
            console.log("删除元素后数组的长度：" + arrayobject.length);
            console.log("删除第一个元素后数组的第一个元素：" + arrayobject[0]);
            arrayobject[arrayobject.length -1].x += 20;
        }
    },
});
