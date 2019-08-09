let NoteJs = {
    body : document.body,
    defaultId : "js_content",
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
      _this.id         = option.id || this.defaultId
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
        console.log(this.body.offsetHeight)
        let layout = document.createElement("div");
        layout.id =  "Notejs_layout";
        layout.style.width = "100%";
        layout.style.height = this.body.offsetHeight + "px";
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
        toolsTitleDiv.style.fontSize = "18px";
        toolsTitleDiv.style.color = "#303133";
        toolsTitleDiv.innerHTML = title;
        toolsDiv.appendChild(toolsTitleDiv);
    },

    toolsContentDiv : function(toolsDiv){
        let toolsContentDiv = document.createElement("div");
        toolsContentDiv.style.padding = "20px";
        toolsContentDiv.style.height = "240px";
        toolsContentDiv.style.fontStyle = "oblique"
        toolsContentDiv.style.overflow = "hidden"
        toolsContentDiv.style.color = "#606266"
        toolsContentDiv.innerHTML = this.toolsContentTitle;
        toolsDiv.appendChild(toolsContentDiv);
    },

    toolsBgTitleDiv : function(toolsDiv,title = "设置背景色："){
        let _this = this;
        let toolsBgTitleDiv = document.createElement("div");
        toolsBgTitleDiv.style.padding = "20px 20px 0";
        toolsBgTitleDiv.style.paddingBottom = "20px";
        toolsBgTitleDiv.style.fontSize = "18px";
        toolsBgTitleDiv.style.color = "#303133";
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
      
        let _this = this;
        let toolsNoteTitleDiv = document.createElement("div");
        toolsNoteTitleDiv.style.padding = "20px 20px 0";
        toolsNoteTitleDiv.style.fontSize = "18px";
        toolsNoteTitleDiv.style.color = "#303133";
        toolsNoteTitleDiv.style.fontSize = "18px";
        toolsNoteTitleDiv.innerHTML = "笔记内容：";
        toolsDiv.appendChild(toolsNoteTitleDiv);
    
        let toolsNoteContentDiv = document.createElement("textarea");
        toolsNoteContentDiv.style.width = "260px";

        toolsNoteContentDiv.style.height = "400px";
        toolsNoteContentDiv.style.padding = "20px";
        toolsNoteContentDiv.name = "noteContent";
        toolsNoteContentDiv.style.border = "1px solid #EBEEF5";

        let checkText = _this.toolsContentTitle;
        let noteContent =   _this.getlocalstorage(checkText);
        toolsNoteContentDiv.value = noteContent.noteContent || ""

        toolsDiv.appendChild(toolsNoteContentDiv);
    
        let toolsNoteButtomDiv = document.createElement("div");
        toolsNoteButtomDiv.style.float = "right";
        toolsNoteButtomDiv.style.paddingTop = "20px";
        toolsNoteButtomDiv.style.paddingRight = "20px";

        let toolsNoteButton = this.setButton("提交", "#3a8ee6",function(){
            let span = document.createElement("span");
            let nodeId = _this.setNoteID();
            let bgColor = _this.getCheckBgColor();
            let checkText = _this.toolsContentTitle;
            let NoteContentText = _this.getNoteContent();
                span.innerText = checkText;
                span.style.backgroundColor = bgColor;
                span.setAttribute("note", nodeId);
                span.setAttribute("notecontent", NoteContentText);
              _this.rang.surroundContents(span);
              _this.removeDiv();

              _this.setlocalstorage({nodeid: nodeId, bgColor:bgColor, content: checkText, noteContent: NoteContentText})
              _this.tooltips();
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
    },

    getNoteContent: function(){
      let noteContent = document.getElementsByName("noteContent")[0];
      return noteContent.value || "";
    },

    setlocalstorage: function(newNode){
        let note = localStorage.getItem("note") || [];
        if(note.length){
          note = JSON.parse(note);

          // 判断笔记是修改，还是新增，搜索noteID是否存在
          let IsUpdate = 0;
          note.forEach((element,index) => {
             if(element.content == newNode.content){
                 note[index].noteContent = newNode.noteContent;
                 IsUpdate = 1;
             }
          });
          if(IsUpdate === 0 ){
            note.push(newNode);
          }
        }else{
          note.push(newNode);
        }
        localStorage.setItem('note', JSON.stringify(note));
    },

    getlocalstorage: function(content){
      let note = localStorage.getItem("note") || [];
      let HitData = "";
      if(note.length){
         note = JSON.parse(note);
         note.forEach( element => {
          if(element.content == content){
            HitData = element;
          }
       });
      }
      return HitData;
    },

    assign: function(){
       let _this = this
       let note  = localStorage.getItem("note")
       let newNodeArr = JSON.parse(note) || []
       let HTML = document.getElementById( _this.id ).innerHTML
       newNodeArr.forEach( item => {
          let span = document.createElement("span");
          let content = item.content;
          span.setAttribute("noteid", item.nodeid);
          span.setAttribute("notecontent", item.noteContent)
          span.style.backgroundColor = item.bgColor;
          span.innerHTML = content
          HTML = HTML.replace(new RegExp(content,'g'),span.outerHTML);
          document.getElementById( _this.id ).innerHTML = HTML;
       });
    },

    tooltips:function(){

      let _this = this;
      let dom = document.getElementsByTagName("span");
      for (i = 0; i < dom.length; i++) {

        let nodeid = dom[i].getAttribute("nodeid");
        let notecontent = dom[i].getAttribute("notecontent") || "";
        dom[i].addEventListener("mouseover", function(e){
            let div = document.createElement("div");

            div.id = "tips_"+nodeid;
            div.style.width = "200px";
            div.style.border = "1px solid #303133";
            div.style.backgroundColor = "#303133";
            div.style.color = "#fff";
            div.style.position = "absolute";
            div.style.zIndex = 999;
            div.style.padding = "10px";
            div.style.borderRadius = "4px";
            div.style.fontSize = "14px";
            div.innerText = notecontent;

            let left = e.target.getBoundingClientRect().left;
            let top = e.target.getBoundingClientRect().top;
            let height = e.target.getBoundingClientRect().height;
            let width = e.target.getBoundingClientRect().width;

            console.log(height, width);

            if( left > width){
               div.className = "bubble";
               top = (top + height + 10) + "px";
               left =  (left + (width/2) - 100) + "px";
            }else{
               div.className = "bubble_left";
               console.log(e.target.offsetHeight);
               top = ( top - height) + "px";
               left = (left + width + 10) + "px";
            }

            div.style.top = top;
            div.style.left = left;

            
           
            _this.body.appendChild(div);
        })

        dom[i].addEventListener("mouseout", function(e){
           document.getElementById("tips_"+nodeid).remove();
        })
      }
      this.addCSS(".bubble:after{content:'';position:absolute;bottom:100%;right:50%;width:0;height:0;border-width:8px;border-style:solid;border-color:transparent;border-bottom-width:10px;border-bottom-color:currentColor;color:#303133;}"); 
      this.addCSS(".bubble_left:after{content:'';position:absolute;right:100%;top:calc(50% - 8px);width:0;height:0;border-width:8px;border-style:solid;border-color:transparent;border-right-width:10px;border-right-color:currentColor;color:#303133;}")
    }
}

const me = Object.create(NoteJs);
me.init({
   id: "js_content"
});
me.assign();
me.tooltips();
