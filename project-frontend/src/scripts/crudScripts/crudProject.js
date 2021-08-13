// import { loadCultureFiles } from '../common/culture-loader';
// import { DateRangePicker } from '@syncfusion/ej2-calendars';
// /**
//  * Default DateRangePicker sample
//  */

//     loadCultureFiles();
//     let daterangepicker: DateRangePicker = new DateRangePicker();
//     daterangepicker.appendTo('#daterangepicker');
$(function() {
    $('input[name="datetimes"]').daterangepicker({
      timePicker: true,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(8, 'day'),
      locale: {
        format: 'DD/MM/YYYY'
      }
    },
    function(start, end, label) {
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY hh:mm A') + ' to ' + end.format('DD/MM/YYYY hh:mm A'));
      });
  });