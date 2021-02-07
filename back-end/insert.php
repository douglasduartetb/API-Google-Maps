<?php
 
  //O TIPO DE CONTEÚDO É JSON
  header('Content-type: application/json');

  // CONEXÃO COM O BANCO DE DADOS EM PDO
  try{
      $pdo = new PDO('mysql:host=localhost; dbname=projectMap;', 'root', '');
  }catch (PDOException $erro) {
      echo "Erro: ".$erro->getMessage();
  }

  // INSERÇÃO NO BANCO DE DADOS COM OS VALORES RECEBIDOS DO JAVASCRIPT
  try{
      $stmt = $pdo->prepare('INSERT INTO map (descricao, latitude, longitude) 
      VALUES(:des, :lat, :lng)');

      $descriptionReceived = $_POST['descricao'];

      $latitudeReceived = $_POST['latitude'];

      $longitudeReceived = $_POST['longitude'];

      $stmt->bindValue(':des', $descriptionReceived);

      $stmt->bindValue(':lat', $latitudeReceived);

      $stmt->bindValue(':lng', $longitudeReceived);
      
      $stmt->execute();

  // VERIFICAÇÃO PARA VER SE A INSERÇÃO FOI BEM-SUCEDIDA OU NÃO
  if($stmt->rowCount() >= 1){
    echo json_encode('Inserção inserida com sucesso!');
  }

  if($stmt->rowCount() <= 0){
    echo json_encode('Falha ao enviar dados!');
  }

}catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
}

?>