$(document).ready(function () {
    $("#mi-formulario").validate({
        rules: {
            rut: {
                required: true,
                formatorut: true,
                verificardv: true
            },

            messages: {
                rut: {
                    required: 'Campo obligatorio',
                    formatorut: 'Formato rut no válido',
                    verificardv: 'Rut no válido'
                }
            }

        }
    });



/*funcion para validar el rut con el digito verificador*/
function validarRut(rut) {
            var suma = 0;
            var cuerpoRut = rut.substr(0, rut.length - 1);
            var dv = rut.substr(rut.length - 1).toUpperCase();
            var multiplicador = 2;
            /* suma la multiplicacion de cada numero que compone el rut */
            for (i = cuerpoRut.length - 1; i >= 0; i--) {
                suma = suma + (cuerpoRut.charAt(i) * multiplicador);
                if (multiplicador == 7) {
                    multiplicador = 2;
                } else {
                    multiplicador++;
                }
            }
            /* divide la suma por 11 y obtiene el resto*/
            var resto = suma % 11;
            var verificadorDv;

            if (resto == 1) {
                verificadorDv = 'K';
            } else {
                if (resto == 0) {
                    verificadorDv = '0';
                } else {
                    verificadorDv = 11 - resto;
                }
            }

            if (verificadorDv != dv) { return false; }
            else { return true; }
        }


$.validator.addMethod("formatorut", function (value, element) {
            return this.optional(element) || /^[0-9\d|kK]+$/.test(value);
        }, "Formato rut no válido")


