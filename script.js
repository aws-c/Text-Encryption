document.addEventListener("DOMContentLoaded", function() {
    const encryptButton = document.getElementById("encryptButton");
    const copyButton = document.getElementById("copyButton");
    const saveButton = document.getElementById("saveButton");

    if (encryptButton) {
        encryptButton.addEventListener("click", encryptText);
    }

    if (copyButton) {
        copyButton.addEventListener("click", copyToClipboard);
    }

    if (saveButton) {
        saveButton.addEventListener("click", saveText);
        decryptText();
    }
});

function encryptText() {
    var inputText = document.getElementById("textInput").value;
    var encrypted = LZString.compressToEncodedURIComponent(inputText);
    var output = document.getElementById("output");
    output.innerHTML = `https://example.com/get.html#${encrypted}`;
    document.getElementById("copyButton").style.display = "block";
}

function copyToClipboard() {
    var copyText = document.getElementById("output").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Copied to clipboard!");
    });
}

function decryptText() {
    var hash = window.location.hash.substring(1);
    var decrypted = LZString.decompressFromEncodedURIComponent(hash);
    document.getElementById("decryptedText").innerText = decrypted;
    document.getElementById("saveButton").style.display = "block";
}

function saveText() {
    var decryptedText = document.getElementById("decryptedText").innerText;
    var blob = new Blob([decryptedText], {type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "decryptedText.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
}

