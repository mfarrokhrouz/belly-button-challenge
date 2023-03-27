// Get the Belly Button Data
function buildMetadata(sample) {
    var metadataSelector = d3.select('#sample-metadata');
// Fetch the JSON data and console log it
    d3.json(`./data/samples.json`).then( dataS =>{
      metadataSelector.html("");
      var data=dataS.metadata.filter(samples => samples.id==sample );

      console.log(data);
      for (let elem in data[0]){
          metadataSelector
          .append('p').text(`${elem} : ${data[0][elem]}`);
      }

      })
}
// Making different charts for the graph

function barChart(data) {
    console.log(data);
    var sampleData=data;

    // Prepare a list of objects for sorting
    var list = [];
    for (var i = 0; i < sampleData.otu_ids.length; i++) {
    // Push each object into the array
        list.push({'otu_ids': sampleData.otu_ids[i], 'otu_labels': sampleData.otu_labels[i], 'sample_values': sampleData.sample_values[i]});
    }

    // Sort function of objects by samples values in array 
    console.log(list.sort((a, b) => parseInt(b.sample_values) - parseInt(a.sample_values)));

    var otu_ids = list.slice(0,10).map(record => "OTU " + record.otu_ids.toString());
    var values = list.slice(0,10).map(record => record.sample_values);
    var otu_labels = list.slice(0,10).map(record =>  record.otu_labels );

    var trace1 = [{
      x: values,
      y: otu_ids,
      hovertext:otu_labels,
      type: "bar",
      orientation: "h"
    }];

    var layout = {
      title:"<b> Top 10 OTUs Bar Chart </b>",
      yaxis:{autorange:'reversed'},
    
      height: 550,
      width: 500
    };

    Plotly.newPlot("bar", trace1, layout);
  
}

 // Making the Bubble Chart

function bubbleChart(data) {
  var x = data.otu_ids;
  var y = data.sample_values;
  var markersize = data.sample_values;
  var markercolors = data.otu_ids;
  var textvalues = data.otu_labels;

  var trace1 =[{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: markersize,
      color: markercolors,
    },
    text: textvalues
  }];

  var layout ={
    title:"<b> Belly Button Bubble Chart </b>",
    xaxis: {
      title: 'OTU ID',
    },
    yaxis: {
      title: 'Sample Value'
    },
    height: 00,
    width:1300,
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
  };

  Plotly.newPlot('bubble', trace1, layout, {responsive: true});
}



function buildCharts(sample) {

    d3.json(`./data/samples.json`).then ( dataS =>{
      var wdata=dataS.metadata.filter(samples => samples.id==sample );
      // Gauge Chart 
      console.log(wdata);  
      gaugeChart(wdata[0]);
    });
  
    d3.json(`./data/samples.json`).then( dataS =>{
      var data=dataS.samples.filter(samples => samples.id==sample );
    
      //  bar Chart 
      barChart(data[0]);
      //  Bubble Chart 
      bubbleChart(data[0]);
    });


   
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json(`./data/samples.json`).then((data) => {
    var sampleNames=data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const sample1 = sampleNames[0];
    buildCharts(sample1);
    buildMetadata(sample1);
  });
}

function optionChanged(sampleN) {
  // Fetch new data each time a new sample is selected

  buildCharts(sampleN);
  buildMetadata(sampleN);

}


// Initialize the dashboard
init();







