function DSNV() {
    this.arr = [];

    // Thêm NV
    this.themNV = function (nv) {
        this.arr.push(nv)
    };

    // Tìm vị trí NV
    this.timViTriNV = function (taiKhoan) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i];
            if (nv.taiKhoan == taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };

    // Xóa NV
    this.xoaNV = function (taiKhoan) {
        const index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    // Lấy thông tin NV
    this.layThongTinNV = function (taiKhoan) {
        const index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            return this.arr[index]
        }
        return null;
    };
    // Cập nhật NV
    this.capNhatNV = function (nv) {
        const index = this.timViTriNV(nv.taiKhoan);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    //Tìm kiếm NV
    this.timKiemNV = function (keyword) {
        let mangTimKiem = [];
        for (let i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i];
            const keywordLowerCase = keyword.toLowerCase();
            const xepLoaiLowerCase = nv.xepLoai.toLowerCase()
            if (xepLoaiLowerCase.indexOf(keywordLowerCase) !== -1) {
                mangTimKiem.push(nv);
            }
        }
        return mangTimKiem;
    };
}