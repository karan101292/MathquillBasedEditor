function MathEditor(id){
	var MQ={};
	answerMathField = ((typeof answerMathField != 'undefined')? answerMathField : {});
	answerSpan = ((typeof answerSpan != 'undefined')? answerSpan : {});
	MEtoolbar=null;
	MEwrapper=null;
	MEbuttons=null;
	aid = id;
  	jq = window.jQuery;
	default_toolbar_buttons = ["fraction","square_root","cube_root","root",'superscript','subscript','multiplication','division','plus_minus','pi','degree','not_equal','greater_equal','less_equal','greater_than','less_than','angle','parallel_to','perpendicular','triangle'];
	button_meta = {
  		"fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, icon:'fraction'},
  		"mix_fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, icon:'mix_fraction'},
  		"square_root": {latex: "\\sqrt{}", moveto: "Left", movefor: 1, icon:'square_root'},
  		"cube_root": {latex: "\\sqrt[3]{}", moveto: "Left", movefor: 1, icon:'square_root'},
  		"root": {latex: "\\sqrt[{}]{}", moveto: "Left", movefor: 2, icon:'square_root'},
  		"superscript": {latex: "\\^{}", moveto: "Up", movefor: 1, icon:'superscript'},
	 	"subscript": {latex: "\\_{}", moveto: "Down", movefor: 1, icon:'subscript'},
	 	"multiplication": {latex: "\\times", icon:'multiplication'},
	 	"division": {latex: "\\div", icon:'division'},
	 	"plus_minus": {latex: "\\pm", icon:'plus_minus'},
	 	"pi": {latex: "\\pi", icon:'pi'},
	 	"degree": {latex: "\\degree", icon:'degree'},
	 	"not_equal": {latex: "\\neq", icon:'not_equal'},
	 	"greater_equal": {latex: "\\geq", icon:'greater_equal'},
	 	"less_equal": {latex: "\\leq", icon:'less_equal'},
	 	"greater_than": {latex: "\\gt", icon:'greater_than'},
	 	"less_than": {latex: "\\lt", icon:'less_than'},
	 	"angle": {latex: "\\angle", icon:'angle'},
	 	"parallel_to": {latex: "\\parallel", icon:'parallel'},
	 	"perpendicular": {latex: "\\perpendicular", icon:'perpendicular'},
	 	"triangle": {latex: "\\triangle", icon:'triangle'},	
  	};
	MQ[id] = MathQuill.getInterface(2);
    answerSpan[id] = document.getElementById(id);
    var config = {
	    handlers: {
	      edit: function() {},
	      enter: function() { debugger; }
	    }
	};
	answerMathField[id] = MQ[id].MathField(answerSpan[id], config);
	setToolbar(default_toolbar_buttons);
	basicStyling();
}

MathEditor.prototype.getValue = function(id){
	return answerMathField[aid].latex();
};

MathEditor.prototype.buttons = function(btns){
	default_toolbar_buttons = btns;
	setToolbar(default_toolbar_buttons);
};

MathEditor.prototype.removeButtons = function(btns){
	btns.forEach(function(o){
	  	var index = default_toolbar_buttons.indexOf(o);
	  	if(index>=0)
			default_toolbar_buttons.splice(index, 1);
	});
	setToolbar(default_toolbar_buttons);
};

MathEditor.prototype.styleMe = function(options){
	$(answerSpan[aid]).css('background',options.textarea_background).css('color',options.textarea_foreground).css('border-color',options.textarea_border).css('min-width',options.width).css('max-width',options.width).css('min-height',options.height);
	answerSpanWidth = jq(answerSpan[aid]).width();
	MEtoolbar.css('background',options.toolbar_background).css('color',options.toolbar_foreground).css('border-color',options.toolbar_border).css('max-width',answerSpanWidth);
	MEbuttons.css('background',options.button_background).css('border-color',options.button_border);
  	MEwrapper.css('max-width',answerSpanWidth+10);
};


setToolbar = function(btns){
	if (answerSpan[aid] && MEtoolbar){
		jq(answerSpan[aid]).unwrap();
		MEtoolbar.remove();
	}
	required_buttons = getUniq(btns);
	wrapper_html = "<div class='matheditor-wrapper-"+aid+"'></div>";
	html = "<div class='matheditor-toolbar-"+aid+"'>";
  	required_buttons.forEach(function(b){
  		if(button_meta[b]){
  			html+="<span><button data-latex='"+button_meta[b].latex+"' data-moveto='"+button_meta[b].moveto+"' data-movefor='"+button_meta[b].movefor+"' id='matheditor-btn-"+b+"' class='op-btn'><img src='lib/icons/"+button_meta[b].icon+".svg'></button></span>";
  		}else{
  			console.warn("MathEditor: '"+b+"' is an invalid button");
  		}
  	});
  	html+="</div>";
  	jq(answerSpan[aid]).wrap(wrapper_html);
  	jq(html).insertBefore(answerSpan[aid]);
  	MEwrapper = jq(answerSpan[aid].parentElement);
  	MEtoolbar = jq(answerSpan[aid].parentElement.firstChild);
  	MEbuttons = MEtoolbar.find('.op-btn');
  	button_task(answerMathField[aid]);
};

button_task = function(field){
	MEbuttons.on('click', function(o){
		latex = jq(this).data('latex');
		field.write(latex);
        field.focus();
        for(var i=1; i<=jq(this).data('movefor'); i++){
        	field.keystroke(jq(this).data('moveto'));
        }
	});
};

getUniq = function(arr){
	var uniqueNames = [];
	jq.each(arr, function(i, el){
	    if(jq.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	return uniqueNames;
};

removeFromArray = function(arr) {
	arr.forEach(function(o){
	  	var index = default_toolbar_buttons.indexOf(o);
	  	if(o>=0)
			default_toolbar_buttons.splice(index, 1);
	});
};
     
basicStyling = function(){
	jq(answerSpan[aid]).css('min-width', 500);
	jq(answerSpan[aid]).css('max-width', 500);
	jq(answerSpan[aid]).css('min-height', 40);
	jq(answerSpan[aid]).css('padding', 5);
	jq(answerSpan[aid]).css('background', 'rgba(255, 255, 255, 0.56)');
	jq(answerSpan[aid]).css('font-size', '15pt');
	answerSpanWidth = jq(answerSpan[aid]).width();
  	MEwrapper.css('max-width',answerSpanWidth+10);
  	MEtoolbar.css('max-width',answerSpanWidth);
};
