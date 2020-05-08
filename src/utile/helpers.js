// lodash
import _ from 'lodash'
export const convertMonthToNumber = (month) =>{
    let daySplit = month !== undefined ? month.split("-"):''
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let number = _.findIndex(months, function(o) { return o == daySplit[1] });
    if(number < 10){
      return `${daySplit[0]}-0${number}-${daySplit[2]}`
    }else{
      return `${daySplit[0]}-${number}-${daySplit[2]}`
    }
}
export const convertDateTime = (date, time) =>{
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let dateSplit = date !== undefined ? date.split('-'):''
    let monthName = months[parseInt(dateSplit[1], 10)]
    let finalNameDate =  `${dateSplit[0]}-${monthName}-${dateSplit[1]}`
    return [finalNameDate,time].join(' ')
  }