
var arrSinhVien = [];

//Tạo đối tượng kiểm tra dữ liệu
var kiemTra = new Validation();


document.querySelector('#btnThemSinhVien').onclick = function () {
    //Lấy thông tin người dùng nhập vào chứa vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;

    // Kiểm tra dữ liệu trước khi đưa vào mảng
    // ------------------------------------- validation ---------------------------------------------------
    //(1): Kiểm tra rỗng (bắt buộc nhập)
    var valid = true;
    valid &= kiemTra.kiemTraRong(sinhVien.maSinhVien,'#error_required_maSinhVien','Mã sinh viên') & kiemTra.kiemTraRong(sinhVien.tenSinhVien,'#error_required_tenSinhVien','Tên sinh viên');

    //(2): Kiểm tra định dạng dữ liệu
    //(2.1) Kiểm tra ký tự
    valid &= kiemTra.kiemTraKyTu(sinhVien.tenSinhVien, '#error_allLetter_tenSinhVien', 'Tên sinh viên');
    //(2.2)Kiểm tra định dạng số
    valid &= kiemTra.tatCaSo(sinhVien.soDienThoai, '#error_allNumber_soDienThoai', 'Số điện thoại') & kiemTra.tatCaSo(sinhVien.diemToan, '#error_allNumber_diemToan', 'Điểm toán') & kiemTra.tatCaSo(sinhVien.diemLy, '#error_allNumber_diemLy', 'Điểm Lý') & kiemTra.tatCaSo(sinhVien.diemHoa, '#error_allNumber_diemHoa', 'Điểm hoá') & kiemTra.tatCaSo(sinhVien.diemRenLuyen, '#error_allNumber_diemRenLuyen', 'Điểm rèn luyện');
    //(2.3)Kiểm tra eamil
    valid &= kiemTra.kiemTraEmail(sinhVien.email, '#error_email', 'Email')
    //(2.4)Kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(sinhVien.maSinhVien, '#error_min_max_length_maSinhVien', 4, 6, 'Mã sinh viên');
    //(2.5)Kiểm tra giá trị
    valid &= kiemTra.kiemTraGiaTri(sinhVien.diemToan, '#error_min_max_value_diemToan', 0, 10, 'Điểm toán' & sinhVien.diemLy, '#error_min_max_value_diemLy', 0, 10, 'Điểm lý' & sinhVien.diemHoa, '#error_min_max_value_diemHoa', 0, 10, 'Điểm hoá');

    var regex = /cybersoft/i;
    var title = 'ádasdasjdnasjndjasbd';
    console.log('ketQua', regex.test(title));



    if(!valid) {
        return ;
    }

    // ---------------------------------------------------------------------------------------------------
    // Đưa dữ liệu sinh viên vào mảng
    arrSinhVien.push(sinhVien);
    console.log('arrSinhVien', arrSinhVien);
    renderTableSinhVien(arrSinhVien);

    //Lưu thông tin vào localstorage
    luuStorage();

}



function renderTableSinhVien(arrSV) { //input
    //Từ mảng arrSV tạo ra 1 chuỗi html <tr> <td></td></tr>
    //arrSV = [{maSinhVien:'',....},{maSinhVien:'',....},{maSinhVien:'',....}]
    var content = '';
    for (var index = 0; index < arrSV.length; index++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var sv = arrSV[index];
        var sinhVien = new SinhVien();
        sinhVien.maSinhVien = sv.maSinhVien;
        sinhVien.tenSinhVien = sv.tenSinhVien;
        sinhVien.diemToan = sv.diemToan;
        sinhVien.diemLy = sv.diemLy;
        sinhVien.diemHoa = sv.diemHoa;
        sinhVien.diemRenLuyen = sv.diemRenLuyen;
        sinhVien.email = sv.email;
        sinhVien.soDienThoai = sv.soDienThoai;
        sinhVien.loaiSinhVien = sv.loaiSinhVien

        //Từ dữ liệu sinh viên đó => tạo ra 1 chuỗi html tr
        var trSinhVien = `
                <tr>
                    <td>${sinhVien.maSinhVien}</td>
                    <td>${sinhVien.tenSinhVien}</td>
                    <td>${sinhVien.email}</td>
                    <td>${sinhVien.soDienThoai}</td>
                    <td>${sinhVien.loaiSinhVien}</td>
                    <td>${sinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
                    <td>${sinhVien.diemRenLuyen}</td>
                    <td><button onclick="xoaSinhVien('${sinhVien.maSinhVien}')" class="btn btn-danger">Xoá</button>
                    <button onclick="chinhSua('${sinhVien.maSinhVien}')" class="ml-2 btn btn-primary">Chỉnh sửa</button>
                    
                    </td>
                </tr>
        `;
        content += trSinhVien;
    };
    //Dom đến tbody trên giao diện để gán innerHTML vào
    document.querySelector('#tblSinhVien').innerHTML = content;

    // console.log('content',content);
}

function chinhSua(maSinhVienClick) {
    //Khoá 1 số nút 
    document.querySelector('#maSinhVien').disabled = true;
    document.querySelector('#btnThemSinhVien').disabled = true;
    document.querySelector('#btnCapNhatThongTin').disabled = false;

    // alert(maSinhVienClick);
    // arrSinhVien = [{maSinhVien:'1',....},{maSinhVien:'2',....},{maSinhVien:'3',....}]
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sv = arrSinhVien[index];
        if (sv.maSinhVien === maSinhVienClick) {
            //Load dữ liệu của sinh viên này lên giao diện
            document.querySelector('#maSinhVien').value = sv.maSinhVien;
            document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
            document.querySelector('#email').value = sv.email;
            document.querySelector('#soDienThoai').value = sv.soDienThoai;
            document.querySelector('#diemToan').value = sv.diemToan;
            document.querySelector('#diemLy').value = sv.diemLy;
            document.querySelector('#diemHoa').value = sv.diemHoa;
            document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
            document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        }
    }
}




function xoaSinhVien(maSVClick) {
    // alert(maSVClick);
    // arrSinhVien = [{maSinhVien:'1',....},{maSinhVien:'2',....},{maSinhVien:'3',....}]

    for (var index = arrSinhVien.length - 1; index >= 0; index--) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = arrSinhVien[index];
        //So sánh mã từng sinhViên trong mảng với maSinhVien từ nút xoá
        if (sinhVien.maSinhVien === maSVClick) {
            arrSinhVien.splice(index, 1) //Xoá 1 phần tử trong mảng
        }
    }
    //Tạo lại table html mới từ mảng đã xoá
    renderTableSinhVien(arrSinhVien);
}


//Xử lý chức năng cập nhật thông tin 
document.querySelector('#btnCapNhatThongTin').onclick = function () {
    //Lấy ngược lại thông tin từ giao diện sau khi người dùng đã thay đổi 
    var sinhVienCapNhat = new SinhVien();
    sinhVienCapNhat.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienCapNhat.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienCapNhat.diemToan = document.querySelector('#diemToan').value;
    sinhVienCapNhat.diemLy = document.querySelector('#diemLy').value;
    sinhVienCapNhat.diemHoa = document.querySelector('#diemHoa').value;
    sinhVienCapNhat.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienCapNhat.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVienCapNhat.email = document.querySelector('#email').value;
    sinhVienCapNhat.soDienThoai = document.querySelector('#soDienThoai').value;


    // arrSinhVien = [{maSinhVien:'1',....},{maSinhVien:'2',....},{maSinhVien:'3',....}]
    //Duyệt mảng tìm sinh viên có mã trùng với sinh viên được cập nhật
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVienTrongMang = arrSinhVien[index];
        //So sánh sinh viên trong mảng và sinh viên người dùng bấm nút cập nhật dựa trên mã sinh viên
        if (sinhVienTrongMang.maSinhVien === sinhVienCapNhat.maSinhVien) {
            //Nếu khớp thì lấy sinh viên trong mảng gán các giá trị = giá trị người dùng đã thay đổi
            sinhVienTrongMang.tenSinhVien = sinhVienCapNhat.tenSinhVien;
            sinhVienTrongMang.email = sinhVienCapNhat.email;
            sinhVienTrongMang.soDienThoai = sinhVienCapNhat.soDienThoai;
            sinhVienTrongMang.diemToan = sinhVienCapNhat.diemToan;
            sinhVienTrongMang.diemLy = sinhVienCapNhat.diemLy;
            sinhVienTrongMang.diemHoa = sinhVienCapNhat.diemHoa;
            sinhVienTrongMang.diemRenLuyen = sinhVienCapNhat.diemRenLuyen;
            sinhVienTrongMang.loaiSinhVien = sinhVienCapNhat.loaiSinhVien;
        }
    }

    //Gọi lại hàm tạo bảng từ mảng sinh viên đã được cập nhật
    renderTableSinhVien(arrSinhVien);

    console.log('sinhVienCapNhat', sinhVienCapNhat);
    //Mở khoá nút sau khi cập nhật
    //Khoá 1 số nút 
    document.querySelector('#maSinhVien').disabled = false;
    document.querySelector('#btnThemSinhVien').disabled = false;
    document.querySelector('#btnCapNhatThongTin').disabled = true;

    //Lưu vào storage sau khi cập nhật
    luuStorage();

}


// --------------------- Localstorage -----------------------


function luuStorage() {

    //Chuyển arrSinhVien thành chuỗi 
    var stringArrSinhVien = JSON.stringify(arrSinhVien);

    //Lưu chuỗi này vào localstorage
    localStorage.setItem('arrSinhVien', stringArrSinhVien);

    // console.log('arrSinhVien',arrSinhVien);
    // console.log('stringArrSinhVien',stringArrSinhVien)
}


function layStorage() {

    //Kiểm tra xem có storage đó không
    if (localStorage.getItem('arrSinhVien')) {
        //Lấy chuỗi từ localstorage ra 
        var stringArrSinhVien = localStorage.getItem('arrSinhVien');
        //Chuyển chuỗi về lại thành mảng và gán vào biến arrSinhVien
        arrSinhVien = JSON.parse(stringArrSinhVien);

        //Gọi hàm tạo lại table sinh viên từ mảng đó
        renderTableSinhVien(arrSinhVien);
    }
}
//Gọi khi giao diện vừa được load
layStorage();