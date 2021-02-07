    let map, infoWindow;
 
    // ABRIR O MAPA
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
        center:  {lat: -34.397, lng: 150.644 },
        zoom: 2,
    });
    
    // CRIAÇÃO DA JANELA DE INFORMAÇÃO DO MAPA
    infoWindow = new google.maps.InfoWindow();

    // ADQUIRIR A LOCALIZAÇÃO ATUAL DO USUÁRIO
    navigator.geolocation.getCurrentPosition(
    (position) => {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

    // SETAR A POSIÇÃO DA JANELA DE INFORMAÇÃO DO MAPA
    infoWindow.setPosition(pos);

    // SETAR O CONTEÚDO DA JANELA DE INFORMAÇÃO DO MAPA
    infoWindow.setContent("Você está aqui!");

    // FUNÇÃO PARA FECHAR A JANELA DE INFORMAÇÃO APÓS 5 SEGUNDOS 
    setTimeout(function () { infoWindow.close(); }, 5000);

    // ABRIR A JANELA DE INFORMAÇÃO NO MAPA E CENTRALIZÁ-LA NA POSIÇÃO DE ONDE O USUÁRIO ESTÁ
    infoWindow.open(map);
    map.setCenter(pos);
      
    // PEGAR UMA IMAGEM DE UM MARCADOR NO LINK E INSERIR A COR VERDE DELE
    const pinColor = "00FF00";
    const pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
    );
      
    // POSIÇÃO ATUAL DE ONDE O USUÁRIO ESTÁ
    const markerActual = new google.maps.Marker({
        position: pos,
        map: map,
        title: "Você está aqui",
        icon: pinImage,
        animation: google.maps.Animation.DROP,
    })
  })  

    // BOTÂO DE INSERIR MARCADOR NO MAPA
    const locationButton = document.getElementById("btConsult");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
  
    insertMark();
    getInfoFromDb();
    }

    // FUNÇÃO PARA ADQUIRIR O RETORNO DAS INFORMAÇÕES DO BANCO DE DADOS
    function getInfoFromDb(){
        $.ajax({
        url: '../back-end/select.php',
        method: 'GET',
        dataType: 'json',
    success: function(data){
        takeData(data);
        for (let i = 0; i < data.length; i++) {
        const descriptionSelect = data[i].descricao;
        
        const latitudeSelect = parseFloat(data[i].latitude);
        
        const longitudeSelect = parseFloat(data[i].longitude);
        
        const pos = new google.maps.LatLng(latitudeSelect, longitudeSelect);

        const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

        const contentInfoWindow = 

            `<div style = "font-weight: bold;">${descriptionSelect}</div>`          +
            `<div><b style = "font-weight: bold;">Lat:</b> ${latitudeSelect}</div>` +
            `<div><b style = "font-weight: bold;">Lng: </b>${longitudeSelect}</div>`;
        
        // CRIAÇÃO DE UMA JANELA DE INFORMAÇÃO PARA OS MARCADORES
        const infowindow = new google.maps.InfoWindow({
            content: contentInfoWindow,
        });

        // CRIAÇÃO DO MARCADOR NO MAPA
        const mark = new google.maps.Marker({
            position: pos,
            map: map,
            title: descriptionSelect,
            icon: image,
            animation: google.maps.Animation.DROP,
        });
       
        // FUNÇÃO DE QUANDO O MOUSE PASSAR POR CIMA DE UM MARCADOR, ABRIR A JANELA DE 
        // INFORMAÇÃO APRESENTANDO INFORMAÇÕES DO MARCADOR
        mark.addListener("mouseover", () => {
            infowindow.open(map, mark);
        });

        // FUNÇÃO DE QUANDO O MOUSE NÃO ESTIVER MAIS EM CIMA DO MARCADOR, FECHAR A JANELA DE INFO.
        mark.addListener("mouseout", () => {
            infowindow.close();
        });

        // FUNÇÃO DE QUANDO O MARCADOR RECEBER UM CLIQUE, ELE TERÁ UMA ANIMAÇÃO DE PULO
        mark.addListener("click", () => {
            mark.setAnimation(google.maps.Animation.BOUNCE);
            mark.setAnimation(null)
        });
      }
    }
  })
}

    // FUNÇÃO DE PEGAR DADOS DO BACK-END PELO AJAX DA FUNÇÃO getInfoFromDb() PARA INSERIR NO 
    // APPEND
    function takeData(informations){
        for (let i = 0; i < informations.length; i++) {
        const idSelectForAppend = informations[i].id;
          
        const descriptionSelectForAppend = informations[i].descricao;
          
        const latitudeSelectForAppend = parseFloat(informations[i].latitude);
          
        const longitudeSelectForAppend = parseFloat(informations[i].longitude);

        $('#descriptions').append(
        '<div id="divConsult">'                                                                     + 
            '<strong>'                                                                              + 
                descriptionSelectForAppend                                                          + 
            '</strong>'                                                                             +  
        '</div>'                                                                                    +

        '<div id="twoIcons">'                                                                       +
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="btSearchAppend" onclick="searchMap(${latitudeSelectForAppend}, ${longitudeSelectForAppend})" data-toggle="tooltip" title="Buscar Item" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">`                                                    +
                '<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>'                                                                                                                  +
            '</svg>'                                                                                +
            
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="btDeleteAppend" onclick="deleteCons(${idSelectForAppend})" data-dismiss="modal" data-toggle="tooltip" title="Excluir Item" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" >`                                                           +
                '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>' +
            '</svg>'                                                                                + 
        '</div>'                                                                                    +
        
        '<hr id="lineModal">'
        );
      }
      if($("#descriptions").children().length == 0){
          return $('#descriptions').append('<h2>Não há itens cadastrados no momento, cadastre-os para que apareçam aqui.</h2>')
      }
    }
     
    // FUNÇÃO DE ABRIR O MODAL DE CONFIRMAÇÃO PARA CADASTRAR NOVOS ITENS
    function insertMark(){
        map.addListener("click", (mapsMouseEvent) => {
            localization = mapsMouseEvent.latLng;
            $('#modalConfirm').modal('show');
            })
    }

    // FUNÇÃO DE QUANDO O BOTÃO DE CONFIRMAR DE CADASTRAR UM ITEM FOR ACIONADO
    // MOSTRAR O MODAL DE INSERIR ITEM
    $("#btConfirm").click(function(e) {
        e.preventDefault();
        $('#modalInsert').modal('show');
    })
    
    //FUNÇÃO DE ENVIAR DADOS AO BACK-END PARA SALVAR NO BANCO DE DADOS
    $("#save").click(function( event ) {
        event.preventDefault();

        const descriptionValue = ($("#inputDescription").val());
        
        if(descriptionValue == ''){
            alert("Precisa-se de no mínimo um caráctere para salvar!");
            return ;
        }

        const lugar = localization.toString();

        const variavel = lugar.split(",");

        const latitude = variavel[0];

        const latitudeFinal = latitude.substr(1);

        const longitude = variavel[1];

        const longitudeFinal = longitude.substr(0, longitude.length - 1);
        
      $.ajax({
          type: "POST",
          url: '../back-end/insert.php',
          data: {
          descricao: descriptionValue,
          latitude: latitudeFinal,
          longitude: longitudeFinal},
      });

          $('#inputDescription').val('');

          $('#modalInsert').modal('hide');

          return location.reload();
      });


    // FUNÇÃO DE DELETAR UM ITEM
    function deleteCons(id){
        const idToDelete = id;

        $("#modalConfirmDelete").modal('show');

        $("#btConfirmDelete").click(function(e) {
            e.preventDefault();
        $.ajax({
            type: "POST",
            url: '../back-end/delete.php',
            data: {id: idToDelete},
        })
        return location.reload();
      })
    }

    // FUNÇÃO DE POSICIONAR O MAPA SOBRE A COORDENADA DO ITEM SALVO
    function searchMap(lati, long){
        const positionClicked = new google.maps.LatLng(lati, long);
        map.setCenter(positionClicked);
        map.setZoom(6);
        $('#modalConsult').modal('hide');
    }
    
    // FUNÇÃO PARA ABRIR O MODAL DE CONSULTA DE ITENS
    function btConsult(){
        $("#modalConsult").modal('show');
    }
    
    $("#cancel").click(function(e) {
        e.preventDefault();
        ($("#inputDescription").val(''));
    })

    $("#X").click(function(e) {
        e.preventDefault();
        ($("#inputDescription").val(''));
    })


   
