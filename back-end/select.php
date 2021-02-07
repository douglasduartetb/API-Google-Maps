<?php

  //O TIPO DE CONTEÚDO É JSON
  header('Content-type: application/json');
 
  // CONEXÃO COM O BANCO DE DADOS EM PDO
  try{
      $pdo = new PDO('mysql:host=localhost; dbname=projectMap;', 'root', '');
  }catch (PDOException $erro) {
      echo "Erro: ".$erro->getMessage();
  }

  // SELECT NO BANCO DE DADOS PARA DAR RETORNO NO JAVASCRIPT
  try{
      $stmt = $pdo->prepare('SELECT id, descricao, latitude, longitude FROM map');

      $stmt->execute();
      
      echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

  }catch (PDOException $erro) {
      echo "Erro: ".$erro->getMessage();
  }

?>