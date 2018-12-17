//第一步扫描dom里边的有数据的元素
var elems = [document.getElementById("input"), document.getElementById("text")]

var data = {
  value: '',
  name: ''
}
// 如果数据改变，触发dom改变
function changeValue(key,value){
  data[key] = value
  // 将js中的数据绑定到dom中
  changeText()
}
// 触发dom上的文本更新
function changeText(){
  for (let i = 0; i < elems.length; i++) {
    const element = elems[i]
    for (let j = 0; j < element.attributes.length; j++) {
      const attr = element.attributes[j];
      if(attr.nodeName.indexOf('q-event')>=0){
        let dataKey = element.getAttribute("ng-bind")
        if(attr.nodeValue === dataKey){
          if(element.value !== data[dataKey]){ //做一次值的检查
            element.setAttribute(dataKey,data[dataKey])
            data[dataKey] = element.value
          }
          
        } else{
          if(element.innerHTML !==data[dataKey]){ //做一次值的检查
            element.innerHTML = data[dataKey]
          }
        }
      }
    }

  }
}
// 监听输入，改变数据的值，将dom上的内容绑定到js中（如果dom改变，触发更改数据）
elems[0].addEventListener("keyup",(e)=>{
  const attr = e.target.getAttribute("q-model")
  changeValue(attr, e.target.value)
})