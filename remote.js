(function() {
    console.log("✅ remote.js loaded successfully!");

    // Alert confirmation
    alert("🔥 Remote script executed from nirajankhatiwada.com.np!");

    // Add a mouseover effect to change background color
    document.addEventListener("mouseover", function(event) {
        if (event.target.tagName === "P" || event.target.tagName === "DIV") {
            event.target.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
    });

    console.log("🎨 Mouseover event added: Background color changes randomly.");

    // Append a hidden message to the body
    let hiddenMessage = document.createElement("div");
    hiddenMessage.innerText = "Remote script executed successfully!";
    hiddenMessage.style.cssText = "position:fixed;bottom:-100px;left:50%;transform:translateX(-50%);opacity:0.5;font-size:12px;";
    document.body.appendChild(hiddenMessage);
})();
