let datatable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    datatable = $('#tblDatos').DataTable({
        "ajax": {
            "url": "/Admin/Bodega/ObtenerTodos"
        },
        "columns": [
            { "data": "nombre", "width": "20%" },
            { "data": "descripcion", "width": "40%" },
            {
                "data": "estado",
                "render": function (data) {
                    if (data == true) {
                        return "Activo";
                    }
                    else {
                        return "Inactivo";
                    }
                }, "width": "20%"
            },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center"><a href="/Admin/Bodega/Upsert/%{data}" class="btn btn-succes text-white" style="cursor:pointer">
                            <i class="bi bi-pencil-square"></i> </a>
                            <a onclick=Delete("/Admin/Bodega/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer">
                           <i class="bi bi-trash"></i></a> 
                            </div>`;
                }, "width":"20%"
            }
        ]
    });
}

function Delte(url) {
    swal({
        title: "Esta seguro de eliminar la Bodega?",
        text: "Este registro no se puede recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((borrar) => {
        if (borrar) {
            $.ajax({
                type: "POST",
                url: url,
                succes: function (data) {
                    if (data.succes) {
                        toastr.succes(data.message);
                        datatable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}