var myEditor;

ClassicEditor
    .create( document.querySelector( '#editor' ),{
        toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'indent','outdent', '|',
            'mediaEmbed', 'undo', 'redo'
        ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Parágrafo', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Título 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Título 2', class: 'ck-heading_heading2' }
            ]
        }
    } )
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

    $('body').addClass("active-loading")

    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            
            var response = xhr.responseText;
            
            console.log(response);

            if(response && response != "Mensagem não pôde ser enviada."){
                $('#titulo_modal').html('Tudo certo!');
                $('#corpo_modal').html('Mensagem enviada com sucesso!');
            }else{
                $('#titulo_modal').html('Ah, não!');
                $('#corpo_modal').html('Não foi possível enviar a mensagem. Verifique se o seu endereço de e-mail é suportado e tente novamente.');
            }

            $('body').removeClass("active-loading")
            $('#modal').modal('show');
        }
    }


    xhr.send(JSON.stringify(dados));

})