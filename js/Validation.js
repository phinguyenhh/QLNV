function Validation() {
    // value: giá trị từ user
    // spanID: id của thẻ thông báo lỗi
    //message: nội dung thông báo
    this.checkEmpty = function (value, spanID, message) {
        if (value === "") {
            getELE(spanID).innerHTML = message;
            getELE(spanID).style.display = "block";
            return false;
        }

        getELE(spanID).innerHTML = "";
        getELE(spanID).style.display = "none";
        return true;
    }
    this.checkID = function (value, spanID, message, mangNV) {
        // some(): duyệt mảng, kiểm tra theo điều kiện => return true/false
        //nv: từng nhân viên trong mảng
        var isExist = mangNV.some(function (nv, index) {
            return nv.tk === value;
        });

        if (isExist) {
            getELE(spanID).innerHTML = message;
            getELE(spanID).style.display = "block";
            return false;
        }
        getELE(spanID).innerHTML = "";
        getELE(spanID).style.display = "none";
        return true;

    }
    this.checkNumberTK = function (value, spanID, message) {
        var pattern = /^[0-9]+$/
        if (value.match(pattern) && value.length >= 4 && value.length <= 6) {

            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";
    }
    this.checkName = function (value, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (value.match(pattern)) {

            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    this.checkEmail = function (value, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (value.match(pattern)) {

            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    this.checkPassword = function (value, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,10}$/
        if (value.match(pattern)) {

            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    this.checkDate = function (value, spanID, message) {
        var pattern = /(?<DAY>\d?\d)(?<SEPARATOR>[-.\/])(?<MONTH>\d\d)(\k<SEPARATOR>)(?<YEAR>\d{4})/
        if (value.match(pattern)) {

            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    this.checkSalary = function (value, spanID, message) {
        var pattern = /^[0-9]+$/
        if (value.match(pattern) && value >= 1e+6 && value <= 20e+6) {

            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    this.checkChucVu = function (value, spanID, message) {

        if (value == "Chọn chức vụ") {
            getELE(spanID).innerHTML = message;
            getELE(spanID).style.display = "block";

            return false;
        }

        getELE(spanID).innerHTML = "";
        getELE(spanID).style.display = "none";

        return true;
    }
    this.checkGioLam = function (value, spanID, message) {
        var pattern = /^[0-9]+$/
        if (value.match(pattern) && value >= 80 && value <= 200) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";


            return true;
        }
        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";


        return false;
    }
}