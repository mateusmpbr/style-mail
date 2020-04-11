var myEditor;

ClassicEditor
    .create( document.querySelector( '#editor' ) )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
        myEditor = editor;
    } )
    .catch( err => {
        console.error( err.stack );
    } );



$('#botao-submit').bind('click', function(e){
    
    e.preventDefault();

    var dados = {
        "email_remetente": $('#email_remetente').val(),
        "senha_remetente": $('#senha_remetente').val(),
        "email_destinatario": $('#email_destinatario').val(),
        "assunto": $('#assunto').val(),
        "mensagem": myEditor.getData()
    }


    var xhr = new XMLHttpRequest();
    var url = "mailer.php";
    xhr.open("post", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    $('body').addClass("loading")

    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            
            var response = xhr.responseText;
            
            if(response){
                alert("Mensagem enviada com sucesso!");
            }else{
                alert("Não foi possível completar o envio da mensagem, tente novamente.");
            }

            $('body').removeClass("loading")

        }
    }

    xhr.send(JSON.stringify(dados));

})