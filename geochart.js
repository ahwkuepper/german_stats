/* 
* Some data exploration of the German academic landscape
*/

// get the google chart library
google.load("visualization", "1", {packages:["geochart"]});

// draw geochart with underlying data
google.setOnLoadCallback(drawRegionsMap1);

function drawRegionsMap1() {

	//write json-style data table
    var data = new google.visualization.DataTable();
    
    data.addColumn('string', 'State');
    data.addColumn('number', 'Population');
    data.addColumn('number', 'Students');
    data.addColumn('number', 'Freshmen');
    data.addColumn('number', 'Degrees');
    data.addColumn('number', 'Employees');
    data.addColumn('number', 'Professors');
    data.addColumn('number', 'Foreign students');
    data.addColumn('number', 'Foreign freshmen');
    data.addColumn('number', 'Foreign degrees');
    data.addColumn('number', 'Foreign employees');
    data.addColumn('number', 'Foreign professors');
    data.addRows([
        [{f: 'Brandenburg', v: 'DE-BB'}, 2449500, 52031, 9715, 9067, 6517, 904, 5387, 2185, 742, 704, 61],
        [{f: 'Berlin', v: 'DE-BE'}, 3375200, 160220, 31745, 27754, 24225, 3125, 21004, 9648, 3099, 2771, 321],
        [{f: 'Baden-Wurttemberg', v: 'DE-BW'}, 10569100, 333217, 79910, 62226, 65921, 6832, 29802, 13315, 4770, 6803, 476],
        [{f: 'Bavaria', v: 'DE-BY'}, 12519600, 332764, 71317, 61573, 55961, 6372, 23512, 10933, 4208, 6084, 451],
        [{f: 'Bremen', v: 'DE-HB'}, 654800, 34783, 7376, 6293, 4323, 655, 3695, 1231, 834, 462, 45],
        [{f: 'Hesse', v: 'DE-HE'}, 6016500, 215209, 39044, 31943, 24792, 3396, 18488, 5835, 2385, 2416, 188],
        [{f: 'Hamburg', v: 'DE-HH'}, 1734300, 90903, 16709, 14961, 11744, 1489, 7047, 2358, 1158, 942, 101],
        [{f: 'Mecklenburg-Western Pomerania', v: 'DE-MV'}, 1600300, 39906, 6571, 6515, 6238, 815, 1924, 857, 288, 422, 23],
        [{f: 'Lower Saxony', v: 'DE-NI'}, 7779000, 169626, 35304, 30938, 26373, 3557, 11955, 4463, 1857, 2544, 161],
        [{f: 'North Rhine-Westphalia', v: 'DE-NW'}, 17554300, 544612, 117877, 85280, 66259, 8749, 47011, 15101, 6090, 6432, 540],
        [{f: 'Rhineland-Palatinate', v: 'DE-RP'}, 3990300, 121068, 22936, 20407, 13416, 1987, 8273, 2955, 1278, 1372, 92],
        [{f: 'Schleswig-Holstein', v: 'DE-SH'}, 2806500, 54977, 9755, 10268, 7085, 1059, 3062, 1029, 474, 605, 52],
        [{f: 'Saarland', v: 'DE-SL'}, 994300, 28262, 5611, 3295, 4191, 496, 3369, 1095, 371, 651, 30],
        [{f: 'Saxony', v: 'DE-SN'}, 4050200, 112724, 20792, 21853, 19161, 2224, 11052, 4726, 1801, 1672, 123],
        [{f: 'Saxony-Anhalt', v: 'DE-ST'}, 2259400, 55876, 10118, 9675, 7928, 1068, 4981, 1893, 798, 596, 41],
        [{f: 'Thuringia', v: 'DE-TH'}, 2170500, 53231, 10308, 11290, 9556, 1134, 4082, 1913, 653, 869, 73]
        ]);

    //set options for geochart 
    var map_options = {region: 'DE', 'resolution':'provinces', width:900};
    
    //modify table with html elements
    document.getElementById('relabs').onchange = function() {
        if (this.value == 'relative') {
            for(var i=0; i<16; i++) {
                for(var j=1; j<12; j++) {
                    if (j!== 2) {
                        data.setValue(i,j,data.getValue(i,j)/data.getValue(i,2)); //divide numbers by stundent #
                    }
                }
            }
            for(var j=1; j<12; j++) {
                if (j!== 2) {
                    rel_formatter.format(data, j); //don't divide student numbers by student #
                }
            }
        } else if (this.value == 'absolute') {
            for(var i=0; i<16; i++) {
                for(var j=1; j<12; j++) {
                    if (j!== 2) {
                        data.setValue(i,j,data.getValue(i,j)*data.getValue(i,2)); //convert back to absolute numbers
                    }
                }
            }
            for(var j=1; j<12; j++) {
                if (j!== 2) {
                    formatter.format(data, j); //don't convert student number
                }
            }
        }
        map_chart.draw(view, map_options); //re-draw the geochart
    }

	//create a view of the table for drawing the geochart
    var view = new google.visualization.DataView(data); 
    view.setColumns([0, 1]);

    //set output format of hover text
    var rel_formatter = new google.visualization.NumberFormat( 
        {groupingSymbol: ',', fractionDigits: 4});

    var formatter = new google.visualization.NumberFormat(
        {groupingSymbol: ',', fractionDigits: 0});
    formatter.format(data, 1);

    //create geochart object and set div ID
    var map_chart = new google.visualization.GeoChart(document.getElementById('map_chart_germany_div'));

    //draw the chart
    map_chart.draw(view, map_options);

    //modify the data view with html element
    document.getElementById('column-select').onchange = function() {
        if (this.value == 1) {
            view.setColumns([0, 1]);
        } else if (this.value == 2) {
            view.setColumns([0, 2]);
        } else if (this.value == 3) {
            view.setColumns([0, 3]);
        } else if (this.value == 4) {
            view.setColumns([0, 4]);
        } else if (this.value == 5) {
            view.setColumns([0, 5]);
        } else if (this.value == 6) {
            view.setColumns([0, 6]);
        } else if (this.value == 7) {
            view.setColumns([0, 7]);
        } else if (this.value == 8) {
            view.setColumns([0, 8]);
        } else if (this.value == 9) {
            view.setColumns([0, 9]);
        } else if (this.value == 10) {
            view.setColumns([0, 10]);
        } else if (this.value == 11) {
            view.setColumns([0, 11]);
        }
        map_chart.draw(view, map_options); //re-draw the geochart
    };

};
