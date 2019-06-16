var domkey = (function(){
    var keys;
    function getInstance(){
        if( keys === undefined ){
            keys = new Construct();
        }
        return keys;
    }
    function Construct(){
       return [];
    }
    return {
        getkeylist : getInstance
    }
})();

function setKeyList(dom){
   let keylist= domkey.getkeylist();
   if(dom){
       for(let k in keylist){
          if(keylist[k].key==dom.key){
              keylist[k]=dom;
              break;
          }
       }
       return dom;
   }else{
       let obj={key:`keylist${keylist.length}`,dom:``,func:{}}
       keylist.push(obj);
       return obj;
   }
}
let pipMap={
    init:{},render:{}
}
/*let domjsMap={
    onclick:{},
    onload:{},
    onunload:{},
    onchange:{},
    input:{},
}*/
function getdomByKey(key){
    let keylist= domkey.getkeylist();
    for(let k in keylist){
        if(keylist[k].key==key){
            return keylist[k];
        }
    }
}
function strSplit(str,key){//转化函数名

    let index=str.indexOf("{");
    let index2=str.indexOf("}");
    if(index<0){
        return str;
    }
    if(index<index2){
        let func=str.substring(index, index2+1);
        let start=func.indexOf("(");
        let end=func.indexOf(")");
        let name=func.substring(0,start);
        let val=func.substring(start,end+2);
        let newFunc=func.replace(`${name}${val}`,`getdomByKey('${key}').func.${name.substring(1)}${val.substring(0,val.length-1)}`);
        str=str.replace(func,newFunc);
        return strSplit(str,key);
    }else{
        throw `编译错误,位置${index}`
    }

}
function domLife(id,cb){
    let self={};
    init();
    function init(){
        let obj=setKeyList();
        self=obj;
    }
    function getdomKey(){
        let keylist= domkey.getkeylist();
        for(let k in keylist){
            if(keylist[k].key==self.key){
                return dom;
            }
        }
    }

    let domContent=cb();
    for(let k in domContent){
        if(typeof domContent[k] == "function"){
            if(!pipMap[k]){
                self["func"][k]=domContent[k];
            }else{
                domContent[k]
            }
        }
    }
    setKeyList(self);
    render(id,self.key,cb().render);

}
function render(id,key,cb){
    let str=cb();
    str=strSplit(str,key);
    let domElement=$(str);
    $(`#${id}`).append(domElement);
}

