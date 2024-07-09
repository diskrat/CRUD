function main() {
  fetch(" http://localhost:3000/posts/").then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  });
  fetch("http://localhost:3000/posts/", { method: "POST" }).then(
    function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    },
  );
}
whole_ = document.getElementById("home");
form_ = document.getElementById("user");

form_.addEventListener("submit", (e) => e.preventDefault());
//main();
