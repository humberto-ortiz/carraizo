// https://waterdata.usgs.gov/pr/nwis/uv?cb_62616=on&format=rdb&site_no=50059000&period=7

function parseusgs(d, i) {
    if (d[0] != "USGS") {
	return null
    } else {
	return {
	    date: new Date(d[2]),
	    depth: +d[4]
	}
    }
}

function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


d3.text("https://waterdata.usgs.gov/pr/nwis/uv?cb_62616=on&format=rdb&site_no=50059000&period=30").then( function(string) {
    var data = d3.tsvParseRows(string, parseusgs);

    var trace1 = {
	type: "scatter",
	mode: "lines",
	name: 'Carraizo',
	x: unpack(data, 'date'),
	y: unpack(data, 'depth'),
	line: {color: '#17BECF'}
    };

    var plotdata = [trace1];

    //console.log(trace1);
    var layout = {
	title: 'Depth of Carraizo',
	yaxis: {
	    title: 'Depth (meters)'
	}
    };

    Plotly.newPlot('myDiv', plotdata, layout);
});
