window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
	window.onscroll=function(){
		 if(checkScrollSlide()){
             var oparent=document.getElementById('main');
             for(var i=0;i<dataInt.data.length;i++){
             	var obox=document.createElement('div');
             	obox.className='box';
             	oparent.appendChild(obox);
             	var opic=document.createElement('div');
             	opic.className='pic';
             	obox.appendChild(opic);
             	var oimg=document.createElement('img');
             	oimg.src="images/"+dataInt.data[i].src;
             	opic.appendChild(oimg);
             }
             waterfall('main','box');
		 }
		
	}
}

function waterfall(parent,box){
	// 将main下的所有class为box的元素取出来
	var oparent=document.getElementById(parent);
	var oboxs=getByClass(oparent,box);
	// 计算整个页面显示的列数
    var oboxw=oboxs[0].offsetWidth; //获取元素宽度
    var cols=Math.floor(document.documentElement.clientWidth/oboxw);
    // 设置main的宽
    oparent.style.cssText='width:'+oboxw*cols+'px;margin:0 auto';
    var hArr=[];
    for(var i=0; i<oboxs.length;i++){
    	if(i<cols){
    		hArr.push(oboxs[i].offsetHeight);
    	}
    	else{
            var minH=Math.min.apply(null,hArr);
            var index=getMinIndex(hArr,minH);
            oboxs[i].style.position='absolute';
            oboxs[i].style.top=minH+'px';
            oboxs[i].style.left=oboxw*index+'px';
            //oboxs[i].style.left=oboxs[index].offsetLeft+'px'
            hArr[index]+=oboxs[i].offsetHeight;
    	}
    }
}

function getByClass(parent,clsname){
	var boxarr=new Array();
	var oelements=parent.getElementsByTagName('*');
	for(var i=0;i<oelements.length;i++){
        if(oelements[i].className===clsname){
        	boxarr.push(oelements[i]);
        }
	}
	return boxarr;
}

function getMinIndex(arr,val){
	for(var i in arr){
		if(arr[i]===val){
			return i;
		}
	}
}

function checkScrollSlide(){
	var oparent=document.getElementById('main');
	var oboxs=getByClass(oparent,'box');
	var lastBoxH=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    var height=document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}