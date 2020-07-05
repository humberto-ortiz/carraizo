// https://waterdata.usgs.gov/pr/nwis/uv?cb_62616=on&format=rdb&site_no=50059000&period=7

// Daily data (only in feet)
// https://waterdata.usgs.gov/nwis/dv?cb_62614=on&format=rdb&site_no=50059000&referred_module=sw&period=356
// https://waterdata.usgs.gov/nwis/dv?cb_62614=on&format=rdb&site_no=50059000&referred_module=sw&period=&begin_date=2014-04-25&end_date=2016-04-25

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

function parsedv(d, i) {
    if (d[0] != "USGS" || d[3] == "") {
	return null
    } else {
	return {
	    date: new Date(d[2]),
	    depth: +d[3] / 3.2808399 // convert feet to meters
	}
    }
}

function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

var period = "30"; // days to plot

function get2015() {
//    var today = new Date();
//    var end = new Date(today.setFullYear(2015));
//    var start = new Date(end - (period * 24 * 60 * 60 * 1000));
    var begin_date = "2015-01-01";
    var end_date = "2015-12-31";
    
    var url = "https://waterdata.usgs.gov/nwis/dv?cb_62614=on&format=rdb&site_no=50059000&referred_module=sw&period=&begin_date="+begin_date+"&end_date="+end_date;
    console.log(url);
    
    d3.text(url).then(function(string) {
	// console.log(string);
	var data = d3.tsvParseRows(string, parsedv);

	// console.log(data);
	var x = unpack(data, 'date'); 
	var sequia = {
	    type: "scatter",
	    mode: "lines",
	    name: "2015",
	    x: x,
	    y: unpack(data, 'depth')
	};

	var desborde = {
	    type: "scatter",
	    mode: "lines",
	    name: 'Desborde',
	    x: x,
	    y: Array(x.length).fill(40.80)
	};

	var seguridad = {
	    type: "scatter",
	    mode: "lines",
	    name: 'Seguridad',
	    x: x,
	    y: Array(x.length).fill(39.70)
	};
	var observacion = {
	    type: "scatter",
	    mode: "lines",
	    name: 'Observacion',
	    x: x,
	    y: Array(x.length).fill(38.50)
	};
	var ajustes = {
	    type: "scatter",
	    mode: "lines",
	    name: 'Ajustes',
	    x: x,
	    y: Array(x.length).fill(37.20)
	};
	var control = {
	    type: "scatter",
	    mode: "lines",
	    name: 'Control',
	    x: x,
	    y: Array(x.length).fill(31.50)
	};

	var plotdata = [sequia, desborde, seguridad, observacion, ajustes, control];

	//console.log(trace1);
	var layout = {
	    title: 'Depth of Carraizo during the draught of 2015',
	    yaxis: {
		title: 'Depth (meters)'
	    }
	};

	Plotly.newPlot('Draught', plotdata, layout);
	
    });
}

var draught = get2015();

console.log(draught);
// https://waterdata.usgs.gov/nwis/dv?cb_62614=on&format=rdb&site_no=50059000&referred_module=sw&period=&begin_date=2020-01-01
d3.text("https://waterdata.usgs.gov/nwis/dv?cb_62614=on&format=rdb&site_no=50059000&referred_module=sw&period=&begin_date=2020-01-01").then( function(string) {

    var data = d3.tsvParseRows(string, parsedv);

    var x = unpack(data, 'date'); 
    var trace1 = {
	type: "scatter",
	mode: "lines",
	name: 'Carraizo',
	x: x,
	y: unpack(data, 'depth'),
	line: {color: '#17BECF'}
    };

    var desborde = {
	type: "scatter",
	mode: "lines",
	name: 'Desborde',
	x: x,
	y: Array(x.length).fill(40.80)
    };

    var seguridad = {
	type: "scatter",
	mode: "lines",
	name: 'Seguridad',
	x: x,
	y: Array(x.length).fill(39.70)
    };

	  var observacion = {
	      type: "scatter",
	      mode: "lines",
	      name: 'Observacion',
	      x: x,
	      y: Array(x.length).fill(38.50)
	  };
	  var ajustes = {
	      type: "scatter",
	      mode: "lines",
	      name: 'Ajustes',
	      x: x,
	      y: Array(x.length).fill(37.20)
	  };
	  var control = {
	      type: "scatter",
	      mode: "lines",
	      name: 'Control',
	      x: x,
	      y: Array(x.length).fill(31.50)
	  };

    var plotdata = [trace1, desborde, seguridad, observacion, ajustes];

    //console.log(trace1);
    var layout = {
	title: 'Depth of Carraizo',
	yaxis: {
	    title: 'Depth (meters)'
	}
    };

    Plotly.newPlot('myDiv', plotdata, layout);
});
