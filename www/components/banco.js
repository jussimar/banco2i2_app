// This is a JavaScript file

$(document).on("click","#cadastrar",function(){
    var parametros = {
        "nome": $("#nome").val(),
        "email": $("#email").val()
    };

    $.ajax({
        type:"post", //como enviar
        url:"https://crur3i2-jussimar.c9users.io/cadastra.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            $("#nome").val("");
            $("#email").val("");

        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});

$(document).on("click","#listar",function(){
    $(location).attr("href","lista.html");
});

function listarPessoas(){
   $.ajax({
        type:"post", //como enviar
        url:"https://crur3i2-jussimar.c9users.io/listar.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.pessoas,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>"; 
            });
        $("#lista").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
}

$(document).on("change","#lista",function(){
    var codigoescolhido = $("option:selected", ("#lista")).val();
    $.ajax({
        type:"get", //como enviar
        url:"https://crur3i2-jussimar.c9users.io/listar-um.php",//para onde enviar
        data:"id="+codigoescolhido,
        dataType:"json",
        //se der certo
        success: function(data){
            $("#codigo").val(data.pessoas.codigo);
            $("#nome").val(data.pessoas.nome);
            $("#email").val(data.pessoas.email);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
}); 

$(document).on("click","#excluir",function(){
    $.ajax({
        type:"get", //como enviar
        url:"https://crur3i2-jussimar.c9users.io/deleta.php",//para onde enviar
        data:"id="+$("#codigo").val(),
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();//recarrega a pagina
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});
$(document).on("click","#salvar",function(){
   var parametros = {
        "codigo": $("#codigo").val(),
        "nome": $("#nome").val(),
        "email": $("#email").val()
    };

    $.ajax({
        type:"post", //como enviar
        url:"https://crur3i2-jussimar.c9users.io/update.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});
function habilita(){
  $("#nome").prop("readonly",false);
  $("#email").prop("readonly",false);
}
function desabilita(){
  $("#nome").prop("readonly",true);
  $("#email").prop("readonly",true);
}

$(document).on("click","#editar",function(){
  habilita();
});

$(document).on("click","#cancelar",function(){
  desabilita();
});