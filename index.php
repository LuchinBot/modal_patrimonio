<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Icon -->
  <link rel="icon" type="image/png" href="src/img/icon_drasuite.png" />
  <title>Consultas en Línea - Dirección Regional de Agricultura</title>
  <!-- Stylesheet -->
  <link rel="stylesheet" href="src/css/styles.css" />
  <link rel="stylesheet" href="src/css/scroll.css" />
  <link rel="stylesheet" href="src/css/responsive.css" />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous" />
  <link rel="stylesheet" href="src/plugins/fontawesome/css/fontawesome.min.css?v=<?= rand(); ?>">
  <link rel="stylesheet" href="src/plugins/fontawesome/css/all.min.css?v=<?= rand(); ?>">
  <link rel="stylesheet" href="src/plugins/fontawesome/css/solid.min.css?v=<?= rand(); ?>">
  <link rel="stylesheet" href="src/plugins/fontawesome/css/brands.min.css?v=<?= rand(); ?>">
</head>

<body style="background-image: url('src/img/fondo.jpg'); height: 100vh !important;
">
  <div class="main-container">
    <!-- Contenedor del formulario -->
    <div class="container-wrapp">
      <div class="base-img1">
        <img src="src/img/body.png" alt="" class="img1" />
      </div>
      <div class="form-container">
        <div class="logo">
          <img src="src/img/control_patrimonial.png" alt="Trámite Logo" />
        </div>
        <div class="information">
          <span class="info"><i class="fas fa-info-circle"></i></span>
          <p>
            ¿Quieres saber si tienes bienes asignados a tu nombre? Consulta
            con sólo ingresar tu <strong class="fw-bold">DNI</strong>.
          </p>
        </div>
        <div class="form">
          <input
            type="text"
            id="dni"
            class="form-control mb-1"
            placeholder="Digite su número de DNI"
            maxlength="8"
            pattern="\d{8}"
            title="Debe ingresar 8 dígitos"
            required />
          <div class="search">
            <button
              id="searchBtn"
              type="button"
              class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div class="footer">
          <p>© Área de Tecnologías de la Información</p>
        </div>
      </div>
      <div class="base-img2">
        <img src="src/img/thousand.png" alt="" class="img1" />
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="detailModal"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <div class="base-title px-2">
            <div class="base-profile me-2">
              <img src="src/img/boy.png" id="foto" alt="" />
            </div>
            <p class="m-0 p-0 text-white">
              Hola <strong id="empleado">Luis José</strong>, tienes un total de
              <strong id="totalBienes">100</strong> bienes patrimoniales
            </p>
          </div>
          <button
            type="button"
            class="btn-close me-2 bg-white" id="closeModal"></button>
        </div>
        <div class="modal-body bg-white">
          <!--Search and List-->
          <div class="row p-2 section-bienes">
            <div class="col-md-6 col-bienes">
              <input
                type="text"
                class="form-control search mb-2 px-0"
                placeholder="Buscar por caracteristica del bien..."
                id="search" />
              <ul class="list-bienes my-3">
                <!--<li class="nav-item" id="">
                    <p>
                      Unidad de Alimentación Ininterrumpida [ 462200500066]
                      <br />
                      <span class="subtitle-bien">
                        Marca: PANASONIC | Modelo: SPE | serie:
                        462200500066</span
                      >
                    </p>
                  </li>-->
              </ul>
            </div>
            <div class="col-md-6 p-0 col-bienes-2">

              <div class="detail-bien">
                <div class="d-flex detail-info">
                  <span class="info"><i class="fas fa-info-circle"></i></span>

                  <p class="m-0 px-3 py-2 bg-info">
                    Información proporcionada o migrada del <strong class="fw-bold">S.I.G.A</strong>. Las altas, bajas y/o modificación de bienes patrimoniales es un procedimiento exclusivo del <strong class="fw-bold">Área de Control Patrimonial</strong>.
                  </p>
                </div>
                <div class="row detail px-4">
                  <div class="col-md-6 py-2">
                    <div class="mb-1 border-bottom">
                      <label>Bien Patrimonial</label>
                      <p id="bienPatrimonial"></p>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Centro de Costo</label>
                      <p id="centroCosto"></p>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Ubicación Física</label>
                      <p id="ubicacionFisica"></p>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Familia Bien</label>
                      <p id="familiaBien"></p>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Grupo Bien</label>
                      <p id="grupoBien"></p>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Clase Bien</label>
                      <p id="claseBien"></p>
                    </div>

                  </div>
                  <div class="col-md-6 py-2">
                    <div class="mb-1 border-bottom">
                      <label>Código Patrimonial</label>
                      <p id="codigoPatrimonial"></p>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Tipo Patrimonial</label>
                      <p id="tipoPatrimonio"></p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="mb-1 border-bottom">
                        <label>Marca</label>
                        <p id="marca"></p>
                      </div>
                      <div class="mb-1 border-bottom">
                        <label>Modelo</label>
                        <p id="modelo"></p>
                      </div>
                      <div class="mb-1 border-bottom">
                        <label>Serie</label>
                        <p id="serie"></p>
                      </div>
                    </div>
                    <div class="mb-1 border-bottom">
                      <label>Medidas</label>
                      <p id="medidas"></p>
                    </div>
                    <div class="mb-1">
                      <label>caracteristicas</label>
                      <p id="caracteristicas">-------</p>
                    </div>
                    <div class="mb-1">
                      <label>Observaciones</label>
                      <p id="observaciones"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="photos-bien">
                <div class="photo-top">
                  <div class="photo">
                    <img src="" id="imgFijo" alt="">
                  </div>
                </div>
                <div class="photo-bottom">
                  <!-- Fotos -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
  <script
    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
    integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
    crossorigin="anonymous"></script>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
    crossorigin="anonymous"></script>
  <script
    src="https://code.jquery.com/jquery-3.7.1.js"
    integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="src/js/modal.js"></script>
</body>

</html>