var progress = [200]; // 0 ... 400

window.addEventListener('load', function () {
    
    d3.xml('ui.svg', 'image/svg+xml', function (error, data) {
        
        // add SVG to document
        d3.select('body').node().appendChild(data.documentElement);
        
        // get interactive elements
        var svg = d3.select('svg');
        
        var view = d3.select('#view');
        var w = +view.attr('width');
        var h = +view.attr('height');
        
        var btn = svg.select("#button");
        var btnbg = svg.select("#button-bg");
        var sb = svg.select("#scrollbar");
        
        var pArea = svg.select("#progress-area");
        var pMarker = svg.select("#progress-marker");
        
        var prevItem = svg.select("#prev");
        var nextItem = svg.select("#next");
        var nextGroup = svg.select("#prevnext");
               
        //d3.select(btn).attr("transform") = (translate(0,0));
                      
        //var tr = d3.transform(d3.select(this).attr("transform"));
        //var btnx = tr.translate[0];
        
        btn.on('mouseover', function () {
        });                
        
        btn.on('mousedown', function () {
            btnbg.style('fill', '#ffcb6e');
        });
        
        btn.on('mouseup', release);
        btn.on('touchend', release);
        
        function release () {
            btnbg.style('fill', '#ffb329');
            
            var newTransform = d3.select(this).attr("transform").replace(/\([^,]+,/, "(" + 0 + ",");
            
            btn
                .transition()
                .duration(500)
                .ease('bounce')
                .attr('transform', newTransform);
            
            pArea
                .transition()
                //.data(progress)
                .duration(100)
                .ease('ease-out')
                .attr('width', +pArea.attr('width'))
                /*
                .attr("width", function(d) {
		    		return Math.min(d, 400 - 4);
		    	})
		    	*/
		    	.style('opacity', 0.15);
            
            pMarker
            	.transition()
		    	.duration(100)
		    	.ease('ease-out')
		    	.attr("x", function() {
		    		return Math.min(400 - 4, +pArea.attr('width'));
		    	});
            
        }
        
        /*
        pArea
        	.data(progress)
        	.attr("width", function(d) {
        		return Math.min(d, 400); // 0 ... 400
        	});
        
        pMarker
        	.data(progress)
        	.attr("x", function(d) {
        		return Math.min(d, 400 - 4); // 0 ... 400
        	});
        */
        	/*
        	.style("fill", function(d) {
        		log("WWWW  " + d);
        		if (d > 30) {
        			return "red";
        		}
        		else {
        			return "blue";
        		}
        		
        	});*/
    
    var drag = d3.behavior.drag()
        .on("drag", dragmove);
    
    var testDrag = btn.call(drag);

    function dragmove(d) {
        // var newX = -2320; 
        // -2580  ... -2300     280
        //   280  ...   590
        
        //var currTransform = d3.transform(d3.select(this).attr("transform"));
        //var currX = currTransform.translate[0];
        
        var newX = d3.event.x - 200;
        newX = Math.max(-160, Math.min(160, newX));
        
        var newTransform = d3.select(this).attr("transform").replace(/\([^,]+,/, "(" + newX + ",");
        d3.select(this).attr("transform", newTransform);
        
        var scrollPos = newX / 160;
        
        scrollTime(scrollPos);
        
        
        if (scrollPos > 0.8)
            showNext(true)
        else if (scrollPos < -0.8)
            showNext(false)
        else
        	hideNext();
        
        log("D3:  " + d3.event.x);
        log("NEWX:  " + newX);
        log("SCROLLP:  " + scrollPos);
    }
    
    function scrollTime(pos) {
        // set scroll direction
        var target = 0;
        if (pos > 0) target = 400;
                
        // normalize value range
        f = Math.abs(pos) * 0.7 + 0.1;
        
        console.log("POS:  " + Math.abs(pos) + "    F:  " + f);
        console.log("TARGET:  " + target)
        
        pArea.style('opacity', 0.25);
        
        pArea
            .transition()
            .duration(60000 * Math.pow(f-1,8) + 200)
            .ease('linear')
            .attr('width', target);
    }
    
    function showNext(isNext) {
        log("NEEEEEEEEEEEEEEEEEXT!");
        
        var newX = 170;
        if (isNext) {
            newX = -newX;
        }
        
        //var currTransform = d3.transform(d3.select(nextItem).attr("transform"));
        //var currTransform = d3.transform(d3.select(nextItem).attr("transform"));
        /*
        var currX = currTransform.translate[0];
        var currY = currTransform.translate[1];
        */
        //log("           " + d3.select(this).attr("transform"))
        var newTransform = nextGroup.attr("transform").replace(/\([^,]+,/, "(" + newX + ",");
        
        nextGroup
            .transition()
            .duration(250)
            .ease('ease-out')
            .style('opacity', 0.89)
            .attr('transform', newTransform);
    }
    
    function hideNext() {
    	var newTransform = nextGroup.attr("transform").replace(/\([^,]+,/, "(" + -0.00001 + ",");
        
        nextGroup
            .transition()
            .duration(150)
            .ease('ease-out')
            .style('opacity', 0.2)
            .attr('transform', newTransform);
    }
    
    function log(p) {
        console.log(p);
    }
    
    /*
        var t = d3.transform(d3.select(this).attr("transform"));
        var currx = t.translate[0];
        var curry = t.translate[1];
        
        var newTransform = d3.select(this).attr("transform").replace(/\([^,]+,/, "(" + newX + ",");                
        d3.select(this).attr("transform", newTransform);
    
        
        var appScreen = svg.select('#ScreenBackground');
        var screenWidth = +appScreen.attr('width'),
          screenHeight = +appScreen.attr('height');
        var appButton = svg.select('#AppButton')
          .on('mouseenter', function () {
              appButton.style('fill', '#AB69C6');
          })
          .on('mouseleave', function () {
              appButton.style('fill', '#9B59B6')
          })
          .on('click', function () {
              var x = Math.random() * screenWidth;
              var y = Math.random() * screenHeight;
              appButton
                  .transition()
                  .duration(1000)
                  .ease('bounce')
                  .attr('cx', x)
                  .attr('cy', y);
        });
        */
    });
    
    
    /*
    d3.xml('proto.svg', 'image/svg+xml', function (error, data) {
        if (error) {
            console.log('Error while loading the SVG file!', error);
        }
        else {
            // add SVG to document
            d3.select('.container')
                .node()
                .appendChild(data.documentElement);
                
            // interactive elements
            var 
        }
    });
    */

});
