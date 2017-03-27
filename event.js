export function addHandler (element, type, handler) {
    if (element.addEventListener) {                         //标准绑定
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {                       //IE绑定
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;                     //DOM0级绑定
    }
}

//获取事件对象
export function getEvent (event) {
    return event ||  window.event;                    //IE的实现方式是通过window.event
}

//获取事件目标
export function getTarget (event) {
    return event.target || event.srcElement;                //IE的实现方式是通过event.srcElement        
}

//获取wheelDelta
export function getWheelDelta (event) {
    if (event.wheelDelta) {
        return event.wheelDelta;                            //向前滚动wheelDelta是120的倍数，向后滚动是-120的倍数
    } else {
        return -event.detail * 40;                          //FireFox中向前滚动wheelDelta是-3的倍数，向后滚动是3的倍数
    }
}

//取消事件的默认行为
export function preventDefault (event) {
    if (event.preventDefault) {
        event.preventDefault();                             //标准
    } else {
        event.returnValue = false;                          //ie下的实现方式
    }
}

export function stopPropagation (e) {
    if(typeof e.stopPropagation === 'function ') {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//移除事件
export function removeHandler (element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);   //标准
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);           //IE
    } else {
        element["on" + type] = null;                         //DOM0
    }
}