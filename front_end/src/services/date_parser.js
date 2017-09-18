var DateParser = function(){
  
}

//-------------------------------------------------------------------------------  

DateParser.getNumMinutes = function( date1, date2 ){
  if ( date1 < date2 ){
    var startDate = new Date( date1 );
    var endDate = new Date( date2 );
  } else {
    var startDate = new Date( date2 );
    var endDate = new Date( date1 );
  }

  //is endDate a working day? 
  //if not, return 0, no minute by minute analysis available;
  if ( !DateParser.isWorkingDay( endDate ) ) return 0;

  // is startDate < openDate for endDate?
  // if so, set startDate to openDate for endDate
  if ( startDate < DateParser.getOpenDate( endDate ) ){
    console.log( "startDate <= openDate for endDate" );
    startDate = DateParser.getOpenDate( endDate );
  } 

  // is endDate > closeDate for endDate?
  // if so, set endDate to closeDate for endDate
  if ( endDate > DateParser.getCloseDate( endDate ) ){
    console.log( "endDate >= closeDate for endDate" )
    endDate = DateParser.getCloseDate( endDate );
  }

  console.log( "startDate", startDate );
  console.log( "endDate", endDate );
  var dateDiff = endDate - startDate;
  return Math.max( Math.floor( dateDiff / ( 60 * 1000 ) ), 0 );
}

//-------------------------------------------------------------------------------  

DateParser.getNumFridays = function( date1, date2 ){
  var numFridays = 0;
  if ( date1 <= date2 ){
    var workingDate = new Date( date1 );
    var endDate = new Date( date2 );
  } else {
    var workingDate = new Date( date2 );
    var endDate = new Date( date1 );
  }

  //is workingDate a Friday after close?
  //if so, don't count towards numFridays
  var workingDateIsFriday = ( workingDate.getDay() === 5 );
  var workingDateIsAfterClose = ( workingDate >= DateParser.getCloseDate( workingDate ) );
  if ( workingDateIsFriday && workingDateIsAfterClose ) numFridays--;
  //is endDate a Friday after close?
  //if so, add one to numFridays
  var endDateIsFriday = ( endDate.getDate() === 5 );
  var endDateIsAfterClose = ( endDate >= DateParser.getCloseDate( endDate ) );
  if ( endDateIsFriday && endDateIsAfterClose ) numFridays++;

  //strip time from dates
  workingDate = new Date( DateParser.trimToString( workingDate ) );
  endDate = new Date( DateParser.trimToString( endDate ) );

  while( workingDate < endDate ){
    var day = workingDate.getDay();
    if ( day === 5 ) numFridays++;
    workingDate.setDate( workingDate.getDate() + 1 );
  }

  return numFridays;
}

//-------------------------------------------------------------------------------  

DateParser.getNumWorkingDayEnds = function( date1, date2 ){
  var numWorkingDayEnds = 0;
  if ( date1 < date2 ){
    var workingDate = new Date( date1 );
    var endDate = new Date( date2 );
  } else {
    var workingDate = new Date( date2 );
    var endDate = new Date( date1 );
  }
  
  //is workingDate a workingDay but after close?
  //if so, don't count towards numWorkingDayEnds 
  if ( DateParser.isWorkingDay( workingDate ) && workingDate > DateParser.getCloseDate( workingDate ) ) {
    numWorkingDayEnds--;
  }

  //is endDate a workingDay after close?
  //if so, count towards numWorkingDayEnds
  if ( DateParser.isWorkingDay( endDate ) && endDate > DateParser.getCloseDate( endDate ) ) {
    numWorkingDayEnds++;
  }
  
  //strip time from dates
  workingDate = new Date( DateParser.trimToString( workingDate ) );
  endDate = new Date( DateParser.trimToString( endDate ) );

  while( workingDate < endDate ){
    if ( DateParser.isWorkingDay( workingDate ) ) numWorkingDayEnds++;
    workingDate.setDate( workingDate.getDate() + 1 );
  }

  return numWorkingDayEnds;
}


//-------------------------------------------------------------------------------  

DateParser.getNumMonthEnds = function( date1, date2 ){
  var monthEndsNormal = { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31,
    5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31 };
  var monthEndsLeap = { 0: 31, 1: 29, 2: 31, 3: 30, 4: 31,
    5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31 };  
  var numMonthEnds = 0;

  if ( date1 < date2 ){
    var workingDate = new Date( date1 );
    var endDate = new Date( date2 );
  } else {
    var workingDate = new Date( date2 );
    var endDate = new Date( date1 );
  }
  
  //is workingDate a month end, working day after close?
  //if so, don't count towards numMonthEnds
  if ( DateParser.isLeapYear( workingDate ) ){
    var monthEnds = monthEndsLeap;
  } else {
    var monthEnds = monthEndsNormal;
  }
  var month = workingDate.getMonth();
  var date = workingDate.getDate();
  var workingDateIsAMonthEnd = ( monthEnds[ month ] === date );
  var workingDateIsAWorkingDay = ( DateParser.isWorkingDay( workingDate ) );
  var workingDateIsAfterClose = ( workingDate > DateParser.getCloseDate( workingDate ) );
  if ( workingDateIsAMonthEnd && workingDateIsAWorkingDay && workingDateIsAfterClose  ) {
    numMonthEnds--;
  }

  //is endDate a month end, working day after close?
  //if so, count towards numMonthEnds
  if ( DateParser.isLeapYear( endDate ) ){
    var monthEnds = monthEndsLeap;
  } else {
    var monthEnds = monthEndsNormal;
  }
  var month = endDate.getMonth();
  var date = endDate.getDate();
  var endDateIsAMonthEnd = ( monthEnds[ month ] === date );
  var endDateIsAWorkingDay = ( DateParser.isWorkingDay( endDate ) );
  var endDateIsAfterClose = ( endDate > DateParser.getCloseDate( endDate ) );
  if ( endDateIsAMonthEnd && endDateIsAWorkingDay && endDateIsAfterClose  ) {
    numMonthEnds++;
  }

  //strip time from dates
  workingDate = new Date( DateParser.trimToString( workingDate ) );
  endDate = new Date( DateParser.trimToString( endDate ) );

  while( workingDate < endDate ){

    if ( DateParser.isLeapYear( workingDate ) ){
      var monthEnds = monthEndsLeap;
    } else {
      var monthEnds = monthEndsNormal;
    }
    var month = workingDate.getMonth();
    var date = workingDate.getDate();
    if ( monthEnds[ month ] === date ) numMonthEnds++;
    workingDate.setDate( workingDate.getDate() + 1 );
  }

  return numMonthEnds;
}

//-------------------------------------------------------------------------------  

DateParser.isLeapYear = function( date ){
  if ( date.getFullYear() % 400 === 0 ) {
    return true;
  } else if ( date.getFullYear() % 100 === 0 ) {
    return false;
  } else if ( date.getFullYear() % 4 === 0 ) {
    return true;
  } else {
    return false;
  }
}

//-------------------------------------------------------------------------------  

DateParser.padNumber = function( num ){
  var s = num+"";
  while ( s.length < 2 ) s = "0" + s;
  return s;
}

//-------------------------------------------------------------------------------  

DateParser.trimToString = function( date ){
  var string = "";
  string += date.getFullYear().toString();
  string += "-";
  string += DateParser.padNumber( date.getMonth() + 1 );
  string += "-";
  string += DateParser.padNumber( date.getDate() );
  return string;
}

//-------------------------------------------------------------------------------  

DateParser.getOpenDate = function( date ){
  var dayStart = new Date( DateParser.trimToString( date ) );
  dayStart.setUTCHours(13);
  return dayStart;
}

//-------------------------------------------------------------------------------  

DateParser.getCloseDate = function( date ){
  var dayClose = new Date( DateParser.trimToString( date ) );
  dayClose.setUTCHours(21);
}

//-------------------------------------------------------------------------------  

DateParser.isWorkingDay = function( date ){
  var workingDays = [ 1, 2, 3, 4, 5 ];
  return ( workingDays.includes( date.getDay() ) );
}

//-------------------------------------------------------------------------------  

module.exports = DateParser;