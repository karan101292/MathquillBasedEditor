function MathEditor(id){
  	jq = window.jQuery;
	default_btns = ["fraction","square_root","cube_root","root",'superscript','subscript','multiplication','division','plus_minus','pi','degree','not_equal','greater_equal','less_equal','greater_than','less_than','angle','parallel_to','perpendicular','triangle'];
	button_config = {
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
	var MQ = MathQuill.getInterface(2);
    answerSpan = document.getElementById(id);
    var config = {
	    handlers: {
	      edit: function() {
	        
	      }
	    }
	}
	answerMathField = MQ.MathField(answerSpan, config);
	button_header(default_btns);
	basic_styling();
}

MathEditor.prototype.buttons = function(btns){
	default_btns = btns;
	button_header(default_btns);
}

MathEditor.prototype.removeButtons = function(btns){
	btns.forEach(function(o){
	  	var index = default_btns.indexOf(o);
	  	if(index>=0)
			default_btns.splice(index, 1);
	});
	button_header(default_btns);
}

MathEditor.prototype.styleMe = function(options){
	$(answerSpan).css('background',options.textarea_background)
	$(answerSpan).css('color',options.textarea_foreground)
	$(answerSpan).css('border-color',options.textarea_border)
	$('.matheditor-toolbar').css('background',options.toolbar_background)
	$('.matheditor-toolbar').css('color',options.toolbar_foreground)
	$('.matheditor-toolbar').css('border-color',options.toolbar_border)
	$('.op-btn').css('background',options.button_background)
	$('.op-btn').css('border-color',options.button_border)
}


button_header = function(btns){
	jq(answerSpan).unwrap()
	jq('.matheditor-toolbar').remove();
	required_buttons = getUniq(btns);
	wrapper_html = "<div class='matheditor-wrapper'></div>";
	html = "<div class='matheditor-toolbar'>";
  	required_buttons.forEach(function(b){
  		html+="<span><button data-latex='"+button_config[b]['latex']+"' data-moveto='"+button_config[b]['moveto']+"' data-movefor='"+button_config[b]['movefor']+"' id='matheditor-btn-"+b+"' class='op-btn'><img src='lib/icons/"+button_config[b]['icon']+".svg'></button></span>";
  	});
  	html+="</div>";
  	jq(answerSpan).wrap(wrapper_html);
  	jq(html).insertBefore(answerSpan);
  	button_task(answerMathField);
}

button_task = function(field){
	jq('.op-btn').on('click', function(o){
		latex = jq(this).data('latex');
		field.write(latex);
        field.focus();
        for(var i=1; i<=jq(this).data('movefor'); i++){
        	field.keystroke(jq(this).data('moveto'));
        }
	});
}

getUniq = function(arr){
	var uniqueNames = [];
	jq.each(arr, function(i, el){
	    if(jq.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	return uniqueNames;
}

removeFromArray = function(arr) {
	arr.forEach(function(o){
	  	var index = default_btns.indexOf(o);
	  	if(o>=0)
			default_btns.splice(index, 1);
	})
};
     
basic_styling = function(){
	jq(answerSpan).css('min-width', 500);
	jq(answerSpan).css('min-height', 40);
	jq(answerSpan).css('padding', 5);
	jq(answerSpan).css('background', 'rgba(255, 255, 255, 0.56)');
	jq(answerSpan).css('font-size', '15pt');
	answerSpanWidth = jq(answerSpan).width();
  	jq('.matheditor-wrapper').css('max-width',answerSpanWidth+10);
  	jq('.matheditor-toolbar').css('max-width',answerSpanWidth);
}
