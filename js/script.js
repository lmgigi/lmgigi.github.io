var products=[
  {name: "濃縮咖啡", price: 90},
  {name: "美式咖啡", price: 100},
  {name: "拿鐵", price: 120},
  {name: "卡布奇諾", price: 120},
  {name: "摩卡咖啡", price: 150},
  {name: "巴斯克蛋糕", price: 150},
  {name: "布朗尼蛋糕", price: 170},
  {name: "司康", price: 60},
  {name: "檸檬糖霜海綿蛋糕", price: 100},
  {name: "手作餅乾", price: 100},
];

var menu_html="<li id={{id}} class='item'>{{name}}<div class='price'>{{price}}</div><div prodid={{prodid}} class='add_btn'>+</div></li>";

var buylist_html="<li class='buy_item'>{{name}}<div class='price'>{{price}}</div><div id={{del_id}} data-del-id='{{delid}}' class='dlt_btn'>x</div></li>";

var total_html="<li class='buy_item total'>total<div class='price'>{{total_price}}</div></li>";

var check_button_html="<li class='buy_item total'>total<div class='price'>{{total_price}}</div></li>";

var buylist=[];

var page=0;

$("#menu_button1").click(
function(){
  $(".pages").css("left", "");
}
);

$("#menu_button2").click(
function(){
  $(".pages").css("left", "-100%");
}
);

function showlist(){
  $("#item_list").html("");
  for(var i=0;i<products.length/2;i++){
    var item= products[i];
    var current_menu_html=
        menu_html.replace("{{name}}",products[i].name)
                 .replace("{{price}}",products[i].price)
                 .replace("{{id}}",i)
                 .replace("{{prodid}}",i);
    $("#item_list").append(current_menu_html);
  }
  $("#item_list_2").html("");
  for(var i=5;i<products.length;i++){
    var item= products[i];
    var current_menu_html=
        menu_html.replace("{{name}}",products[i].name)
                 .replace("{{price}}",products[i].price)
                 .replace("{{id}}",i)
                 .replace("{{prodid}}",i);
    $("#item_list_2").append(current_menu_html);
  }
}

showlist();

function show_buylist(){
  $(".cart").html("");
  var total_price=0;
  for(var i=0;i<buylist.length;i++){
    var del_item_id="del_buyitem_"+i;
    var current_buyitem=buylist[i];
    var current_buylist_html=
        buylist_html.replace("{{name}}",buylist[i].name)
                    .replace("{{price}}",buylist[i].price)
                    .replace("{{del_id}}",del_item_id)
                    .replace("{{delid}}",i);
    total_price+=parseInt(current_buyitem.price);
    $(".cart").append(current_buylist_html);
  }
  $(".dlt_btn").click(
    function(){
      remove_item(parseInt($(this).attr("data-del-id")));
    }
    );
  var current_total_html=
      total_html.replace("{{total_price}}",total_price);
  $(".cart").append(current_total_html);
}

$(".add_btn").click(
  function(){
    var select_item=$(this).attr("prodid");
    buylist.push({
        name: products[select_item].name,
        price: products[select_item].price
      });
    show_buylist();
  }
);

function remove_item(id){
  buylist.splice(id,1);
  show_buylist();
}