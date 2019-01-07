  function CreateStatsTables(){
    // Calls makerow() for each row needed in the stats tables. see makerow for explanation of parameters.
    makerow(all, "sd",   "hba",  
	    "Standard Deviation",
		"The selected model predicts an 'ideal' time for each blow. These fields display the <a href='https://en.wikipedia.org/wiki/Standard_deviation' target='_blank'>Standard Deviation</a> of the differences between the ideal and actual times", 	
		"This is a secondary measures of ringing quality that may be used in the National 12-bell contest. Lower numbers are better.");
    makerow(all, "sp", "hba",  
	    "Standard Deviation %",   
		"The selected model predicts an 'ideal' time when each blow should be struck. These fields display the <a href='https://en.wikipedia.org/wiki/Standard_deviation' target='_blank'>Standard Deviation</a> of the differences between the ideal and actual times as a percentage of the interbell gap.", 	
		"When the Kalman Fast model is selected the figure in the 'Both' column is the main measure of ringing quality used in the National 12-bell contest as it is deemed the best measure of overall striking quality. Lower numbers are better. ");
    makerow(all, "ibg",  "other", "Inter-Bell Gap",      "The selected model computes the ideal Inter-Bell Gap for each wholepull. This field shows the average over the selected rows", "This is a measure of speed of ringing");
    makerow(all, "mhsg",  "other", "Model Handstroke Gap",      "The selected model computes the ideal Handstroke Gap for each wholepull. This field shows the average over the selected rows.", "Conventionally in Change Ringing the Handstroke Gap should be about twice the Inter-bell Gap.");
    makerow(all, "ahsg",  "other", "Audible Handstroke Gap",      "Audibly, the Handstroke Gap is the time between the last blow at backstroke and the next row at handstroke. This field shows the average Handstroke Gap over the selected rows.", "If significantly different from the Model Handstroke Gap bells may be having problems with leading and lying, for example the bells in last place at backstroke may be frequently late. This is however a common characteristic of 12-bell ringing");
    makerow(all, "xx",   "subtitle","&nbsp;",    "", "");
    makerow(all, "lrm",   "hba",   "Lead RMS Error",  	
    	"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow. The Root Mean Square Error is a measure of the negative impact of this bell on the overall striking. Lower numbers are better", "");
    makerow(all, "lsd",   "hba",   "Lead Standard Deviation",  	
    	"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow. The <a href='https://en.wikipedia.org/wiki/Standard_deviation' target='_blank'>Standard Deviation</a> of these differences is calculated.",
		"In layman terms this is the amount of randomness in the blow times compared to the ideal. Improvement lies in ringing with a smoother action, avoiding over-use of ropesight, ringing lots and ringing on different bells and with different bands (especially with good bands!)", "");
    makerow(all, "lav",   "hba",   "Lead Average Error",       
	    "The model predicts an 'ideal' time when each blow should be struck. The actual times are subtracted from the ideal times to give an error for each blow and the errors are averaged.", 
		"Some ringers are habitually late or early, which is often something they will correct when it's pointed out. Note that average errors can also accumulate if microphone is close to some bells and far from others so careful listening is needed to see if the error really exists. Average errors less than 10ms are not worth worrying about.", "");
    makerow(all, "xx",   "subtitle","&nbsp;",    "", "");
    makerow(all, "50", "hba",  
	    "Errors greater than 50ms",   
		"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow and the numbers of errors >50ms are counted.", 	
		"Lower numbers are better.");
	
    // Define the Bell table                                            
    makerow(bel, "rm",   "hba",   "RMS Error",  	
    	"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow. The Root Mean Square Error is a measure of the negative impact of this bell on the overall striking. Lower numbers are better", "");
    //makerow(bel, "xx",   "subtitle", "Made up of...",    "", "");
    makerow(bel, "sd",   "hba",   "Standard Deviation",  	
    	"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow. The <a href='https://en.wikipedia.org/wiki/Standard_deviation' target='_blank'>Standard Deviation</a> of these differences is calculated.",
		"In layman terms this is the amount of randomness in the blow times compared to the ideal. Improvement lies in ringing with a smoother action, avoiding over-use of ropesight, ringing lots and ringing on different bells and with different bands (especially with good bands!)", "");
    makerow(bel, "av",   "hba",   "Average Error",       
	    "The model predicts an 'ideal' time when each blow should be struck. The actual times are subtracted from the ideal times to give an error for each blow and the errors are averaged.", 
		"Some ringers are on average late or early, a habit which can often be corrected. Note that average errors can also accumulate if microphone is close to some bells and far from others so careful listening is needed to see if the error really exists. Average errors less than 10ms are not worth worrying about.", "");
    makerow(bel, "xx",   "subtitle","&nbsp;",    "", "");
    makerow(bel, "lrm",   "hba",   "Lead RMS Error",  	
    	"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow. The Root Mean Square Error is a measure of the negative impact of this bell on the overall striking. Lower numbers are better", "");
    makerow(bel, "lsd",   "hba",   "Lead Standard Deviation",  	
    	"The selected model predicts an 'ideal' time when each blow should be struck. The differences between the ideal and actual times are calculated for each blow. The <a href='https://en.wikipedia.org/wiki/Standard_deviation' target='_blank'>Standard Deviation</a> of these differences is calculated.",
		"In layman terms this is the amount of randomness in the blow times compared to the ideal. Improvement lies in ringing with a smoother action, avoiding over-use of ropesight, ringing lots and ringing on different bells and with different bands (especially with good bands!)", "");
    makerow(bel, "lav",   "hba",   "Lead Average Error",       
	    "The model predicts an 'ideal' time when each blow should be struck. The actual times are subtracted from the ideal times to give an error for each blow and the errors are averaged.", 
		"Some ringers are habitually late or early, which is often something they can  correct when it is pointed out. Note that average errors can also accumulate if microphone is close to some bells and far from others so careful listening is needed to see if the error really exists. Average errors less than 10ms are not worth worrying about.", "");
    makerow(bel, "xx",   "subtitle","&nbsp;",    "", "");
    makerow(bel, "50",   "hba", "Errors > 50ms",       
	    "The model predicts an 'ideal' time when each blow should be struck. The actual times are subtracted from the ideal times and errors + or - over 50ms are counted.", 
		"50ms is a distinctly audible misplacement of a blow, yet almost all ringers will have errors of this size fairly frequently. In good ringing avoiding distractions will keep this number low", "");
	
	// Define the Row table
    makerow(row, "spd",  "other", "Peal Speed",          "", "");
    makerow(row, "fbm",  "other", "Score re Model",      "", "");
    makerow(row, "ler",  "other", "Lead error",          "", "");
    makerow(row, "fau",  "other", "Faults",              "", "");
  }

  function  makerow(theTable, idRow, sRowFormat, htmlRowLabel, htmlExplain, htmlLearn){
    // Creates the DOM elements for a row of statistics on the RHS of the striking graph.
	// Row consists of text label, derivation helptip, significance helptip, table data
    // id of <td> items are i (all/bel/row) Row(sd/av/50/rm) col(hs/bs/bo/xx) eg "iallsdhs"
	// Parameters:
	//   - Which table (all, bel, row) which are defined in html in index.html
	//   - ID of row (sd/av/50/rm)
	//   - Row label text
	//   - Format of row (hand/back/all, or Other)
	//   - helptext explaining how the row is derived
	//   - helptext explaining the significance of this in ringing terms
	//   - 2 short descriptions that go into the alt attribute of the 2 helpicons. Not much use??
	// FieldIds for the values to be inserted are:
	//   - idTable+idRow+[Hs|Bs|Al]

	var mytr;
	var myth;
	var mytd;
	var mydiv;
	var myspan;
	mytbody = theTable.tBodies[0];
	
	//<tr>
	mytr = document.createElement("tr"); mytbody.appendChild(mytr);
	
    //  <th>htmlRowLabel
	myth = document.createElement("th"); mytr.appendChild(myth);
    myth.setAttribute("style", "width:200px;");
	if (sRowFormat == 'subtitle'){
      myth.setAttribute("align", "left");
	  myth.innerHTML = htmlRowLabel+' ';
	}else{
      myth.setAttribute("align", "left");
	  myth.innerHTML = htmlRowLabel+' ';

      //    <div class="helptip">
	  mydiv = document.createElement("div"); myth.appendChild(mydiv);
	  mydiv.setAttribute("class","helptip");
	  
      //      <img src="explain.png" alt="[explain]">
	  myimg = document.createElement("img"); mydiv.appendChild(myimg);
	  myimg.setAttribute("src",tvLoc+"explain.png");
	  myimg.setAttribute("alt","[explain]");
	  myimg.setAttribute("class", "helpiconclass");
	  
      //      <span class="helptiptext">
	  myspan = document.createElement("span"); mydiv.appendChild(myspan);
	  myspan.setAttribute("class","helptiptext");
	  myspan.innerHTML = htmlExplain;
	  // whitespace between icons
	  wsp=document.createElement("text");
	  mydiv.appendChild(wsp);
	  wsp.innerHTML='&nbsp;';
	  /////////
      //    <div class="helptip">
	  mydiv = document.createElement("div"); myth.appendChild(mydiv);
	  mydiv.setAttribute("class","helptip");
	  
      //      <img src="learn.png" alt="[learn]">
	  myimg = document.createElement("img"); mydiv.appendChild(myimg);
	  myimg.setAttribute("src", tvLoc+"learn.png");
	  myimg.setAttribute("alt", "[learn]");
	  myimg.setAttribute("class", "helpiconclass");
	  
      //      <span class="helptiptext">
	  myspan = document.createElement("span"); mydiv.appendChild(myspan);
	  myspan.setAttribute("class","helptiptext");
	  myspan.innerHTML = htmlLearn;
	}
	/////////
    // id of <td> items are i Table(all/bel/row) Row(sd/av/50/rm) col(hs/bs/bo/'') eg "iallsdhs"
	if (sRowFormat == 'other'){
	  mytd=document.createElement("td"); mytr.appendChild(mytd);
	  mytd.setAttribute("id", 'i'+theTable.id+idRow);
	  mytd.setAttribute("class", "rhstables");
	  mytd.setAttribute("style", "width:65px;");
	  mytd.setAttribute("colspan","3");
	  mytd.style.borderWidth=0;
	  mytd.innerHTML = '?';
	} else if (sRowFormat == 'hba') {
	  mytd=document.createElement("td"); mytr.appendChild(mytd);
	  mytd.setAttribute("id",  'i'+theTable.id+idRow+"bo");
	  mytd.setAttribute("class", "rhstables");
	  mytd.setAttribute("style", "width:65px;");
	  mytd.style.borderWidth=0;
	  mytd.innerHTML = '?';
	  mytd=document.createElement("td"); mytr.appendChild(mytd);
	  mytd.setAttribute("id",  'i'+theTable.id+idRow+"hs");
	  mytd.setAttribute("class", "rhstables");
	  mytd.setAttribute("style", "width:65px;");
	  mytd.style.borderWidth=0;
	  mytd.innerHTML = '?';
	  mytd=document.createElement("td"); mytr.appendChild(mytd);
	  mytd.setAttribute("id",  'i'+theTable.id+idRow+"bs");
	  mytd.setAttribute("class", "rhstables");
	  mytd.setAttribute("style", "width:65px;");
	  mytd.style.borderWidth=0;
	  mytd.innerHTML = '?';
	}
  }
