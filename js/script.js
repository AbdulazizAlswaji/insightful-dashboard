$(document).ready(() => {

    particlesJS.load('particles-js', './animation/effects.json');

    view_values('#customers', data.values.customers, details);
    view_values('#employee', data.values.employee, details);

    view_trend('#sales', data.trends.sales, details, 'sales');
    view_trend('#refund', data.trends.refund, details, 'refund');

});



ranking = (values, desc) => {
    let output = {};
    values = Object.entries(values).sort((a, b) => b[1] - a[1]);

    if (desc == false) {
        let i = 0;
        while (i < Object.keys(colors).length) {
            Object.keys(values).forEach(e => {
                output[`#${values[e][0]}`] = { color: colors[i].color, rank: colors[i].rank };
                i++;
            })
        }

    } else {
        let i = Object.keys(colors).length - 1;
        while (i >= 0) {
            Object.keys(values).forEach(e => {
                output[`#${values[e][0]}`] = { color: colors[i].color, rank: colors[i].rank };
                i--;
            })
        }
    }

    return output;
}

view_values = (_id, data, details) => {
    let details_index = data.details;
    let label = details[details_index].label;
    let icon = details[details_index].icon;
    let output = ``;

    output += `<img src="icons/${icon}" class="icon"> <br> <span class="label"> ${label} </span>`;

    output += `<table class="table mt-3"> <tr> <td></td> <td> Q1 </td> <td> Q2 </td> <td> Q3 </td>  </tr>`;

    let q_values = {};
    let counter = 0;
    let get_ranking = [];
    Object.keys(data).forEach(e => {
        if (e != 'details') {
            output += `<tr> <td> 
            <div class="mt-2"> <img class="icon" src="icons/${details[data[e].details].icon}"/> <br> 
           <span class=""> ${details[data[e].details].label} </span>
           </div>
           </td> `;


            for (v in data[e].values) {
                output += `<td id="${e}_${counter}"> 
                <div style="float: right;" class=""> <span class="badge rounded-pill bg-light" id="${e}_${counter}_badge">Light</span> </div>
                <div class="mt-4 mb-2"> <p class="label-2 mt-3"> ${data[e].values[v]} </p> </div>
                </td>`;
                q_values[`${e}_${counter}`] = data[e].values[v];
                counter++;
            }

            output += `</tr>`;
            get_ranking.push(ranking(q_values, details[data[e].details].desc))
            q_values = {};
            counter = 0;

        }
    });

    output += `</table>`;


    $(_id).html(output);

    for (k in get_ranking) {
        Object.keys(get_ranking[k]).forEach(e => {
            $(e).css('background-color', get_ranking[k][e].color);
            $(e + '_badge').html(get_ranking[k][e].rank);
        })
    }
}


view_trend = (_id, data, details) => {
    let label = details[data.details].label;
    let unit = details[data.details].unit;
    
    
    $(_id).html('');

    var options = {
        title: {
            text: label ,
            align: 'center'
        },

        series: [{
            name: label,
            data: data.values,
        }],

        chart: {
            toolbar: { show: false },
            height: 280,
            type: 'area',
            foreColor: '#fff',
        },

        colors: ['#db0f68'],

        dataLabels: {
            enabled: false
        },

        stroke: {
            curve: 'smooth',
            width: 2,
        },

        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        yaxis: [
            {
                title: {
                    text: label,
                },
            }
        ]

    };

    var chart = new ApexCharts(document.querySelector(_id), options);
    chart.render();


}
