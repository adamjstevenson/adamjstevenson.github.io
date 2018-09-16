var config = {
  type: "bar",
  data: {
    labels: [
      "2013",
      "2014",
      "2015",
      "2016",
      "2017"
    ],
    datasets: [
      {
        label: "AWS Revenue (in millions)",
        data: [3108,4644,7880,12219,17459],
        backgroundColor: "rgba(255, 153, 0, 0.6)",
        borderColor: "rgba(230, 138, 0)",
        borderWidth: 1
      }
    ]
  },
  options: {
    plugins: {
      deferred: {
        xOffset: 150,
        yOffset: '50%',
        delay: 500
      }
    }
  }
}

window.onload = function() {
  const ctx = document.getElementById("aws-chart").getContext("2d");
  window.myLine = new Chart(ctx, config);
};
