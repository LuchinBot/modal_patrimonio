$(document).ready(function () {
  $('#searchBtn').click(function () {
    var value = $('#dni').val()
    // obtener datos por ajax
    $.ajax({
      url: 'app/ajax/consulta.php',
      method: 'POST',
      data: { id: value },
      success: function (data) {
        //console.log(data)
        // recorrer data
        data = JSON.parse(data)
        data.forEach((element) => {
          $('.list-bienes').append(
            '<li class="nav-item" id="' +
              element.codigo_patrimonial +
              '"><p>' +
              element.nombre_bien_ajustado +
              '<br /><span class="subtitle-bien">' +
              element.marca_d +
              ' | ' +
              element.modelo_ajustado +
              ' | ' +
              element.numero_serie_bien +
              '</span></p></li>'
          )
        })
        $('.list-bienes li:first').addClass('active')
        $('.list-bienes li').on('click', function () {
          console.log('click')
          $('.list-bienes li').removeClass('active')
          $(this).addClass('active')
        })
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
