let NoteJs = {
    body : document.body,
    toolsContentTitle : '',
    defaultsubmitFuc: function(){alert("提交")},
    defaultBgColorArr : ["#409EFF","#67C23A","#E6A23C","#F56C6C","#909399"],
    checkBgColor: "#409EFF",
    rang: {},
    _show : false,
    init: function(option = {}){
      let _this = this;
      _this.submitFuc = option.submitFuc || this.defaultsubmitFuc
      _this.BgColorArr = option.BgColorArr || this.defaultBgColorArr

      window.addEventListener("mouseup",function(e){
        let selObj = window.getSelection();
        rang = selObj.getRangeAt(0);
        toolsContentTitle  = rang.toString();
        if(toolsContentTitle.length === 0){
           return false;
        }else if(_this._show){
          return false;
        }else{
          _this.rang = rang;
          _this.toolsContentTitle = toolsContentTitle;
          _this.createLayout();
          let toolsDiv = _this.toolsDiv();
          _this.toolsTitleDiv(toolsDiv);
          _this.toolsContentDiv(toolsDiv);
          _this.toolsBgTitleDiv(toolsDiv);
          _this.toolsNoteTitleDiv(toolsDiv);
          _this._show = true;
        }
      });
    },
    /**创建遮罩层**/
    createLayout : function(){
        let layout = document.createElement("div");
        layout.id =  "Notejs_layout";
        layout.style.width = "100%";
        layout.style.height = this.body.offsetHeight;
        layout.style.backgroundColor = "#000";
        layout.style.opacity = ".5";
        layout.style.position = "absolute";
        layout.style.top = 0;
        layout.style.left = 0;
        layout.style.zIndex = 100;
        this.body.appendChild(layout);
        
    },

    toolsDiv : function(){
        let toolsDiv = document.createElement("div");
        toolsDiv.id =  "Notejs_tools";
        toolsDiv.style.width = "300px";
        toolsDiv.style.height = "100%";
        toolsDiv.style.position = "fixed";
        toolsDiv.style.backgroundColor = "#fff";
        toolsDiv.style.top = 0;
        toolsDiv.style.right = 0;
        toolsDiv.style.zIndex = 101;
        toolsDiv.style.animation = "mytools .5s ease"
        toolsDiv.style.boxShadow = "0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)";
        this.addCSS('@keyframes mytools {from {width:0;} to {width:300px;}}');
        this.body.appendChild(toolsDiv);
        return toolsDiv;
    },

    toolsTitleDiv : function(toolsDiv,title = "选中的内容："){
        //设置工具内容数据
        let toolsTitleDiv = document.createElement("div");
        toolsTitleDiv.style.padding = "20px 20px 0";
        toolsTitleDiv.style.paddingBottom = "32px";
        toolsTitleDiv.style.fontSize = "18px";
        toolsTitleDiv.style.color = "#72767b";
        toolsTitleDiv.innerHTML = title;
        toolsDiv.appendChild(toolsTitleDiv);
    },

    toolsContentDiv : function(toolsDiv){
        let toolsContentDiv = document.createElement("div");
        toolsContentDiv.style.padding = "20px";
        toolsContentDiv.style.height = "300px";
        toolsContentDiv.innerHTML = this.toolsContentTitle;
        toolsDiv.appendChild(toolsContentDiv);
    },

    toolsBgTitleDiv : function(toolsDiv,title = "设置背景色："){
        let _this = this;
        let toolsBgTitleDiv = document.createElement("div");
        toolsBgTitleDiv.style.padding = "20px 20px 0";
        toolsBgTitleDiv.style.paddingBottom = "32px";
        toolsBgTitleDiv.style.fontSize = "18px";
        toolsBgTitleDiv.style.color = "#72767b";
        toolsBgTitleDiv.innerHTML = title;
        toolsDiv.appendChild(toolsBgTitleDiv);
       
        let toolsBgTitleSpan = ""
        let BgColorArr = _this.BgColorArr;
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

          //绑定事件，获取你选择的颜色
          toolsBgTitleSpan.addEventListener("click",function(){
              _this.checkBgColor = this.style.backgroundColor;
              this.style.boxShadow = "0px 0px 5px 0px "+item;
              let p = this.parentNode.children;
              for(let i =0,pl= p.length;i<pl;i++) {
                if(p[i] !== this && p[i].nodeName == "SPAN"){
                  p[i].style.boxShadow = "";
                }
              }
          });

          toolsDiv.appendChild(toolsBgTitleSpan);

        });

        let clearDiv = document.createElement("div");
        clearDiv.style.clear = "both";
        toolsDiv.appendChild(clearDiv);

    },

    toolsNoteTitleDiv : function(toolsDiv){
        let toolsNoteTitleDiv = document.createElement("div");
        toolsNoteTitleDiv.style.padding = "20px 20px 0";
        toolsNoteTitleDiv.style.paddingBottom = "32px";
        toolsNoteTitleDiv.style.fontSize = "18px";
        toolsNoteTitleDiv.style.color = "#72767b";
        toolsNoteTitleDiv.style.fontSize = "18px";
        toolsNoteTitleDiv.innerHTML = "笔记内容：";
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

        let _this = this;
        let toolsNoteButton = this.setButton("提交", "#3a8ee6",function(){
        let span = document.createElement("span");
            span.innerText = _this.toolsContentTitle;
            span.style.backgroundColor = _this.getCheckBgColor();
            span.setAttribute("note", _this.setNoteID());
            console.log(_this,span)
          _this.rang.surroundContents(span);
          _this.removeDiv();
          _this.submitFuc()
        });
        toolsNoteButtomDiv.appendChild(toolsNoteButton);
      
        let toolsNoteButton2 = this.setButton("取消", "3a8ee6", function(){
           _this.removeDiv()
        });

        toolsNoteButtomDiv.appendChild(toolsNoteButton2);
        toolsDiv.appendChild(toolsNoteButtomDiv);
    },

    setButton: function( value = "提交", bgColor = "#3a8ee6", callback = function(){}){
      let toolsNoteButton = document.createElement("input");
      toolsNoteButton.type = "button";
      toolsNoteButton.value = value;
      toolsNoteButton.style.border = "1px solid #dcdfe6";
      toolsNoteButton.style.backgroundColor = bgColor;
      toolsNoteButton.style.padding = "5px 20px";
      toolsNoteButton.style.marginRight = "10px";
      toolsNoteButton.style.color = "#fff";
      toolsNoteButton.style.borderRadius = "4px";
      toolsNoteButton.style.cursor = "pointer";

      toolsNoteButton.addEventListener("click",callback);

      return toolsNoteButton;
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
    },

    removeDiv:function(){
      let Nodejs_layout = document.getElementById("Notejs_layout");
      this.body.removeChild(Nodejs_layout);

      let Notejs_tools = document.getElementById("Notejs_tools");
      this.body.removeChild(Notejs_tools);

      this._show = false;
    },

    setNoteID:function(){
       return "js_note_" + (new Date()).getTime();
    },

    getCheckBgColor:function(){
       return this.checkBgColor;
    }
}

const me = Object.create(NoteJs);
me.init({submitFuc: function(){}});
