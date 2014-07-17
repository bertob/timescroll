var currentEpisode = 0;
var waitingNext = false;

window.addEventListener('load', function () {
    
		
	var episodes = [
		{
			title: 'Episode 28 - Descartes Pt. 1',
			img: 'philosophizethis.jpg',
			duration: 2800
		},
		{
			title: 'The French Manicure',
			img: 'fugitivewaves.png',
			duration: 1900
		},
		{
			title: 'Voyager Found',
			img: 'truth.png',
			duration: 3100
		},
		{
			title: 'Icon For Access',
			img: '99pi.jpg',
			duration: 2000
		},
		{
			title: 'Episode 70: Pinspiration',
			img: 'onthegrid.png',
			duration: 3200
		},
		{
			title: '105 - Instagram Direct',
			img: 'vergecast.png',
			duration: 3800
		},
		{
			title: 'Call Now!',
			img: '99pi.jpg',
			duration: 1800
		},
		{
			title: 'Episode 15: Plotinus',
			img: 'philosophizethis.jpg',
			duration: 2700
		}];

    
    d3.xml('ui.svg', 'image/svg+xml', function (error, data) {
        
        // add SVG to document
        d3.select('body').node().appendChild(data.documentElement);
        
        // get interactive elements
        var svg = d3.select('svg');
        
        var view = d3.select('#view');
        var container = svg.select('#container');
        var episode = d3.select('#episode');
        //var w = +view.attr('width');
        //var h = +view.attr('height');
        //var btn = svg.select("#title");
        var btn = svg.select("#button");
        //var sb = svg.select("#scrollbar");        
        var pCircle = svg.select("#progress-circle");
        var bubble = svg.select("#bubble");
        var timer = svg.select("#addtimer");
        var pArea = svg.select("#progress-area");
        var pMarker = svg.select("#progress-marker");
        
        var nextGroup = svg.select("#prevnext");
        
        // variables
        var initialWidth = +pArea.attr('width');
        var totalTime, totalWidth, newWidth;
        totalWidth = 400;
               
        //d3.select(btn).attr("transform") = (translate(0,0));
                      
        //var tr = d3.transform(d3.select(this).attr("transform"));
        //var btnx = tr.translate[0];
        
        // setup
        
        var template = svg.select('#episode');
        for(var i = 0; i < episodes.length; i++) {
        	log(episodes[i].title);			
			var svgNode = template.node().cloneNode(true);
		    
			var el = d3.select(svgNode);
			el.attr('transform', 'translate(' + i * 400 + ',0)');
			el.select('#title').text(episodes[i].title);
			el.select('#cover').attr("xlink:href", "img/" + episodes[i].img);			
			//el.select('#Picture').attr('fill', color);
			
			// set first element as active
			if (i === 0) {
				var pArea = el.select("#progress-area");
		    	var pMarker = el.select("#progress-marker");
			}
			else {
				el.select("#progress-area").style('opacity', 0);
		    	el.select("#progress-marker").style('opacity', 0);
			}
			
			container.node().insertBefore(svgNode);
        }
        template.style('display', 'none');
        
        bubble.attr('transform', 'translate(198.18182373046875,317.0909118652344)scale(0.009090900421142578,0.009090900421142578)');
        
        /*
		var tplElement = svg.select('#episode');
				
		var svgNode = tplElement.node().cloneNode(true);
		
        tplElement.style('display', 'none');
		var el = d3.select(svgNode);
		el.attr('transform', 'translate(100,0)');
		//el.select('#Picture').attr('fill', color);
		el.select('#title').text(episodes[4].title);
		el.select('#cover').attr("xlink:href", "img/" + episodes[4].img);
		//el.select('#progress-area').attr('fill', 343434);
        log(container.node());
        log(tplElement.node());
        
		container.node().insertBefore(svgNode);*/
        
        /*
        var eps = episodes.data;
        for (e in eps) {
        	alert(1);
        	var svgNode = episode.node().cloneNode(true);
			var el = d3.select(svgNode);
			//el.select('#Picture').attr('fill', color);
			el.select('#title tspan').text(e.title + "YOOOO");
			el.select('#progress-area').attr('fill', red);
			
			parent.node().insertBefore(svgNode);		    
        }
        */
		
		
        // behaviour      
        btn.on('mousedown', function () {
            //btnbg.style('fill', '#ffcb6e');
        });
        
        btn.on('mouseup', release);
        btn.on('touchend', release);
        
        function release () {
            //btnbg.style('fill', '#ffb329');
            initialWidth = +pArea.attr('width');
            
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
		    	.style('opacity', 0.15);
            
            pMarker
            	.transition()
		    	.duration(100)
		    	.ease('ease-out')
		    	.attr("x", function() {
		    		return Math.min(400 - 4, +pArea.attr('width'));
		    	});
		    	
		    timer.text("00:00");
		    
		    bubble
		    	.transition()
		    	.duration(70)
		    	.ease('linear')
		    	.style('opacity', 0)
		    	.attr('transform', 'translate(198.18182373046875,317.0909118652344)scale(0.009090900421142578,0.009090900421142578)');
            
            hideNext();
        }        
    
		var drag = d3.behavior.drag()
		    .on("drag", dragmove);
		
		var testDrag = btn.call(drag);

		function dragmove(d) {        
		    //var currTransform = d3.transform(d3.select(this).attr("transform"));
		    //var currX = currTransform.translate[0];
		    
		    var newX = d3.event.x - 200;
		    newX = Math.max(-160, Math.min(160, newX));
		            
		    // snap to 0
		    /*
		    var threshold = 12;
		    if (newX > -threshold && newX < threshold) {
		    	newX = 0;
		    }
		    */
		    
		    // move scrubber
		    var newTransform = d3.select(this).attr("transform").replace(/\([^,]+,/, "(" + newX + ",");
		    d3.select(this).attr("transform", newTransform);
		    		    
		    // move progress bar
		    var scrollPos = newX / 160;
		    scrollTime(scrollPos);
		    
		    // update progress timer
		    updateTimer();    
		    
		    bubble
		    	.transition()
		    	.duration(80)
		    	.ease('ease-in')
		    	.style('opacity', 1)
		    	.attr('transform', 'translate(0, 0)');
		    
		    // preview prev/next elements	    
		    if (scrollPos > 0.9)
		        showNext(true)
		    else if (scrollPos < -0.9)
		        showNext(false)
		    /*
		    else
		    	hideNext();
		    */
		    
		    
		    /*
		    log("D3:  " + d3.event.x);
		    log("NEWX:  " + newX);
		    log("SCROLLP:  " + scrollPos);
		    */
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
		        .duration(900000 * Math.pow(f-1,10) + 200)
		        .ease('linear')
		        .attr('width', target);
		}
		
		function updateTimer() {
		    totalTime = episodes[0].duration;
		    newWidth = +pArea.attr('width');
		    var diffWidth = newWidth - initialWidth;
		    var diffTime = (diffWidth / totalWidth) * totalTime;
		    var mins = Math.floor(Math.abs(diffTime) / 60);
		    if (mins < 10) mins = "0" + mins;
		    var secs = Math.floor(Math.abs(diffTime) % 60);
		    if (secs < 10) secs = "0" + secs;
		    var newTimerString = mins + ":" + secs;
		    if (diffTime >= 0) newTimerString = "+" + newTimerString;
		    else newTimerString = "-" + newTimerString;
		    
		    timer.text(newTimerString);
		    
		    // periodically call this function to keep the timer updated
		    setTimeout(updateTimer, 100);
	    }
		
		function showNext(isNext) {		
		    //move grouped prev/next elements left if next, right if previous
		    var newX = 130;
		    if (isNext)
		        newX = -newX;
		    newX = (currentEpisode - 1) * -400 + newX;
		    
		    //var newTransform = nextGroup.attr("transform").replace(/\([^,]+,/, "(" + (currentEpisode * 400) - newX + ",");
		    log("episode:" + currentEpisode)
		    log("moving to " + newX)
		    container
		        .transition()
		        .duration(400)
		        .ease('ease-out')
		        //.attr('transform', 'translate(-130,0)');
		        .attr('transform', 'translate(' + newX + ',0)');
		        
		    // start next check loop
		    if(!waitingNext) {
				waitingNext = true;
				setTimeout(checkNextTimeout(1, isNext), 200);
		    }
		    
		}
		
		function hideNext() {
			//var newTransform = nextGroup.attr("transform").replace(/\([^,]+,/, "(" + -0.00001 + ",");
			newX = currentEpisode * -400
			
			container
				.transition()
				.duration(150)
				.ease('ease-out')
				//.attr('transform', 'translate(-400,0)');
				.attr('transform', 'translate(' + newX + ',0)');
			
			waitingNext = false;
			
			log('##########');
			log(newX);
			log(currentEpisode);
		}
		
		function checkNextTimeout(time, isNext) {
			/*
			if (time > 9) {
				moveToNextEpisode(isNext);
			} else {
				setTimeout(checkNextTimeout(time + 1, isNext), 50);
			}
			*/
			var sc = scrubPos();
			if (sc > 0.9 || sc < -0.9)
				moveToNextEpisode(isNext);
			
		}
		
		function moveToNextEpisode(isNext) {
			log("AAAAAAAAAAAAAAAAAAA");
			/*
			var newX;
		    if (isNext)
		    	newX = (currentEpisode - 1) * 400;
		    else
		    	newX = (currentEpisode + 1) * 400;
		    			    
		    container
		        .transition()
		        .duration(400)
		        .ease('ease-out')
		        .attr('transform', 'translate(' + newX + ',0)');
			*/
			
			//currentEpisode = 1;
			log("OLD: " + currentEpisode);
		    if (isNext && currentEpisode < 7)//episodes.length)
		    	currentEpisode = currentEpisode + 1;
		    else if (currentEpisode > 0)
		    	currentEpisode = currentEpisode - 1;
		    log("NEW: " + currentEpisode);
		}
		
		function scrubPos () {
		    return (Math.max(-160, Math.min(160, d3.event.x - 200))) / 160;
		}
		
		function log(p) {
		    console.log(p);
		}
    
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
