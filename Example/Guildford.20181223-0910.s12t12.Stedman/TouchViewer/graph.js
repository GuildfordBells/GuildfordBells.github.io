function paintSelectedBell(){
  if (bnNew == bnCurrent && rnrangeStrNew == rnrangeStrCurrent && modelLineNew == modelLineCurrent){
    return;
  }
  if (bnCurrent >= 0){
    var idealLineCurrent  = document.getElementById("bell" + (bnCurrent+1).toString() + "i");
    idealLineCurrent.style.visibility = "hidden";
    var actualLineCurrent = document.getElementById("bell" + (bnCurrent+1).toString() + "a");
    actualLineCurrent.style.stroke='grey';
    bellno.innerText='';
  }

  if (bnNew >= 0){
    var idealLineNew = document.getElementById ("bell" + (bnNew+1).toString() + "i");
    idealLineNew.style.visibility = "visible";
    var actualLineNew = document.getElementById("bell" + (bnNew+1).toString() + "a");
    actualLineNew.style.stroke='black';
    bellno.innerText=(bnNew+1);
  }
  fillBellStats();
}
function paintGraph(){
  if (modelLineNew == modelLineCurrent && rnrangeStrNew == rnrangeStrCurrent){
      return;
  }
  // Rectangles
  for (var rn = 0; rn < nRows; rn++) {
    for (var bn = 0; bn < nBells; bn++) {
      var i = bn + rn * nBells; //index into data tiRowByModelRn
      var idRect = "rn"+rn+"bn"+(bn+1)+"rect";
      var myRect = document.getElementById(idRect);
      if (myRect == null){
        myRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        myRect.setAttributeNS(null,"id",idRect);
        myRect.setAttributeNS(null,"stroke","none");
        myRect.setAttributeNS(null,"opacity","1");
        myRect.setAttributeNS(null,"class","rowshade");
        mysvg.appendChild(myRect);
      }
      var tiRowMid     = tiRowByModelRn[modelLineNew][rn]+ ttIbgByModelRn[modelLineNew][rn]*nBells/2;
      var pxBnActX     = pxGraphCentreX + pxPerMs*(tiActByRb[i] - tiRowMid);
      var pxBnIdealX   = pxGraphCentreX + pxPerMs*(tiIdealByModelRb[modelLineNew][i] - tiRowMid);
      var ttBlowError  = Math.abs(tiIdealByModelRb[modelLineNew][i] - tiActByRb[i]);
      var pxRectWidth  = pxPerMs*ttIbgByModelRn[modelLineNew][rn]-1;
      var pxRectLeft   = pxBnIdealX - pxRectWidth/2+4;
      var pxRectTop    = pxGraphPadTop + pxPerRow*(rn-1) + pxRectOffsetY+.5;
      var pxRectHeight = pxPerRow -1;
      myRect.setAttributeNS(null,"x",pxRectLeft);
      myRect.setAttributeNS(null,"y",pxRectTop);
      myRect.setAttributeNS(null,"width",pxRectWidth);
      myRect.setAttributeNS(null,"height",pxRectHeight);
      myRect.setAttributeNS(null,"fill", getBlowShade(ttBlowError*1,rn%2)); 
    }
  }

  // Bell numbers and blue lines
  for (var bn = 0; bn < nBells; bn++) {
    var s  = "";
    var si = "";
    for (var rn = 0; rn < nRows; rn++) {
      var i = bn + rn * nBells; //index into data tiRowByModelRn
      var tiRowMid     = tiRowByModelRn[modelLineNew][rn]+ ttIbgByModelRn[modelLineNew][rn]*(nBells*1)/2;
      var pxBnActX     = pxGraphCentreX + pxPerMs*(tiActByRb[i] - tiRowMid);
      var pxBnIdealX   = pxGraphCentreX + pxPerMs*(tiIdealByModelRb[modelLineNew][i] - tiRowMid);
      var pxBnY = pxGraphPadTop+pxPerRow*rn;
      var idBn = "rn"+rn+"bn"+(bn+1);
      var objBn = document.getElementById(idBn);
      if (objBn == null){
        objBn = document.createElementNS(ns,"text");
        objBn.setAttributeNS(null,"class","bn nopointerevents");
        objBn.id = idBn;
        objBn.appendChild(document.createTextNode(("1234567890ET")[bn]));
        mysvg.appendChild(objBn);
      }
      objBn.setAttributeNS(null,"x",pxBnActX);
      objBn.setAttributeNS(null,"y",pxBnY);
      // Blue line paths
      if (rn >=rnRange[0]-1 && rn <=rnRange[1]){  // The -1 is there to make the blueline start with the row before the selected row
        s  =  s.concat((pxBnActX +pxLineOffsetX).toString(), ",", (pxBnY-pxLineOffsetY).toString()," ");
        si = si.concat((pxBnIdealX+pxLineOffsetX).toString(), ",", (pxBnY-pxLineOffsetY).toString()," ");
      }
    }
    // now draw bell's blue line
    addBl(mysvg,s, bn, 0);
    addBl(mysvg,si,bn, 1);
  }
  function addBl(mysvg, bellpath, bn, isIdeal) { // Add a bell path to the display
      var idLine = "bell"+(bn+1)+['a','i'][isIdeal];
      var objLine = document.getElementById(idLine);
      if (objLine == null){
        objLine = document.createElementNS(ns, 'polyline');
        objLine.style.fill = "none";
        objLine.setAttribute("id",idLine);
        objLine.setAttribute("class","blueline");
        mysvg.appendChild(objLine);
        if (!isIdeal){
          objLine.style.stroke = "grey"; //Stroke colour for actual
          objLine.style.strokeWidth = "1";
        }else{
          objLine.style.stroke = "rgb(96,96,255)"; //Stroke colour for ideal
          objLine.style.strokeWidth = "1";
          objLine.style.visibility = "hidden";
        }
      }
      objLine.setAttribute("points",bellpath); //path
  }
}

var sLow = 10;
var sHigh = 65;
var cLow = 210;
var cHigh = 250;
var sMid = (sHigh+sLow)/2;
var sXxx = sMid-sLow;
var cYyy = (cHigh-cLow)/(sHigh-sLow);
var cMid = (cHigh+cLow)/2;
function getBlowShade(ttStdev, isGrey){
   var col;
   var greyfactor = 1-isGrey*.05;
   if (ttStdev<=sLow) col=cLow;
   else if (ttStdev>sHigh) col=cHigh;
   else col = cYyy*(ttStdev-sMid)+cMid;
   var red   = Math.round(col*greyfactor);
   var green = Math.round((cMid*2-col)*greyfactor);
   var blue  = Math.min(red,green);
   return ("rgb("+red+","+green+","+blue+")");   	
}

function paintRns(){
  if (rnTypeCurrent == rnTypeNew) {return;}
  // 1. Hide all row numbers
  oldRns = document.getElementsByClassName("rn");
  for(var i=oldRns.length-1 ; i>=0 ; i--){
    oldRns[i].style.visibility = "hidden";
  }
  // 2. Work out new numbering
  if (rnTypeNew == "P"){ // Numbering rows of piece
    var start    = 0;
    var end      = nRows;
    var factor   = 1;
  }else if (rnTypeNew == "T"){ // numbering rows of touch
    var start = getTstart();
    var end  = getTend();
    var factor   = 1;
  }else if (rnTypeNew == "B"){ // Numbering blows of piece
    var start    = 0;
    var end      = nRows;
    var factor   = nBells;
  }
  // 3. Create objects if necessary, set appropriate value and set visibility=visible
  for (var rn = start; rn < end; rn+=2) {
    var objRn = document.getElementById("arn"+rn);
    if (objRn == null){
      var objRn = document.createElementNS(ns,"text");
      objRn.setAttributeNS(null,"id","arn"+rn);
      objRn.setAttributeNS(null,"x",pxRnOffset);
      objRn.setAttributeNS(null,"y",pxGraphPadTop+pxPerRow*rn);
      objRn.setAttributeNS(null,"class","rn nopointerevents");
      objRn.appendChild(document.createTextNode(''));
      mysvg.appendChild(objRn);
    }
    objRn.innerHTML = factor*(rn-start) + 1;
    objRn.style.visibility = "visible";
  }
}
function paintPns(){
  // alert('asd')
  if (pnTypeCurrent == pnTypeNew) {return;}

  rnTouchFirst = getTstart();
  rnTouchLast = getTend();
  for (var rn = rnTouchFirst; rn < rnTouchLast; rn++) {
    var objPn = document.createElementNS(ns,"text");
    objPn.setAttributeNS(null,"id",'pn'+rn);
    objPn.setAttributeNS(null,"x",pxPnOffset);
    objPn.setAttributeNS(null,"y",pxGraphPadTop+pxPerRow*(rn-.58)); // Set centre of pn txt between rows
    objPn.appendChild(document.createTextNode(''));
    var pn = PlacenotationByRn[rn];
    if (pn[0] == '?'){ // Set error pn stype
      objPn.setAttributeNS(null,"class","pnerror nopointerevents");
      objPn.innerHTML = pn;
	}else if( pn == '='){ // invisible
      objPn.setAttributeNS(null,"class","pn nopointerevents");
    }else{  // Normal
      objPn.setAttributeNS(null,"class","pn nopointerevents");
      objPn.innerHTML = pn;
	}
    mysvg.appendChild(objPn);
  }
}

function paintEvents(){ // Only needed once, like paintPn, so use same variables to control painting
  if (pnTypeCurrent == pnTypeNew) {return;}
// So far I've just created the event text in the right place. It
// seems overkill to try to include html in svg.
// Probably need to create an img, and build table of where images are
// then detect mouseovers and check the image locations
// then change visibility of event text when mouse is over the image
  for (var evt = 0; evt < eventRow.length ; evt++){
      var objEvt = document.createElementNS(ns,"text");
	  var rn = eventRow[evt]-1; // arrives as 1-origin need zero-origin
      objEvt.setAttributeNS(null,"id","event"+rn);
      objEvt.setAttributeNS(null,"x",pxAnnoOffset);
      objEvt.setAttributeNS(null,"y",pxGraphPadTop+pxPerRow*rn);
      objEvt.setAttributeNS(null,"class","anno1 nopointerevents");
      objEvt.style.fill='grey';
      objEvt.appendChild(document.createTextNode(eventDetail[evt]));
      mysvg.appendChild(objEvt);
  }
}

function paintAnnotations(){
  if (modelLineNew == modelLineCurrent){
      return;
  }

  // 1. Hide annotations
  oldAnnos = document.getElementsByClassName("ann1o");
  for(var i=oldAnnos.length-1 ; i>=0 ; i--){
    oldAnnos[i].style.visibility = "hidden";
  }
  oldAnnos2 = document.getElementsByClassName("anno2");
  for(var i=oldAnnos.length-1 ; i>=0 ; i--){
    oldAnnos2[i].style.visibility = "hidden";
  }

  // 2. Create objects if necessary, set appropriate value and set visibility=visible
  for (var rn = 0; rn < nRows; rn+=1) {
    var objAnno1 = document.getElementById("anno1"+rn);
    if (objAnno1 == null){
      var objAnno1 = document.createElementNS(ns,"text");
      objAnno1.setAttributeNS(null,"id","anno1"+rn);
      objAnno1.setAttributeNS(null,"x",pxAnnoOffset - (rn%2)*pxFontSize/2);
      objAnno1.setAttributeNS(null,"y",pxGraphPadTop+pxPerRow*rn);
      objAnno1.setAttributeNS(null,"class","anno1 nopointerevents");
      objAnno1.style.fill='grey';
      objAnno1.appendChild(document.createTextNode(''));
      mysvg.appendChild(objAnno1);
    }
    objAnno1.innerHTML = (Math.round((ttStdByModelRn[modelLineNew][rn])*10)/10)+'ms';
    objAnno1.style.visibility = "visible";
    ///////////
    if (rn%2){
      var objAnno2 = document.getElementById("anno2"+rn);
      if (objAnno2 == null){
        var objAnno2 = document.createElementNS(ns,"text");
        objAnno2.setAttributeNS(null,"id","anno2"+rn);
        objAnno2.setAttributeNS(null,"y",pxGraphPadTop+pxPerRow*rn);
        objAnno2.setAttributeNS(null,"class","anno2 nopointerevents");
        objAnno2.style.fill='grey';
        objAnno2.appendChild(document.createTextNode(''));
        mysvg.appendChild(objAnno2);
      }
      if (rn%8!=1){
        asd = nBells*ttIbgByModelRn[modelLineNew][rn]-nBells*ttIbgByModelRn[modelLineNew][rn-2];
        objAnno2.setAttributeNS(null,"x",pxAnnoOffset + 6*pxFontSize + (rn%2)*pxFontSize/2);
        objAnno2.innerHTML = '('+(Math.round((asd)*10)/10)+'ms)';
      }else{
        objAnno2.setAttributeNS(null,"x",pxAnnoOffset + 6*pxFontSize);
        objAnno2.innerHTML = (Math.round((nBells*ttIbgByModelRn[modelLineNew][rn])*10)/10)+'ms';
       }
    objAnno2.style.visibility = "visible";
    }
  }
}

function onJSClickedEvent(viewNew){
  // Change display of Current view to invisible and icon not selected
  document.getElementById(viewCurrent).style = "display:none";
  document.getElementById(viewCurrent+"icon").className = "viewselectorN";

  // Change display of New view to visible and icon selected
  document.getElementById(viewNew).style     = "display:block";
  document.getElementById(viewNew+"icon").className     = "viewselectorS";

  // Set Current view
  viewCurrent = viewNew;
}
function time2rn (msTime, msRowStart) {
  var rnLast = msRowStart.length-1;
  var rnFractional = msRowStart.length*(msTime-msRowStart[0])/(msRowStart[rnLast]-msRowStart[0]);
  var rnEstimated = Math.min(rnLast,Math.max(0,Math.ceil(rnFractional))); // Make integer and within range
  var rn;
  if (msRowStart[rnEstimated]<=msTime){
    for (rn=rnEstimated; rn<=rnLast-1; rn++) {
      if (msRowStart[rn+1]>msTime){
        return rn;
      }
    }
    if (msRowStart[rnLast]+4000>msTime){
      return rnLast;
    }
  }else{
    for (rn=rnEstimated-1; rn>=0; rn--){
      if (msRowStart[rn]<=msTime){
        return rn;
      }
    }
  }
  return -1; // msTime is either before start of first row or after reasonable end of last row
}
function hms(secs){
  secs=Math.floor(secs);
  s=("0" + secs%60).slice (-2);
  mins=Math.floor(secs/60);
  m=("0" + mins%60).slice(-2);
  h=Math.floor(mins/60);
  return(h==0? (+m+':'+s):(h+':'+m+':'+s));
}
function getVisible(){
  var rnExtraTop = Math.floor(strikinggraph.scrollTop/pxPerRow-.5); //zero-origin row number in piece
  rnTop = Math.max(0, rnExtraTop);
  var rnBottom = rnExtraTop+Math.floor(strikinggraph.offsetHeight/pxPerRow-.5);
  return [rnTop, rnBottom];
}
function onRowClickedEvent(evt){// Click in the graph to change current row.

  var rn = Math.floor((evt.y-mysvg.getBoundingClientRect().top)/pxPerRow-.5); //zero-origin row number in piece
  if (rn < nRows){
    setCurrentRow(rn, 1); // highlights the specified row and makes it current
  }
}
function onBnSelectionEvent() {// Change of selected bell.
  bnNew = parseInt(document.getElementById("bnselector").value)-1;
  if (isNaN(bnNew)) bnNew = -1;
  paint();
}
function onRnTypeClickedEvent(){
  if (rnTypeCurrent == "P"){
    rnTypeNew = "T";
  } else if (rnTypeCurrent == "T"){
    rnTypeNew = "B";
  } else if (rnTypeCurrent == "B"){
    rnTypeNew = "P";
  }
  document.getElementById("rntype").innerHTML = rnTypeNew;
  paint();
}
function onModelSelectionEvent() {// Change of model (currently all models are changed at same time, and code does not use correct model
  if (modelselector.value == "Kalman"){
    modelRectShadeNew     =  0;
    modelRectPosNew       =  0;
    modelLineNew          =  0;
  }else if (modelselector.value == "Kalman-slow"){
    modelRectShadeNew     = 1;
    modelRectPosNew       = 1;
    modelLineNew          = 1;
  }else if (modelselector.value == "Rwp Model"){
    modelRectShadeNew     =  2;
    modelRectPosNew       =  2;
    modelLineNew          =  2;
  }else if (modelselector.value == "Metronomic"){
    modelRectShadeNew     =  3;
    modelRectPosNew       =  3;
    modelLineNew          =  3;
  }
  paint();
}

// Find start and end of touch, but if no touch use entire piece
function getTstart(){ 
  if (rnByMainEvents.length>3){
    return rnByMainEvents[1]-1;
  }else{
    return rnByMainEvents[0]-1;
  }
}

function getTend(){
  if (rnByMainEvents.length>3){
    return rnByMainEvents[2];
  }else{
    return rnByMainEvents[1];
  }
}

// Range change. Two fields: range and rangeselector. Rule is user changes one field system changes the other
// To avoid unnecessary redrawing operational range is cached in form of string: "Touch", "Piece", or "lower:upper"
// When user changes range using either field first step is to determine the required new operational range
// Then redraw if necessary
// Then update the two fields to show the current status
// This is all done by changeRange(action) where action = 0:init 1:dropdown 2:entrybox
function onRangeEvent(){
  changeRange("entrybox"); 
  paint();
}

function onRangeSelectionEvent() {
  changeRange("dropdown"); 
  paint();
}

function changeRange(action){
	
  // Set new (target) range string
  if (action == "init"){
    rnrangeStrNew = "Touch";
  }else if (action == "entrybox"){
    rnrangeStrNew = range.value;
  } else if (action == "dropdown"){
    rnrangeStrNew = rangeselector.value;
  }
  if (rnrangeStrNew == rnrangeStrCurrent){ // these strings contain the range in its simplest form, i.e. as touch piece or xx:yy
    return;
  }
  
  // Range has changed, so compute new range as two numbers
  if (rnrangeStrNew == "Touch") {
    rnRange = [getTstart(),getTend()];
  } else if (rnrangeStrNew == "Piece"){
    rnRange = [0, nRows-1];
  } else { // M:N
    var rp = rnrangeStrNew.split(":");
    rnRange = [parseInt(rp[0])-1, parseInt(rp[1])-1];
    if(isNaN(rnRange[0]) || rnRange[0]<0){
      rnRange[0] = 0;
    }
    if(isNaN(rnRange[1]) || rnRange[1]>nRows-2){
      rnRange[1] = nRows-1;
    }
  }
  
  // Update rangestring
  rnrangeStrNew = ""+(1+rnRange[0])+":"+(1+rnRange[1]);
  
  // Update the ui fields
  range.value = rnrangeStrNew;
  if (rnRange[0] == 0 && rnRange[1] == nRows-1){
	rangeselector.value = "Piece";
  }else if (rnRange[0] == getTstart() && rnRange[1] == getTend()){
	rangeselector.value = "Touch";
  }else{
	rangeselector.value = "Range";
  }
}

function onGotoEvent(){// "Go to" entry box
  var rn = parseInt(goto.value)-1;
  if (!isNaN(rn) && rn>=-1 && rn<=nRows){
    goto.style.backgroundColor="#fff";
    setCurrentRow(rn, 1);
  } else {
    goto.style.backgroundColor="#f68";
  }
  goto.value='';
}
ppback.addEventListener("click", function() {// go back a bit button
  setCurrentRow(rnCurrent-2, 1);
});
ppvolume.addEventListener("input", function() {// Audio Volume
 myAudio.volume = ppvolume.value;
});
ppforward.addEventListener("click", function() {// go forward a bit button
  setCurrentRow(rnCurrent+2, 1);
});
pp.addEventListener("click", function() {// play/pause button
  if (myAudio.ended == true){
    setCurrentRow(0, 1);
  }
  if (myAudio.paused == true)  {
    myAudio.play();
    if (!isNaN(myAudio.duration)){
      pp.src=tvLoc+"iconpause.png";
    } // Could grey out the control here
  }else{
    if (!isNaN(myAudio.duration)){
      myAudio.pause();
      pp.src=tvLoc+"iconplay.png";
    }
  }
});
function sub(s){
  // substitute contentids with the actual content. Recursive so that only needs to be called once per section
  // in theory could be called for whole doc but this may be inefficient.
  // If suddenly this does not work, note that <p> (and probably many other tags) are automatically
  // terminated by the next tag (apart from <br> and perhaps other tags such as <b>). Hence failures
  // to substitute may be due to invalid html that does not show up when looking at the page.
  s.innerHTML = s.innerHTML.replace(/JUDGESREPORT/g, sReporttojudges);
  s.innerHTML = s.innerHTML.replace(/SOURCEFILENAME/g, sSourcefilename);
  s.innerHTML = s.innerHTML.replace(/TOUCHID/g, sTouchid);
  s.innerHTML = s.innerHTML.replace(/TOUCHDB/g, sTouchdb);
  s.innerHTML = s.innerHTML.replace(/QUALITY/g, sQuality);
  s.innerHTML = s.innerHTML.replace(/TOPTIONS/g, sToptions);
  s.innerHTML = s.innerHTML.replace(/AOPTIONS/g, sAoptions);
  s.innerHTML = s.innerHTML.replace(/IGNOREDROWS/g, sIgnoredRows);
  s.innerHTML = s.innerHTML.replace(/VERSIONS/g, sVersions);
  for(let x of Array.from(s.children)) {
    sub(x);
  }
}
function paint(){
  // painters paint to the gcdNew values and paint finishes by making gcdCurrent == gcdNew ?? good idea??
  // Yes because allows multiple painters to repaint depending on the same option change
  rhsmodel.innerHTML=modelselector.value;
  paintGraph();
  paintSelectedBell();
  paintStats();
  //paintAnnotations(); not sure this is the right functionality
  paintPns();
  paintRns();
  paintEvents();
  modelRectPosCurrent   = modelRectPosNew;
  modelRectShadeCurrent = modelRectShadeNew;
  modelLineCurrent      = modelLineNew;
  rnrangeStrCurrent     = rnrangeStrNew;
  rnTypeCurrent         = rnTypeNew;
  pnTypeCurrent         = pnTypeNew;
  bnCurrent             = bnNew;
}
animationID = window.requestAnimationFrame(animate);
function animate() {// Should perhaps try to stop and start the animation
  if (!myAudio.paused){// seems important not to do this unless audio playing
    var msPlaying = Math.round(myAudio.currentTime*1000 - iFirstblowms);
    var rn = time2rn(msPlaying, tiRowByModelRn[0]);
    setCurrentRow(rn, 2); // Clears current row if rn == -1
    if (!isNaN(myAudio.duration)){
      ppposition.innerHTML=""+hms(myAudio.currentTime)+'&nbsp;/&nbsp;'+hms(myAudio.duration)+'&nbsp;';
    }
  }
  animationID = window.requestAnimationFrame(animate);
}
function setCurrentRow(rn, source){ // source=1 -> set by GUI. source = 2 -> set by requestAnimationFrame
  if (rn == rnCurrent){
    return;
  }
  rnCurrent = rn;
  // Create rowselector rectangle if does not yet exist
  var myRect = document.getElementById("rowselector");
  if (myRect == null){
    myRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    myRect.setAttributeNS(null,"id","rowselector");
    myRect.setAttributeNS(null,"class","sgselected");
    mysvg.appendChild(myRect);
  }
  // set position and size of the selection rectangle and make visible
  if (rn == -1){
    pxRectLeft = 0;
    pxRectWidth=0;
    pxRectTop=1000000;
  }else{
    //var pxRectLeft   = pxPerMs*tiRowByModelRn[modelLineNew][rn];
    //var pxRectWidth  = pxPerMs*ttIbgByModelRn[modelLineNew][rn]*(nBells)+20;
    var pxRectLeft   = pxGraphCentreX - pxPerMs*(ttIbgByModelRn[modelLineNew][rn]*(nBells+.7)/2);
    var pxRectWidth  = pxPerMs*ttIbgByModelRn[modelLineNew][rn]*nBells;
    var pxRectTop    = pxGraphPadTop + pxPerRow*(rnCurrent-1) + pxRectOffsetY+.5;
  }
  var pxRectHeight = pxPerRow;
  myRect.setAttributeNS(null,"x",pxRectLeft);
  myRect.setAttributeNS(null,"width",pxRectWidth);
  myRect.setAttributeNS(null,"y",pxRectTop);
  myRect.setAttributeNS(null,"height",pxRectHeight);
  // Ensure current row visible
  currrow.innerText=(rnCurrent+1);
  vis=getVisible();
  if ((rnCurrent <vis[0]+1) || (rnCurrent>vis[1]-1)){
    rnScroll= rnCurrent-(vis[1]-vis[0])/2;
  strikinggraph.scrollTop=rnScroll*pxPerRow+pxPerRow/2;
  }
// update audio player position if user changed current row
  if (source==1 && rn >=0){
    if (!isNaN(myAudio.duration)){
      myAudio.currentTime = (tiRowByModelRn[0][rn]+iFirstblowms)/1000;
      ppposition.innerHTML=""+hms(myAudio.currentTime)+'&nbsp;/&nbsp;'+hms(myAudio.duration)+'&nbsp;';
    }
  }
  // update bell stats tables
  fillRowStats();
}
function onInitEvent(){
  // Initialise bell/ringer control
  for (var bn = 0; bn < nBells; bn++) {
    option = document.createElement("option");
    option.value = (bn+1).toString();
    option.innerHTML = "1234567890ET"[bn]; // Use single character representation of bell
    bnselector.add(option);
  }
  
  // Initialise transport control
  if (sAudioFile.length>0) { // if there is a file to play
    var mms = document.createElement("source");
    mms.src = sAudioFile;
    mms.type = "audio/mpeg";
    myAudio.oncanplay=function (){
      // when audio is playable make audio controls visible
      if (!isNaN(myAudio.duration)){
        ppposition.innerHTML=""+hms(myAudio.currentTime)+'&nbsp;/&nbsp;'+hms(myAudio.duration)+'&nbsp;';
        audiocontrols.style.visibility="visible";
      }
    }
    myAudio.onended=function (){
      pp.src=tvLoc+"iconplay.png";
    }
    myAudio.appendChild(mms);
    myAudio.volume = .5;
    ppvolume.value = .5;
  }
  
  // Initialise Main page
  CreateStatsTables();
  changeRange("init");
  paint();               // Main part of graph
  setCurrentRow(-1, 1);  // Current row indicator
  sToptions = "Train: " + sTrainparams + " Gain: "+ sGainparams + " Onset: " + sOnsetparams;
  sAoptions = "Analyser: " + sAnalparams;
  // Initialise Report to judges
  sub(RJ);
  // Initialise Ringer errors
  sub(RE);
  Meanbandafterbell.innerHTML   = shMeanbandafterbell;
  Meanbandinpos.innerHTML       = shMeanbandinpos;
  Meanbellafterbellbs.innerHTML = shMeanbellafterbellbs; 
  Meanbellafterbellhs.innerHTML = shMeanbellafterbellhs; 
  Meanbellinposbs.innerHTML     = shMeanbellinposbs; 
  Meanbellinposhs.innerHTML     = shMeanbellinposhs;
  Stdbellafterbellbs.innerHTML  = shStdbellafterbellbs; 
  Stdbellafterbellhs.innerHTML  = shStdbellafterbellhs; 
  Stdbellinposbs.innerHTML      = shStdbellinposbs; 
  Stdbellinposhs.innerHTML      = shStdbellinposhs;
  // Initialise Errors over Time
  sub(ET);
  // Initialise Error Histogram
  sub(EH);
  // Initialise Downlods
  sub(DO);
  // Initialise Technical
  sub(TE);
}
