$('#modChart').on('shown.bs.modal',function(event){
    var link = $(event.relatedTarget);
    // get data source
    var source = link.attr('data-source').split(',');
    // get title
    var title = link.html();
    // get labels
    var table = link.parents('table');
    var labels = [];
    $('#'+table.attr('id')+'>thead>tr>th').each(function(index,value){
        // without first column
        if(index>0){labels.push($(value).html());}
    });
    // get target source
    var target = [];
    $.each(labels, function(index,value){
        target.push(link.attr('data-target-source'));
    });
    // Chart initialisieren
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    modal.find('.modal-title').html(title);
    var ctx = canvas[0].getContext("2d");
    var chart = new Chart(ctx).Line({        
        responsive: true,
        labels: labels,
        datasets: [{
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: source
        },{
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "#F7464A",
            pointColor: "#FF5A5E",
            pointStrokeColor: "#FF5A5E",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "red",
            data: target
        }]
    },{});
}).on('hidden.bs.modal',function(event){
    // reset canvas size
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.attr('width','568px').attr('height','300px');
    // destroy modal
    $(this).data('bs.modal', null);
});