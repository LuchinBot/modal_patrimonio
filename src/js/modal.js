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
            $('#modelo').text(element.modelo_ajustado)
            $('#serie').text(element.numero_serie_bien)
            $('#grupoBien').text(element.grupo_bien_d)
            $('#claseBien').text(element.clase_bien_d)
            $('#familiaBien').text(element.familia_bien_d)
            $('#catalogoBien').text(element.catalogo_bien_d)
            $('#dependencia').text(element.dependencia_d)
            $('#ubicacionFisica').text(element.ubicacion_fisica_d)
            $('#tipoPatrimonio').text(element.tipo_patrimonio_d)
            $('#caracteristicas').text(element.caracteristicas)
            $('#observaciones').text(element.observaciones)
          })
          console.log(data)

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
        // Limpiar listado
        $('.list-bienes').empty()

        data.forEach((element) => {
          $('.list-bienes').append(
            `<li class="nav-item" id="${element.codigo_patrimonial}">
               <p>${element.nombre_bien_ajustado}<br />
               <span class="subtitle-bien">${element.marca_d} | ${element.modelo_ajustado} | ${element.numero_serie_bien}</span></p>
             </li>`
          )
        })

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
