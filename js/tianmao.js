window.onload=function(){
    var rmgj=$(".rmgj");//先获取元素
    var rmzh=$(".rmzh");

// huan yi pi
var pinpai=document.querySelectorAll('.rmzh');
 var pinpaidaohang=document.querySelectorAll('.rmgj');
 var pinpaiarr=[];
 for(var p=1;p<=54;p++){
  pinpaiarr.push("./img/mingpai"+p+".jpg");
 }//获取所有品牌图片
 function randomsort(a, b) {
        return Math.random()>0.5 ? -1 : 1;
 //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
 }
 
 var newarr=pinpaiarr.sort(randomsort);
 


 for(var k=0;k<pinpai.length;k++){
   pinpaidaohang[k].a=k;
   pinpaidaohang[k].onclick=function(){
    for(var j=0;j<pinpai.length;j++){
     pinpai[j].style.display="none";
     pinpaidaohang[j].style.fontWeight="normal";
     pinpaidaohang[j].style.borderBottom="0";
    }
    pinpai[this.a].style.display="block";
    var suijiimg=$("img",pinpai[this.a]);
    for(var j=0;j<suijiimg.length;j++){
     suijiimg[j].src=newarr[j];
    } 
     newarr=newarr.sort(randomsort); 
    pinpaidaohang[this.a].style.fontWeight="bold";
    pinpaidaohang[this.a].style.borderBottom="2px solid black";
    
   }
  }
  var huanyipi=document.querySelector("#huanyipi");
 huanyipi.onclick=function (){
    for(var i=0;i<4;i++){
    if(pinpai[i].style.display=="block"){

     var suijiimg=$("img",pinpai[i]);
     for(var j=0;j<suijiimg.length;j++){
      suijiimg[j].src=newarr[j];
     } 
     newarr=newarr.sort(randomsort); 
    }
   }
  }

for(var i=0;i<rmgj.length;i++){
	rmgj[i].index=i;
	rmgj[i].onclick=function(){
		for(var j=0;j<rmzh.length;j++){
			rmzh[j].style.display="none";
			rmgj[j].style.fontWeight="normal";
			rmgj[j].style.textDecoration="none";
		}
		rmzh[this.index].style.display="block";
		this.style.fontWeight="bold";
		this.style.textDecoration="underline";
	}
	
}


//轮播图
var CPimg=$(".CPimg");
var CD=$(".CD");
var bcb=$(".contentbox")[0];
var newarra=["#b90af9","#dcdcdc","#fff701","#dbdbdb","#67d3b1","#fff701"];
var num=1;
function move(){
	if(num==6){
		num=0;
	}
   for(var i=0;i<CPimg.length;i++){
    CPimg[i].style.zIndex=2;
    CD[i].style.background="#333";
   }
    CPimg[num].style.zIndex=3;
    CD[num].style.background="red";
    bcb.style.background=newarra[num];
   	num++;
}
var t=setInterval(move,2000);

for(var j=0;j<CD.length;j++){
	CD[j].index=j;
	CD[j].onmouseover=function(){
		for(var k=0;k<CPimg.length;k++){
			clearInterval(t);
			CPimg[k].style.zIndex=2;
			CD[k].style.background="#333";
		}
		CPimg[this.index].style.zIndex=3;
		CD[this.index].style.background="red";
    bcb.style.background=newarra[this.index];
	}
	CD[j].onmouseout=function(){
		t=setInterval(move,2000);
		num=this.index+1;
	}
}

//搜索框、
var tex=$(".sousuotex")[0];
tex.onfocus=function(){
	if(tex.value=="猫猫狗狗购物狂欢，给它最好的"){
		tex.value="";
	}
}
tex.onblur=function(){
	if(tex.value){
	}
	else{
		tex.value="猫猫狗狗购物狂欢，给它最好的";
	}
}


//搜索框、
var tex1=$(".sousuotex1")[0];
tex1.onfocus=function(){
  if(tex1.value=="猫猫狗狗购物狂欢，给它最好的"){
    tex1.value="";
  }
}
tex1.onblur=function(){
  if(tex1.value){
  }
  else{
    tex1.value="猫猫狗狗购物狂欢，给它最好的";
  }
}
//搜索框的显示与隐藏
    var search=$(".search")[0];
     	var flag=true;
     	var flag1=true;
     	var floors=$(".aa");
     	 var jump=$(".jump")[0];
        var btn=$("li",jump);
        for(var i=0;i<btn.length;i++){
          btn[i].index=i;
          btn[i].onclick=function(){
                var obj=document.documentElement.scrollTop?document.documentElement:document.body;
                animate(obj,{scrollTop:floors[this.index].t})
        	}
        }
//按需
   var fl=$(".bb");
      //alert(fl.length);
   window.onscroll=function(){
      var ch=document.documentElement.clientHeight;
      var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    var scrollT=obj.scrollTop;
    if(scrollT>=400){
     if(flag){
      animate(search,{top:0},500);
      flag=false;
      flag1=true;
     }
    }
    else if(flag1){
     animate(search,{top:-80},500);
     flag1=false;
     flag=true
    }
   	if(scrollT>=700){
       jump.style.display="block";
    }
     if(scrollT<700){
          jump.style.display="none";
        }
   for(var i=0;i<floors.length;i++){
        floors[i].t=floors[i].offsetTop;
        if(floors[i].t<scrollT+ch/2){
            for(var j=0;j<btn.length;j++){
            	btn[j].style.color="black";
            btn[j].style.background="#eee";
            }
            btn[i].style.background="red";
            btn[i].style.color="#fff";
        }
  }


  var scroll=gscroll();//
        //alert(fl[0].offsetTop)
        for(var i=0;i<fl.length;i++){
         if(fl[i].offsetTop<scroll+ch){//当前楼层到顶部的高度如果小于页面内容超出浏览器的距离+浏览器的距离时
                 var imgs=$("img",fl[i]);//获取当前楼层的所有图片
                 for(var j=0;j<imgs.length;j++){//遍历图片
                  imgs[j].src=imgs[j].getAttribute("aaa");//把每一个图片的aa属性的值赋值给src属性即可
                 }
                 //alert(imgs.length)
         }
        }
 }

//xiaotaoxin
    var rezhh=gc("rezhh");
    var xiaotaoxin=gc("xiaotaoxin");
    for(var i=0;i<rezhh.length;i++){
        rezhh[i].index=i;
        rezhh[i].onmouseover=function(){
            xiaotaoxin[this.index].style.display="block";
        }
        rezhh[i].onmouseout=function(){
            xiaotaoxin[this.index].style.display="none";
        }
    }






//轮播 左右 
    
     

        
      
  function zuoyou(cc){ 
    var one11box=$(".one11box")[cc];
      // alert(one11box.length);
       var onef=$(".onef")[cc];
       var oner=$(".oner")[cc];
        function moveleft(){
            var first=gfirst(one11box);
            animate(one11box,{left:-90},600,Tween.Linear,function(){
                one11box.appendChild(gfirst(one11box));
                one11box.style.left=0;
            });
       }
       var t=setInterval(moveleft,2000);

       function moveright(){
         var last=glast(one11box);
             one11box.insertBefore(last,gfirst(one11box));
             one11box.style.left=-90+"px";
             animate(one11box,{left:0},600,Tween.Linear);
       }

       onef.onmouseover=oner.onmouseover=function(){
          clearInterval(t);
       }
       onef.onmouseout=oner.onmouseout=function(){
          t=setInterval(moveleft,2000);
       }
       onef.onclick=function(){
          moveleft();
       }

       oner.onclick=function(){
          moveright();
       }
  }                       

    
      var one11box=$(".one11box");
        for(var cc=0;cc<one11box.length;cc++){
          zuoyou(cc);
        }
//右边的图片
function bb (b) {
var movel=$(".movel")[b];
var imgsm=$("img",movel);
for (var i = 0; i < imgsm.length; i++) {
    imgsm[i].index=i;
    imgsm[i].onmouseover=function(){
        imgsm[this.index].style.cssText="position:relative;left:-1px";
    }
    imgsm[i].onmouseout=function(){
        imgsm[this.index].style.cssText="position:relative;left:0";
    }
}
}

var movel=$(".movel");
for (var i = 0; i < movel.length; i++) {
    bb(i);
}
//右栏

   var img11=$(".img11")[0];
   var img1=$(".img1")[0];
   img1.onmouseover=function(){
    img11.style.display="block";
    animate(img11,{right:35},200,Tween.Linear);
   }
    img1.onmouseout=function(){
      img11.style.cssText="display:none";
    }
    
    var img33=$(".img33")[0];
   var img3=$(".img3")[0];
   img3.onmouseover=function(){
    img33.style.display="block";
    animate(img33,{right:35},200,Tween.Linear);
   }
    img3.onmouseout=function(){
      img33.style.cssText="display:none";
    }

     var img44=$(".img44")[0];
   var img4=$(".img4")[0];
   img4.onmouseover=function(){
    img44.style.display="block";
    animate(img44,{right:35},200,Tween.Linear);
   }
    img4.onmouseout=function(){
      img44.style.cssText="display:none";
    }

     var img55=$(".img55")[0];
   var img5=$(".img5")[0];
   img5.onmouseover=function(){
    img55.style.display="block";
    animate(img55,{right:35},200,Tween.Linear);
   }
    img5.onmouseout=function(){
      img55.style.cssText="display:none";
    }

     var img66=$(".img66")[0];
   var img6=$(".img6")[0];
   img6.onmouseover=function(){
    img66.style.display="block";
    animate(img66,{right:35},200,Tween.Linear);
   }
    img6.onmouseout=function(){
      img66.style.cssText="display:none";
    }

     var img77=$(".img77")[0];
   var img7=$(".img7")[0];
   img7.onmouseover=function(){
    img77.style.display="block";
    animate(img77,{right:35},200,Tween.Linear);
   }
    img7.onmouseout=function(){
      img77.style.cssText="display:none";
    }

     var img88=$(".img88")[0];
   var img8=$(".img8")[0];
   img8.onmouseover=function(){
    img88.style.display="block";
    animate(img88,{right:35},200,Tween.Linear);
   }
    img8.onmouseout=function(){
      img88.style.cssText="display:none";
    }

     var img1010=$(".img1010")[0];
   var img10=$(".img10")[0];
   img10.onmouseover=function(){
    img1010.style.display="block";
    animate(img1010,{right:35},200,Tween.Linear);
   }
    img10.onmouseout=function(){
      img1010.style.cssText="display:none";
    }

      var img99=$(".img99")[0];
   var img9=$(".img9")[0];
   img9.onmouseover=function(){
    img99.style.display="block";
    animate(img99,{right:35},200,Tween.Linear);
   }
    img9.onmouseout=function(){
      img99.style.cssText="display:none";
    }

//下拉菜单
var yiji=$(".erjifu");
  var erji=$(".erji");
  for(var i=0;i<yiji.length;i++){
    yiji[i].index=i;
    yiji[i].onmouseover=function(){
      for(var j=0;j<erji.length;j++){
        erji[j].style.display="none";
      }
      erji[this.index].style.display="block";
    }
    yiji[i].onmouseout=function(){
      for(var i=0;i<erji.length;i++){
        erji[i].style.display="none";
      }
    }
  }
/*  for(var i=0;i<yiji.length;i++){
    yiji[i].index=i;
    hover(yiji[i],function(){
        var lis=$("li",erji[this.index]);
         var h=lis[0].offsetHeight;
         animate(erji[this.index],{height:lis.length*h},100)
    },function(){
      var lis=$("li",erji[this.index]);
         var h=lis[0].offsetHeight;
         animate(erji[this.index],{height:0},100)
    })
  }
*/
//banner选项卡
    var banr=$(".banr");
    var cont=$(".content-left")[0];
    var banrzi=$("li",cont);
    for(var i=0;i<banrzi.length;i++){
       banrzi[i].index=i;
       hover(banrzi[i],function(){
           banr[this.index].style.zIndex=999;
           banr[this.index].style.display="block";

       },function(){
           banr[this.index].style.zIndex=1;
           banr[this.index].style.display="none";

       })
        }
   for(var j=0;j<banr.length;j++){
    banr[j].index=j;
      banr[j].onmouseover=function(){
           banr[this.index].style.zIndex=999;
           banr[this.index].style.display="block";
      }
      banr[j].onmouseout=function(){
           banr[this.index].style.zIndex=1;
           banr[this.index].style.display="none";
        }
      }
}






