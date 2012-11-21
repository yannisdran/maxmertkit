(function(d,c,a,f){var b="popup",e={placement:"top",offset:[0,0],autoOpen:false,template:'<div class="js-content"></div>',onlyOne:false,content:null,header:null,trigger:"click",delay:0,beforeOpen:d.noop(),open:d.noop(),ifOpenedOrNot:d.noop(),ifNotOpened:d.noop(),beforeClose:d.noop(),close:d.noop(),ifClosedOrNot:d.noop(),ifNotClosed:d.noop()};Popup=function(g,h){this.element=g;this.name=b;this.state="closed";this.options=d.extend({},this.options,e,h);this.options.template.charAt(0)!=="."&&this.options.template.charAt(0)!=="#"?this.El=d(this.options.template):this.El=d(d(this.options.template).html());d("body").append(this.El);this.El.css({position:"absolute",display:"none"}).find(".-arrow").css({opacity:0});this._setOptions(this.options);if(typeof d.popup==="undefined"){d.popup=[]}if(this.element!==f){d.popup.push(this.element)}this.timeout=null;this.init()};Popup.prototype=new d.kit();Popup.prototype.constructor=Popup;Popup.prototype.__setOption=function(h,g){var j=this;var i=d(j.element);switch(h){case"trigger":var k=g.split(/[ ,]+/);if(typeof j.options[h]["in"]!==f){i.off("mouseenter."+j.name,"click."+j.name)}if(typeof j.options[h]["out"]!==f){i.off("mouseleave."+j.name,"click."+j.name)}j.options[h]={"in":k[0],out:(k[1]==f||k[1]=="")?k[0]:k[1]};switch(j.options[h]["in"]){case"hover":i.on("mouseenter."+j.name,function(l){if(j.state==="closed"){j.open()}});break;default:i.on(j.options[h]["in"]+"."+j.name,function(){if(j.state==="closed"){j.open()}})}switch(j.options[h].out){case"hover":i.on("mouseleave."+j.name,function(l){j.close()});break;default:i.on(j.options[h].out+"."+j.name,function(){if(j.state=="opened"){j.close()}})}break;case"content":if(g!==null){j.El.find(".js-content").html(g)}else{j.El.find(".js-content").html(i.data("content"))}break;case"header":if(g!==null){j.El.find(".js-header").html(g)}else{j.El.find(".js-header").html(i.data("header"))}break;case"placement":j.El.removeClass("_"+j.options.placement+"_");j.El.addClass("_"+g+"_");break;case"animation":if(d.easing===f||!(g in d.easing)){switch(g){case"scaleIn":j.El.addClass("-mx-scaleIn");break;case"growUp":j.El.addClass("-mx-growUp");break;case"rotateIn":j.El.addClass("-mx-rotateIn");break;case"dropIn":j.El.addClass("-mx-dropIn");break}}break}if(h!=="trigger"){j.options[h]=g}};Popup.prototype.init=function(){var g=this;if(g.options.autoOpen){g.open()}};Popup.prototype.open=function(){var h=this;var g=d(h.element);h.timeout=setTimeout(function(){if(h.options.enabled===true&&h.state!=="opened"){h.state="in";if(h.options.beforeOpen!==f&&(typeof h.options.beforeOpen==="object"||typeof h.options.beforeOpen==="function")){try{var i=h.options.beforeOpen.call(g);i.done(function(){h._open()}).fail(function(){h.state="closed";g.trigger("ifNotOpened."+h.name);g.trigger("ifOpenedOrNot."+h.name)})}catch(j){h._open()}}else{h._open()}}},h.options.delay)};Popup.prototype._open=function(){var h=this;var g=d(h.element);if(h.state==="in"){if(h.options.onlyOne){d.each(h._getOtherInstanses(d.popup),function(){if(d.data(this,"kit-"+h.name).getState()==="opened"){d.data(this,"kit-"+h.name).close()}})}h._setPosition();if(h.options.animation!==null&&h.options.animation!==false){h._openAnimation()}else{h.El.find(".-arrow").css({opacity:1});h.El.show()}h.state="opened";g.trigger("open."+h.name)}g.trigger("ifOpenedOrNot."+h.name)};Popup.prototype._openAnimation=function(){var h=this;var g=d(h.element);if(d.easing!==f&&(h.options.animation.split(/[ ,]+/)[1] in d.easing||h.options.animation.split(/[ ,]+/)[0] in d.easing)){h.El.slideDown({duration:h.options.animationDuration,easing:h.options.animation.split(/[ ,]+/)[0],complete:function(){h.El.find(".-arrow").animate({opacity:1})}})}else{h.El.show();this.El.find(".-arrow").css({opacity:1});if(Modernizr&&Modernizr.csstransitions&&Modernizr.csstransforms3d&&Modernizr.cssanimations){h.El.addClass("-mx-start")}}};Popup.prototype.close=function(){var i=this;var h=d(i.element);clearTimeout(i.timeout);if(i.options.enabled===true&&i.state!=="closed"){i.state="out";if(i.options.beforeClose!=f&&(typeof i.options.beforeClose==="object"||typeof i.options.beforeClose==="function")){try{var g=i.options.beforeClose.call(h);g.done(function(){i._close()}).fail(function(){h.trigger("ifNotClosed."+i.name);h.trigger("ifClosedOrNot."+i.name);i.state="opened"})}catch(j){i._close()}}else{i._close()}}};Popup.prototype._close=function(){var h=this;var g=d(h.element);if(h.state==="out"){if(h.options.animation===null){h.El.hide()}else{h._closeAnimation()}h.state="closed";g.trigger("close")}g.trigger("ifClosedOrNot."+h.name)};Popup.prototype._closeAnimation=function(){var h=this;var g=d(h.element);if(d.easing!==f&&(h.options.animation.split(/[ ,]+/)[1] in d.easing||h.options.animation.split(/[ ,]+/)[0] in d.easing)){h.El.slideUp({duration:h.options.animationDuration,easing:h.options.animation.split(/[ ,]+/)[1]!==f?h.options.animation.split(/[ ,]+/)[1]:h.options.animation,complete:function(){h.El.find(".-arrow").animate({opacity:0})}})}else{if(Modernizr&&Modernizr.csstransitions&&Modernizr.csstransforms3d&&Modernizr.cssanimations){h.El.removeClass("-mx-start")}else{h.El.hide()}}};Popup.prototype._setPosition=function(){var n=this;var k=d(n.element);var g=k.outerWidth();var j=k.outerHeight();var m=k.offset();var i=8;var h=1,l="absolute";d.each(k.parents(),function(q,p){if(d(p).css("z-index")!=="auto"&&parseInt(d(p).css("z-index"))>h){h=d(p).css("z-index")+1}if(d(p).css("position")==="fixed"){l="fixed"}});if(l==="fixed"){m.top=m.top-d(a).scrollTop()}n.El.css({"z-index":h,position:l});var o={};switch(n.options.placement){case"top":o={top:m.top-n.El.outerHeight()-i+n.options.offset[0],left:m.left+g/2-n.El.outerWidth()/2+n.options.offset[1]};break;case"bottom":o={top:m.top+j+i+n.options.offset[0],left:m.left+g/2-n.El.outerWidth()/2+n.options.offset[1]};break;case"left":o={top:m.top+j/2-n.El.outerHeight()/2,left:m.left-n.El.outerWidth()-i+n.options.offset[1]};break;case"right":o={top:m.top+j/2-n.El.outerHeight()/2,left:m.left+g+i+n.options.offset[1]};break}n.El.css(o)};d.fn[b]=function(g){return this.each(function(){if(!d.data(this,"kit-"+b)){d.data(this,"kit-"+b,new Popup(this,g))}else{typeof g==="object"?d.data(this,"kit-"+b)._setOptions(g):typeof g==="string"&&g.charAt(0)!=="_"?d.data(this,"kit-"+b)[g]:d.error("What do you want to do?")}})}})(jQuery,window,document);