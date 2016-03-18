/*兼容函数：
功能：解决通过类名来获取html元素，在IE8里面的兼容问题。
参数说明：

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>DOM</title>	
</head>
<body>
   <div id="box">
	   	<div class="sbox one" >1</div>
	   	<div class="sbox" name="three">2</div>
	   	<div class="sbox" name="three">3</div>
	   	<div class="sbox" name="three">3</div>
   </div>
   <span class="span">6</span>
   <form action="" name="three"></form>
</body>


   <script>
    */
       //兼容函数
       function gc(c,obj){
         var obj=obj||document;//缩短范围
        if(obj.getElementsByClassName){//判断w3c
          return obj.getElementsByClassName(c);
        }
        else{//判断IE8
          var all=obj.getElementsByTagName("*");//获取所有的标签
          var a=[];//新数组，用来保存找到的元素
          for(var i=0;i<all.length;i++){//遍历标签
              /*if(all[i].className==c){//遍历标签是否等于我的类名
                a.push(all[i]);//将所求类名保存至新数组；
              }*/
              if(chec(all[i].className,c)){//调用函数，判断标签是否等于我的类名
                a.push(all[i]);//将所求类名保存至新数组；
              }
          }
           return a;
        }
       }

       //"sbox one"   ["sbox","one"]
       function chec(s,v){//s---标签类名的字符串   v----值，我自己输入的值
        var newarr=s.split(" ");//将字符分割成数组
        for(var j=0;j<newarr.length;j++){//遍历数组
          if(newarr[j]==v){//第几个数组与我输入的值相同
            return true;//返回true
          }
        }
          return false;//否则 false
       }

/*       var box=document.getElementById("box")[0];
       var sbox=g("sbox",box);
       document.write(sbox.length);
	</script>
</html>

*/






//2.可以获取与设置纯文本
//obj：哪个对象用这个方法
//val:接受第二个实参，表示设置一个文本；
function gt(obj,val){
  if(val==undefined){//如果为undefined，表示只有一个参数，这个函数的功能是获取；
       if(obj.innerText){//ie
       return obj.innerText;
      }
      else{//w3c
        return obj.textContent;
      }
  }
  else{//如果value不是undefined，表示要设置文本；
        if(obj.innerText||obj.innerText==""){//当浏览器有innertext这个属性时，或者当对象的内容有空字符串时，可以给这个对象设置文本ie
        obj.innerText=val;
      }
      else{//w3c
        obj.textContent=val;
      }
  }

}



//3..获取样式
//obj-----哪个对象  valu----哪个属性
function gs(obj,attr){
  if(obj.currentStyle){//IE
    return obj.currentStyle[attr];
  }
  else{//FF
    return getComputedStyle(obj,null)[attr];
  }
}




//4  万能的获取html元素
//obj 对象名
function $(select,obj){
  var obj=obj||document;
  if(typeof select=="string"){//确定传入的是字符串
    select=select.replace(/^\s*|\s*$/g,"");//去掉字符串的空格，无论前面还是后面
    if(select.charAt(0)=="."){//如果获取的第一个字符是。那么就是类名
      return gc(select.slice(1),obj);//那么就从第1个字符截取到末尾
    }
    else if(select.charAt(0)=="#"){//如果获取的第一个字符是#，那么就是id名
      return obj.getElementById(select.slice(1));
    }
    else if(/[a-z|1-6]{1,10}$/g.test(select)){//正则
      return obj.getElementsByTagName(select);
    }
  }
  else if(typeof select=="function"){
    window.onload=function(){
      select();
    }
  }
}
//5.gchild（parent）；
//"a"获取元素子节点的兼容函数
//“b”获取元素加文本节点
//原理：先获取所有的儿子，然后根据节点的类型判断，如果为1，表示是元素节点，保存在数组里面。
function gchild(parent,type){
  var type=type||"a";//不写type的话，默认为文本；写type的话，是元素节点

   var childs=parent.childNodes;//获取所有的儿子
   var arr=[];//保存子元素的数组
   for(var i=0;i<childs.length;i++){
     if(type=="a"){//元素
        if(childs[i].nodeType==1){//获得的1是number
          arr.push(childs[i]);
        }
      }
       else if(type=="b"){//元素加文本
          if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){//获得的1是number
                arr.push(childs[i]);
           }
    
       }
   } 
  return arr;
} 


   //6  获得第一个子节点
    function gfirst(parent){
      return gchild(parent)[0];
    }
    //7 获得最后一个子节点
    function glast(parent){
      return gchild(parent)[gchild(parent).length-1];
    }




    //8  获得一个指定节点
    function gnum(parent,num){
      return gchild(parent)[num];
    }




    //9 获得下一个兄弟节点
    function gnext(obj){
       var next=obj.nextSibling;
       if(next==null){
            return false;
         }
       while(next.nodeType==3||(next.nodeType==8)){//若是3和8就继续往下找。注释
        //alert(next);
         next=next.nextSibling;
         if(next==null){
            return false;
         }
       }
        return next;
    }

    //10  获得上一个兄弟节点
    function glatter(obj){
      var latter=obj.previousSibling;
       if(latter==null){
            return false;
         }
      while(latter.nodeType==3||latter.nodeType==8){
        latter=latter.previousSibling;
        if(latter==null){
            return false;
         }
       }
        return latter;
    }
    //11 插入到某个对象之后
    //插入到下一个对象之前
    //给对象的原型添加此方法  找到第二个参数的兄弟节点，将第一个参数插入到此兄弟节点之前
    Object.prototype.insertAfter=function(obj1,obj2){
      var next=gnext(obj2);//获得下一个兄弟节点
      if(next){
         this.insertBefore(obj1,next);//将obj1插入到下一个对象之前
      }
      else{
        this.appendChild(obj1);//直接将obj1放到最后
      }
    }


       //12   兼容问题,获取滚动条与页面顶部的距离
      function gscroll(){
    var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
     return scrollT;
  }
  //18  hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/