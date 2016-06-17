var Game = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var show2048dialog = 0;
    var initialization = 0;
    // function to change state of mat;
    // and set show2048dialog variable if required
    // function moveLeft() {
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 3; j >= 0; j--){
    //             if(mat[j][i] != 0){
    //                 for(var k = j - 1; k >= 0; k--){
    //                     if(mat[k][i] == 0){
    //                         mat[k][i] = mat[j][i];
    //                         mat[j][i] = 0;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // function sumLeft(){
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 3; j > 0; j--){
    //             if(mat[i][j] == mat[i][j-1]){
    //                 mat[i][j-1] = mat[i][j] + mat[i][j-1];
    //                 mat[i][j] = 0;
    //             }
    //         }
    //     }
    // }


    // function moveRight() {
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 0; j < 4; j++){
    //             if(mat[i][j] != 0){
    //                 for(var k = j+1; k < 4; k++){
    //                     if(mat[i][k] == 0){
    //                         mat[i][k] = mat[i][j];
    //                         mat[i][j] = 0;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // function sumRight(){
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 0; j < 3; j++){
    //             if(mat[i][j] == mat[i][j+1]){
    //                             mat[i][j+1] = mat[i][j] + mat[i][j+1];
    //                             mat[i][j] = 0;
    //             }
    //         }
    //     }
    // }

    // function moveUp() {
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 0; j < 4; j++){
    //             if(mat[j][i] != 0){
    //                 for(var k = j+1; k < 4; k++){
    //                     if(mat[k][i] == 0){
    //                         mat[k][i] = mat[j][i];
    //                         mat[j][i] = 0;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // function sumTop(){
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 0; j < 3; j++){
    //             if(mat[j][i] == mat[j+1][i]){
    //                 mat[j+1][i] = mat[j][i] + mat[j+1][i];
    //                 mat[j][i] = 0;
    //             }
    //         }
    //     }
    // }

    // function moveDown() {
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 3; j >= 0; j--){
    //             if(mat[j][i] != 0){
    //                 for(var k = j - 1; k >= 0; k--){
    //                     if(mat[k][i] == 0){
    //                         mat[k][i] = mat[j][i];
    //                         mat[j][i] = 0;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // function sumDown(){
    //     for(var i = 0; i < 4; i++){
    //         for(var j = 3; j > 0; j--){
    //             if(mat[j][i] == mat[j-1][i]){
    //                 mat[j-1][i] = mat[j][i] + mat[j-1][i];
    //                 mat[j][i] = 0;
    //             }
    //         }
    //     }
    // }

    function up(){
        var merge = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 3; j > 0; j--){
                if(mat[j][i] != 0){
                   for(var k = j - 1; k >= 0; k--){
                       if(mat[k][i] != 0){
                          if(mat[k][i] != mat[j][i] && k-j > 1){
                             mat[k+1][i] = mat[j][i];
                             mat[j][i] = 0;
                            }
                          else{
                             mat[k][i] = mat[k][i] + mat[j][i];
                             mat[j][i] = 0;
                             //merge = k;
                            }
                            break;
                        }
                        else{
                            mat[k][i] = mat[j][i];
                            mat[j][i] = 0;
                        }
                    }
                }
            }
        }
    
    }

    function left(){
        for(var k = 0; k < 4; k++){
            for(var i = 0; i < 4; i++){
                for(var j = 0; j < 3; j++){
                    if(mat[i][j] === 0 || mat[i][j+1] === 0 || mat[i][j] === mat[i][j+1])
                    mat[i][j] = mat[i][j] + mat[i][j+1];
                    mat[i][j+1] = 0;
                }
            }
        }
    }

    // reflect state of mat
    function redraw() {
      //  console.log("In Redraw");
        var linearMat = new Array();
        var index = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4 ; j++){
                linearMat[index] =  mat[i][j] ;
                index++;
            }
        }
       // console.log("size");
      //  console.log(linearMat.length);

        for(var k = 0; k < linearMat.length; k++){
            // console.log("In Redraw loop");
             console.log("ELE");
             console.log(k);
             console.log(linearMat[k]);
            // if(linearMat[k] === 2){
            //     var id = document.getElementById(k);
            //     $(id).addClass("tile_2");
            //     // console.log("RID IS");
            //     // console.log(id);
            // }

            // if(linearMat[k] === 4){
            //     var id = document.getElementById(k);
            //     $(id).addClass("tile_4");
            //     // console.log("RID IS");
            //     // console.log(id);
        
            // }
        }

    }

    function redrawremove() {
        // console.log("In Redraw");
        var linearMat = new Array();
        var index = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4 ; j++){
                linearMat[index] =  mat[i][j] ;
                index++;
            }
        }
        // console.log("size");
        // console.log(linearMat.length);

        for(var k = 0; k < linearMat.length; k++){
            // console.log("In Redraw loop");
            // console.log("ELE");
            // console.log(k);
            // console.log(linearMat[k]);
            if(linearMat[k] === 2){
                var id = document.getElementById(k);
                $(id).removeClass("tile_2");
                // console.log("ID IS");
                // console.log(id);
            }

            if(linearMat[k] === 4){
                var id = document.getElementById(k);
                $(id).removeClass("tile_4");
                // console.log("ID IS");
                // console.log(id);
        
            }
        }

    }

    // randomw number between 2 and 4
    function getRandomValue() {
        var prob = Math.random();
        if(prob > 0.7)
            return 4;
        else
            return 2;
    }

    // returns x.y of a random empty cell
    function getRandomEmptyCell() {
        var emptyKey = 0;
        var emptyiMat = new Array();
        var emptyjMat = new Array();
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(mat[i][j] === 0){
                    // size++;
                    emptyiMat[emptyKey] = i;
                    emptyjMat[emptyKey] = j;
                    emptyKey++;
                }
            }
        }

        var randKey = Math.floor(Math.random() * emptyiMat.length);
        var emptyX = emptyiMat[randKey];
        var emptyY = emptyjMat[randKey];
       // console.log(x + " and "+y);
        return {x : emptyX, y : emptyY};
    }

    function fillOneRandomEmptyCell() {
        var coord = getRandomEmptyCell();
        var value = getRandomValue();
        // console.log(value);
        // console.log(coord.x)
        mat[coord.x][coord.y] = value;
    }

    // checks if gameover
    function isGameOver() {

        var flag = 1;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4 ; j++){
                if(mat[i][j] != 0){
                    
                }
            }
        }

    }

    // show Dialog for GameOver()
    function showGameOverDialog() {}

    // show dialog for 2048
    function show2048Dialog() {}

    function move(e) {
        //depending upon keypress you call the respective function
        e.preventDefault();
        if (e.keyCode === 37) {
            // moveLeft();
            // sumLeft();
            // moveLeft();
            left();
        } else if (e.keyCode === 38) {
            // moveUp();
            // sumTop();
            // moveUp();
            // up();
        } else if (e.keyCode === 39) {
            moveRight();
            sumRight();
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
            sumDown();
            moveDown();
        }

        fillOneRandomEmptyCell();
        redrawremove();
        redraw();
        if (isGameOver()) {
            showGameOverDialog();
        }
        if (show2048dialog === true) {
            show2048Dialog();
            show2048dialog = false;
        }
    }
    function reset(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        if(initialization === 0){
            fillOneRandomEmptyCell();
            fillOneRandomEmptyCell();
            initialization = 1;
            // console.log("IN IF")
        }
        // console.log("IN RESET");
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                // console.log(mat[i][j]);
            }
        }
        redraw();
    }
    function init() {
        reset();
        console.log("NEW KEY PRESS");
        // add reset method on click actions of all the reset elements
        window.addEventListener('keydown', move);
    }
    return {
        init : init
    };
})();

