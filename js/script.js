$(document).ready( () => {


    view_values('#customers', data.values.customers, details)
    view_values('#employee', data.values.employee, details)
    
});

view_values = (_id, data, details) => {
    let details_index = data.details;
    let label = details[details_index].label;
    let icon = details[details_index].icon;
    let output = ``;

    output += `<img src="icons/${icon}" class="icon"> <br> <span class="label"> ${label} </span>`;

    output += `<table class="table"> <tr> <th></th> <th> Q1 </th> <th> Q2 </th> <th> Q3 </th> <th> Q4 </th> </tr>`;


    $(_id).html(output);
}

