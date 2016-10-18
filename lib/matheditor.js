function MathEditor(id){
	this.MQ=null;
  	jq = window.jQuery;
	this.answerMathField = ((typeof this.answerMathField != 'undefined')? this.answerMathField : {});
	this.answerSpan = ((typeof this.answerSpan != 'undefined')? this.answerSpan : {});
	this.topElements = {
		wrapper: null,
		toolbar: null,
		buttons: null
	}
	this.template = 'default';
	this.default_toolbar_buttons = ["fraction","square_root","cube_root","root",'superscript','subscript','multiplication','division','plus_minus','pi','degree','not_equal','greater_equal','less_equal','greater_than','less_than','angle','parallel_to','perpendicular','triangle'];
	this.default_toolbar_tabs = ["General","Symbols","Geometry"];
	button_meta = {
  		"fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, tab: 1, icon:'fraction'},
  		"mix_fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, tab: 1, icon:'mix_fraction'},
  		"square_root": {latex: "\\sqrt{}", moveto: "Left", movefor: 1, tab: 1, icon:'square_root'},
  		"cube_root": {latex: "\\sqrt[3]{}", moveto: "Left", movefor: 1, tab: 1, icon:'square_root'},
  		"root": {latex: "\\sqrt[{}]{}", moveto: "Left", movefor: 2, tab: 1, icon:'square_root'},
  		"superscript": {latex: "\\^{}", moveto: "Up", movefor: 1, tab: 1, icon:'superscript'},
	 	"subscript": {latex: "\\_{}", moveto: "Down", movefor: 1, tab: 1, icon:'subscript'},
	 	"multiplication": {latex: "\\times", tab: 2, icon:'multiplication'},
	 	"division": {latex: "\\div", tab: 2, icon:'division'},
	 	"plus_minus": {latex: "\\pm", tab: 2, icon:'plus_minus'},
	 	"pi": {latex: "\\pi", tab: 2, icon:'pi'},
	 	"degree": {latex: "\\degree", tab: 2, icon:'degree'},
	 	"not_equal": {latex: "\\neq", tab: 2, icon:'not_equal'},
	 	"greater_equal": {latex: "\\geq", tab: 2, icon:'greater_equal'},
	 	"less_equal": {latex: "\\leq", tab: 2, icon:'less_equal'},
	 	"greater_than": {latex: "\\gt", tab: 2, icon:'greater_than'},
	 	"less_than": {latex: "\\lt", tab: 2, icon:'less_than'},
	 	"angle": {latex: "\\angle", tab: 3, icon:'angle'},
	 	"parallel_to": {latex: "\\parallel", tab: 3, icon:'parallel'},
	 	"perpendicular": {latex: "\\perpendicular", tab: 3, icon:'perpendicular'},
	 	"triangle": {latex: "\\triangle", tab: 3, icon:'triangle'},	
  	};
	this.MQ = MathQuill.getInterface(2);
    this.answerSpan = document.getElementById(id);
    var config = {
	    handlers: {
	      edit: function() {},
	      enter: function() {}
	    }
	};
	this.answerMathField= this.MQ.MathField(this.answerSpan, config);
	setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements,this.default_toolbar_tabs);
	basicStyling(this.answerSpan,this.topElements);
}

MathEditor.prototype.getValue = function(){
	return this.answerMathField.latex();
};

MathEditor.prototype.buttons = function(btns){
	this.default_toolbar_buttons = btns;
	setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements);
};

MathEditor.prototype.removeButtons = function(btns){
	var default_toolbar_buttons = this.default_toolbar_buttons;
	btns.forEach(function(o){
	  	var index = default_toolbar_buttons.indexOf(o);
	  	if(index>=0)
			this.default_toolbar_buttons.splice(index, 1);
	});
	setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements);
};

MathEditor.prototype.styleMe = function(options){
	jq(this.answerSpan).css('background',options.textarea_background).css('color',options.textarea_foreground).css('border-color',options.textarea_border).css('min-width',options.width).css('max-width',options.width).css('min-height',options.height);
	answerSpanWidth = jq(this.answerSpan).width();
	this.topElements.toolbar.css('background',options.toolbar_background).css('color',options.toolbar_foreground).css('border-color',options.toolbar_border).css('max-width',answerSpanWidth);
	this.topElements.buttons.css('background',options.button_background).css('border-color',options.button_border);
  	this.topElements.wrapper.css('max-width',answerSpanWidth+10);
};

MathEditor.prototype.setTemplate = function(name){
	if (name=='keypad'){
		jq(this.answerSpan).css('position','absolute');
		this.topElements.toolbar.css('position','absolute').css('width','220');
		answerSpanHeight = jq(this.answerSpan).height();
		this.topElements.toolbar.css('margin-top',answerSpanHeight+13).hide();
		this.topElements.buttons.css('margin-right','10').css('margin-bottom','10');
		keypad_animation(this.answerSpan, this.topElements);
	}else{
		console.warn("MathEditor: "+name+" is an invalid template name");
	}
};

keypad_animation = function(answer_span, top_elements){
	evt=null;
	document.onmousemove = function (e) {
	    e = e || window.event;
	    evt = e;
	}
	jq(answer_span).focusin(function(o){
		top_elements.toolbar.show();
	});
	jq(answer_span).focusout(function(o){
		if(evt.target.className=='op-btn' || evt.target.className=='matheditor-toolbar-answer' || evt.target.className=='matheditor-btn-img'){
		}else{
			top_elements.toolbar.hide();
		}
	});
}

setToolbar = function(btns,answer_span,answer_math_field,top_elements,tabs){
	if (answer_span && top_elements.toolbar){
		jq(answer_span).unwrap();
		top_elements.toolbar.remove();
	}
	required_buttons = getUniq(btns);
	required_tabs = getUniq(tabs);
	editor_id = $(answer_span).attr('id')
	wrapper_html = "<div class='matheditor-wrapper-"+editor_id+"'></div>";
	html = "<div class='matheditor-toolbar-"+editor_id+"'>";
	html += "<ul class='tabs'>";
	required_tabs.forEach(function(o,idx){
		if(idx==0){
			html += "<li class='tab-link current' data-tab='tab-"+(idx+1).toString()+"'>"+o+"</li>";
		}else{
			html += "<li class='tab-link' data-tab='tab-"+(idx+1).toString()+"'>"+o+"</li>";
		}
	});
	html += "</ul>";
	required_tabs.forEach(function(o,idx){
		if(idx==0){
			html += "<div id='tab-"+(idx+1).toString()+"' class='tab-content current'>";
		}else{
			html += "<div id='tab-"+(idx+1).toString()+"' class='tab-content'>";
		}
		required_buttons.forEach(function(b){
			if(button_meta[b].tab == idx+1){
				if(button_meta[b]){
	  				html+="<span id='matheditor-btn-span'><button data-latex='"+button_meta[b].latex+"' data-moveto='"+button_meta[b].moveto+"' data-movefor='"+button_meta[b].movefor+"' id='matheditor-btn-"+b+"' class='op-btn'><img class='matheditor-btn-img' src='lib/icons/"+button_meta[b].icon+".svg'></button></span>";
		  		}else{
		  			console.warn("MathEditor: '"+b+"' is an invalid button");
		  		}
			}
	  	});
  		html+="</div>"
	});

  	html+="</div>";
  	jq(answer_span).wrap(wrapper_html);
  	jq(html).insertBefore(answer_span);
  	top_elements.wrapper = jq(answer_span.parentElement);
  	top_elements.toolbar = jq(answer_span.parentElement.firstChild);
  	top_elements.buttons = top_elements.toolbar.find('.op-btn');
  	button_task(answer_math_field,top_elements);

  	$(document).ready(function(){
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})
};

button_task = function(field,top_elements){
	top_elements.buttons.on('click', function(o){
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
	  	var index = this.default_toolbar_buttons.indexOf(o);
	  	if(o>=0)
			this.default_toolbar_buttons.splice(index, 1);
	});
};
     
basicStyling = function(answer_span,top_elements){
	jq(answer_span).css('min-width', 500);
	jq(answer_span).css('max-width', 500);
	jq(answer_span).css('min-height', 40);
	jq(answer_span).css('padding', 5);
	jq(answer_span).css('background', 'rgba(255, 255, 255, 0.56)');
	jq(answer_span).css('font-size', '15pt');
	answerSpanWidth = jq(answer_span).width();
  	top_elements.wrapper.css('max-width',answerSpanWidth+10);
  	top_elements.toolbar.css('max-width',answerSpanWidth);
};
