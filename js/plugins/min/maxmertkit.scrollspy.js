(function(d,c,a,f){var b="scrollspy",e={itemSelector:"li",offset:2,animation:true};Scrollspy=function(h,g){this.name=b;this.element=h;this.options=d.extend({},e,g);var i=d.proxy(this.process,this);this.$scrollable=d(this.element).is("body")?d(c):d(this.element);d(c).on("scroll."+this.name,i);this.init();i()};Scrollspy.prototype=new d.kit();Scrollspy.prototype.constructor=Scrollspy;Scrollspy.prototype.init=function(){var h=this,g=d(h.element);h.refresh()};Scrollspy.prototype.refresh=function(){var h=this,g=d(h.element),i;h.targets=d([]);h.offsets=d([]);i=h.$scrollable.find(h.options.itemSelector).map(function(){var k=d(this),j=k.data("target")||k.attr("href"),l=/^#\w/.test(j)&&d(j);return(l&&l.length&&[[l.position().top,j]])||null}).sort(function(k,j){return k[0]-j[0]}).each(function(){h.offsets.push(this[0]);h.targets.push(this[1])})};Scrollspy.prototype.process=function(){var j=this,h=d(j.element),k=d(c).scrollTop()+j.options.offset,g;for(g=0;g<j.offsets.length-1;g++){if(k<j.offsets[0]){j.activate(j.targets[0])}if(j.offsets[g]<k&&k<=j.offsets[g+1]){j.activate(j.targets[g])}if(k>j.offsets[g+1]){j.activate(j.targets[g+1])}}};Scrollspy.prototype.activate=function(l){var j=this,i=d(j.element),g,k,h=j.options.animation?"_active_ -mx-start":"_active_";j.active=l;i.find("._active_").removeClass(h);d('[data-target="'+l+'"]').addClass(h);k=d("body").find(l).trigger("activate")};d.fn[b]=function(g){return this.each(function(){if(!d.data(this,"kit-"+b)){d.data(this,"kit-"+b,new Scrollspy(this,g))}else{typeof g==="object"?d.data(this,"kit-"+b)._setOptions(g):typeof g==="string"&&g.charAt(0)!=="_"?d.data(this,"kit-"+b)[g]:d.error("What do you want to do?")}})}})(jQuery,window,document);