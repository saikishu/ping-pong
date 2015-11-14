/*
jshint  esnext: true, 
        browser: true
*/
(function () {
    'use strict';
    
    //global stuff
    const   BAT_HEIGHT = 100,
            BAT_WIDTH = 10,
            BAT_COLOR = "#D95B43",
            CANVAS_BG = '#542437',
            BALL_COLOR = '#C02942',
            BALL_SIZE = 10,
            FRAMES_PER_SECOND = 30;
    //game elements
    var canvas,
        context,
        ballXPos,
        ballXSpeed = 10,
        ballYPos,
        ballYSpeed = 5,
        mousePosition,
        playerAYPos,
        playerBYPos,
        scores = {
            "playerA" : 0,
            "playerB" : 0
        };
    /* Drawing */
    //draw game elements
    //draw rectangle
    function drawRectangle(x, y, width, height, color) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }
    
    //draw circle
    function drawCircle(x, y, radius, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, true);
        context.fill();
    }
    
    function drawGameElements() {
        //Base Canvas
        context.fillStyle = CANVAS_BG;
        context.fillRect(0, 0, canvas.width, canvas.height);
     
        //Player A bat
        drawRectangle(0, playerAYPos, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);
        //Player B bat
        drawRectangle(canvas.width - BAT_WIDTH, playerBYPos, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);
        //Ball
        drawCircle(ballXPos, ballYPos, BALL_SIZE, BALL_COLOR);
        
        
    }
    
    /* Animation */
    function moveBall() {
        //right wall
        if (ballXPos >= canvas.width) {
            ballXSpeed = -ballXSpeed;
            //not hitting bat - reset game
            if ( (ballYPos < playerBYPos) || (ballYPos > (playerBYPos + BAT_HEIGHT) ) ) {
                scores.playerA++;
                reset();
            }
        }
        //left wall
        if (ballXPos <= 0) {
            ballXSpeed = -ballXSpeed; // -(-)
            //not hitting bat - reset game
            if ( (ballYPos < playerAYPos) || (ballYPos > (playerAYPos + BAT_HEIGHT) ) ) {
                scores.playerB++;
                reset();
            }
        }
        
        //top wall
        if (ballYPos >= canvas.height) {
            ballYSpeed  =  -ballYSpeed;
        }
        //bottom wall
        if (ballYPos <= 0) {
            ballYSpeed = -ballYSpeed;
        }
        
        ballXPos += ballXSpeed;
        ballYPos += ballYSpeed;
        
    }
    
    function movePlayerABat() {
        //TODO: Don't let the bat go off screen
        playerAYPos = mousePosition.y - (BAT_HEIGHT / 2) ;
    }
    
    function getMousePosition(e) {
        var canvasRect = canvas.getBoundingClientRect();
        var docroot = document.documentElement;
        var mousePosition = {
            "x" : e.clientX - canvasRect.left - docroot.scrollLeft,
            "y" : e.clientY - canvasRect.top - docroot.scrollTop
        };
        return mousePosition;
    }
    
    //Reset logic
    function reset() {
       console.log(scores);
       ballXPos = canvas.width / 2;
       ballYPos = canvas.height / 2;
    }
          
    
    //init
    function init() {
        canvas = document.getElementById('gameCanvas');
        context = canvas.getContext('2d');
        ballXPos = canvas.width / 2;
        ballYPos = canvas.height / 2;
        playerAYPos = (canvas.height - BAT_HEIGHT) / 2;
        playerBYPos = (canvas.height - BAT_HEIGHT) / 2;
    }
    
    window.onload = function () {
        init();
        setInterval(function () {
            moveBall();
            drawGameElements();
        }, 1000 / FRAMES_PER_SECOND);
        
        canvas.addEventListener('mousemove',function(e) {
            mousePosition = getMousePosition(e);
            movePlayerABat();
        });
        
    };
    
})();
