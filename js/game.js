(function () {
    'use strict';
    
    //global stuff
    const BAT_HEIGHT = 100,
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
        playerAYPos, 
        playerBYPos;
    
    /* Drawing */
    //draw game elements
    function drawGameElements() {
        //Base Canvas
        context.fillStyle = CANVAS_BG
        context.fillRect(0,0, canvas.width, canvas.height);
     
        //Player A bat
        drawRectangle(0, playerAYPos, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);
        //Player B bat
        drawRectangle(canvas.width-BAT_WIDTH, playerBYPos, BAT_WIDTH, BAT_HEIGHT, BAT_COLOR);
        //Ball
        drawCircle(ballXPos, ballYPos, BALL_SIZE, BALL_COLOR);
        
        
    }
    
    //draw rectangle
    function drawRectangle(x, y, width, height, color) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }
    
    //draw circle
    function drawCircle(x,y, radius, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI*2, true);
        context.fill();
    }
    
    /* Animation */
    function moveBall() {
        //right wall
        if(ballXPos >= canvas.width) {
            ballXSpeed = -ballXSpeed;
        } 
        //left wall
        if(ballXPos <= 0) {
            ballXSpeed = -ballXSpeed; // -(-)
        }
        
        //top wall
        if(ballYPos >= canvas.height) {
            ballYSpeed  =  -ballYSpeed;
        } 
        //bottom wall
        if(ballYPos <= 0) {
            ballYSpeed = -ballYSpeed;
        }
        
        ballXPos += ballXSpeed;
        ballYPos += ballYSpeed;
        
    }
    
    function getMousePosition(evt) {
        
    }
          
    
    //init
    function init() {
        canvas = document.getElementById('gameCanvas');
        context = canvas.getContext('2d');
        ballXPos = canvas.width/2;
        ballYPos = canvas.height/2;
        playerAYPos = (canvas.height-BAT_HEIGHT)/2;
        playerBYPos = (canvas.height-BAT_HEIGHT)/2;
    }
    
    window.onload = function () {
        init();
        setInterval(function() {
            moveBall();
            drawGameElements();
        }, 1000/FRAMES_PER_SECOND);
        
    };
    
})();
