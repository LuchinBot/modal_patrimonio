$(document).ready(function () {
  // Cargar detalles de bienes
  function cargarBienesDetalle(code) {
    const url = 'app/ajax/modal.php'

    $.ajax({
      url: url,
      method: 'POST',
      data: { id: code },
      success: function (data) {
        const parsedData = JSON.parse(data)
        const bien = parsedData[0]
        const images = parsedData[1]

        if (bien.length) {
          // Actualizar los detalles del bien
          const bienInfo = bien[0]

          $('#bienPatrimonial').text(bienInfo.nombre_bien_ajustado || 'N/A')
          $('#centroCosto').text(bienInfo.dependencia_d || 'N/A')
          $('#codigoPatrimonial').text(bienInfo.codigo_patrimonial || 'N/A')
          $('#marca').text(bienInfo.marca_d || 'N/A')
          $('#modelo').text(bienInfo.modelo_ajustado || 'S/M')
          $('#serie').text(bienInfo.numero_serie_bien || 'S/N')
          $('#grupoBien').text(bienInfo.grupo_bien_d || 'N/A')
          $('#claseBien').text(bienInfo.clase_bien_d || 'N/A')
          $('#familiaBien').text(bienInfo.familia_bien_d || 'N/A')
          $('#catalogoBien').text(bienInfo.catalogo_bien_d || 'N/A')
          $('#dependencia').text(bienInfo.dependencia_d || 'N/A')
          $('#ubicacionFisica').text(bienInfo.ubicacion_fisica_d || 'N/A')
          $('#tipoPatrimonio').text(
            (bienInfo.tipo_patrimonio_d || 'N/A').toUpperCase()
          )
          $('#observaciones').text(bienInfo.observaciones || 'S/O')
          $('#caracteristicas').text(bienInfo.caracteristicas || 'S/C')
          $('#medidas').text(bienInfo.medidas || 'S/M')

          // Limpiar contenedor de fotos
          $('.photo-bottom').empty()

          if (images.length) {
            let firstImageUrl = ''

            images.forEach((imgData, index) => {
              const imgUrl = `http://10.31.1.7/drasuite/app/img/bienes_patrimoniales/${imgData.imagen}`
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

            // Cambiar imagen fijada al hacer clic
            $('.img-fluid').on('click', function () {
              $('.img-fluid').removeClass('active-image')
              $(this).addClass('active-image')
              $('#imgFijo').attr('src', $(this).attr('src'))
            })
          }
        }
      },
      error: function (err) {
        console.error('Error al cargar los detalles del bien:', err)
      }
    })
  }

  // Listar bienes
  function listarBienes(value) {
    $.ajax({
      url: 'app/ajax/consulta.php',
      method: 'POST',
      data: { id: value },
      success: function (data) {
        const parsedData = JSON.parse(data)

        if (!parsedData[1].length) {
          Swal.fire({
            title: '¡No encontrado!',
            text: 'El DNI no cuenta con bienes registrados',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          })
          return
        }

        // Mostrar el modal
        $('#detailModal').addClass('show').css('display', 'block')

        // Actualizar información del empleado
        const empleadoData = parsedData[1][0]
        $('#empleado').text(empleadoData.empleado)
        $('#foto').attr(
          'src',
          `http://10.31.1.7/drasuite/app/img/persona_natural/${empleadoData.foto}`
        )

        // Listar los bienes
        $('.list-bienes').empty()
        let totalBienes = 0

        parsedData[0].forEach((bien) => {
          const modelo = bien.modelo_ajustado || 'S/M'
          const serie = bien.numero_serie_bien || 'S/N'

          $('.list-bienes').append(
            `<li class="nav-item" id="${bien.codigo_patrimonial}">
               <p>${bien.nombre_bien_ajustado}<br />
               <span class="subtitle-bien">
                 <strong>MARCA:</strong> <em>${bien.marca_d}</em> | 
                 <strong>MODELO:</strong> <em>${modelo}</em> | 
                 <strong>SERIE:</strong> <em>${serie}</em> | 
                 <strong>CÓDIGO:</strong> <em>${bien.codigo_patrimonial}</em>
               </span></p>
             </li>`
          )
          totalBienes++
        })

        $('#totalBienes').text(totalBienes)

        // Cargar detalles del primer bien
        const firstItem = $('.list-bienes li:first').addClass('active')
        cargarBienesDetalle(firstItem.attr('id'))

        $('.list-bienes li').on('click', function () {
          $('.list-bienes li').removeClass('active')
          $(this).addClass('active')
          cargarBienesDetalle($(this).attr('id'))
        })
      },
      error: function (err) {
        console.error('Error al listar los bienes:', err)
      }
    })
  }

  // Funciones para obtener la lista de bienes
  function manejarBienes() {
    const value = $('#dni').val().trim()
    if (value) {
      listarBienes(value)
    } else {
      console.log('Por favor, ingrese un DNI válido.')
    }
  }

  $('#dni').on('keyup', function (e) {
    if (e.key === 'Enter') {
      manejarBienes()
    }
  })

  $('#searchBtn').click(function () {
    manejarBienes()
  })

  // Filtro en tiempo real
  $('#search').on('keyup', function () {
    const value = $(this).val().toLowerCase()
    $('.list-bienes li').filter(function () {
      $(this).toggle($(this).text().toLowerCase().includes(value))
    })
  })

  // Cerrar el modal
  $('#closeModal').on('click', function () {
    $('#detailModal').removeClass('show').css('display', 'none')
  })
})
