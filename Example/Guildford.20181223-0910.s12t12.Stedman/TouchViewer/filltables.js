function paintStats(){
    if (modelLineNew == modelLineCurrent && rnrangeStrNew == rnrangeStrCurrent){
        return;
    }
  // Counts of rows and blows at hs, bs and both
  nrowsbo = rnRange[1] - rnRange[0] +1;
  var asd = Math.floor(nrowsbo/2) ;
  if (nrowsbo%2 != 0){
      nrowshs = asd + 1-rnRange[1]%2;
      nrowsbs = asd +   rnRange[1]%2;
  }else{
      nrowshs = asd;
      nrowsbs = asd;
  } 
  nblowsbo = nrowsbo*nBells;
  nblowshs = nrowshs*nBells;
  nblowsbs = nrowsbs*nBells;

  // Declare accumulators
  var ssIbg = 0;
  var ssHsg = 0;
  var allttbo=0; // Total (error)
  var alltths=0;
  var allttbs=0;
  var allsebo=0; // Total (error squared)
  var allsehs=0;
  var allsebs=0;
  var alldsbo=0; // Total (error deviation from mean squared)
  var alldshs=0;
  var alldsbs=0;
  var all50bo=0; // Count (errors>50ms)
  var all50hs=0;
  var all50bs=0;
  var alllttbo=0; // Lead error
  var allltths=0;
  var alllttbs=0;
  var allldsbo=0;
  var allldshs=0;
  var allldsbs=0;
  var alllsebo=0;
  var alllsehs=0;
  var alllsebs=0;
      belttbo=Array.from(new Array(nBells), () => 0); // Total (error)
      beltths=Array.from(new Array(nBells), () => 0);
      belttbs=Array.from(new Array(nBells), () => 0);
      belsebo=Array.from(new Array(nBells), () => 0); // Total (error squared)
      belsehs=Array.from(new Array(nBells), () => 0);
      belsebs=Array.from(new Array(nBells), () => 0);
      beldsbo=Array.from(new Array(nBells), () => 0); // Total (error deviation from mean squared)
      beldshs=Array.from(new Array(nBells), () => 0);
      beldsbs=Array.from(new Array(nBells), () => 0);
      bel50bo=Array.from(new Array(nBells), () => 0); // Count (errors>50ms)
      bel50hs=Array.from(new Array(nBells), () => 0);
      bel50bs=Array.from(new Array(nBells), () => 0);
      bellttbo=Array.from(new Array(nBells), () => 0); // Lead error
      belltths=Array.from(new Array(nBells), () => 0);
      bellttbs=Array.from(new Array(nBells), () => 0);
      belldsbo=Array.from(new Array(nBells), () => 0);
      belldshs=Array.from(new Array(nBells), () => 0);
      belldsbs=Array.from(new Array(nBells), () => 0);
      bellsebo=Array.from(new Array(nBells), () => 0);
      bellsehs=Array.from(new Array(nBells), () => 0);
      bellsebs=Array.from(new Array(nBells), () => 0);
      nlrowsbo=Array.from(new Array(nBells), () => 0);
      nlrowshs=Array.from(new Array(nBells), () => 0);
      nlrowsbs=Array.from(new Array(nBells), () => 0);
  
  var bnPosFirst= Array.from(new Array(nRows),  () => -1);
  var bnPosLast = Array.from(new Array(nRows),  () => -1);
  
  // Audible HSG
  var ttAudibleHsgTotal = 0; // Accumulator
  for (var rn=rnRange[0]+2-rnRange[0]%2 ; rn<=rnRange[1]-rnRange[1]%2 ; rn +=2){ // every hsg in range
	  ttAudibleHsgTotal += tiActByRp[rn*nBells]-tiActByRp[rn*nBells-1];
  }
  ctHsgInRange = -(rnRange[0] - rnRange[1] - rnRange[0]%2 + rnRange[1]%2)/2
  
  // Add to accumulators for means and gaps
  for (var rn=rnRange[0]; rn<rnRange[1]; rn++){
	ssIbg+=ttIbgByModelRn[modelLineNew][rn];
	ssHsg+=ttHsgByModelRn[modelLineNew][rn];
    var tiLead = Infinity;
    var tiLie  = -Infinity;
    for (var bn=0; bn<nBells; bn++){
	  var ti = tiActByRb[rn*nBells+bn];
      var tt = ti - tiIdealByModelRb[modelLineNew][rn*nBells+bn] ;
	  var tt50 = 0+(Math.abs(tt)>50);
	  if (tiLead >= ti) { // find first blow
		tiLead = ti;
		bnPosFirst[rn] = bn;
	  }
      allttbo     += tt;
	  all50bo     += tt50;
      belttbo[bn] += tt;
	  bel50bo[bn] += tt50;
      if (rn%2 == 0){   // if handstroke 
        alltths     += tt;
	    all50hs     += tt50;
        beltths[bn] += tt;
	    bel50hs[bn] += tt50;
      }else{
        allttbs     += tt;
	    all50bs     += tt50;
        belttbs[bn] += tt;
	    bel50bs[bn] += tt50;
      }
    }
	
	// First blow of row
	bnLead = bnPosFirst[rn];     // pick out the lead bell for the row
    biLead = rn*nBells+bnLead;       //pick out the blow index in Rb matrix for the lead blow of the row
    if (tiActByRp[rn*nBells] != tiActByRb[biLead]){
		//alert('First Error rn:'+rn+ 'bnLead:'+bnLead); // detect if conflict with the Rp matrix
	}
    var tt = tiActByRb[biLead] - tiIdealByModelRb[modelLineNew][biLead] ;
    alllttbo     += tt;
    bellttbo[bnLead] += tt;
    nlrowsbo[bnLead]++;       // Count of all this bell's leads
    if (rn%2 == 0){       // if handstroke 
      allltths     += tt;
      belltths[bnLead] += tt;
      nlrowshs[bnLead]++;       // Count of this bell's hs leads
    }else{
      alllttbs     += tt;
      bellttbs[bnLead] += tt;
      nlrowsbs[bnLead]++;       // Count of this bell's bs leads
    }	
  }

  // Add to accumulators: ???se?? for RMS, ???ds?? for SD 
  for (var rn=rnRange[0]; rn<rnRange[1]; rn++){
    for (var bn=0; bn<nBells; bn++){
	  bi = rn*nBells+bn;
      var tt = (tiActByRb[bi] - tiIdealByModelRb[modelLineNew][bi]);
      alldsbo+=(tt-allttbo/nblowsbo)**2;
      allsebo+=tt**2;
      beldsbo[bn]+=(tt-belttbo[bn]/nrowsbo)**2;
      belsebo[bn]+=tt**2;
      if (rn%2 == 0){   // if handstroke 
        alldshs+=(tt-alltths/nblowshs)**2;
        allsehs+=tt**2;
        beldshs[bn]+=(tt-beltths[bn]/nrowshs)**2;
        belsehs[bn]+=tt**2;
      }else{
        alldsbs+=(tt-allttbs/nblowsbs)**2;
        allsehs+=tt**2;
        beldsbs[bn]+=(tt-belttbs[bn]/nrowsbs)**2;
        belsebs[bn]+=tt**2;
      }
    }
    // Add to accumulators: ???lse for Lead RMS, ???lds for Lead SD
    bnLead = bnPosFirst[rn];     // pick out the lead bell for the row
    biLead = rn*nBells+bnLead;       //pick out the blow index in Rb matrix for the lead blow of the row
    var tt = (tiActByRb[biLead] - tiIdealByModelRb[modelLineNew][biLead]);
    allldsbo+=(tt-alllttbo/nrowsbo)**2;
    alllsebo+=tt**2;
    belldsbo[bnLead]+=(tt-bellttbo[bnLead]/nlrowsbo[bnLead])**2;
    bellsebo[bnLead]+=tt**2;
    if (rn%2 == 0){   // if handstroke 
      allldshs+=(tt-allltths/nrowshs)**2;
      alllsehs+=tt**2;
      belldshs[bnLead]+=(tt-belltths[bnLead]/nlrowshs[bnLead])**2;
      bellsehs[bnLead]+=tt**2;
    }else{
      allldsbs+=(tt-alllttbs/nblowsbs)**2;
      alllsebs+=tt**2;
      belldsbs[bnLead]+=(tt-bellttbs[bnLead]/nlrowsbs[bnLead])**2;
      bellsebs[bnLead]+=tt**2;
    }
  
  }
  // compute overall ibg and model hsg
  // Use accumulators to display sd, sd%, errors>50ms,  ibg, hsg, [Lead error??] for all bells
  iallsdbo.innerHTML  = formatEntryms(Math.sqrt(alldsbo/(nblowsbo-1)));
  iallsdhs.innerHTML  = formatEntryms(Math.sqrt(alldshs/(nblowshs-1)));
  iallsdbs.innerHTML  = formatEntryms(Math.sqrt(alldsbs/(nblowsbs-1)));
  iallspbo.innerHTML  = formatEntrypc(100*Math.sqrt(alldsbo/(nblowsbo-1))/(ssIbg/nrowsbo));
  iallsphs.innerHTML  = formatEntrypc(100*Math.sqrt(alldshs/(nblowshs-1))/(ssIbg/nrowsbo));
  iallspbs.innerHTML  = formatEntrypc(100*Math.sqrt(alldsbs/(nblowsbs-1))/(ssIbg/nrowsbo));
  
  // Lead RMS SD and AV errors
  ialllrmbo.innerHTML = formatEntryms(Math.sqrt(alllsebo/nrowsbo)); 
  ialllrmhs.innerHTML = formatEntryms(Math.sqrt(alllsehs/nrowshs)); 
  ialllrmbs.innerHTML = formatEntryms(Math.sqrt(alllsebs/nrowsbs)); 
  ialllsdbo.innerHTML = formatEntryms(Math.sqrt(allldsbo/(nrowsbo-1)));
  ialllsdhs.innerHTML = formatEntryms(Math.sqrt(allldshs/(nrowshs-1)));
  ialllsdbs.innerHTML = formatEntryms(Math.sqrt(allldsbs/(nrowsbs-1)));  
  ialllavbo.innerHTML = formatEntryms(alllttbo/nrowsbo); 
  ialllavhs.innerHTML = formatEntryms(allltths/nrowshs); 
  ialllavbs.innerHTML = formatEntryms(alllttbs/nrowsbs); 
  
  iall50bo.innerHTML  = all50bo;
  iall50hs.innerHTML  = all50hs;
  iall50bs.innerHTML  = all50bs;
  iallibg.innerHTML   = formatEntryms(ssIbg/nrowsbo)+' ( = '+formatPealspeed(ssIbg/nrowsbo, ssHsg/nrowsbo, nBells) + ' Peal speed)';
  iallmhsg.innerHTML  = formatEntryms(ssHsg/nrowsbo)+' ( = '+formatEntryratio(ssHsg/ssIbg) + ' * Inter-Bell Gap)';
  iallahsg.innerHTML  = formatEntryms(ttAudibleHsgTotal/ctHsgInRange);
  
  fillBellStats();
}

function fillBellStats(){  
  // Use accumulators to display rms, sd, averror, errors>50ms for newly selected bell range and model
  if (bnNew >=0){
    ibelsdbo.innerHTML = formatEntryms(Math.sqrt(beldsbo[bnNew]/(nrowsbo-1)));
    ibelsdhs.innerHTML = formatEntryms(Math.sqrt(beldshs[bnNew]/(nrowshs-1)));
    ibelsdbs.innerHTML = formatEntryms(Math.sqrt(beldsbs[bnNew]/(nrowsbs-1)));
    ibelrmbo.innerHTML = formatEntryms(Math.sqrt(belsebo[bnNew]/nrowsbo)); 
    ibelrmhs.innerHTML = formatEntryms(Math.sqrt(belsehs[bnNew]/nrowshs)); 
    ibelrmbs.innerHTML = formatEntryms(Math.sqrt(belsebs[bnNew]/nrowsbs)); 
    ibelavbo.innerHTML = formatEntryms(belttbo[bnNew]/nrowsbo); 
    ibelavhs.innerHTML = formatEntryms(beltths[bnNew]/nrowshs); 
    ibelavbs.innerHTML = formatEntryms(belttbs[bnNew]/nrowsbs); 
    ibel50bo.innerHTML = bel50bo[bnNew];  
    ibel50hs.innerHTML = bel50hs[bnNew];  
    ibel50bs.innerHTML = bel50bs[bnNew]; 
    if (nlrowsbo[bnNew]>0){	
      ibellsdbo.innerHTML= formatEntryms(Math.sqrt(belldsbo[bnNew]/(nlrowsbo[bnNew]-1)));
      ibellsdhs.innerHTML= formatEntryms(Math.sqrt(belldshs[bnNew]/(nlrowshs[bnNew]-1)));
      ibellsdbs.innerHTML= formatEntryms(Math.sqrt(belldsbs[bnNew]/(nlrowsbs[bnNew]-1)));
      ibellrmbo.innerHTML= formatEntryms(Math.sqrt(bellsebo[bnNew]/nlrowsbo[bnNew])); 
      ibellrmhs.innerHTML= formatEntryms(Math.sqrt(bellsehs[bnNew]/nlrowshs[bnNew])); 
      ibellrmbs.innerHTML= formatEntryms(Math.sqrt(bellsebs[bnNew]/nlrowsbs[bnNew])); 
      ibellavbo.innerHTML= formatEntryms(bellttbo[bnNew]/nlrowsbo[bnNew]); 
      ibellavhs.innerHTML= formatEntryms(belltths[bnNew]/nlrowshs[bnNew]); 
      ibellavbs.innerHTML= formatEntryms(bellttbs[bnNew]/nlrowsbs[bnNew]); 
	} else{
      ibellsdbo.innerHTML= '-';
      ibellsdhs.innerHTML= '-';
      ibellsdbs.innerHTML= '-';
      ibellrmbo.innerHTML= '-';
      ibellrmhs.innerHTML= '-';
      ibellrmbs.innerHTML= '-';
      ibellavbo.innerHTML= '-';
      ibellavhs.innerHTML= '-';
      ibellavbs.innerHTML= '-';	
    }	  
  } else{
    ibelsdbo.innerHTML= '-';
    ibelsdhs.innerHTML= '-';
    ibelsdbs.innerHTML= '-';
    ibelrmbo.innerHTML= '-';
    ibelrmhs.innerHTML= '-';
    ibelrmbs.innerHTML= '-';
    ibelavbo.innerHTML= '-';
    ibelavhs.innerHTML= '-';
    ibelavbs.innerHTML= '-';
    ibel50bo.innerHTML= '-';
    ibel50hs.innerHTML= '-';
    ibel50bs.innerHTML= '-';
    ibellsdbo.innerHTML= '-';
    ibellsdhs.innerHTML= '-';
    ibellsdbs.innerHTML= '-';
    ibellrmbo.innerHTML= '-';
    ibellrmhs.innerHTML= '-';
    ibellrmbs.innerHTML= '-';
    ibellavbo.innerHTML= '-';
    ibellavhs.innerHTML= '-';
    ibellavbs.innerHTML= '-';
  }
}

function fillRowStats(){
  var rowfau=0;
  ibg=200
  if (rnCurrent >= 0 & !isNaN(rnCurrent)){
	gapset=ibg/4;
	for (bi=rnCurrent*nBells+1 ; bi<(1+rnCurrent)*nBells ; bi++){
	  gaperror = Math.abs(tiActByRp[bi]-tiActByRp[bi-1]-ibg);
      if (gaperror>gapset*3){rowfau+=3;}
	  else if (gaperror>gapset*2){rowfau+=2;}
	  else if (gaperror>gapset*1){rowfau+=1;}
	}
	irowfau.innerHTML=rowfau;
  }
}
precTables=10;
function formatEntryms(v){
  return Math.round(v*precTables)/precTables+'ms';
}

function formatEntrypc(v){
  return Math.round(v*precTables)/precTables+'%';
}

function formatEntryratio(v){
  return Math.round(v*100)/100;
}

function formatPealspeed (ibg, hsg, nBells){
    msRowTime = ibg*(2*nBells-1)/2+hsg/2;
    msPealTime = msRowTime*5040;
    mmPealTime = Math.round(msPealTime/60000);
    hh = Math.floor(mmPealTime/60);
    mm = mmPealTime-hh*60;
	return ''+hh+':'+mm;
}