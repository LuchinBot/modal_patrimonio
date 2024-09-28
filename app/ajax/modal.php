<?php
include '../database/config.php';
if(isset($_POST['id'])){
    $id = $_POST['id'];

    $mysql = $db->prepare(
        'SELECT  
        nombre_bien_ajustado,
        codigo_patrimonial,
        ma.descripcion as marca_d,
        modelo_ajustado,
        numero_serie_bien,
        gb.descripcion as grupo_bien_d,
        cb.descripcion as clase_bien_d,
        fb.descripcion as familia_bien_d,
        cab.nombre as catalogo_bien_d,
        d.descripcion as dependencia_d,
        uf.descripcion as ubicacion_fisica_d
        ,tp.descripcion as tipo_patrimonio_d,
        caracteristicas, observaciones
        FROM asignaciones_bien AS b 
        LEFT JOIN marca_bien AS ma ON ma.codmarca_bien=b.codmarca_bien
        LEFT JOIN grupo_bien AS gb ON gb.codgrupo_bien = b.codgrupo_bien
        LEFT JOIN clase_bien AS cb ON cb.codclase_bien = b.codclase_bien
        LEFT JOIN familia_bien AS fb ON fb.codfamilia_bien = b.codfamilia_bien
        LEFT JOIN catalogo_bien AS cab ON cab.codcatalogo_bien = b.codcatalogo_bien
        LEFT JOIN dependencia AS d ON d.coddependencia = b.coddependencia
        LEFT JOIN ubicacion_fisica AS uf ON uf.codubicacion_fisica = b.codubicacion_fisica
        LEFT JOIN tipo_patrimonio AS tp ON tp.codtipo_patrimonio = b.codtipo_patrimonio
        WHERE b.codigo_patrimonial = ? ');
    $result1 = $mysql->execute(array($id));
    $result1 = $mysql->fetchAll(PDO::FETCH_ASSOC);

    // Obtener fotos de la galeria
    $mysql = $db->prepare(
        'SELECT  *
        FROM asignaciones_bien AS b 
        LEFT JOIN galeria_asignaciones_bien AS ga ON ga.codasignaciones_bien=b.codasignaciones_bien
        WHERE b.codigo_patrimonial = ? ');
    $result2 = $mysql->execute(array($id));
    $result2 = $mysql->fetchAll(PDO::FETCH_OBJ);

    echo json_encode(array($result1, $result2));
    //var_dump($result1, $result2);
}