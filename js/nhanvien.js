function NhanVien(_taiKhoan,_tenNV,_email,_matKhau,_ngayLam,_luongCoBan,_chucVu,_gioLam){
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.luong = 0;
    this.xepLoai = "";

    /**
     * Tính lương
     */
    this.tinhLuong = function(){
        switch (this.chucVu) {
            case "Sếp":
                this.luong = this.luongCoBan * 3;
                break;
            case "Trưởng phòng":
                this.luong = this.luongCoBan * 2;
                break;
            case "Nhân viên":
                this.luong = this.luongCoBan;
                break;
            default:
                this.luong = 0;
                break;
        }
    };

    /**
     * Xếp loại NV
     */
    this.xepLoai = function(){
        if(this.gioLam >= 192){
            this.xepLoai = "Xuất sắc"
        } else if(this.gioLam >= 176 && this.gioLam < 192){
            this.xepLoai = "Giỏi"
        } else if(this.gioLam >= 160 && this.gioLam < 176){
            this.xepLoai = "Khá"
        } else{
            this.xepLoai = "Trung bình"
        }
    }
}