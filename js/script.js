var myEditor;

ClassicEditor
.create( document.querySelector( '#editor' ), {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            'alignment',
            '|',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    },
    language: 'pt-br',
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
} )
.then( editor => {
    // Tentar tirar window.editor
    window.editor = editor;
    myEditor = editor;
} )
.catch( error => {
    console.error( error );
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
                $('#corpo_modal').html('Não foi possível enviar a mensagem. Verifique se o seu endereço de e-mail é suportado e caso seja suportado, forneça permissão de acesso ao nosso sistema a partir da sua caixa de entrada e tente novamente.');
            }

            $('body').removeClass("active-loading")
            $('#modal').modal('show');
        }
    }


    xhr.send(JSON.stringify(dados));

})