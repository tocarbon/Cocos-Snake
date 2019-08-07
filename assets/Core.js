var arrwidth = 31;//Grid width
var arrheight = 31;// Grid height 
var arrays = [];//Grid array
var list = [];//snake of length

var creattime = 0.1;//time
var settime = 0.1;
var horizontalboolean = true;
var direction = 1;
var distance = 20;
var first = [0,0];
var foodbox = [];
var foodobj = [];
var texts;
var keyon = true;

var score = 0;

var node;
cc.Class({
    extends: cc.Component,

    properties: {
       PREFAB: cc.Prefab,
       GRID: cc.Prefab,
       Food: cc.Prefab,
       parent: cc.Node,
       autoload: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        
    },

    start () {

        texts = this.node.getChildByName("Score");
        texts.getComponent(cc.Label).string = "Score:" + score.toString();
        creattime = settime;
        //creat recPoint
        var count = 0;
        var ints = 0;
        for (let i = 0; i < arrheight; i++) {
            var array = [];
            var int = 0;
            for (let j = 0; j < arrwidth; j++) {
               array[j] = [];
               var obj = cc.instantiate(this.GRID);
               obj.parent = this.parent || this.node;
               obj.x = int ;
               obj.y = ints;
               int += 20;
            }
            arrays[i] = array;
            ints += 20;
        }

        /*for (let i = 5; i < arrheight; i++) {
            
            for (let j = 0; j < arrwidth; j++) {
                arrays[i][j] = 1;
            }
        }
        /*for (let i = 0; i < 15; i++) {
            arrays[0][i] = 1;
        }*/

        console.log(arrays[1][1]);

        list.push(cc.instantiate(this.PREFAB));
        //当父节点不存在时，使用当前组件为父节点
        list[list.length -1].parent = this.parent || this.node;
        list[list.length -1].x = 300;
        list[list.length -1].y = 0;
        first[0] = list[list.length -1].x / 20;
        first[1] = list[list.length -1].y / 20;
        arrays[first[1]][first[0]] = 1;//number one is snake of head or body!
        console.log(first);

        //creat food,随机范围，提取没snake的格子。
        for (let i = 0; i < arrheight; i++) {
            
            for (let j = 0; j < arrwidth; j++) {
               if (arrays[i][j] != 0){
                   console.log("not null grid!")
               }
               else
               {
                var arr = [i,j];
                foodbox.push(arr);
               }
            }
        }
        console.log(foodbox.length);

        var ran = Math.floor(Math.random()*foodbox.length);
        console.log("random number is :" +ran);
        var vx = foodbox[ran] [1];
        var vy = foodbox[ran] [0];

        //var vx = 16;
        //var vy = 0;
        console.log("this is food of position:" + vx +"," + vy);
        arrays[vy] [vx] = 2;
        foodobj.push(cc.instantiate(this.Food));
        foodobj[0].parent = this.parent || this.node;
        foodobj[0].x = vx * 20;
        foodobj[0].y = vy * 20;

        /*for (let i = 0; i < 10000; i++) {
            var ran = Math.floor(Math.random()*foodbox.length);
            if (ran >= foodbox.length - 1 || ran <=0){
                console.log("the now of number is :" + ran);
            }
        }*/
        //arrays[0][30] = 1;


        //test creat food
    },
    //node.on("键盘按下或弹起",()=>{})

    update (dt) {
        //timer onoff  array [height ,width]!!!!!!!!!!
        if (creattime >= 0){
            creattime -= dt;
        }else{
            //console.log(first);
            if (horizontalboolean){
                
                if(first[0] + direction >= 0 && first[0] + direction <= arrwidth -1)
                {
                    //console.log(first);
                    if (arrays[first[1]] [first[0] + direction] == 1){
                        console.log("is 1 !");
                    }
                    //if is food ......
                    else if (arrays[first[1]] [first[0] + direction] == 2)
                    {
                        console.log("I eat a food!");

                        arrays[first[1]] [first[0] + direction]  = 1;
    
                        list.push(cc.instantiate(this.PREFAB));
                        list[list.length -1].parent = this.parent || this.node;
                        list[list.length -1].x = (first[0] + direction) * 20;
                        list[list.length -1].y = first[1] * 20;
                        first = [first[0] + direction,first[1]];
    
                        console.log(list.length);

                        //arrays[foodobj[0].y / 20][foodobj[0].x / 20] = 1;
                        //foodobj[0].destroy();
                        //foodobj = [];
                        foodbox = [];
                        for (let i = 0; i < arrheight; i++) {
            
                            for (let j = 0; j < arrwidth; j++) {
                               if (arrays[i][j] != 0){
                                   console.log("not null grid!")
                               }
                               else
                               {
                                var arr = [i,j];
                                foodbox.push(arr);
                               }
                            }
                        }
                        console.log(foodbox.length);
                
                        var ran = Math.floor(Math.random()*foodbox.length);
                        console.log("random number is :" +ran);
                        var vx = foodbox[ran] [1];
                        var vy = foodbox[ran] [0];
                        console.log("this is food of position:" + vx +"," + vy);
                        arrays[vy] [vx] = 2;
                        //foodobj.push(cc.instantiate(this.Food));
                        //foodobj[0].parent = this.parent || this.node;
                        foodobj[0].x = vx * 20;
                        foodobj[0].y = vy * 20;

                        score ++;
                        texts.getComponent(cc.Label).string = "Score:" + score.toString();
                    }
                    else if (arrays[first[1]] [first[0] + direction] == 0)
                    {
                        //下一个位置没有阻碍物，可以移动。
                        console.log("I  H move!");//我移动了。
                        arrays[first[1]] [first[0] + direction] = 1;//填充移动到的一格，将其表示为蛇身体
                        arrays[list[0].y / 20][list[0].x / 20] = 0;//更新矩阵，将没有物体的坐标置为空

                        list.push(list[0]);//将数组中的第一位（蛇尾巴）放到数组最后一位（蛇头）
                        list.shift();//将数组第一位（蛇尾）的引用移除。
                        first = [first[0] + direction,first[1]];//更新蛇头的坐标。
                        list[list.length -1].x = first[0] * 20;
                        list[list.length -1].y = first[1] * 20;//将蛇尾移动至蛇头坐标
                        //console.log(list[0]);
                        
                        //list[0].destroy();
                        
                    }

                }else{
                    console.log("Game over!");
                }

            }else{
                //not horizontal
                if(first[1] + direction >= 0 && first[1] + direction <= arrwidth -1)
                {
                    //console.log(first);-------<<<<-------------- - - - - -- - - - - - - - - - - -- - - - - -- - - -- ------>>>>>>>>>>
                    if (arrays[first[1] + direction] [first[0]] == 1){
                        console.log("is 1 !");
                    }
                    //if is food ......
                    else if (arrays[first[1] + direction] [first[0]] == 2)
                    {
                        console.log("I eat a food!");

                        arrays[first[1] + direction] [first[0]]  = 1;
    
                        list.push(cc.instantiate(this.PREFAB));
                        list[list.length -1].parent = this.parent || this.node;
                        list[list.length -1].x = first[0]* 20;
                        list[list.length -1].y = (first[1] + direction) * 20;
                        first = [first[0],first[1] + direction];//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>||||||||||||||||||||
    
                        console.log(list.length);

                        //foodobj[0].destroy();
                        //foodobj = [];
                        foodbox = [];
                        for (let i = 0; i < arrheight; i++) {
            
                            for (let j = 0; j < arrwidth; j++) {
                               if (arrays[i][j] != 0){
                                   console.log("not null grid!")
                               }
                               else
                               {
                                var arr = [i,j];
                                foodbox.push(arr);
                               }
                            }
                        }
                        console.log(foodbox.length);
                
                        var ran = Math.floor(Math.random()*foodbox.length);
                        console.log("random number is :" +ran);
                        var vx = foodbox[ran] [1];
                        var vy = foodbox[ran] [0];
                        console.log("this is food of position:" + vx +"," + vy);
                        arrays[vy] [vx] = 2;
                        //foodobj.push(cc.instantiate(this.Food));
                        //foodobj[0].parent = this.parent || this.node;
                        foodobj[0].x = vx * 20;
                        foodobj[0].y = vy * 20;

                        score ++;
                        texts.getComponent(cc.Label).string = "Score:" + score.toString();

                    }
                    else if (arrays[first[1] + direction] [first[0]] == 0)
                    {
                        //下一个位置没有阻碍物，可以移动。
                        console.log("I V move!");//我移动了。
                        arrays[first[1] + direction] [first[0]]= 1;//填充移动到的一格，将其表示为蛇身体
                        arrays[list[0].y / 20][list[0].x / 20] = 0;//更新矩阵，将没有物体的坐标置为空

                        list.push(list[0]);//将数组中的第一位（蛇尾巴）放到数组最后一位（蛇头）
                        list.shift();//将数组第一位（蛇尾）的引用移除。
                        first = [first[0],first[1] + direction];//更新蛇头的坐标。
                        list[list.length -1].x = first[0] * 20;
                        list[list.length -1].y = first[1] * 20;//将蛇尾移动至蛇头坐标
                        //console.log(list[0]);
                        
                        //list[0].destroy();

                    }
                }
            }
            creattime = settime;
            keyon = true;
        }
    },
    onKeyDown(event){
        //设置对应按键按下发生的事件
        if (keyon){
            switch(event.keyCode){
                //按下A键
                case cc.macro.KEY.a:
                  if(!horizontalboolean){
                    direction = -1;
                    horizontalboolean = true;
                    keyon = false;
                  }
                break;
                case cc.macro.KEY.d:
                  if(!horizontalboolean){
                    direction = 1;
                    horizontalboolean = true;
                    keyon = false;
                  }
                break;
                case cc.macro.KEY.w:
                  if(horizontalboolean){
                    direction = 1;
                    horizontalboolean = false;
                    keyon = false;
                  }
                break;
                case cc.macro.KEY.s:
                  if(horizontalboolean){
                    direction = -1;
                    horizontalboolean = false;
                    keyon = false;
                  }
                break;
                case cc.macro.KEY.space:
                    settime = 0.03;
                    creattime = 0;
                break;
            }
        }
        
    },

    onKeyUp(event){
        //设置按键抬起后的事件
        switch(event.keyCode){
            //按下A键
            case cc.macro.KEY.a:
              
            break;
            case cc.macro.KEY.d:
              
            break;
            case cc.macro.KEY.w:
              
            break;
            case cc.macro.KEY.s:
              
            break;
            case cc.macro.KEY.space:
              settime = 0.2;
              creattime = 0;
            break;
        }
    },
});
