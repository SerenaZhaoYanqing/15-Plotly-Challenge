//Part I: Bar Chart 


function getplots(id){
// read samples.json data 
d3.json("samples.json").then(sampledata=>{
    console.log(sampledata)
    // we only need top 10 OTUs from sample. hence we will use slice to get 10 from sample
    // then using reverse to sort the order of the elements 
    //getting otu_ids from sample data, assign to variable id
    var id=sampledata.samples[0].otu_ids.slice(0,10).reverse()
    console.log(id)
    // getting sample values from sample data, assign to variable samplevalues 
    var samplevalues=sampledata.sample[0].sample_values.slice(0,10).reverse();
    console.log(samplevalues)
    //getting otu labels , assign to variable labels
    var labels =sampledata.samples[0].out_labels.slice(0,10).reverse();
    console.log(labels)
    // using map function to concact otu_ids in the format of OTU xxx
    var formatted_id=id.map(i => "OTU " + i);
    console.log(`OTU_labels: ${labels}`)
    //set up trace for  bar(horizontal) chart
    var trace = {
        x: samplevalues,
        y: formatted_id,
        text: labels,
        marker:{
        color: 'blue'},
        type:"bar",
        orientation:"h",
        };
        var data = [trace];
    // layoyt of the barchart 
    var layout={
        title: "Top 10 OTUs",
        yaxis:{
            tickmode:"linear",
        },
    };
    // plot bar chart 
    Plotly.newPlot("bar",data,layout);



// Part II: Bubble Chart 
// getting all ids as x for bubble chart (assign to id2 variable)
    var id2=sampledata.samples[0].otu_ids
// getting all sample_values as y for bubble chart (assign to samplevalues2 variable)
    var samplevalues2=sampledata.samples[0].sample_values
// getting all out_labels as text  values for bubble chart (assign to labels2 variable)   
    var labels2=sampledata.samples[0].out_labels

//set up trace for  bubble chart
    var trace2={
        x: id2,
        y:samplevalues2,
        mode: "markers",
        marker:{
            size:samplevalues2,
            color:id2
        },
        text: labels2
    };
    var data2=[trace2]
// set up layout for the bubble chart
    var layout2 ={
    xaxis:{title: "OTU ID"},
};

// Plot bubble chart 
Plotly.newPlot("bubble", data2, layout2); 

});
}

// Part III: Getting demographic info
function demoinfo(id){
    // read samples.json data 
    d3.json("samples.json").then(data=>{
        var metadata=data.metadata;
        console.log(data)

    // set up filter for metadata by ID
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
    // select demographic panel to put data
    var demographicInfo = d3.select("#sample-metadata");
    // clear the panel each time when user input a new id 
    demographicInfo.html("");

    // getting relevant demographic data for each ID
    Object.entries(result).forEach((key) => {   
        demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
});
}

    // create the function for the change event
    function changeoption(id) {
        getplots(id);
        demoinfo(id);
}

    // set up inital display 
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
     // read the data 
     d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getplots(data.names[0]);
        demoinfo(data.names[0]);
    });
}

init();








