if (!window.dash_clientside) {
    window.dash_clientside = {}
}



window.dash_clientside.clientside3 = {
    update_table: function(clickdata, selecteddata, table_data, selectedrows, store) {
    	if ((!selecteddata) && (!clickdata)) {
	    // this is only visited when initializing the app
	    // we use a pre-defined list of indices
	    return store[1];
        }
	if (!selectedrows) {
	    selectedrows = [];
	}
	var ids = [...selectedrows];

	var countries = [];
	if (clickdata) {
	    var country = clickdata['points'][0]['customdata'][0];
	    countries.push(country);
	}
	if (selecteddata) {
	    var countries = [];
		for (i = 0; i < selecteddata['points'].length; i++) {
		    countries.push(selecteddata['points'][i]['customdata'][0]);
	    }
	}
	for (i = 0; i < countries.length; i++) {
	    for (j = 0; j < table_data.length; j++) {
		if (countries[i] == table_data[j]["country_region"]) {
		    if (selectedrows.includes(j)){
			var index = ids.indexOf(j);
			ids.splice(index, 1);
			}
		    else{
			ids.push(j);
		    }
		}
	    }
	}
	return ids;
    }
};

    
window.dash_clientside.clientside = {
    update_store_data: function(rows, selectedrows, store) {
	var fig = store[0];
	if (!rows) {
           throw "Figure data not loaded, aborting update."
       }
	var new_fig = {};
	new_fig['data'] = [];
	new_fig['layout'] = fig['layout'];
	
	var countries = [];
	for (i = 0; i < selectedrows.length; i++) {
	    countries.push(rows[selectedrows[i]]["country_region"]);
	}
	for (i = 0; i < fig['data'].length; i++) {
	    var name = fig['data'][i]['name'];
	    if (countries.includes(name) || countries.includes(name.substring(1))){
		new_fig['data'].push(fig['data'][i]);
	    }
	}
        return new_fig;
    }
};

