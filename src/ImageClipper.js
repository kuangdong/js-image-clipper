import './imageClipper.css';
var _container;
var _showImg;
var _controlImg;
var _showImgLeft;
var _showImgTop;
var _showImgWidth;
var _showImgHeight;
var _controlBoxTop;
var _controlBoxLeft;
var _controlBoxWidth;
var _controlBoxHeight;
var _controlImgLeft;
var _controlImgTop;
var _nw;
var _nh;
var _imgRatio;
var _containerW;
var _containerH;

var _startX;
var _startY;
var _option;
var _isSupportTouch;
var _isLoaded;
function init(selector,path,option){
    //debugger
    if(typeof(selector)!=='string')
        throw new Error("selector must be a String");
    _container=document.querySelector(selector);
    if(_container===null)
           throw new Error("Specified dom not found");
    
    var defaults={clipperBoxWidth:200,clipperBoxHeight:200,onImageLoaded:undefined};
    if(option!==undefined && Object.prototype.toString.call(option) === '[object Object]'){
        for(var key in defaults){
            if(option[key]!=undefined){
                if(key=="clipperBoxWidth" || key=="clipperBoxHeight"){
                    var val=option[key];
                    if(parseFloat(val).toString() == "NaN")
                    {
                        option[key]=200;
                    }
                }
                defaults[key]=option[key];
            }
                
        }
    }
    _option=defaults;
    var clipperBox='<div class="imageClipperBodyContainer">'+
      '<div class="imageClipperImgContainer"><div class="imageClipperImgMask"></div><img class="imageClipperShowImg" src="'+path+'" /></div>'+
      '<div class="imageClipperImgControl" style="width:'+_option.clipperBoxWidth+'px;height:'+_option.clipperBoxHeight+'px;">'+
      '<img class="imageClipperControlImg" src="'+path+'"/></div>'+
      '</div>';
    _container.innerHTML=clipperBox;
    _isLoaded=false;
    _container.querySelector(".imageClipperShowImg").addEventListener("load",showImg);
}
function showImg(e){
    //var img=_mask.querySelector(".imageClipperShowImg");
    var target=e.target;
    target.removeEventListener("load",showImg);
    _showImg=target;
    var boxContainer=_container.querySelector(".imageClipperBodyContainer");
    var imgContainer=_container.querySelector(".imageClipperImgContainer");
    var controlBox=_container.querySelector(".imageClipperImgControl");
    _controlBoxWidth=controlBox.clientWidth;
    _controlBoxHeight=controlBox.clientHeight;
    //debugger
    var controlImg=_container.querySelector(".imageClipperControlImg");
    _controlImg=controlImg;
    var containerW=imgContainer.clientWidth;
    _containerW=containerW;
    var containerH=imgContainer.clientHeight;
    _containerH=containerH;
    var nw=target.naturalWidth;
    var nh=target.naturalHeight;
    _nw=nw;
    _nh=nh;
    var imgRatio=nw/nh;
    _imgRatio=imgRatio;
    var imgW;
    var imgH;
    var imgT;
    var imgL;
    if(nw>=nh){
        imgW=containerW;
        imgH=imgW/imgRatio;
    }
    else{
        imgH=containerH;
        imgW=imgH*imgRatio;
    }
    _showImgWidth=imgW;
    _showImgHeight=imgH;
    imgT=(containerH-imgH)/2;
    imgL=(containerW-imgW)/2;
    _showImgTop=imgT;
    _showImgLeft=imgL;
    target.style.width=imgW+"px";
    target.style.height=imgH+"px";
    target.style.top=imgT+"px";
    target.style.left=imgL+"px";

    var boxLeft=(boxContainer.clientWidth-controlBox.clientWidth)/2;
    var boxTop=(boxContainer.clientHeight-controlBox.clientHeight)/2;
    _controlBoxTop=boxTop;
    _controlBoxLeft=boxLeft;
    
    var imgLeft=imgL-boxLeft;
    var imgTop=imgT-boxTop;
    _controlImgLeft=imgLeft;
    _controlImgTop=imgTop;
    controlBox.style.left=boxLeft+"px";
    controlBox.style.top=boxTop+"px";
    controlImg.style.width=imgW+"px";
    controlImg.style.height=imgH+"px";
    controlImg.style.top=imgTop+"px";
    controlImg.style.left=imgLeft+"px";
    _container.querySelector(".imageClipperShowImg").style.visibility='visible';
    _container.querySelector(".imageClipperControlImg").style.visibility='visible';
    _isLoaded=true;
    if(_option.onImageLoaded!==undefined && typeof _option.onImageLoaded==="function")
                _option.onImageLoaded();
    _isSupportTouch="ontouchend" in document ? true : false;
    if(_isSupportTouch)
        boxContainer.addEventListener("touchstart",mousedownHandler);
    else
        boxContainer.addEventListener("mousedown",mousedownHandler);
    
}
function mousedownHandler(e){
    
    /*window.addEventListener("mousemove",mousemoveHandler);
    window.addEventListener("mouseup",mouseupHandler)
    _startX=e.screenX;
    _startY=e.screenY;*/
    e.preventDefault();
    if(_isSupportTouch){
        window.addEventListener("touchmove",mousemoveHandler);
        window.addEventListener("touchend",mouseupHandler);
        _startX=e.touches[0].screenX;
        _startY=e.touches[0].screenY;
    }
    else{
        window.addEventListener("mousemove",mousemoveHandler);
        window.addEventListener("mouseup",mouseupHandler);
        _startX=e.screenX;
        _startY=e.screenY;
    }
}
function mousemoveHandler(e){
    //var target=e.currentTarget.removeEventListener("mou")
    //console.info("e=",e);
    //var currentX=e.screenX;
    //var currentY=e.screenY;
    e.preventDefault();
    if(_isSupportTouch){
        var currentX=e.touches[0].screenX;
        var currentY=e.touches[0].screenY;
    }
    else{
        var currentX=e.screenX;
        var currentY=e.screenY;
    }
    var xd=currentX-_startX;
    var yd=currentY-_startY;
    var showImgLeft=_showImgLeft+xd;
    var showImgTop=_showImgTop+yd;
    if(showImgLeft>_controlBoxLeft){
        showImgLeft=_controlBoxLeft;
    }
    if(showImgTop>_controlBoxTop){
        showImgTop=_controlBoxTop;
    }
    if(showImgLeft+_showImgWidth<_controlBoxLeft+_controlBoxWidth){
        showImgLeft=_controlBoxLeft+_controlBoxWidth-_showImgWidth
    }
    if(showImgTop+_showImgHeight<_controlBoxTop+_controlBoxHeight){
        showImgTop=_controlBoxTop+_controlBoxHeight-_showImgHeight
    }
    _showImgLeft=showImgLeft;
    _showImgTop=showImgTop;
    _showImg.style.left=_showImgLeft+"px";
    _showImg.style.top=_showImgTop+"px";

    _controlImgLeft=showImgLeft-_controlBoxLeft;
    _controlImgTop=showImgTop-_controlBoxTop;
    _controlImg.style.left=_controlImgLeft+"px";
    _controlImg.style.top=_controlImgTop+"px";
    _startX=currentX;
    _startY=currentY;

}
function mouseupHandler(e){
    e.preventDefault();
    if(_isSupportTouch){
        window.removeEventListener("touchmove",mousemoveHandler);
        window.removeEventListener("touchend",mouseupHandler);
    }
    else{
        window.removeEventListener("mousemove",mousemoveHandler);
        window.removeEventListener("mouseup",mouseupHandler);
    }
}

function zoomIn(){
    if(_isLoaded){
        var imgW;
        var imgH;
        var imgT;
        var imgL;
        var controlImgT;
        var controlImgL;
        imgW=_showImgWidth;
        imgW+=imgW*0.1;
        imgH=imgW/_imgRatio;
        /*imgT=(_containerH-imgH)/2;
        imgL=(_containerW-imgW)/2;*/
        imgT=_showImgTop-(imgH-_showImgHeight)/2;
        imgL=_showImgLeft-(imgW-_showImgWidth)/2;
        controlImgT=imgT-_controlBoxTop;
        controlImgL=imgL-_controlBoxLeft;
        
    
        _showImgWidth=imgW;
        _showImgHeight=imgH;
        _showImgTop=imgT;
        _showImgLeft=imgL;
        _controlImgTop=controlImgT;
        _controlImgLeft=controlImgL;
        scaleImg();
    }
}
function zoomOut(){
    if(_isLoaded){
        var imgW;
        var imgH;
        var imgT;
        var imgL;
        var controlImgT;
        var controlImgL;
        if(_nw>_nh){
            imgH=_showImgHeight;
            imgH-=imgH*0.1;
            if(imgH<_controlBoxHeight){
                imgH=_controlBoxHeight;
            }
            imgW=imgH*_imgRatio;
        }
        else{
            imgW=_showImgWidth;
            imgW-=imgW*0.1;
            if(imgW<_controlBoxWidth){
                imgW=_controlBoxWidth;
            }
            imgH=imgW/_imgRatio;
        }
        /*imgT=(_containerH-imgH)/2;
        imgL=(_containerW-imgW)/2;*/
        imgT=_showImgTop-(imgH-_showImgHeight)/2;
        imgL=_showImgLeft-(imgW-_showImgWidth)/2;
        controlImgT=imgT-_controlBoxTop;
        controlImgL=imgL-_controlBoxLeft;
       
        _showImgWidth=imgW;
        _showImgHeight=imgH;
        _showImgTop=imgT;
        _showImgLeft=imgL;
        _controlImgTop=controlImgT;
        _controlImgLeft=controlImgL;
        scaleImg()
    }
}
function scaleImg(){
    _showImg.style.width=_showImgWidth+"px";
    _showImg.style.height=_showImgHeight+"px";
    _showImg.style.top=_showImgTop+"px";
    _showImg.style.left=_showImgLeft+"px";
    _controlImg.style.width=_showImgWidth+"px";
    _controlImg.style.height=_showImgHeight+"px";
    _controlImg.style.top=_controlImgTop+"px";
    _controlImg.style.left=_controlImgLeft+"px";
}
function getPosition(){
    var obj=null;
    if(_isLoaded)
      obj={imgWidth:_showImgWidth,imgHeight:_showImgHeight,clipperX:Math.abs(_controlImgLeft),clipperY:Math.abs(_controlImgTop),clipperBoxWidth:_controlBoxWidth,clipperBoxHeight:_controlBoxHeight};
    return obj;
}
function getDataURL(type, encoderOptions){
    var imgData=null;
    if(_isLoaded){
        var canvas=getCanvas();
        if(type==undefined)
           type='image/png';
        if(encoderOptions==undefined)
            encoderOptions=0.9;
        imgData=canvas.toDataURL(type,encoderOptions);
        canvas=null;
    }
    return imgData;
}
function getBlob(callback, type, encoderOptions){
    if(_isLoaded){
        var canvas=getCanvas();
        if(type==undefined)
           type='image/png';
        if(encoderOptions==undefined)
            encoderOptions=0.9;
        if(callback==undefined || typeof callback!='function')
        {
            throw new Error("need a callback function");
            return;
        }
        canvas.toBlob(function(blob){
            callback(blob);
            canvas=null;
        }, type, encoderOptions);
    }
}
function getCanvas(){
    var canvas=document.createElement("canvas");
    canvas.setAttribute("width",_controlBoxWidth);
    canvas.setAttribute("height",_controlBoxHeight);
    var ctx=canvas.getContext("2d");
    ctx.drawImage(_showImg,_controlImgLeft,_controlImgTop,_showImgWidth,_showImgHeight);
    return canvas;
}
function getIsLoaded(){
    return _isLoaded;
}
function destory(){
    if(_isSupportTouch)
        _container.querySelector(".imageClipperBodyContainer").removeEventListener("touchstart",mousedownHandler); 
    else
        _container.querySelector(".imageClipperBodyContainer").removeEventListener("mousedown",mousedownHandler); 
    _container.innerHTML="";
}
export default{
    init:init,
    getIsLoaded:getIsLoaded,
    zoomIn:zoomIn,
    zoomOut:zoomOut,
    getClipperPosition:getPosition,
    getImgDataURL:getDataURL,
    getImgBlob:getBlob,
    destory:destory
}