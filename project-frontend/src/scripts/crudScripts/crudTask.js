$(function() {
    $('input[name="taskTime"]').daterangepicker({
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

  function createTask() {
      
  }