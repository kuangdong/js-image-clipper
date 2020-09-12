#### install

```
npm install js-image-clipper --save
```

##### In browser

```
<script src="../dist/jsImageClipper.js"></script>
<link rel="stylesheet" href="../dist/jsImageClipper.css" type="text/css" />
```



##### javascript

```
import JsImageClipper from 'js-image-Clipper';
import 'imageclipper/dist/jsImageClipper.css';
<body>
	<input type="file" accept="image/*" id="file" />
	<div class="clipperContainer" style="width:200px;height:200px;"></div>
</body>
<script>
document.querySelector("#file").addEventListener("change",fileChange);
function fileChange(e){
    var file=e.target.files[0];
    var url=URL.createObjectURL(file);
    var selector='.clipperContainer';//container for plug-ins,a string class name or id name
    var path=url;//image Path type can be URL.createObjectURL or dataURL or string
    var options={clipperBoxWidth:200,clipperBoxHeight:200,onImageLoaded:imgLoadedHandler}
    JsImageClipper.init(selector,path,options)
    function imgLoadedHandler(){
        console.info(“image has loaded");
    }
    JsImageClipper.getImgBlob(function(blob){
        //get Image blob
    })
    var baseData=JsImageClipper.getImgDataURL('image/png',1);//get image data URL(base64)
    
}
</script>
```

##### OPTIONS

| key              | defaultValue |                                                        |
| ---------------- | ------------ | ------------------------------------------------------ |
| clipperBoxWidth  | 200          | The width of the clipping block                        |
| clipperBoxHeight | 200          | The height of the clipping block                       |
| onImageLoaded    | undefined    | A callback function is called when the image is loaded |

##### INTERFACE

```
1 JsImageClipper.init(selector,path,option);/*Initialization function,Display the clipping surface in the specified 															container.selector:a string class name or id name path:the image's path can be 													URL.createObjectURL or dataURL or string*/
2 JsImageClipper.getIsLoaded();/*A Boolean value that represents whether the image has been loaded*/
3 JsImageClipper.zoomIn();//zoom in the image
4 JsImageClipper.zoomOut();//zoom out the image
5 JsImageClipper.getClipperPosition;//get the object for crop image data
6 JsImageClipper.getImgDataURL(type,encoderOptions);/*return the crop image dataURL,type:A DOMString indicating the image 															format.The default format type is image/png. encoderOptions:A Number between 													0 and 1 indicating the image quality to use for image formats*/
7 JsImageClipper.getImgBlob(callback, type, encoderOptions);/*The method creates a Blob object representing the image. 			                                                               callback:A callback function with the resulting Blob object as a                                                                single argument.type(Optional):A DOMString indicating the image                                                                  format. The default type is image/png. encoderOptions(Optional):A                                                                Number between 0 and 1 indicating image quality if the requested                                                                type is image/jpeg or image/webp. If this argument is anything                                                                 else, the default values 0.92 and 0.80 are used for image/jpeg and                                                               image/webp respectively. Other arguments are ignored.*/
8 JsImageClipper.destory();
```

