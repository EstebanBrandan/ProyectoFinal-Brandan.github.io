const boton = document.getElementById("sweetAlert");

boton.onclick = () => {

    const cantCuotas = parseInt(localStorage.getItem("cantCuotas"))

    const valorFinal = parseInt(localStorage.getItem("cuota"));

    Swal.fire({

        title: "¿Confirmar Compra?",

        text: "Pagará " + cantCuotas + " cuota/s de $" + valorFinal,

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Sí",

        cancelButtonText: "No",

    }).then((result) => {

        if (result.isConfirmed){

            Swal.fire({

                title: "La compra fue realizada con éxito",

                icon: "success",

            })

            setTimeout( ()=>{

                location.reload()

            }, 3000)

        }

    })

}