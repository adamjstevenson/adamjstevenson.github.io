var days = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
var config = {
  type: 'line',
  data: {
    labels: ["Day 0", "Day 10", "Day 20", "Day 30", "Day 40", "Day 50", "Day 60", "Day 70", "Day 80", "Day 90", "Day 100"],
    datasets: [{
      label: "BTC-USD price",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [
        15000,
        12000,
        10000,
        7000,
        5000,
        9000,
        8000,
        7000,
        9000,
        12000,
        10000
      ],
    fill: false
    }]
  },
  options: {
    responsive: true,
    title:{
      display:true,
      text:'Price of BTC from day of investment'
    },
    tooltips: {
      mode: 'index',
      intersect: false,

    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Days since first purchase'
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          callback: function(value, index, values) {
            return '$' + value;
          }
        }
      }]
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById("chart").getContext("2d");
  window.myLine = new Chart(ctx, config);
};