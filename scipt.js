
        var aPieces = [];
        var oCtx;
        var aGrid = [];
        var aGridNextPiece = [];
        var iScale;
        var iScaleNextPiece;         
        var oPieceMooving;
        var iLastFrameTimeMs = 0;
        var iTicksPerSec = 1;
        var bPieceMoovingRotate = false;
        var iNextPiece = parseInt(Math.random() * 7);
        var iFps = 0;
        var iCount = 0;
        var iLastFrameTimeMsForFps = 0;
        var score = 0;
        var maxScore = 100000;
        var bPieceDown = false;
        var bDifficultyToRaise = false;
        var hasPower = false;
        var doubleScorePower = false;

        $(document).ready(function(){
            oCtx = document.getElementById("myCanvas").getContext("2d");
            oCtxNextPiece = document.getElementById("canvasNextPiece").getContext("2d");
            document.onkeydown = handleKeyPressed;
            $("#exitButton").click(function(){
                exitTetris();
 
            })
            $("#playButton").click(function(){
                $("#playButtonUnlimited").show();
                $("#playButtonNotUnlimited").show();
                $("#playButton").hide();
                
            });
            $("#playButtonUnlimited").click(function(){
                bDifficultyToRaise = true;
                runTetris();

            });
            $("#playButtonNotUnlimited").click(function(){
                maxScore = 2000;
                runTetris();
            });
            
            $("#createPiece").click(function() {
            	oPieceMooving = new Piece();
                aPieces.push(oPieceMooving);
            });
            $("#exporter").click(function () {
                exporter();
            });
        });

        function runTetris(){
            $("#canvasNextPiece").show();
            $("#playButton").hide();
            $("#title").hide();
            $("#scoreTitle").show();
            $("#myCanvas").show();
            $("#exitButton").show();
            $("#scoreDisplay").show();

            $("#powerDisplay").show();
            $("gotoOptions").show();
            $("#createPiece").show();
            $("#exportResultat").show();
            $("#exporter").show();
            $("#playButtonUnlimited").hide();
            $("#playButtonNotUnlimited").hide();


            var oCanvas = document.getElementById("myCanvas");
            iScale = oCanvas.clientWidth / 10;
            for(var i = 0; i < oCanvas.clientHeight / iScale; i++) {
            	aGrid[i] = [];
            	for(var j = 0; j < 10; j++) {
            		aGrid[i][j] = 0;
            	}
            }
            var oCanvasNextPiece = document.getElementById("canvasNextPiece");
            iScaleNextPiece = oCanvasNextPiece.clientWidth / 4;
            for(var i= 0; i<oCanvasNextPiece.clientHeight / iScaleNextPiece; i++){
                aGridNextPiece[i] = [];
                for(var j = 0; j < 4; j++) {
                    aGridNextPiece[i][j]= 0;
                }
            }

            requestAnimationFrame(mainLoop);
        }

        function handleKeyPressed(oEvent) {
            if(hasPower){
                if(oEvent.keyCode === 75){
                    usePower();
                }
            }
        	if(oPieceMooving) {
        		if(oEvent.keyCode === 37) {
	        		oPieceMooving.moove(true);
	        	} else if(oEvent.keyCode === 39) {
	        		oPieceMooving.moove(false);
	        	} else if(oEvent.keyCode === 38) {
	        		bPieceMoovingRotate = true;
	        	} else if(oEvent.keyCode === 32) {
                    while(oPieceMooving) {
                        oPieceMooving.update();
                    }
                } else if(oEvent.keyCode === 40) {
                    oPieceMooving.update();
                }
        	}
        }
       
 
        function exitTetris(){
            $("#playButton").show();
            $("#scoreTitle").hide();
            $("#myCanvas").hide();
            $("#exitButton").hide();
            $("#scoreDisplay").hide();
            $("#powerDisplay").hide();
            $("#createPiece").hide();
            $("#exportResultat").hide();
            $("#exporter").hide();
            $("#gotoOptions").hide();
        }

        function raiseDifficulty(){
            iTicksPerSec = score / 1500 + 1;
        }

        function mainLoop(iTimeStamp) {
            if(bDifficultyToRaise){
                raiseDifficulty();
            }
            /*
            if(score % 500 === 0 && !bDifficultyToRaise){
                bDifficultyToRaise = true;
                iTicksPerSec+=0.25;
            }
            else if(score % 500 != 0 && bDifficultyToRaise){
                bDifficultyToRaise = false;
            }*/
            if(score >= maxScore){
                exitTetris();
            }
            if(iTimeStamp > iLastFrameTimeMsForFps + 1000) {
                iLastFrameTimeMsForFps = iTimeStamp;
                iFps = iCount;
                iCount = 0;
                console.log(iFps);
            } else {
                iCount++;
            }
        	draw();
        	if(iTimeStamp < iLastFrameTimeMs + (1000 / iTicksPerSec)) {
        		requestAnimationFrame(mainLoop);
        		return;
        	}
        	iLastFrameTimeMs = iTimeStamp;
        	update();
        	requestAnimationFrame(mainLoop);
        }
 
        function update() {
            aPieces.forEach(function(element) {
                element.update();
            });
            checkCompletedLine();
            if(!oPieceMooving){
            	oPieceMooving = new Piece();
                aPieces.push(oPieceMooving);
            }
        }

        function usePower(){
            if(hasPower){
                hasPower = false;
                doubleScorePower = true;
                $("#scoreDisplay").text("Double score power utilisé");

            }
        }


        function checkCompletedLine(){
            if(!oPieceMooving){
                var aIndexLines = [];
                var bCompletedLine;
                for(var i=0;i<aGrid.length;i++){
                    bCompletedLine = true;
                    for(var j=0;j<aGrid[0].length;j++){
                        if(aGrid[i][j]===0){
                            bCompletedLine = false;
                            break;
                        }
                    }
                    if(bCompletedLine){
                        aIndexLines.push(i);
                    }
                }
                if(aIndexLines.length!==0){
                    eraseCompletedLines(aIndexLines);
                }
            }   
        }

        function eraseCompletedLines(aIndexLines){
            var aReturnedValues = [];
            for(var i=0; i<aIndexLines.length;i++){
                for(var j=0; j<aGrid[0].length;j++){
                    aGrid[aIndexLines[i]][j] = 0;
                    for(var k = 0; k < aPieces.length; k++) {
                        aReturnedValues = aPieces[k].getSquarePieceFromGridPos(j, aIndexLines[i]);
                        if(aReturnedValues){
                            aReturnedValues[0].aSquares.splice(aReturnedValues[1], 1);
                        }
                    }
                }
            }
            addScore(aIndexLines.length);
        }
        

        function draw() {
        	if(bPieceMoovingRotate) {
        		oPieceMooving.rotate();
        		bPieceMoovingRotate = false;
        	}
        	var oCanvas = document.getElementById("myCanvas");
            oCtx.clearRect(0, 0, oCanvas.clientWidth, oCanvas.clientHeight);
            aPieces.forEach(function(element) {
                element.draw();
            });
        }

        function drawNextPiece(){
            var oCanvasNextPiece = document.getElementById("canvasNextPiece");
            oCtxNextPiece.clearRect(0, 0, oCanvasNextPiece.clientWidth, oCanvasNextPiece.clientHeight);
            var aPatternNextPiece = createPattern(iNextPiece);
            for(var i = 0; i<aPatternNextPiece[0].length;i++){
                for( var j = 0;j<aPatternNextPiece.length; j++){
                    if(aPatternNextPiece[i][j] === 1){
                        oCtxNextPiece.fillStyle = "#000000";
                        oCtxNextPiece.fillRect(j * iScaleNextPiece, i * iScaleNextPiece, iScaleNextPiece, iScaleNextPiece);
                        oCtxNextPiece.fillStyle = "#FF0000";
                        oCtxNextPiece.fillRect(j * iScaleNextPiece + 5, i * iScaleNextPiece + 5, iScaleNextPiece - 10, iScaleNextPiece - 10);
                    }
                }
            }
        }
 
        function addScore(multiplier){
            
               
            
            score += 100 * Math.pow(2,multiplier);
            console.log(score);
            if(doubleScorePower){
                doubleScorePower = false;

                $("#scoreDisplay").text("");
                score = score*2;
            }
            $("#scoreDisplay").text(score.toString(10));

            if(!hasPower){
                var nextPower;
                if(score>=500){
                    hasPower = true;
                    nextPower = parseInt(Math.random() * 1);
                    console.log($("#scoreDisplay").text("Double score power dispo"));
                }
            }
        }

        
        function Piece() {
            this.iX = 2;
            this.iY = 0;
            this.sColor="#FF0000";
            this.aPattern = createPattern(iNextPiece);
            iNextPiece = parseInt(Math.random() * 7);
            $("#idNextPiece").text(iNextPiece.toString(10));
            drawNextPiece();
            this.createPiece();
            this.writeEraseOnGrid(true);
        }


 		Piece.prototype.createPiece = function() {
            this.aSquares = [];
 			for(var i = 0; i < this.aPattern[0].length; i++) {
            	for(var j = 0; j < this.aPattern.length; j++) {
            		if(this.aPattern[i][j] === 1) {
            			this.aSquares.push(new Square(this.iX + j, this.iY + i));
            		}
            	}
            }
 		}
 
        Piece.prototype.draw = function() {
            for(var i = 0; i < this.aSquares.length; i++) {
                this.aSquares[i].draw(this.sColor);
            }
        }

        Piece.prototype.getSquarePieceFromGridPos = function(iX, iY) {
            for(var i = 0; i < this.aSquares.length; i++) {
                if(this.aSquares[i].iX === iX && this.aSquares[i].iY === iY) {
                    return [this, i];
                }
            }
            return null;
        }

 		Piece.prototype.writeEraseOnGrid = function(bWrite) {
 			for(var i = 0; i < this.aSquares.length; i++) {
 				aGrid[this.aSquares[i].iY][this.aSquares[i].iX] = bWrite ? 1 : 0;
 			}
 		}

        Piece.prototype.rotate = function() {
        	if(this.canRotate()) {
        		this.writeEraseOnGrid(false);
	        	this.aPattern = rotatePattern(this.aPattern);
	        	this.createPiece();
	        	this.writeEraseOnGrid(true);
        	}
        }

        Piece.prototype.canRotate = function() {
        	var aNewPattern = rotatePattern(this.aPattern);
        	for(var i = 0; i < aNewPattern.length; i++) {
        		for(var j = 0; j < aNewPattern[0].length; j++) {
        			if(this.iY + i >= aGrid.length || this.iX + j >= aGrid[0].length || this.iX + j < 0 || this.iY + i < 0 ||
        			(aNewPattern[i][j] === 1 && aGrid[this.iY + i][this.iX + j] === 1 && this.aPattern[i][j] === 0)) {
        				return false;
        			}
        		}
        	}

        	return true;
        }

        Piece.prototype.moove = function(bLeft) {
        	this.writeEraseOnGrid(false);
        	var bCanMoove = true;
        	for(var i = 0; i < this.aSquares.length; i++) {
        		if(this.aSquares[i].collideSideWall(bLeft) || this.aSquares[i].collidePieceOnSide(bLeft, this.aSquares)) {
        			bCanMoove = false;
        		}
        	}
        	if(bCanMoove) {
        		this.iX += bLeft ? -1 : 1;
        		for(i = 0; i < this.aSquares.length; i++) {
	        		this.aSquares[i].moove(bLeft)
	        	}
        	}
        	this.writeEraseOnGrid(true);
        }

        Piece.prototype.update = function() {
        	this.writeEraseOnGrid(false);
        	var bFall = true;
        	for(var i = 0; i < this.aSquares.length; i++) {
        		if(this.aSquares[i].iY === aGrid.length - 1 || this.aSquares[i].collideOtherPiece(this.aSquares)) {
        			bFall = false;
        		}
        	}
        	if(bFall) {
        		this.iY += 1;
        	} else {
        		if(this === oPieceMooving) {
        			oPieceMooving = null;
        		}
        	}
        	for(i = 0; i < this.aSquares.length; i++) {
    			this.aSquares[i].update(bFall);
    		}
        	this.writeEraseOnGrid(true);
        }

        function Square(iX, iY) {
        	this.iX = iX;
        	this.iY = iY;
        }

        Square.prototype.draw = function(sColor) {
        	oCtx.fillStyle = "#000000";
        	oCtx.fillRect(this.iX * iScale, this.iY * iScale, iScale, iScale);
        	oCtx.fillStyle = sColor;
        	oCtx.fillRect(this.iX * iScale + 5, this.iY * iScale + 5, iScale - 10, iScale - 10);
        }

        Square.prototype.moove = function(bLeft) {
        	this.iX += bLeft ? -1 : 1;
        }

        Square.prototype.update = function(bFall) {
        	if(bFall) {
        		this.iY += 1;
        	}
        }

        Square.prototype.collideSideWall = function(bLeft) {
        	if((this.iX === 0 && bLeft) || (this.iX === aGrid[0].length-1 && !bLeft)) {
        		return true;
        	}
        	return false;
        }

        Square.prototype.collidePieceOnSide = function(bLeft, aSquares) {
        	var iTest = bLeft ? -1 : 1;
        	if(aGrid[this.iY][this.iX + iTest] === 1) {
				for(var i = 0; i < aSquares.length; i++) {
					if(aSquares[i].iX === this.iX + iTest && aSquares[i].iY === this.iY) {
						return false;
					}
				}
				return true;
        	}
        	return false;
        }

        Square.prototype.collideOtherPiece = function(aSquares) {
        	if(aGrid[this.iY + 1][this.iX] === 1) {
				for(var i = 0; i < aSquares.length; i++) {
					if(aSquares[i].iX === this.iX && aSquares[i].iY === this.iY + 1) {
						return false;
					}
				}
				return true;
        	}
        	return false;
        }

        function rotatePattern(aPattern) {
        	var aPatternToBeReturned = [[],[],[],[]];
        	for(var i = 0; i < aPattern.length; i++) {
        		for(var j = 0; j < aPattern[0].length; j++) {
        			aPatternToBeReturned[j][aPattern.length - 1 - i] = aPattern[i][j];
        		}
        	}
        	return aPatternToBeReturned;
        }

        function exporter()
        {
        let name = $("#exportResultat").val();
        let score = $("#scoreDisplay").text();
        let contenu = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(
        {
            resultat:
            {
                name: name,
                score: score,
            }
        }));
        let telechargement = $("<a></a>").attr("href", contenu).attr("download", name + ".json");
        $("body").append(telechargement);
        telechargement[0].click();
        telechargement[0].remove();
        }

        function createPattern(i) {
            if(i < 1) {
                return [
                        [0, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0]
                    ]
            } else if(i < 2) {
                return [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ]
            } else if(i < 3) {
                return [
                        [0, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0]
                    ]
            } else if(i < 4) {
                return [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ]
            } else if(i < 5) {
                return [
                        [0, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 0]
                    ]
            } else if(i < 6) {
                return [
                        [0, 0, 0, 0],
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0]
                    ]
            } else if(i < 7) {
                return [
                        [0, 0, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 1, 1, 0]
                    ]
            }
        }
 