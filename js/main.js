var itemType;

var HtmlManager = {
  data:"",
  getData: function(){
    HtmlManager.ajaxGet("http://localhost/JS_POO/exo4/data.json", function (reponse) {
      HtmlManager.data = JSON.parse(reponse);

      HtmlManager.createDashboard();
    });
  },
  ajaxGet: function (url, callback) {
      var req = new XMLHttpRequest();
      req.open("GET", url);
      req.addEventListener("load", function () {
          if (req.status >= 200 && req.status < 400) {
              // Appelle la fonction callback en lui passant la réponse de la requête
              callback(req.responseText);
          } else {
              console.error(req.status + " " + req.statusText + " " + url);
          }
      });
      req.addEventListener("error", function () {
          console.error("Erreur réseau avec l'URL " + url);
      });
      req.send(null);
  },
  sortJson: function(){
    HtmlManager.ajaxGet("http://localhost/JS_POO/exo4/data.json", function (reponse) {

    HtmlManager.data = JSON.parse(reponse);

    itemType = document.getElementById("selectItem").value;

    HtmlManager.checkSelect(itemType);

    HtmlManager.data.users.sort();

    HtmlManager.removeDashboard();

    HtmlManager.createDashboard();
  });
  },
  checkSelect: function(itemType){
    if (itemType == "firstname") {
      HtmlManager.data.users.sort(function(a, b) {
          return a.firstname > b.firstname;
      });
    }
    else if (itemType == "lastname") {
      HtmlManager.data.users.sort(function(a, b) {
          return a.lastname > b.lastname;
      });
    }
    else if (itemType == "nationality") {
      HtmlManager.data.users.sort(function(a, b) {
          return a.nationality > b.nationality;
      });
    }
    else if (itemType == "age") {
      HtmlManager.data.users.sort(function(a, b) {
          return a.age - b.age;
      });
    }
  },
  removeDashboard: function(){
    let dashboard = document.getElementById("addLine");
    while (dashboard.hasChildNodes()) {
        dashboard.removeChild(dashboard.firstChild);
    }
  },
  createDashboard: function(){
    HtmlManager.data.users.forEach(user => {
      const addline = document.getElementById('addLine');

      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      const td4 = document.createElement('td');

      td1.innerHTML = user.firstname
      td2.innerHTML = user.lastname
      td3.innerHTML = user.age
      td4.innerHTML = user.nationality

      addline.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    });
  }

}

HtmlManager.getData();
