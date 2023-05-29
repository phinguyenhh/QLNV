const dsnv = new DanhSachNhanVien()
const validation = new Validation();

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV))
}

function getLocalStorage() {
    var dataLocal = JSON.parse(localStorage.getItem("DSNV"))
    if (dataLocal !== null) {
        hienThiTable(dataLocal)
        dsnv.mangNV = dataLocal
    }
}
getLocalStorage()

function getELE(id) {
    return document.getElementById(id)
}

function getValue(id) {
    return getELE(id).value
}

function themNhanVien() {
    //? lấy dữ liệu từ form
    var tk = getValue("tknv")
    var ten = getValue("name")
    var email = getValue("email")
    var mk = getValue("password")
    var ngayLam = getValue("datepicker")
    var luongCB = getValue("luongCB")
    var chucVu = getValue("chucvu")
    var gioLam = getValue("gioLam")

    var isValid = true; //gia sử dữ liệu đúng

    //?các hàm điểm tra dữ liệu
    //TK: không bỏ trống, không được trùng, giới hạn 4-6 ký tự số
    isValid &= validation.checkEmpty(tk, "tbTKNV", "Tài khoản không được để trống")
        && validation.checkNumberTK(tk, "tbTKNV", "Tài khoản không hợp lệ(4-6 ký tự số)")
        && validation.checkID(tk, "tbTKNV", "Tài khoản bị trùng", dsnv.mangNV)
    //Tên: không bỏ trống gõ chữ
    isValid &= validation.checkEmpty(ten, "tbTen", "Tên không được để trống")
        && validation.checkName(ten, "tbTen", "Tên không hợp lệ")
    // Email: không bỏ trống, đúng cú pháp
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống")
        && validation.checkEmail(email, "tbEmail", "Email không hợp lệ")
    // Password : mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống
    isValid &= validation.checkEmpty(mk, "tbMatKhau", "Tài khoản không được để trống")
        && validation.checkPassword(mk, "tbMatKhau", "Mật khẩu không hợp lệ (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt, 6-10 ký tự)")
    // Date :  Ngày làm không để trống, định dạng mm/dd/yyyy
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống")
        && validation.checkDate(ngayLam, "tbNgay", "Ngày làm không hợp lệ (mm/dd/yyyy)")
    // Salary:  Lương cơ bản 1 000 000 - 20 000 000, không để trống
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống")
        && validation.checkSalary(luongCB, "tbLuongCB", "Số lương không hợp lệ(1 000 000 - 20 000 000) ")
    // ChucVu: chọn hợp lệ
    isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Chức vụ không hợp lệ")
    // GioLam:
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống")
        && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm không hợp lệ (Giới hạn  80 - 200)")
    //? Tạo đối tượng Sinh viên
    if (isValid) {
        var nv = new NhanVien(tk, ten, email, mk, ngayLam, luongCB, chucVu, gioLam);
        nv.xepLoaiNV();
        nv.luongNV();

        dsnv.themNV(nv);
        //gọi hàm hiển thị 
        setLocalStorage()
        hienThiTable(dsnv.mangNV);
        getELE('btnDong').click()
        resetForm()
    }
}

function hienThiTable(mang) {
    // mỗi nv => 1 row (tr)

    //content: chứa tất cả các thẻ tr nhanvien
    var content = "";

    mang.map(function (nv, index) {
        // nv: phần tử của mảng do map lưu vào khi duyệt mảng

        var trNV = `<tr>
            <td>${nv.tk}</td>
            <td>${nv.ten}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNV}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.tk}')">Xóa</button>                
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemThongTin('${nv.tk}')">Xem</button>
            </td>
        </tr>`;
        content += trNV;
    })
    document.getElementById("tableDanhSach").innerHTML = content;

}
function xoaNhanVien(tk) {
    dsnv.xoaNV(tk);
    hienThiTable(dsnv.mangNV);
    setLocalStorage()
}

function xemThongTin(tk) {
    var indexFind = dsnv.timIndex(tk);
    resetForm()
    if (indexFind > -1) {
        //tìm thấy vị trí của nv
        var nvFind = dsnv.mangNV[indexFind]

        document.getElementById("tknv").value = nvFind.tk
        getELE("tknv").disabled = true
        getELE("btnThemNV").style.display = 'none'
        document.getElementById("name").value = nvFind.ten
        document.getElementById("email").value = nvFind.email
        document.getElementById("password").value = nvFind.mk
        document.getElementById("datepicker").value = nvFind.ngayLam
        document.getElementById("luongCB").value = nvFind.luongCB
        document.getElementById("chucvu").value = nvFind.chucVu
        document.getElementById("gioLam").value = nvFind.gioLam
    }

}

function capNhatSV() {
    //? lấy dữ liệu từ form
    var tk = getValue("tknv")
    var ten = getValue("name")
    var email = getValue("email")
    var mk = getValue("password")
    var ngayLam = getValue("datepicker")
    var luongCB = getValue("luongCB")
    var chucVu = getValue("chucvu")
    var gioLam = getValue("gioLam")

    var isValid = true;

    //?các hàm điểm tra dữ liệu
    //TK: không bỏ trống, không được trùng, giới hạn 4-6 ký tự số
    isValid &= validation.checkEmpty(tk, "tbTKNV", "Tài khoản không được để trống")
        && validation.checkNumberTK(tk, "tbTKNV", "Tài khoản không hợp lệ(4-6 ký tự số)")
    //     && validation.checkID(tk, "tbTKNV", "Tài khoản bị trùng", dsnv.mangNV)
    //Tên: không bỏ trống gõ chữ
    isValid &= validation.checkEmpty(ten, "tbTen", "Tên không được để trống")
        && validation.checkName(ten, "tbTen", "Tên không hợp lệ")
    // Email: không bỏ trống, đúng cú pháp
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống")
        && validation.checkEmail(email, "tbEmail", "Email không hợp lệ")
    // Password : mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống
    isValid &= validation.checkEmpty(mk, "tbMatKhau", "Tài khoản không được để trống")
        && validation.checkPassword(mk, "tbMatKhau", "Mật khẩu không hợp lệ (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt, 6-10 ký tự)")
    // Date :  Ngày làm không để trống, định dạng mm/dd/yyyy
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống")
        && validation.checkDate(ngayLam, "tbNgay", "Ngày làm không hợp lệ (mm/dd/yyyy)")
    // Salary:  Lương cơ bản 1 000 000 - 20 000 000, không để trống
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống")
        && validation.checkSalary(luongCB, "tbLuongCB", "Số lương không hợp lệ(1 000 000 - 20 000 000) ")
    // ChucVu: chọn hợp lệ
    isValid &= validation.checkChucVu(chucVu, "tbChucVu", "Chức vụ không hợp lệ")
    // GioLam:
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống")
        && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm không hợp lệ (Giới hạn  80 - 200)")
    if (isValid) {

        var nv = new NhanVien(tk, ten, email, mk, ngayLam, luongCB, chucVu, gioLam);
        nv.xepLoaiNV();
        nv.luongNV();

        var result = dsnv.capNhat(nv);
        if (result) {
            //true
            setLocalStorage();
            hienThiTable(dsnv.mangNV);
            getELE('btnDong').click()
            resetForm();

        } else {
            //false
            alert("Cập nhật thất bại")
        }
    }

}

function resetForm() {
    getELE("form").reset();
    getELE("tknv").disabled = false;
    getELE("tbTKNV").style.display = "none";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbNgay").style.display = "none";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbChucVu").style.display = "none";
    getELE("tbGiolam").style.display = "none";
}

getELE('btnThem').onclick = function (e) {
    resetForm();
    getELE("btnThemNV").style.display = 'block'

    
}

getELE('btnDong').onclick = function (e) {
    resetForm();
}

getELE("searchName").onkeyup = function () {
    var tuTim = getELE('searchName').value
    var mangTK = dsnv.timKiemTheoLoaiNV(tuTim)
    hienThiTable(mangTK)
}