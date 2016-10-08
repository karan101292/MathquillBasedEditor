function MathEditor(id){
  	jq = window.jQuery;
	default_btns = ["fraction","square_root","cube_root","root",'superscript','subscript','multiplication','division','plus_minus','pi','degree','not_equal','greater_equal','less_equal','greater_than','less_than','angle','parallel_to','perpendicular','triangle'];
	button_config = {
  		"fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, icon:'margin-left: -2px; margin-top: -2px'},
  		"mix_fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, icon:'margin-left: -2px; margin-top: -2px'},
  		"square_root": {latex: "\\sqrt{}", moveto: "Left", movefor: 1, icon:'margin-left: -2px; margin-top: -101px;'},
  		"cube_root": {latex: "\\sqrt[3]{}", moveto: "Left", movefor: 1, icon:'margin-left: -2px; margin-top: -167px'},
  		"root": {latex: "\\sqrt[{}]{}", moveto: "Left", movefor: 2, icon:'margin-left: -2px; margin-top: -167px'},
  		"superscript": {latex: "\\^{}", moveto: "Up", movefor: 1, icon:'margin-left: -2px; margin-top: -233px'},
	 	"subscript": {latex: "\\_{}", moveto: "Down", movefor: 1, icon:'margin-left: -2px; margin-top: -299px'},
	 	"multiplication": {latex: "\\times", icon:'margin-left: 5px;margin-top: -512px;'},
	 	"division": {latex: "\\div", icon:'margin-left: -28px; margin-top: -17px'},
	 	"plus_minus": {latex: "\\pm", icon:'margin-left: -35px; margin-top: -2px'},
	 	"pi": {latex: "\\pi", icon:'margin-left: -27px; margin-top: 5px'},
	 	"degree": {latex: "\\degree", icon:'margin-left: -2px; margin-top: -2px'},
	 	"not_equal": {latex: "\\neq", icon:'margin-left: -2px; margin-top: -2px'},
	 	"greater_equal": {latex: "\\geq", icon:'margin-left: -2px; margin-top: -2px'},
	 	"less_equal": {latex: "\\leq", icon:'margin-left: -2px; margin-top: -2px'},
	 	"greater_than": {latex: "\\gt", icon:'margin-left: -2px; margin-top: -2px'},
	 	"less_than": {latex: "\\lt", icon:'margin-left: -2px; margin-top: -2px'},
	 	"angle": {latex: "\\angle", icon:'margin-left: -2px; margin-top: -2px'},
	 	"parallel_to": {latex: "\\parallel", icon:'margin-left: -2px; margin-top: -2px'},
	 	"perpendicular": {latex: "\\perpendicular", icon:'margin-left: -2px; margin-top: -2px'},
	 	"triangle": {latex: "\\triangle", icon:'margin-left: -2px; margin-top: -2px'},	
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
	basic_styling(id)
	button_header(default_btns);
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

button_header = function(btns){
	jq(answerSpan).unwrap()
	jq('.matheditor-header').remove();
	required_buttons = getUniq(btns);
	wrapper_html = "<div class='matheditor-wrapper'></div>";
	html = "<div class='matheditor-header'>";
  	required_buttons.forEach(function(b){
  		html+="<span><button data-latex='"+button_config[b]['latex']+"' data-moveto='"+button_config[b]['moveto']+"' data-movefor='"+button_config[b]['movefor']+"' id='matheditor-btn-"+b+"' class='op-btn'><img src='lib/icons.png' style='"+button_config[b]['icon']+"'></button></span>";
  	});
  	html+="</div>";
  	jq(answerSpan).wrap(wrapper_html);
  	jq(html).insertBefore(answerSpan);
  	answerSpanWidth = jq(answerSpan).width();
  	jq('.matheditor-header').css('max-width',answerSpanWidth);
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
     
basic_styling = function(id){
	jq('#'+id).css('min-width', 500)
	jq('#'+id).css('min-height', 200)
	jq('#'+id).css('padding', 5)
	jq('#'+id).css('font-size', '15pt')
}
