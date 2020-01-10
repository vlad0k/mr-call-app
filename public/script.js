let waiter = document.querySelector('#waiter');
let hookah = document.querySelector('#hookah');
let check = document.querySelector('#check');

var xhr = new XMLHttpRequest();

let table = window.location.href.split('/')[3];

document.getElementById('table').innerHTML += table

waiter.onclick = () => {
  if (confirm("Позвать официанта?")) {
    xhr.open("POST", `/${table}/waiter`, true);
    xhr.send();
    alert("Официант скоро подойдет)");
    }
}

hookah.onclick = () => {
  if (confirm("Позвать кальянщика?")) {
    xhr.open("POST", `/${table}/hookah`, true);
    xhr.send();
    alert("Кальянщик скоро подойдет)");
    }
}

check.onclick = () => {
  if (confirm("Попросить счет?")) {
    xhr.open("POST", `/${table}/check`, true);
    xhr.send();
    alert("Ок)");
    }
}
