function MathEditor(id){
    this.isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){this.isMobile = true;}
    this.MQ=null;
    jq = window.jQuery;
    this.tabEnabled = true;
    this.answerMathField = ((typeof this.answerMathField != 'undefined')? this.answerMathField : {});
    this.answerSpan = ((typeof this.answerSpan != 'undefined')? this.answerSpan : {});
    this.topElements = {
        wrapper: null,
        toolbar: null,
        buttons: null
    }
    this.template = 'default';
    this.default_toolbar_buttons = ["fraction","square_root","cube_root","root",'superscript','subscript','multiplication','division','plus_minus','pi','degree','not_equal','greater_equal','less_equal','greater_than','less_than','angle','parallel_to','perpendicular','triangle','parallelogram','round_brackets'];
    this.default_toolbar_tabs = ["General","Symbols","Geometry"];
    button_meta = {
        "fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, tab: 1, icon:'\\frac{□}{□}'},
        "mix_fraction": {latex: "\\frac{}{}", moveto: "Up", movefor: 1, tab: 1, icon:'\\frac{□}{□}'},
        "square_root": {latex: "\\sqrt{}", moveto: "Left", movefor: 1, tab: 1, icon:'\\sqrt{\\square}'},
        "cube_root": {latex: "\\sqrt[3]{}", moveto: "Left", movefor: 1, tab: 1, icon:'\\sqrt[3]{\\square}'},
        "root": {latex: "\\sqrt[{}]{}", moveto: "Left", movefor: 2, tab: 1, icon:'\\sqrt[□]{\\square}'},
        "superscript": {latex: "\\^{}", moveto: "Up", movefor: 1, tab: 1, icon:'\\square^2'},
        "subscript": {latex: "\\_{}", moveto: "Down", movefor: 1, tab: 1, icon:'\\square_{2}'},
        "multiplication": {latex: "\\times", tab: 2, icon:'\\times'},
        "division": {latex: "\\div", tab: 2, icon:'\\div'},
        "plus_minus": {latex: "\\pm", tab: 2, icon:'\\pm'},
        "pi": {latex: "\\pi", tab: 2, icon:'\\pi'},
        "degree": {latex: "\\degree", tab: 2, icon:'\\degree'},
        "not_equal": {latex: "\\neq", tab: 2, icon:'\\neq'},
        "greater_equal": {latex: "\\geq", tab: 2, icon:'\\geq'},
        "less_equal": {latex: "\\leq", tab: 2, icon:'\\leq'},
        "greater_than": {latex: "\\gt", tab: 2, icon:'\\gt'},
        "less_than": {latex: "\\lt", tab: 2, icon:'\\lt'},
        "angle": {latex: "\\angle", tab: 3, icon:'\\angle'},
        "parallel_to": {latex: "\\parallel", tab: 3, icon:'\\parallel'},
        "perpendicular": {latex: "\\perpendicular", tab: 3, icon:'\\perpendicular'},
        "triangle": {latex: "\\triangle", tab: 3, icon:'\\triangle'},   
        "parallelogram": {latex: "\\parallelogram", tab: 3, icon:'\\parallelogram'},
        "round_brackets": {latex: "\\left(\\right)", tab: 1, icon:'\\left(\\right)'},    
    };

    // keyboard_keys_letters = [
    //     {'value': 'q', 'type': 'write', 'class':'ks', 'display':'q', 'new_line': false},
    //     {'value': 'w', 'type': 'write', 'class':'ks', 'display':'w', 'new_line': false},
    //     {'value': 'e', 'type': 'write', 'class':'ks', 'display':'e', 'new_line': false},
    //     {'value': 'r', 'type': 'write', 'class':'ks', 'display':'r', 'new_line': false},
    //     {'value': 't', 'type': 'write', 'class':'ks', 'display':'t', 'new_line': false},
    //     {'value': 'y', 'type': 'write', 'class':'ks', 'display':'y', 'new_line': false},
    //     {'value': 'u', 'type': 'write', 'class':'ks', 'display':'u', 'new_line': false},
    //     {'value': 'i', 'type': 'write', 'class':'ks', 'display':'i', 'new_line': false},
    //     {'value': 'o', 'type': 'write', 'class':'ks', 'display':'o', 'new_line': false},
    //     {'value': 'p', 'type': 'write', 'class':'ks', 'display':'p', 'new_line': true},
    //     {'value': 'a', 'type': 'write', 'class':'ks', 'display':'a', 'new_line': false},
    //     {'value': 's', 'type': 'write', 'class':'ks', 'display':'s', 'new_line': false},
    //     {'value': 'd', 'type': 'write', 'class':'ks', 'display':'d', 'new_line': false},
    //     {'value': 'f', 'type': 'write', 'class':'ks', 'display':'f', 'new_line': false},
    //     {'value': 'g', 'type': 'write', 'class':'ks', 'display':'g', 'new_line': false},
    //     {'value': 'h', 'type': 'write', 'class':'ks', 'display':'h', 'new_line': false},
    //     {'value': 'j', 'type': 'write', 'class':'ks', 'display':'j', 'new_line': false},
    //     {'value': 'k', 'type': 'write', 'class':'ks', 'display':'k', 'new_line': false},
    //     {'value': 'l', 'type': 'write', 'class':'ks', 'display':'l', 'new_line': true},
    //     {'value': 'CapsLock', 'type': 'custom', 'class':'ks long icon', 'display':'&#8673;', 'new_line': false},
    //     {'value': 'z', 'type': 'write', 'class':'ks', 'display':'z', 'new_line': false},
    //     {'value': 'x', 'type': 'write', 'class':'ks', 'display':'x', 'new_line': false},
    //     {'value': 'c', 'type': 'write', 'class':'ks', 'display':'c', 'new_line': false},
    //     {'value': 'v', 'type': 'write', 'class':'ks', 'display':'v', 'new_line': false},
    //     {'value': 'b', 'type': 'write', 'class':'ks', 'display':'b', 'new_line': false},
    //     {'value': 'n', 'type': 'write', 'class':'ks', 'display':'n', 'new_line': false},
    //     {'value': 'm', 'type': 'write', 'class':'ks', 'display':'m', 'new_line': false},
    //     {'value': 'Backspace', 'type': 'keystroke', 'class':'ks long icon', 'display':'&#8678;', 'new_line': true},
    //     {'value': 'numpad', 'type': 'custom', 'class':'ks long', 'display':'123', 'new_line': false},
    //     {'value': ',', 'type': 'write', 'class':'ks', 'display':',', 'new_line': false},
    //     {'value': ' ', 'type': 'write', 'class':'ks', 'display':'&nbsp;', 'new_line': false},
    //     {'value': '\\ ', 'type': 'write', 'class':'ks too_long', 'display':'&nbsp;', 'new_line': false},
    //     {'value': '\\ ', 'type': 'write', 'class':'ks too_long', 'display':'[ ]', 'new_line': false},
    //     {'value': '\\ ', 'type': 'write', 'class':'ks too_long', 'display':'&nbsp;', 'new_line': false},
    //     {'value': '.', 'type': 'write', 'class':'ks', 'display':'.', 'new_line': false},
    //     {'value': 'close', 'type': 'custom', 'class':'ks long takeup', 'display':'X', 'new_line': false}
    // ];

    this.MQ = MathQuill.getInterface(2);
    this.answerSpan = document.getElementById(id);
    var config = {
        handlers: {
          edit: function() {},
          enter: function() {},
        }
    };

    this.answerMathField= this.MQ.MathField(this.answerSpan, config);
    setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements,this.default_toolbar_tabs,this.tabEnabled,this.isMobile);
    basicStyling(this.answerSpan,this.topElements);
}

MathEditor.prototype.getValue = function(){
    return this.answerMathField.latex();
};

MathEditor.prototype.setLatex = function(latex){
    this.answerMathField.latex(latex);  
};

MathEditor.prototype.getPrintableValue = function(){
    return "$$"+this.answerMathField.latex()+"$$";
};

MathEditor.prototype.buttons = function(btns){
    this.default_toolbar_buttons = btns;
    setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements,this.default_toolbar_tabs,this.tabEnabled);
};

MathEditor.prototype.removeButtons = function(btns){
    var default_toolbar_buttons = this.default_toolbar_buttons;
    btns.forEach(function(o){
        var index = default_toolbar_buttons.indexOf(o);
        if(index>=0)
            this.default_toolbar_buttons.splice(index, 1);
    });
    setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements,this.default_toolbar_tabs,this.tabEnabled);
};

MathEditor.prototype.styleMe = function(options){
    jq(this.answerSpan).css('background',options.textarea_background).css('color',options.textarea_foreground).css('border-color',options.textarea_border).css('width',options.width).css('min-width',options.width).css('min-height',options.height).css('height',options.height);
    answerSpanWidth = jq(this.answerSpan).width();
    this.topElements.wrapper.css('width',parseInt(options.width)+10).css('min-width',parseInt(options.width)+10);
    this.topElements.toolbar.css('background',options.toolbar_background).css('color',options.toolbar_foreground).css('border-color',options.toolbar_border).css('min-width',options.width).css('width',parseInt(options.width));
    this.topElements.buttons.css('background',options.button_background).css('border-color',options.button_border);
};

MathEditor.prototype.setTemplate = function(name){
    if (name=='keypad'){
        this.tabEnabled = false;
        this.template = 'keypad'
        setToolbar(this.default_toolbar_buttons,this.answerSpan,this.answerMathField,this.topElements,this.default_toolbar_tabs,this.tabEnabled);
        setCloseButton(this.topElements);
        jq(this.answerSpan).css('position','absolute');
        this.topElements.toolbar.css('position','absolute').css('width','260').css('z-index',999999);
        answerSpanHeight = jq(this.answerSpan).height();
        this.topElements.toolbar.css('margin-top',answerSpanHeight+13).hide();
        this.topElements.buttons.css('margin-right','10').css('margin-bottom','10');
        top_elements = this.topElements
        jq(this.answerSpan).focusin(function(o){
            top_elements.toolbar.show();
        });
    }else{
        console.warn("MathEditor: "+name+" is an invalid template name");
    }
};

MathEditor.prototype.noKeyboard = function(){
    editor_id = $(this.answerSpan).attr('id');
    jq(this.answerSpan).find('textarea').removeAttr('readonly')
    jq('#keys-'+editor_id).remove();
}

setVirtualKeyboard = function(top_elements,answer_span,field,html,count){
    editor_id = $(answer_span).attr('id')
    jq('#keys-'+editor_id).remove();
    newhtml = "<div id='keys-"+editor_id+"'>"+html+"</div>" 
    jq(newhtml).insertAfter(answer_span);
    jq(answer_span).find('textarea').attr('readonly','readonly');
    jq(answer_span).focusin(function(o){
        jq("[id^=keys-]").find('a').css('width',($(window).width()/count))
        jq('#keys-'+$(this).attr('id')).slideDown();
    });
    jq("[id^=keys-]").find('a').css('width',($(window).width()/count))
    keyboardAction(top_elements,answer_span,field);
}

keyboardAction = function(top_elements,answer_span,field){
    caps = false;
    editor_id = $(answer_span).attr('id')
    $('#keys-'+editor_id).find('a').on('click', function(o){
        editor_id = $(this).parent().parent().attr('id').split('-')[1];
        type = jq(this).data('type');
        value = jq(this).data('value');
        if(type=='keystroke'){
            field.keystroke(value);
            field.focus();
        }else if(type=='write'){
            if(typeof value == 'string'){if(caps){value = value.toUpperCase()}else{value = value.toLowerCase()}}
            field.write(value);
            field.focus();
        }else if(type=='custom'){
            if(value=='CapsLock'){
                caps = !caps;
                if (caps){
                    jq(this).css('background','#bbbbbb');
                    jq(this).css('color','#428bca');
                    jq('.ks').css('text-transform','uppercase')
                }else{
                    jq(this).css('background','#dddddd');
                    jq(this).css('color','#000000');
                    jq('.ks').css('text-transform','lowercase');
                }
                field.focus();
            }else if(value=='numpad'){
                jq('.keyboard-letters-'+editor_id).remove();
                setVirtualKeyboard(top_elements,answer_span,field,"<div class='keyboard-numbers-"+editor_id+"'><a data-type='write' data-value='1' class='ks'>1</a><a data-type='write' data-value='2' class='ks'>2</a><a data-type='write' data-value='3' class='ks'>3</a><a data-type='write' data-value='+' class='ks'>+</a><a data-type='write' data-value='-' class='ks'>&#8315;</a><br><a data-type='write' data-value='4' class='ks'>4</a><a data-type='write' data-value='5' class='ks'>5</a><a data-type='write' data-value='6' class='ks'>6</a><a data-type='write' data-value='\\times' class='ks'>&times;</a><a data-type='write' data-value='/' class='ks'>&#247;</a><br><a data-type='write' data-value='7' class='ks'>7</a><a data-type='write' data-value='8' class='ks'>8</a><a data-type='write' data-value='9' class='ks'>9</a><a data-type='write' data-value='=' class='ks'>=</a><a data-type='keystroke' data-value='Backspace' class='ks long icon'>&#8678;</a><br><a data-type='custom' data-value='letters' class='ks long'>ABC</a><a data-type='write' data-value='0' class='ks'>0</a><a data-type='write' data-value='?' class='ks'>?</a><a data-type='write' data-value='%' class='ks'>%</a><a data-type='custom' data-value='close' class='ks long takeup'>X</a></div>",5);
                jq('.keyboard-numbers-'+editor_id).parent().show();
            }else if(value=='letters'){
                jq('.keyboard-numbers-'+editor_id).remove();
                setVirtualKeyboard(top_elements,answer_span,field,"<div class='keyboard-letters-"+editor_id+"'><a data-type='write' data-value='q' class='ks'>q</a><a data-type='write' data-value='w' class='ks'>w</a><a data-type='write' data-value='e' class='ks'>e</a><a data-type='write' data-value='r' class='ks'>r</a><a data-type='write' data-value='t' class='ks'>t</a><a data-type='write' data-value='y' class='ks'>y</a><a data-type='write' data-value='u' class='ks'>u</a><a data-type='write' data-value='i' class='ks'>i</a><a data-type='write' data-value='o' class='ks'>o</a><a data-type='write' data-value='p' class='ks'>p</a><br><a data-type='write' data-value='a' class='ks'>a</a><a data-type='write' data-value='s' class='ks'>s</a><a data-type='write' data-value='d' class='ks'>d</a><a data-type='write' data-value='f' class='ks'>f</a><a data-type='write' data-value='g' class='ks'>g</a><a data-type='write' data-value='h' class='ks'>h</a><a data-type='write' data-value='j' class='ks'>j</a><a data-type='write' data-value='k' class='ks'>k</a><a data-type='write' data-value='l' class='ks'>l</a><br><a data-type='custom' data-value='CapsLock' class='ks long icon'>&#8673;</a><a data-type='write' data-value='z' class='ks'>z</a><a data-type='write' data-value='x' class='ks'>x</a><a data-type='write' data-value='c' class='ks'>c</a><a data-type='write' data-value='v' class='ks'>v</a><a data-type='write' data-value='b' class='ks'>b</a><a data-type='write' data-value='n' class='ks'>n</a><a data-type='write' data-value='m' class='ks'>m</a><a data-type='keystroke' data-value='Backspace' class='ks long icon'>&#8678;</a><br><a data-type='custom' data-value='numpad' class='ks long'>123</a><a data-type='write' data-value=',' class='ks'>,</a><a data-type='write' data-value='' class='ks'>&nbsp;</a><a data-type='write' data-value='\\ ' class='ks too_long'>&nbsp;</a><a data-type='write' data-value='\\ ' class='ks too_long'>[ ]</a><a data-type='write' data-value='\\ ' class='ks too_long'>&nbsp;</a><a data-type='write' data-value='' class='ks'>&nbsp;</a><a data-type='write' data-value='.' class='ks'>.</a><a data-type='custom' data-value='close' class='ks long takeup'>X</a></div>",10);
                jq('.keyboard-letters-'+editor_id).parent().show();
            }else if(value=='close'){
                jq(this).parent().parent().slideUp();
            }
        }
    });
}

setCloseButton = function(top_elements){
    btnhtml = "<div class='close-btn'><span id='close-btn'>X</span></div>"
    $(btnhtml).insertBefore('.matheditor-btn-span:first');
    $('#close-btn').on('click',function(e){
        top_elements.toolbar.hide();
    });
}   

setToolbar = function(btns,answer_span,answer_math_field,top_elements,tabs,tabEnabled,isMobile){
    if (answer_span && top_elements.toolbar){
        jq(answer_span).unwrap();
        top_elements.toolbar.remove();
    }
    required_buttons = getUniq(btns);
    required_tabs = getUniq(tabs);
    editor_id = $(answer_span).attr('id')
    wrapper_html = "<div class='matheditor-wrapper-"+editor_id+"'></div>";
    html = "<div class='matheditor-toolbar-"+editor_id+"'>";
    if(tabEnabled){
        html += "<ul class='tabs-"+editor_id+"'>";
        required_tabs.forEach(function(o,idx){
            if(idx==0){
                html += "<li class='tab-link current' data-wrapperid='"+editor_id+"' data-tab='tab-"+(idx+1).toString()+"-"+editor_id+"'>"+o+"</li>";
            }else{
                html += "<li class='tab-link' data-wrapperid='"+editor_id+"' data-tab='tab-"+(idx+1).toString()+"-"+editor_id+"'>"+o+"</li>";
            }
        });
        html += "</ul>";
        required_tabs.forEach(function(o,idx){
            if(idx==0){
                html += "<div id='tab-"+(idx+1).toString()+"-"+editor_id+"' class='tab-content-me current'>";
            }else{
                html += "<div id='tab-"+(idx+1).toString()+"-"+editor_id+"' class='tab-content-me'>";
            }
            required_buttons.forEach(function(b){
                if(button_meta[b].tab == idx+1){
                    if(button_meta[b]){
                        html+="<span class='matheditor-btn-span'><a title='"+b.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace('_',' ')+"' data-latex='"+button_meta[b].latex+"' data-moveto='"+button_meta[b].moveto+"' data-movefor='"+button_meta[b].movefor+"' id='matheditor-btn-"+b+"' class='op-btn'><span id='selectable-"+b+"-"+editor_id+"' class='op-btn-icon'>"+button_meta[b].icon+"</span></a></span>";
                    }else{
                        console.warn("MathEditor: '"+b+"' is an invalid button");
                    }
                }
            });
            html+="</div>"
        });

    }else{
        required_buttons.forEach(function(b){
            if(button_meta[b]){
                html+="<span class='matheditor-btn-span'><a title='"+b.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace('_',' ')+"' data-latex='"+button_meta[b].latex+"' data-moveto='"+button_meta[b].moveto+"' data-movefor='"+button_meta[b].movefor+"' id='matheditor-btn-"+b+"' class='op-btn'><span id='selectable-"+b+"-"+editor_id+"' class='op-btn-icon'>"+button_meta[b].icon+"</span></a></span>";
            }else{
                console.warn("MathEditor: '"+b+"' is an invalid button");
            }
        });
    }
    html+="</div>"

    jq(answer_span).wrap(wrapper_html);
    jq(html).insertBefore(answer_span);
    top_elements.wrapper = jq(answer_span.parentElement);
    top_elements.toolbar = jq(answer_span.parentElement.firstChild);
    top_elements.buttons = top_elements.toolbar.find('.op-btn');
    button_task(answer_math_field,top_elements);
    
    MQN = MathQuill.getInterface(2);
    required_buttons.forEach(function(b,idx){
        if(button_meta[b]){
            var problemSpan = document.getElementById('selectable-'+b+'-'+editor_id);
            MQN.StaticMath(problemSpan);
        }
    });
    $('ul.tabs-'+editor_id+' li').click(function(){
        var tab_id = $(this).attr('data-tab');
        var wraper_id = $(this).attr('data-wrapperid');

        $('ul.tabs-'+wraper_id+' li').removeClass('current');
        $('.matheditor-toolbar-'+wraper_id+' .tab-content-me').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });
    if(isMobile){
        setVirtualKeyboard(top_elements,answer_span,answer_math_field,"<div class='keyboard-letters-"+editor_id+"'><a data-type='write' data-value='q' class='ks'>q</a><a data-type='write' data-value='w' class='ks'>w</a><a data-type='write' data-value='e' class='ks'>e</a><a data-type='write' data-value='r' class='ks'>r</a><a data-type='write' data-value='t' class='ks'>t</a><a data-type='write' data-value='y' class='ks'>y</a><a data-type='write' data-value='u' class='ks'>u</a><a data-type='write' data-value='i' class='ks'>i</a><a data-type='write' data-value='o' class='ks'>o</a><a data-type='write' data-value='p' class='ks'>p</a><br><a data-type='write' data-value='a' class='ks'>a</a><a data-type='write' data-value='s' class='ks'>s</a><a data-type='write' data-value='d' class='ks'>d</a><a data-type='write' data-value='f' class='ks'>f</a><a data-type='write' data-value='g' class='ks'>g</a><a data-type='write' data-value='h' class='ks'>h</a><a data-type='write' data-value='j' class='ks'>j</a><a data-type='write' data-value='k' class='ks'>k</a><a data-type='write' data-value='l' class='ks'>l</a><br><a data-type='custom' data-value='CapsLock' class='ks long icon'>&#8673;</a><a data-type='write' data-value='z' class='ks'>z</a><a data-type='write' data-value='x' class='ks'>x</a><a data-type='write' data-value='c' class='ks'>c</a><a data-type='write' data-value='v' class='ks'>v</a><a data-type='write' data-value='b' class='ks'>b</a><a data-type='write' data-value='n' class='ks'>n</a><a data-type='write' data-value='m' class='ks'>m</a><a data-type='keystroke' data-value='Backspace' class='ks long icon'>&#8678;</a><br><a data-type='custom' data-value='numpad' class='ks long'>123</a><a data-type='write' data-value=',' class='ks'>,</a><a data-type='write' data-value='' class='ks'>&nbsp;</a><a data-type='write' data-value='\\ ' class='ks too_long'>&nbsp;</a><a data-type='write' data-value='\\ ' class='ks too_long'>[ ]</a><a data-type='write' data-value='\\ ' class='ks too_long'>&nbsp;</a><a data-type='write' data-value='' class='ks'>&nbsp;</a><a data-type='write' data-value='.' class='ks'>.</a><a data-type='custom' data-value='close' class='ks long takeup'>X</a></div>",10);
    }
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
    jq(answer_span).css('min-height', 40);
    jq(answer_span).css('padding', 5);
    jq(answer_span).css('background', '#fbfafa');
    jq(answer_span).css('font-size', '15pt');
    answerSpanWidth = jq(answer_span).width();
    top_elements.wrapper.css('min-width',500+10);
    top_elements.wrapper.css('width',500+10);
    top_elements.toolbar.css('min-width',500);
    top_elements.toolbar.css('width',500);
};
