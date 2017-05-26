function isValid() {
  var password = document.getElementById('password').value;
  if (password == "123")
    top.location.href="./file.pdf";
  else {
    window.location.reload();
  }
}
