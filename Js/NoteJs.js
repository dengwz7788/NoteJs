let body = document.body;

window.addEventListener("click",function(){
    const me = Object.create(NoteJs);
    me.init();
});

let NoteJs = {
    init: function(){
        this.createLayout();
        let toolsDiv = this.toolsDiv();
        this.toolsTitleDiv(toolsDiv);
        this.toolsContentDiv(toolsDiv);
        this.toolsBgTitleDiv(toolsDiv);
        this.toolsNoteTitleDiv(toolsDiv);
    },
    /**创建遮罩层**/
    createLayout : function(){
        let layout = document.createElement("div");
        layout.style.width = "100%";
        layout.style.height = "100%";
        layout.style.backgroundColor = "#000";
        layout.style.opacity = "0.3";
        layout.style.position = "absolute";
        layout.style.top = 0;
        layout.style.left = 0;
        layout.style.zIndex = 100;
        body.appendChild(layout);
    },
    toolsDiv : function(){
        let toolsDiv = document.createElement("div");
        toolsDiv.style.width = "300px";
        toolsDiv.style.height = "100%";
        toolsDiv.style.position = "absolute";
        toolsDiv.style.backgroundColor = "#fff";
        toolsDiv.style.top = 0;
        toolsDiv.style.right = 0;
        toolsDiv.style.zIndex = 101;
        toolsDiv.style.animation = "mytools .5s ease"
        this.addCSS('@keyframes mytools {from {width:0;} to {width:300px;}}');
        body.appendChild(toolsDiv);
        return toolsDiv;
    },
    toolsTitleDiv : function(toolsDiv,title = "选中的内容"){
        //设置工具内容数据
        let toolsTitleDiv = document.createElement("div");
        toolsTitleDiv.style.paddingLeft = "20px";
        toolsTitleDiv.style.paddingTop = "10px";
        toolsTitleDiv.style.paddingBottom = "10px";
        toolsTitleDiv.style.fontSize = "18px";
        toolsTitleDiv.style.borderBottom = "1px solid #ccc";
        toolsTitleDiv.innerHTML = title;
        toolsDiv.appendChild(toolsTitleDiv);
    },
    toolsContentDiv : function(toolsDiv,title = "这是一首简单的小情歌"){
        let toolsContentDiv = document.createElement("div");
        toolsContentDiv.style.paddingLeft = "20px";
        toolsContentDiv.style.height = "300px";
        toolsContentDiv.style.paddingTop = "10px";
        toolsContentDiv.innerHTML = title;
        toolsContentDiv.style.borderBottom = "1px solid #e7e7e7";
        toolsDiv.appendChild(toolsContentDiv);
    },
    toolsBgTitleDiv : function(toolsDiv,title = "设置背景色"){
        let toolsBgTitleDiv = document.createElement("div");
        toolsBgTitleDiv.style.paddingLeft = "20px";
        toolsBgTitleDiv.style.paddingTop = "10px";
        toolsBgTitleDiv.style.paddingBottom = "10px";
        toolsBgTitleDiv.style.fontSize = "18px";
        toolsBgTitleDiv.innerHTML = title;
        toolsDiv.appendChild(toolsBgTitleDiv);
       
        let BgColorArr = ["red","blue","yellow","green"];
        let toolsBgTitleSpan = ""
        BgColorArr.forEach((item, index) => {
           toolsBgTitleSpan = document.createElement("span");
           toolsBgTitleSpan.style.border = "1px solid #e7e7e7";
           toolsBgTitleSpan.style.borderRadius = "20px";
           toolsBgTitleSpan.style.backgroundColor = item;
           toolsBgTitleSpan.style.display = "block";
           toolsBgTitleSpan.style.float = "left";
           toolsBgTitleSpan.style.marginLeft= "20px";
           toolsBgTitleSpan.style.width="20px";
           toolsBgTitleSpan.style.height= "20px";
           toolsBgTitleSpan.style.cursor = "pointer";
           toolsBgTitleSpan.title = item;
           toolsDiv.appendChild(toolsBgTitleSpan);
        });
       
        let clearDiv = document.createElement("div");
        clearDiv.style.clear = "both";
        toolsDiv.appendChild(clearDiv);
    },
    toolsNoteTitleDiv : function(toolsDiv){
        let toolsNoteTitleDiv = document.createElement("div");
        toolsNoteTitleDiv.style.paddingLeft = "20px";
        toolsNoteTitleDiv.style.paddingTop = "10px";
        toolsNoteTitleDiv.style.marginTop = "10px";
        toolsNoteTitleDiv.style.paddingBottom = "10px";
        toolsNoteTitleDiv.style.fontSize = "18px";
        toolsNoteTitleDiv.innerHTML = "笔记内容";
        toolsNoteTitleDiv.style.borderTop = "1px solid #e7e7e7";
        toolsDiv.appendChild(toolsNoteTitleDiv);
    
        let toolsNoteContentDiv = document.createElement("textarea");
        toolsNoteContentDiv.style.width = "100%";
        toolsNoteContentDiv.style.height = "400px";
        toolsNoteContentDiv.style.border = "1px solid #e7e7e7";
        toolsDiv.appendChild(toolsNoteContentDiv);
    
        let toolsNoteButtomDiv = document.createElement("div");
        toolsNoteButtomDiv.style.float = "right";
        toolsNoteButtomDiv.style.paddingTop = "20px";
        toolsNoteButtomDiv.style.paddingRight = "20px";
        let toolsNoteButton = document.createElement("input");
        toolsNoteButton.type = "button";
        toolsNoteButton.value = "提交";
        toolsNoteButton.style.border = "1px solid #eee";
        toolsNoteButton.style.backgroundColor = "#eee";
        toolsNoteButton.style.padding = "5px 20px";
        toolsNoteButton.style.color = "#000";
        toolsNoteButton.style.cursor = "pointer";
        toolsNoteButtomDiv.appendChild(toolsNoteButton);
        toolsDiv.appendChild(toolsNoteButtomDiv);
    },
    addCSS: function(cssText){
        var style = document.createElement('style'), //创建一个style元素
          head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
        style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        if(style.styleSheet){ //IE
          var func = function(){
            try{ //防止IE中stylesheet数量超过限制而发生错误
              style.styleSheet.cssText = cssText;
            }catch(e){
       
            }
          }
          //如果当前styleSheet还不能用，则放到异步中则行
          if(style.styleSheet.disabled){
            setTimeout(func,10);
          }else{
            func();
          }
        }else{ //w3c
          //w3c浏览器中只要创建文本节点插入到style元素中就行了
          var textNode = document.createTextNode(cssText);
          style.appendChild(textNode);
        }
        head.appendChild(style); //把创建的style元素插入到head中  
    }
}

