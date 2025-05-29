// automatically select textbox on page load
let input = document.getElementById("msg");
input.focus();
input.select();

const loadLog = function() {
    $.ajax({
        url: "log.html",
        cache: false,
        success: function(html) {
            $("#chatbox").html(html);
        }
    });
}

loadLog();
setInterval(loadLog, 1000);