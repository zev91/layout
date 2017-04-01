
var WaterFall = (function(){
  function init(){
    waterfall()
    $(window).resize(function(){
      waterfall()
    })
  }
  function waterfall(){
  var nodeWidth = $('.item').width();
  var itemLength = parseInt($('.content-a').width()/nodeWidth)
  var itemArr = [];
  for(i=0;i<itemLength;i++){
    itemArr[i] = 0;
  }
  $('.item').each(function(){
    var minItem = Math.min.apply(null,itemArr);
    var minIndex = itemArr.indexOf(minItem);
    $(this).css({
      top : itemArr[minIndex],
      left: $(this).outerWidth(true)*minIndex
    })
    itemArr[minIndex]+=$(this).outerHeight(true)
  })
  }
  return {
    init:init
  }
})()
WaterFall.init()








  function Barrels($ct){
     this.$ct=$ct;
     this.imgNum=50;
     this.baseHeight=200;
     this.rowList=[];
     this.imgIndex=0;
     this.marginRight=10;
     this.loadImg();
  }
  Barrels.prototype={

    getImgUrls:function(num){
      var width,
          height,
          urls=[];
      for(var i=0;i<num;i++){
        width=Math.floor(Math.random()*500+400);
        height=Math.floor(Math.random()*500+300);
        urls.push("https://unsplash.it/"+width+"/"+height);
      } 
      return urls;   
    },
    loadImg:function(){
      var _this = this;
      var imgs = this.getImgUrls(_this.imgNum);
      $.each(imgs,function(idx,url){
        var img = new Image();
        img.src = url;
        img.onload = function(){
          _this.imgIndex++;
          var originWidth = img.width;
          var originHeight = img.height;
          var ratio = originWidth/originHeight;
          var imgInfo = {
            target:img,
            width:_this.baseHeight*ratio,
            height:_this.baseHeight
          }
          _this.render(imgInfo)
        }
      });
    },
    render:function(imgInfo){
      var contentWidth = this.$ct.width(),
          rowWidth = 0;
          lastImgInfo = imgInfo;
          var newRowHeight = 0;
      
      this.rowList.push(imgInfo) ;
      for(var i=0;i<this.rowList.length;i++){
          rowWidth+=this.rowList[i].width+this.marginRight;
      }
      if(rowWidth>contentWidth){
        this.rowList.pop();
        rowWidth = rowWidth-lastImgInfo.width-this.marginRight;
        newRowHeight = (contentWidth*this.baseHeight)/rowWidth;
        this.layout(newRowHeight);
        this.rowList = [];
        this.rowList.push(lastImgInfo);
      }
      if((this.imgIndex == this.imgNum)&&(rowWidth<contentWidth)){
        newRowHeight = this.baseHeight;
        this.layout(newRowHeight);
      }
    },
    layout:function (newRowHeight){
      var _this = this;
      var $rowCt = $("<div class='img-row'><div>");
      $.each(this.rowList,function(idx,imgInfo){
        var $imgCt = $("<div class='img-box'><div>");
        var $img = $(imgInfo.target);

        var newImgWidth = (imgInfo.width+_this.marginRight)*(newRowHeight/_this.baseHeight)-_this.marginRight;
        $img.height(newRowHeight);
        $img.width(newImgWidth);
        $imgCt.append($img);
        $rowCt.append($imgCt);
      })
      
      this.$ct.append($rowCt);
    }
  },
  new Barrels($(".content"));

