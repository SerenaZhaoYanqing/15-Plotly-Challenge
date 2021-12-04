
function plotsfunction(id) {
//Read samples.json
    d3.json("samples.json").then (sampledata =>{
        // using slice and reverse to get the top 10 OTU ID, Sample values and labels 
        var OTU_top10 = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();  
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
    // format the OTU top 10 ID using map funtion 
        var OTU_id = OTU_top10.map(d => "OTU " + d);
     // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        //set up trace
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'green'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
        };
        // create the bar plot
    Plotly.newPlot("bar", data, layout);


        // create bubble chart 
    
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
        };

        // creating data variable 
        var data1 = [trace1];

    // create the bubble plot
    Plotly.newPlot("bubble", data1, layout_2); 
    
    });
}  
// create the function to get the  data for demographic infomation 
function demoinfo(id) {
// read the json file to get data
    d3.json("samples.json").then((data)=> {
// get the metadata info for the demographic panel
        var metadata = data.metadata;

      // filter meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // select demographic panel to put data
       var demographicInfo = d3.select("#sample-metadata");
        
     // empty the demographic info panel each time before getting new id info
       demographicInfo.html("");

     // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
// create the function for the change event
function optionChanged(id) {
    plotsfunction(id);
    demoinfo(id);
}

// create the function for the initial data 
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        // select ID dropdown
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        plotsfunction(data.names[0]);
        demoinfo(data.names[0]);
    });
}

init();
