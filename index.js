require('./demo/style.less');
var axios = require('axios');

var marked = require('marked');
var renderer = new marked.Renderer();

renderer.code = function(code, lang, escaped){
	var _code = marked.Renderer.prototype.code;
	return _code.call(this, code, lang, escaped) + '<div class="demo-block">' + code + '</div>';
};

marked.setOptions({
	renderer: renderer,
	highlight: function (code) {
		return hljs.highlightAuto(code).value;
	}
});

var prefix = '/demo/mds/';
var mds = ['scaffolding', 'grid', 'checkbox', 'table', 'button', 'form', 'filter', 'crumb', 'loading', 'tiptext', 'card', 'steps'];
var doc = document, main = doc.getElementById('main');

mds.forEach(function(name){
	var container = document.createElement('div');
	container.id = name;
	container.className = 'category-block';
	main.appendChild(container);
	axios.get(prefix + name + '.md').then(function(res){
		var title = '<h1 class="category-name"><a href="#' + name + '">' + name + '</a></h1>';
		doc.getElementById(name).innerHTML = title + marked(res.data);
	});
});
