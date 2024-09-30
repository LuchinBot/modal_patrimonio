$(document).ready(function () {
  $('#searchBtn').click(function () {
    const value = $('#dni').val()

    // Si está vaciito uwu
    if (!value) return

    // Cargar bienes
    function cargarBienesDetalle(code) {
      const url = 'app/ajax/modal.php?'

      $.ajax({
        url: url,
        method: 'POST',
        data: { id: code },
        success: function (data) {
          data = JSON.parse(data)

          // Actualizar los detalles del bien
          const bien = data[0]
          bien.forEach((element) => {
            $('#bienPatrimonial').text(element.nombre_bien_ajustado)
            $('#centroCosto').text(element.dependencia_d)
            $('#codigoPatrimonial').text(element.codigo_patrimonial)
            $('#marca').text(element.marca_d)
            if (
              element.modelo_ajustado == '' ||
              element.modelo_ajustado == null
            ) {
              $('#modelo').text('S/M')
            } else {
              $('#modelo').text(element.modelo_ajustado)
            }
            if (
              element.numero_serie_bien == '' ||
              element.numero_serie_bien == null
            ) {
              $('#serie').text('S/N')
            } else {
              $('#serie').text(element.numero_serie_bien)
            }
            $('#grupoBien').text(element.grupo_bien_d)
            $('#claseBien').text(element.clase_bien_d)
            $('#familiaBien').text(element.familia_bien_d)
            $('#catalogoBien').text(element.catalogo_bien_d)
            $('#dependencia').text(element.dependencia_d)
            $('#ubicacionFisica').text(element.ubicacion_fisica_d)
            $('#tipoPatrimonio')
              .text(element.tipo_patrimonio_d)
              .css('text-transform', 'uppercase')
            if (element.observaciones == '' || element.observaciones == null) {
              $('#observaciones').text('S/O')
            } else {
              $('#observaciones').text(element.observaciones)
            }
            if (
              element.caracteristicas == '' ||
              element.caracteristicas == null
            ) {
              $('#caracteristicas').text('S/C')
            } else {
              $('#caracteristicas').text(element.caracteristicas)
            }

            if (element.medidas == '' || element.medidas == null) {
              $('#medidas').text('S/M')
            } else {
              $('#medidas').text(element.medidas)
            }
          })

          // Limpiar contenedor
          $('.photo-bottom').empty()

          // Mostrar las imágenes
          const images = data[1]
          let firstImageUrl = ''

          images.forEach((element, index) => {
            const imgUrl =
              'http://10.31.1.7/drasuite/app/img/bienes_patrimoniales/' +
              element.imagen
            $('.photo-bottom').append(
              `<img src="${imgUrl}" alt="" class="img-fluid" />`
            )
            if (index === 0) {
              firstImageUrl = imgUrl
            }
          })

          // Fijar la primera imagen
          if (firstImageUrl) {
            $('#imgFijo').attr('src', firstImageUrl)
            $('.img-fluid:first').addClass('active-image')
          }

          // Cambiar imagen fijada
          $('.img-fluid').on('click', function () {
            $('.img-fluid').removeClass('active-image')
            $(this).addClass('active-image')
            const src = $(this).attr('src')
            $('#imgFijo').attr('src', src)
          })
        },
        error: function (err) {
          console.log(err)
        }
      })
    }

    // Listado de bienes
    $.ajax({
      url: 'app/ajax/consulta.php',
      method: 'POST',
      data: { id: value },
      success: function (data) {
        data = JSON.parse(data)
        var totalBienes = 0
        var empleado = data[1][0].empleado
        $('#empleado').text(empleado)

        $('.list-bienes').empty()

        data[0].forEach((element) => {
          var modelo = element.modelo_ajustado
          var serie = element.numero_serie_bien
          if (serie == null || serie == '' || serie == 'null') {
            serie = 'S/N'
          }
          if (modelo == null || modelo == '' || modelo == 'null') {
            modelo = 'S/M'
          }
          // Cargar bienes
          $('.list-bienes').append(
            `<li class="nav-item" id="${element.codigo_patrimonial}">
               <p>${element.nombre_bien_ajustado}<br />
               <span class="subtitle-bien"><strong>MARCA:</strong> <em> ${element.marca_d}</em> | <strong>MODELO:</strong> <em>${modelo}</em> | <strong>SERIE:</strong> <em>${serie}</em>
               | <strong>CÓDIGO:</strong> <em>${element.codigo_patrimonial}</em>
               </span></p>
             </li>`
          )
          totalBienes = totalBienes + 1
        })

        // Total de bienes
        $('#totalBienes').text(totalBienes)
        // Item activo
        const firstItem = $('.list-bienes li:first')
        firstItem.addClass('active')

        // Cargar detalles
        const firstCode = firstItem.attr('id')
        cargarBienesDetalle(firstCode)

        // Active para li
        $('.list-bienes li').on('click', function () {
          $('.list-bienes li').removeClass('active')
          $(this).addClass('active')

          // Cargar detalles
          const code = $(this).attr('id')
          cargarBienesDetalle(code)
        })
      },
      error: function (err) {
        console.log(err)
      }
    })
  })

  $('#search').on('keyup', function () {
    var value = $(this).val().toLowerCase()
    $('.list-bienes li').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
})
