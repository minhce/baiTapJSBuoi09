// Tạo đối tượng dsnv từ lớp đối tượng DSNV
const dsnv = new DSNV();

const validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

getLocalStorage();

/**
 * Lấy thông tin nhân viên
 */
function layThongTinNhanVien() {
    const _taiKhoan = getEle("tknv").value;
    const _tenNV = getEle("name").value;
    const _email = getEle("email").value;
    const _matKhau = getEle("password").value;
    const _ngayLam = getEle("datepicker").value;
    const _luongCoBan = getEle("luongCB").value;
    const _chucVu = getEle("chucvu").value;
    const _gioLam = getEle("gioLam").value;

    //* Validation
    let isValid = true;

    //Kiểm tra tài khoản
    isValid &= validation.kiemTraRong(_taiKhoan, "tbTKNV", "(*) Tài khoản không được để trống");
    // Kiểm tra họ tên
    isValid &= validation.kiemTraRong(_tenNV, "tbTen", "(*) Họ tên không được để trống");
    // Kiểm tra email
    isValid &= validation.kiemTraRong(_email, "tbEmail", "(*) Email không được để trống");
    // Kiểm tra mật khẩu
    isValid &= validation.kiemTraRong(_matKhau, "tbMatKhau", "(*) Mật khẩu không được để trống");
    // Kiểm tra ngày làm
    isValid &= validation.kiemTraRong(_ngayLam, "tbNgay", "(*) Ngày làm không được để trống");
    // Kiểm tra lương cơ bản
    isValid &= validation.kiemTraRong(_luongCoBan, "tbLuongCB", "(*) Lương cơ bản không được để trống");
    // Kiểm tra giờ làm
    isValid &= validation.kiemTraRong(_gioLam, "tbGiolam", "(*) Giờ làm không được để trống");
    // Kiểm tra chức vụ
    if (getEle("chucvu").selectedIndex == 0) {
        getEle("tbChucVu").style.display = "inline-block";
        getEle("tbChucVu").innerHTML = "(*) Chưa chọn chức vụ";
        isValid &= false;
    } else {
        getEle("tbChucVu").innerHTML = "";
        isValid &= true;
    }

    if (!isValid) return null;

    // Tạo đối tượng nhân viên
    const nv = new NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam)

    // Tính lương cho nhân viên
    nv.tinhLuong();

    //Xếp loại nhân viên;
    nv.xepLoai()

    return nv;
}


/**
 * Hiển thị danh sách nhân viên
 */
function hienThiDanhSachNhanVien(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        const nv = data[i];
        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick="editNV('${nv.taiKhoan}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
            </td>
        </tr>
        `
    }

    getEle("tableDanhSach").innerHTML = content;
}

// set localStorage
function setLocalStorage() {
    const arrString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", arrString);
}

// get localStorage
function getLocalStorage() {
    if (!localStorage.getItem("DSNV")) return;

    const arrString = localStorage.getItem("DSNV");

    const arrJSON = JSON.parse(arrString);

    dsnv.arr = arrJSON;

    hienThiDanhSachNhanVien(dsnv.arr);
}


/**
 * Xóa nhân viên
 */
function deleteNV(id) {
    dsnv.xoaNV(id)
    hienThiDanhSachNhanVien(dsnv.arr);
    setLocalStorage();
}

/**
 * reset form
 */
function resetForm() {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "inline-block";

    getEle("tknv").value = "";
    getEle("tknv").disabled = false;
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").selectedIndex = 0;
    getEle("gioLam").value = "";
}

/**
 * Sửa nhân viên
 */
function editNV(id) {
    const nv = dsnv.layThongTinNV(id);
    if (nv) {
        getEle("btnCapNhat").style.display = "inline-block";
        getEle("btnThemNV").style.display = "none";

        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.tenNV;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
}

/**
 * Thêm nhân viên 
 */
function themNhanVien() {
    const nv = layThongTinNhanVien();

    if (!nv) return;

    dsnv.themNV(nv);
    hienThiDanhSachNhanVien(dsnv.arr);

    setLocalStorage();
}

/**
 * Cập nhật nhân viên
 */
function updateNV() {
    const nv = layThongTinNhanVien();

    dsnv.capNhatNV(nv);
    hienThiDanhSachNhanVien(dsnv.arr);

    setLocalStorage();
}

/**
 * Tìm nhân viên theo xếp loại
 */
getEle("searchName").addEventListener("keyup", function () {
    const keyword = getEle("searchName").value;
    const mangTimKiem = dsnv.timKiemNV(keyword);
    hienThiDanhSachNhanVien(mangTimKiem);
})