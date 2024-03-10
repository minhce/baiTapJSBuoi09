function Validation() {
    this.kiemTraRong = function (value, spanID, message) {
        if (value === "") {
            getEle(spanID).style.display = "inline-block"
            getEle(spanID).innerHTML = message;
            return false;
        } 
            getEle(spanID).innerHTML = "";
            return true;
    }
}