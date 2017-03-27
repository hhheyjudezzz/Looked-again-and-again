var closeBtn = document.getElementById('closeBtn');
var rule = document.getElementById('rule');
var coverContain = document.getElementById('cover-contain');
var ruleBtn = document.querySelector("#cover-contain p")
var startBtn = document.getElementById('startBtn');
var first = document.getElementById('first');
var firstBtn = document.querySelector("#first img");
var game= document.getElementById('game');
var imgFirstArr = [];
var imgSecArr = [];
var imgEndArr = [];
var $markImgs = $(".inner img:nth-of-type(1)");
var $gameImgs = $(".inner img:nth-of-type(2)");
//点击
var clickIndex = 0;
var firstIndex =  0;
var secondIndex =  0;
var firstSrc = "";
var secondSrc = "";
var $inner = $(".inner");
var firstBol = false;
var prevIndex = 1.1;
var hiddenIndex = 0;
//计时器
var nextBol = true;
var gameTime = 10;
var TmContainer = document.getElementById("timer_contanier");
var TmContainer = document.getElementById("timer_contanier");
var percent = document.getElementById("percent");
var second = document.getElementById("second");
var gameLevel = 1;
closeBtn.onclick = function(){
	rule.style.display = "none";
	coverContain.style.display = "block";
}
ruleBtn.onclick=function(){
	rule.style.display = "block";
	coverContain.style.display = "none";
}
startBtn.onclick = function(){
	coverContain.style.display = "none";
	// console.log($(first))
	$(first).css({"display": "block"}).animate({
		"top": "0%"	
	},500,"easeOutBounce")
}
firstBtn.onclick = function(){
	first.style.display = "none";
	game.style.display = "block";
	timerFn(gameTime);
}
//分别保存三个页面的图片链接，
window.onload=function(){
	console.log(1)
	imgArrFn(imgFirstArr,6)
	imgArrFn(imgSecArr,12)
	imgArrFn(imgEndArr,$gameImgs.length)
	for(var i = 0; i < 6; i++){
		$gameImgs.get(i).src=imgFirstArr[i]
	}
}
	//分别保存图片链接 并乱序
function imgArrFn(imgArr,num){
	for (var i = 0; i < num; i++) {
		imgArr[i] = $gameImgs.get(i).getAttribute("data-src")
	}
	imgArr.sort(function(a,b){
		return Math.random()-0.5;
	})		
}
var hiddenBol = true;
$inner.on("touchstart",function(){
	//不能重复点击
	if($(this).index()!=prevIndex&&hiddenBol){
		$(this).removeClass("inner_backAnt").addClass("inner_ant");	
		clickIndex++;
		//前两次点击
		if(clickIndex<3){
			if(firstBol){
				secondIndex = $(this).index();
				secondSrc = $(this).children().eq(1).attr("src");
				firstBol = false;
			}else{
				firstIndex = $(this).index();
				firstSrc = $(this).children().eq(1).attr("src");
				firstBol = true;
			}		
		}else{ 			
				//第三次点击
			$inner.eq(firstIndex).removeClass("inner_ant").addClass("inner_backAnt");
			$inner.eq(secondIndex).removeClass("inner_ant").addClass("inner_backAnt");
			firstIndex = $(this).index();
			firstSrc = $(this).children().eq(1).attr("src");
			firstBol = true;
			secondIndex =0;
			secondSrc = "";
			clickIndex = 1;
		}
		//第二次点击时 判断是否同一张图片
		if(clickIndex==2){
			if(firstSrc==secondSrc){
					hiddenBol = false;
				setTimeout(function(){
					$inner.eq(firstIndex).css({"visibility":"hidden"});
					$inner.eq(secondIndex).css({"visibility":"hidden"});
					hiddenBol = true;	
				},300)
				
				hiddenIndex++
			}
		}
		//页面被清空
		if(gameLevel==1){
			if(hiddenIndex==3){
				gameNextFn($("#game_next"))
			}
		}
		if(gameLevel==2){
			if(hiddenIndex==6){
				gameNextFn($("#game_next"))
			}
		}
		if(gameLevel==3){
			if(hiddenIndex==10){
				gameNextFn($("#game_pass"))
			}
		}					
		//记录上一次点击下标
		prevIndex = $(this).index();
	}
})
//下一关页面
function gameNextFn(ele){
	setTimeout(function(){
		ele.css({"display": "block"}).animate({
			"top": "0%"	
		},500,"easeOutBounce")	
	},800)
	nextBol = false;
	gameLevel++;				
}
//计时器
var timer = null;
// timerFn(gameTime);
function timerFn(TimeNum){
	var allTime = TimeNum*10;
	TimeNum = TimeNum*10;
	TmContainer.style.width = "72%";
	var conWidth = TmContainer.offsetWidth;
	var index = 0;
	timer = setInterval(function(){
		if(!nextBol){clearInterval(timer)}
		if(TimeNum==0&&nextBol){
			clearInterval(timer);
			nextBol =true;
			$("#game_over").css({"display": "block"}).animate({
				"top": "0%"	
			},500,"easeOutBounce")	
		}
		var per = TimeNum/allTime;
		TmContainer.style.width = conWidth*per+"px";
		percent.innerText = parseInt(100*per)+"%"
		second.innerText =	parseInt(index/10);
		TimeNum--;
		index++;
	},100)
}

//重新生成图片
function againFn(imgArr,num,width){
	clickIndex = 0;
	firstIndex =  0;
	secondIndex =  0;
	firstSrc = "";
	secondSrc = "";
	firstBol = false;
	prevIndex = 1.1;
	hiddenIndex = 0;
	imgArr.sort(function(a,b){
		return Math.random()-0.5;
	})
	for(var i = 0; i <num; i++){
		$gameImgs.get(i).src=imgArr[i]
		$inner.eq(i).css({"visibility":"visible",
						"display":"block",
						"width":width}).removeClass("inner_ant");
	}	
}
//重新生成页面
function gameAgainFn(){
	if(gameLevel==1){
		againFn(imgFirstArr,6,"35%");
		timerFn(gameTime);
	}
	if(gameLevel==2){
		againFn(imgSecArr,12,"24%");
		gameTime = 30;
		$("#container").css({"padding-left": "12%"})
	}
	if(gameLevel==3){
		againFn(imgEndArr,20,"19%");
		gameTime = 50;
		$("#container").css({"padding-left": "9%"})
	}	
}
//挑战失败
$("#game_over").children().click(function(){
	$(this).parent().css({"display":"none"})
	gameAgainFn();
	clearInterval(timer);
	timerFn(gameTime);
})
//挑战成功
$("#game_next").children().click(function(){
	$(this).parent().css({"display":"none"});
	nextBol = true;
	gameAgainFn()
	clearInterval(timer);
	timerFn(gameTime);
	
})
