<?php

  //O TIPO DE CONTEÚDO É JSON
  header('Content-type: application/json');
 
  // CONEXÃO COM O BANCO DE DADOS EM PDO
  try{
      $pdo = new PDO('mysql:host=localhost; dbname=projectMap;', 'root', '');
  }catch (PDOException $erro) {
      echo "Erro: ".$erro->getMessage();
  }

  // DELETAR O ID QUE VEIO DO JAVASCRIPT NO BANCO DE DADOS
  try{
      $sql = "DELETE FROM map WHERE id =  :id";

      $stmt = $pdo->prepare($sql);

      $stmt->bindParam(':id', $_POST['id'], PDO::PARAM_INT);   
      
      $stmt->execute();

  // VERIFICAÇÃO PARA VER SE A EXCLUSÃO FOI BEM-SUCEDIDA OU NÃO
  if($stmt->rowCount() >= 1){
    echo json_encode('Marcador excluído com sucesso!');
  }

  if($stmt->rowCount() <= 0){
    echo json_encode('Falha ao enviar dados!!!');
  }

}catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
}

?>