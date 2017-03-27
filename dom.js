export function getWindowSize () {
  let winWidth
  let winHeight
  if (window.innerWidth) {
    winWidth = window.innerWidth
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth
  }
  // 获取窗口高度
  if (window.innerHeight) {
    winHeight = window.innerHeight
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
  }

  // 通过深入 Document 内部对 body 进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight
    winWidth = document.documentElement.clientWidth
  }
  return {
    winHeight,
    winWidth
  }
}

/**
 * 是否是元素节点
 * @param   {Element}  element
 * @return  {Boolean}
 */
export function isElement (element) {
	return element.nodeType === 1;
}

/**
 * 是否是文本节点
 * @param   {Element}  element
 * @return  {Boolean}
 */
export function isTextNode (element) {
	return element.nodeType === 3;
}

/**
 * 清空 element 的所有子节点
 * @param  {Element}  element
 */
export function empty (element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	return element;
}

/**
 * 获取节点属性值
 * @param   {Element}  node
 * @param   {String}   name
 * @return  {String}
 */
export function getAttr (node, name) {
	return node.getAttribute(name) || '';
}

/**
 * 移除节点属性
 * @param  {Element}  node
 * @param  {String}   name
 */
export function removeAttr (node, name) {
	node.removeAttribute(name);
}

/**
 * 设置节点属性
 * @param  {Element}  node
 * @param  {String}   name
 * @param  {String}   value
 */
export function setAttr (node, name, value) {
	// 设为 null/undefined 和 false 移除该属性
	if (value == null || value === false) {
		return removeAttr(node, name);
	}

	if (value === true) {
		node[name] = value;

		// 有些浏览器/情况下用 node[name] = true
		// 是无法添加自定义属性的，此时设置一个空字符串
		if (!hasAttr(node, name)) {
			node.setAttribute(name, '');
		}
	} else if (value !== getAttr(node, name)) {
		node.setAttribute(name, value);
	}
}

/**
 * 判断节点是否存在属性
 * @param   {Element}  node
 * @param   {String}   name
 * @return  {Boolean}
 */
export function hasAttr (node, name) {
	return node.hasAttribute(name);
}

/**
 * 节点是否存在 classname
 * @param   {Element}  node
 * @param   {String}   classname
 * @return  {Boolean}
 */
export function hasClass (node, classname) {
	let current, list = node.classList;

	/* istanbul ignore else */
	if (list) {
		return list.contains(classname);
	} else {
		current = ' ' + getAttr(node, 'class') + ' ';
		return current.indexOf(' ' + classname + ' ') > -1;
	}
}

/**
 * 节点添加 classname
 * @param  {Element}  node
 * @param  {String}   classname
 */
export function addClass (node, classname) {
	let current, list = node.classList;

	if (!classname || hasClass(node, classname)) {
		return;
	}

	/* istanbul ignore else */
	if (list) {
		list.add(classname);
	} else {
		current = ' ' + getAttr(node, 'class') + ' ';

		if (current.indexOf(' ' + classname + ' ') === -1) {
			setAttr(node, 'class', (current + classname).trim());
		}
	}
}

/**
 * 节点删除 classname
 * @param  {Element}  node
 * @param  {String}   classname
 */
export function removeClass (node, classname) {
	let current, target, list = node.classList;

	if (!classname || !hasClass(node, classname)) {
		return;
	}

	/* istanbul ignore else */
	if (list) {
		list.remove(classname);
	} else {
		target = ' ' + classname + ' ';
		current = ' ' + getAttr(node, 'class') + ' ';

		while (current.indexOf(target) > -1) {
			current = current.replace(target, ' ');
		}

		setAttr(node, 'class', current.trim());
	}

	if (!node.className) {
		removeAttr(node, 'class');
	}
}

/**
 * 节点事件绑定
 * @param  {Element}   node
 * @param  {String}    evt
 * @param  {Function}  callback
 * @param  {Boolean}   capture
 */
export function addEvent (node, evt, callback, capture) {
	node.addEventListener(evt, callback, capture);
}

/**
 * 解除节点事件绑定
 * @param  {Element}   node
 * @param  {String}    evt
 * @param  {Function}  callback
 * @param  {Boolean}   capture
 */
export function removeEvent (node, evt, callback, capture) {
	node.removeEventListener(evt, callback, capture);
}