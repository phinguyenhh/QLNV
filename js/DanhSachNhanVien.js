function DanhSachNhanVien() {
    this.mangNV = [];//mảng đối tượng
    //Phương thức
    this.themNV = function (nv) {
        // nv: 1 nv mới cần thêm
        this.mangNV.push(nv);
    };
    this.timIndex = function(tk) {
        var indexFind = -1;
        this.mangNV.map(function(nv,index){
            if(nv.tk === tk){
                //tìm thấy nv
                indexFind = index;
            }
        });
        return indexFind;
    };
    this.xoaNV = function(tk) {
        // index: vị trí cần xóa
        var index = this.timIndex(tk);
        if(index > -1){
            //tìm thấy            
            this.mangNV.splice(index,1);
        }
    }
    this.capNhat = function (nv) {
        //tìm sv cần cập nhật
        var indexFind = this.timIndex(nv.tk);
        if (indexFind > -1) {
            //tìm thấy mới cập nhật
            //sv: chứa thông tin mới 
            // gán dư liệu mới vào vị trí của sinh vien cần cập nhật
            dsnv.mangNV[indexFind] = nv;
            return true;//đã cập nhật
        } else {
            return false;
        }
    }
}

DanhSachNhanVien.prototype.timKiemTheoLoaiNV = function (tuTim) { 
    var mangTK = []
    var tuTimThuong = tuTim.toLowerCase()
    var tuTimReplace = tuTimThuong.replace(/\s/g,"")

    this.mangNV.map(function(nv,index){
        var tenThuong = nv.loaiNV.toLowerCase()
        var tenReplace = tenThuong.replace(/\s/g,"")

        var result = tenReplace.indexOf(tuTimReplace)
        if (result > -1) {
            mangTK.push(nv)
        }
    })
    return mangTK
}