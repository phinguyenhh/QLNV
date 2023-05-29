function NhanVien(tk, ten, email, mk, ngayLam, luongCB, chucVu, gioLam) {
    //thuộc tính
    this.tk = tk;
    this.ten = ten;
    this.email = email;
    this.mk = mk
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNV = ""
    //phương thức
    this.xepLoaiNV = function () {

        if (this.gioLam >= 192) {
            return this.loaiNV = "Xuất sắc"
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            return this.loaiNV = "Giỏi"
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            return this.loaiNV = "Khá"
        } else if (this.gioLam < 160) {
            return this.loaiNV = "Trung bình"
        }
    }
    this.luongNV = function () {        
        if (this.chucVu == "Sếp") {
            return this.tongLuong = this.luongCB * 3
        }
        else if (this.chucVu == "Trưởng phòng") {
            return this.tongLuong = this.luongCB * 2
        }
        else if (this.chucVu == "Nhân viên") {
            return this.tongLuong = this.luongCB
        }
    }

}