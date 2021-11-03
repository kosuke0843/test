
function SearchItem(){
 
  let word = search_form.search_word.value;  //テキストエリアの値を取得

  if( window.event.keyCode == 13 ){
          document.form1.submit();
        }
//debug
if (word == ""){
  word ="サービス";
}
  var serach_Results = new Object();

//  検索用語を小文字に変換
  let search_word = word.toLowerCase();
  console.log("search_word", search_word);
  search_word = zenkaku2Hankaku(search_word);
  console.log("search_word_2", search_word);

//.item-linkを取得
  let categries = document.querySelectorAll('.item-link');
  categries.forEach(categry => {
    console.log(categry.textContent);
    console.log('word!!!!',word);
//    console.log(categry.textContent);
    console.log(categry.href);

    categry_name = categry.textContent;
    search_categry_name = zenkaku2Hankaku(categry_name.toLowerCase());


//.検索用語と一致すると配列に入れる
    if(search_categry_name.indexOf(search_word) != -1){
      serach_Results[categry.textContent] = categry.href;
    }
  });

  for (let category_name in serach_Results){
    console.log(category_name);
    console.log(serach_Results[category_name]);
  }
  document.write('<!DOCTYPE html>\n');
  document.write('<html lang=ja>\n');
  document.write('<head>\n');
  document.write('  <meta charset="UTF-8">\n');
  document.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
  document.write('  <link rel="stylesheet" href="css/mtool_honban.css">\n')
  document.write('</head>\n');
  document.write('<body>\n');
  document.write('<header\n');
  document.write('  <div class="container-fluid logo">\n');
  document.write('    <img src="img/logo_tech_momitioring_tool.png" alt="tech Monitoring tool" class="logo-img" onclick="location.reload()">\n');
  document.write('  </div>\n');
  document.write('</header>\n');
  document.write('<br>\n');
  document.write('<form><input onclick="location.reload()" type=button value=前のページへ戻る></form><br>\n');
  document.write(word + 'の検索結果\n');
    document.write('<br>\n');
  if (Object.keys(serach_Results) < 1){
      document.write('見つかりませんでした。<br>\n');
  } else {
    let n = 0;
    let line = "";
    for (let category_name in serach_Results){
      ++n;
//       line = n + ":" + "<a href=" + serach_Results[category_name] + "'>"
     line = n + ":" + "<a href='" + serach_Results[category_name] + "'>"
        + category_name + "</a><br>\n";
      document.write(line + '\n');
    }
  }
  document.write('</div>\n')
  document.write('</body>\n');
  document.write('</html>\n');
}


//全角 → 半角（英数字）
//https://www.yoheim.net/blog.php?q=20191101
function zenkaku2Hankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function DetailSearchItem(){
  let word = search_form.search_word.value;  //テキストエリアの値を取得
//debug
  if (word == ""){
    word = "三太郎";
    console.log('word!!!!',word);
  }

  let serach_Results = new Object();

  let servers;
  let subsystem_name_obj;
  let subsystem_name;
  let server_name;
  let search_subsystem_name;

//  検索用語を小文字に変換
  let search_word = word.toLowerCase();
//  console.log("search_word", search_word);
  search_word = zenkaku2Hankaku(search_word);
//  console.log("search_word_2", search_word);

//サブシステム名で検索
//.subsystem-nameを取得
  let subsystems = document.querySelectorAll('.card');
  subsystems.forEach(subsystem => {
    //debug
//    console.log(subsystem.textContent);

    //サブシステム名を取得
    subsystem_name_obj = subsystem.querySelector(".subsystem-name");
    subsystem_name = subsystem_name_obj.textContent;
    search_subsystem_name = zenkaku2Hankaku(subsystem_name.toLowerCase());
//    console.log("zenhan", search_subsystem_name);

    //サブシステム名が検索用語と一致すると
    //その配下のリンクを取得して配列に入れる
    if(search_subsystem_name.indexOf(search_word) != -1){
      console.log(subsystem_name);

      servers = subsystem.querySelectorAll('.link-item');
      servers.forEach(server => {
        console.log(server.textContent);
        console.log(server.href);
        serach_Results[subsystem_name + ":" + server.textContent] = server.href;
      });
    } else {
    //サブシステム名が検索用語と一致しない場合はシステム名で検索
      servers = subsystem.querySelectorAll('.link-item');
      servers.forEach(server => {
        search_searver = server.textContent;
        search_searver = zenkaku2Hankaku(search_searver.toLowerCase());

        if(search_searver.indexOf(search_word) != -1){
          console.log(server.textContent);
          console.log(server.href);
          serach_Results[subsystem_name + ":" + server.textContent] = server.href;
        }
      });
    }
  });

//debug
  for (let server_name in serach_Results){
    console.log(server_name);
    console.log(serach_Results[server_name]);
  }

document.write('<!DOCTYPE html>\n');
document.write('<html lang=ja>\n');
document.write('<head>\n');
document.write('  <meta charset="UTF-8">\n');
document.write('  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
document.write('  <link rel="stylesheet" href="css/mtool_honban.css">\n')
document.write('</head>\n');
document.write('<body>\n');
document.write('<header\n');
document.write('  <div class="logo">\n');
document.write('    <img src="img/logo_tech_momitioring_tool.png" alt="tech Monitoring tool" class="logo-img" onclick="location.reload()">\n');
document.write('  </div>\n');
document.write('</header>\n');
document.write('<br>\n');
document.write('<form><input onclick="location.reload()" type=button value=前のページへ戻る></form><br>\n');
document.write(word + 'の検索結果\n');
document.write('<br>\n');
if (Object.keys(serach_Results) < 1){
  document.write('見つかりませんでした。<br>\n');
} else {
  let n = 0;
  let line = "";
  for (let category_name in serach_Results){
    ++n;
    line = n + ":" + "<a href='" + serach_Results[category_name] + "'>"
      + category_name + "</a><br>\n";
    document.write(line + '\n');
  }
}
document.write('</div>\n')
document.write('</body>\n');
document.write('</html>\n');
}
