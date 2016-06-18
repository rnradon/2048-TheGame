var Game = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var show2048dialog = 0;
    var initialization = 0;
    var pass = 0;
    // function to change state of mat;
    // and set show2048dialog variable if required


    // function left(){
    //     var merge = -1;
    //     for(var k = 0; k < 4; k++){
    //         for(var i = 0; i < 4; i++){
    //             for(var j = 0; j < 3; j++){
    //                  if(mat[i][j] == 0 || mat[i][j+1] == 0 || mat[i][j] == mat[i][j+1]){
    //                     if(merge != j){
    //                         mat[i][j] = mat[i][j] + mat[i][j+1];
    //                         mat[i][j+1] = 0;
    //                         }
    //                 }
    //                 else{
    //                     merge = j;
    //                 }
    //             }
    //         }
    //     }
    // }

    // function left(){
    //     for(var i = 0; i< 4; i++){
    //         for(var j = 0; j < 4; j++){
    //             for(var k = j+1; k < 4; k++){
    //                 if(mat[i][j] != 0){
    //                     if(mat[i][j] === mat[i][k] && k-j === 1){
    //                         mat[i][j]*=2;
    //                         mat[i][k] = 0;
    //                         score+=mat[i][j];
    //                         break;
    //                     }

    //                     // else if(mat[i][k] != 0 && mat[i][k] != mat[i][j]){
    //                     //     j++;
    //                     //     break;
    //                     // }
    //                 }
    //                 else {
    //                     if(j === 0 && mat[i][k] === mat[i][k+1] && mat[i][k] != 0){
    //                         mat[i][j] = 2*mat[i][k];
    //                         mat[i][k] = 0;
    //                         mat[i][k+1] =0;
    //                         score+=mat[i][j];
    //                         break;
    //                     }
    //                     else if(mat[i][k] != 0){
    //                         mat[i][j] = mat[i][k];
    //                         mat[i][k] = 0;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    function rotate90()
    {
        var rotated = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for(var i=0 ; i<mat.length ; ++i)
        {
            for(var j=0 ; j<mat[0].length ; ++j)
            {
                rotated[mat[0].length-j-1][i] = mat[i][j];
            }
        }
        mat = rotated;
    }


    function left(){
       rotate90();
       rotate90();
       right();
       rotate90();
       rotate90();
       redraw();
    }

    function up(){
      rotate90();
      rotate90();
      rotate90();
      right();
      rotate90();
      console.log("TESTING")
      for(var i = 0 ; i < 4 ; i ++){
        for(var j = 0 ; j < 4 ; j++){
          console.log(mat[i][j]);
        }
      }
      redraw();
    }

    // function right(){
    //     for(var i = 0; i< 4; i++){
    //         for(var j = 3; j >= 0; j--){
    //             for(var k = j-1; k >= 0; k--){
    //                 if(mat[i][j] != 0){
    //                     if(mat[i][j] == mat[i][k]){
    //                         mat[i][j]*=2;
    //                         mat[i][k] = 0;
    //                         score+=mat[i][j];
    //                         break;
    //                     }
    //                 }
    //                 else if(mat[i][j] == 0){
    //                     if(j === 3 && mat[i][k] === mat[i][k-1] && mat[i][k] != 0){
    //                         mat[i][j] = 2*mat[i][k];
    //                         mat[i][k] = 0;
    //                         mat[i][k-1] = 0;
    //                         score+=mat[i][j];
    //                         break;
    //                     }
    //                     if(mat[i][k] != 0){
    //                         mat[i][j] = mat[i][k];
    //                         mat[i][k] = 0;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    function right(){
       for (var i = 0; i < 4; i++) {
           var k =3;
           for (var j = 2; j >= 0; j--) {
               if(mat[i][k] === 0 && mat[i][j]!== 0){
                   mat[i][k] =mat[i][j];
                   mat[i][j]=0;
                   pass = 1;
                   continue;
               }
               else if(mat[i][k] === mat[i][j] && mat[i][k] !== 0){
                   mat[i][k] = 2*mat[i][k];
                   score += mat[i][k];
                   mat[i][j]=0;
                   --k;
                   pass = 1;
                   continue;
               }
               else if(mat[i][k] !== mat[i][j] && mat[i][k] !==0 && mat[i][j] !==0){
                   if(k == j+1){
                       --k;
                       continue;
                   }
                   else
                   {
                       --k;
                       mat[i][k] = mat[i][j];
                       mat[i][j]=0;
                       pass = 1;
                       continue;
                   }
               }
           }
       }
       redraw();
   }


    function down(){
      rotate90();
      right();
      rotate90();
      rotate90();
      rotate90();
      redraw();
    }
    // reflect state of mat
    function redraw() {
        var linearMat = new Array();
        var index = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4 ; j++){
                linearMat[index] =  mat[i][j] ;
                index++;
            }
        }

        for(var k = 0; k < linearMat.length; k++){
             console.log("ELE");
             console.log(k);
             console.log(linearMat[k]);
             var remClassId = document.getElementById(k);
             $(remClassId).removeClass("tile_2 tile_4 tile_8 tile_16 tile_32 tile_64 tile_128 tile_256 tile_512 tile_1024 tile_2048");
            if(linearMat[k] === 2){
                var id = document.getElementById(k);
                $(id).addClass("tile_2");
            }

            else if(linearMat[k] === 4){
                var id = document.getElementById(k);
                $(id).addClass("tile_4");
            }

            else if(linearMat[k] === 8){
                var id = document.getElementById(k);
                $(id).addClass("tile_8");
            }

            else if(linearMat[k] === 16){
                var id = document.getElementById(k);
                $(id).addClass("tile_16");
            }

            if(linearMat[k] === 32){
                var id = document.getElementById(k);
                $(id).addClass("tile_32");
            }

            if(linearMat[k] === 64){
                var id = document.getElementById(k);
                $(id).addClass("tile_64");
            }

            if(linearMat[k] === 128){
                var id = document.getElementById(k);
                $(id).addClass("tile_128");

            }

            if(linearMat[k] === 256){
                var id = document.getElementById(k);
                $(id).addClass("tile_256");
            }

            if(linearMat[k] === 512){
                var id = document.getElementById(k);
                $(id).addClass("tile_512");
            }

            if(linearMat[k] === 1024){
                var id = document.getElementById(k);
                $(id).addClass("tile_1024");
            }

            if(linearMat[k] === 2048){
                var id = document.getElementById(k);
                $(id).addClass("tile_2048");
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
                    emptyiMat[emptyKey] = i;
                    emptyjMat[emptyKey] = j;
                    emptyKey++;
                }
            }
        }

        var randKey = Math.floor(Math.random() * emptyiMat.length);
        var emptyX = emptyiMat[randKey];
        var emptyY = emptyjMat[randKey];
        return {x : emptyX, y : emptyY};
    }

    function fillOneRandomEmptyCell() {
        var coord = getRandomEmptyCell();
        var value = getRandomValue();
        mat[coord.x][coord.y] = value;
    }

    // checks if gameover
    function isGameOver() {

        var flag = 1;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 3 ; j++){
                if(mat[i][j] === mat[i][j+1]){
                    flag = 0;
                    break;
                }
            }
            if(flag === 0){
                break;
            }
        }

        if(flag === 1){
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 4 ; j++){
                    if(mat[i][j] === mat[i+1][j]){
                        flag = 0;
                        break;
                    }
                }
                if(flag === 0){
                    break;
                }
            }
        }

        for(var i = 0 ; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(mat[i][j] === 0){
                    flag = 0;
                    break;
                }
            }
        }
        if(flag == 1)
            console.log("OVER");
        return flag;
    }

    function is2048(){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
          if(mat[i][j] === 2048){
          show2048dialog = 1;
          console.log("IN IF")
          return true;
          }
        }
      }
      return false;
    }

    // show Dialog for GameOver()
    function showGameOverDialog() {
        document.getElementById("GameOver").style.display = "block";
    }

    // show dialog for 2048
    function show2048Dialog() {
        document.getElementById("complete").style.display = "block";
    }

    function moveKeyBoard(e) {
        //depending upon keypress you call the respective function
       e.preventDefault();
       if((e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) && !is2048()){
         e.preventDefault();
            if (e.keyCode === 37) {
                // moveLeft();
                // sumLeft();
                // moveLeft();
                pass = 0;
                left();
            } else if (e.keyCode === 38) {
                // moveUp();
                // sumTop();
                // moveUp();
                pass = 0;
                up();
            } else if (e.keyCode === 39) {
                // moveRight();
                // sumRight();
                // moveRight();
                pass = 0;
                right();
            } else if (e.keyCode === 40) {
                // moveDown();
                // sumDown();
                // moveDown();
                pass = 0;
                down();
            }
            document.getElementById("score").innerHTML = score;
            if(pass === 1)
            fillOneRandomEmptyCell();
            // redrawremove();
            redraw();
            if (isGameOver()) {
                showGameOverDialog();
            }
            if (is2048()) {
                console.log("2048 Bann gaya :D")
                show2048Dialog();
            }
        }
    }

    function moveClick(e){
      var id;
      e.preventDefault();
      console.log("IN MOUSE CLICK");

         id = $(this).attr("id");
        console.log("CHAL JA BHAI");
          console.log(id);
        if(!is2048()){
          e.preventDefault();
             if (id.localeCompare("left") === 0) {
                 // moveLeft();
                 // sumLeft();
                 // moveLeft();
                 console.log("IN LEFT");
                 pass = 0;
                 left();
             } else if (id.localeCompare("up") === 0) {
                 // moveUp();
                 // sumTop();
                 // moveUp();
                 console.log("IN UPPPP");
                 pass = 0;
                 up();
             } else if (id.localeCompare("right") === 0) {
                 // moveRight();
                 // sumRight();
                 // moveRight();
                 console.log("IN RIGHT");
                 pass = 0;
                 right();
             } else if (id.localeCompare("down") === 0) {
                 // moveDown();
                 // sumDown();
                 // moveDown();
                 pass = 0;
                 down();
             }
             document.getElementById("score").innerHTML = score;
             if(pass === 1)
             fillOneRandomEmptyCell();
             // redrawremove();
             redraw();
             if (isGameOver()) {
                 showGameOverDialog();
             }
             if (is2048()) {
                 console.log("2048 Bann gaya :D")
                 show2048Dialog();
             }
         }


    }

    function reset(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
            fillOneRandomEmptyCell();
            fillOneRandomEmptyCell();
        redraw();
        document.getElementById("score").innerHTML = score;
        document.getElementById("GameOver").style.display = "none";
        document.getElementById("complete").style.display = "none";
    }

    function init() {
    	var res = 1;
    	JSON.stringify(mat);
        localStorage.setItem("matrixBoard", JSON.stringify(mat));
        var retrievedData = localStorage.getItem("matrixBoard");
        mat = JSON.parse(retrievedData);

        for(i = 0; i< 4; i++){
        	for(j = 0; j < 4; j++){
        		if(mat[i][j] != 0){
        			res = 0;
        			break;
        		}
        	}
        }

        if(res === 1)
        reset();
    	else{
        // window.addEventListener('keydown', moveKeyBoard);
        // window.addEventListener('click', moveClick);
      }
        console.log("NEW KEY PRESS");
        // add reset method on click actions of all the reset elements
        window.addEventListener('keydown', moveKeyBoard);
        // window.addEventListener('click', moveClick);
        $(".arrowKeysLR").click(moveClick);
        $(".arrowKeysUD").click(moveClick);
        var resetIcon = document.getElementById("reset");
        resetIcon.addEventListener("click", reset);

    }
    return {
        init : init
    };
})();
