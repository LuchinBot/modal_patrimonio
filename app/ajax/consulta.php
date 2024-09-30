<?php
include '../database/config.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $mysql = $db->prepare(
        'SELECT  
        nombre_bien_ajustado,
        codigo_patrimonial,
        ma.descripcion as marca_d,
        modelo_ajustado,
        numero_serie_bien
        FROM asignaciones_bien AS b 
        INNER JOIN empleado AS e ON e.codempleado = b.codempleado
        INNER JOIN persona_natural AS pn ON pn.codpersona_natural = e.codpersona_natural 
        INNER JOIN marca_bien AS ma ON ma.codmarca_bien=b.codmarca_bien
        WHERE pn.numero_documento_identidad = ? '
    );
    $result = $mysql->execute(array($id));
    $result = $mysql->fetchAll(PDO::FETCH_OBJ);

    // Obtener el nombre del persona natural
    $mysql = $db->prepare(
        'SELECT nombres as empleado
         FROM persona_natural 
         WHERE numero_documento_identidad = ? '
    );
    $result2 = $mysql->execute(array($id));
    $result2 = $mysql->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array($result, $result2));
}
