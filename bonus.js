
function gaugeChart(data) {
  // Enter a speed between 0 and 180
  var degree = parseInt(data.wfreq) * 20;
  // console.log(data.wfreq);
  var level = degree;

  // Trig to calc meter point
  var degrees = 180 - level,
       radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // creat path
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var trace = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'wash freq',
      text: data.wfreq,
      hoverinfo: 'text+name'},
    {  values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
                  rotation: 90,
                  text:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    textinfo: 'text',
    textposition:'inside',
    textfont:{
      size : 16,
      },
    marker: {colors:['rgba(6, 51, 0, .5)', 'rgba(9, 77, 0, .5)', 
                           'rgba(12, 102, 0 ,.5)', 'rgba(14, 127, 0, .5)',
                           'rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)', 
                           'rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)', 
                           'rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)'
                    ]},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
    hoverinfo: 'text',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],

    title: '<b> Belly Button Washing Frequency</b> <br> Scrub Per Week',
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
  };

  Plotly.newPlot('gauge', trace, layout, {responsive: true});
}
