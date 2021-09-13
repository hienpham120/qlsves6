// axios({
//     url:'../data/text.txt', //Đường dẫn đến file hoặc server(api). Backend cung cấp
//     method: 'GET',
//     responseType: 'text', //Kiểu dữ liệu của file trả về
// });

// //Xử lý thành công
// promise.then(function(result){
//     console.log('result', result.data);

//     document.querySelector('body').innerHTML = result.data
// });

// //Xử lý thất bại
// promise.catch(function(error){
//     console.log('error', error.data);
// });

// var promise = axios({
//     url:'../data/data.json', //Đường dẫn đến file hoặc server(api). Backend cung cấp
//     method: 'GET',
//     responseType: 'json', //Kiểu dữ liệu của file trả về
// });
// // //Xử lý thành công
// promise.then(function(result){
//     console.log('result', result.data);

//     document.querySelector('body').innerHTML = result.data.title;
// });

// // //Xử lý thất bại
// promise.catch(function(error){
//     console.log('error', error.data);
// });

// var promise = axios({
//     url:'../data/data.xml', //Đường dẫn đến file hoặc server(api). Backend cung cấp
//     method: 'GET',
//     responseType: 'document', //Kiểu dữ liệu của file trả về
// });
// // //Xử lý thành công
// promise.then(function(result){
//     console.log('result', result.data);

//     document.querySelector('body').innerHTML = result.data.querySelector('title').innerHTML;
// });

// // //Xử lý thất bại
// promise.catch(function(error){
//     console.log('error', error.data);
// });

/**--------------------------------Kết nối đến server------------------------------------------ */
function layDanhSachSinhVienApi(){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
        method: 'GET',
        responType: 'json',
    });
    //Xử lý thành công
    promise.then(function(result){
        console.log('result', result.data);
        //Sau khi lấy dữ liệu thành công --> hiển thị ra giao diện bằng DOM
        renderTableSinhVien(result.data);
    });
    //Xử lý thất bại
    promise.catch(function(error){
        console.log('error', error);
    });
}
layDanhSachSinhVienApi();
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
/** Thực hành với post: phương thức post là phương thức đưa dữ liệu người dùng về server */
document.querySelector('#btnThemSinhVien').onclick = function(){
    var sinhVien = new SinhVien();
    //Lấy dữ liệu từ input vào biến sinhVien
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    console.log('arrSinhVien', sinhVien);

    //Gửi dữ liệu về server = ajax
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'post', //phương thức do backend cung cấp
        data:sinhVien
    });

    promise.then(function(result){
        console.log('result', result.data);
        //Khi thêm dữ liệu thành công ---> gọi hàm lấy danh sách sinh viên từ server về lần nữa
        layDanhSachSinhVienApi();
    });

    promise.catch(function(error){
        //Hiển thị lỗi backend trả ra
        console.log('error', error.respon.data);
    });

}

/**Phương thức xoá sinh viên ajax */
function xoaSinhVien(maSinhVien){
    console.log('maSinhVien', maSinhVien);

    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,
        method: 'DELETE'
    });

    promise.then(function(result){
        console.log('result', result.data);
    });

    promise.catch(function(error){
        console.log('error', error.respone.data)
    });
}

/**Chỉnh sửa thông tin ajax */
function chinhSua(maSinhVien){
    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
        method: 'GET'
    });

    promise.then(function(result){
        var sinhVien = result.data;
        console.log('result', result.data);
        //Đưa các giá tri từ dữ liệu lấy về lên các control input phía trên
        //Hiển thị lên giao diện bằng cách DOM lên các control
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
    });

    promise.catch(function(error){
        console.log('error', error.respone.data)
    }); 
}

/**Cập nhật sinh viên ajax */
document.querySelector('#btnCapNhatThongTin').onclick = function(){
    var sinhVienUpdate = new SinhVien();

    sinhVienUpdate.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienUpdate.diemToan = document.querySelector('#diemToan').value;
    sinhVienUpdate.diemLy = document.querySelector('#diemLy').value;
    sinhVienUpdate.diemHoa = document.querySelector('#diemHoa').value;
    sinhVienUpdate.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienUpdate.email = document.querySelector('#email').value;
    sinhVienUpdate.soDienThoai = document.querySelector('#soDienThoai').value;
    console.log('sinhVienUpdate', sinhVienUpdate);
    //Gửi dữ liệu đến server
    var promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVienUpdate.maSinhVien}`,
        method: 'PUT',
        data:sinhVienUpdate
    });

    promise.then(function(result){
        console.log('result', result.data);
        //Sau khi xử lý thành công request về api để lấy dữ liệu mới về
    });

    promise.catch(function(error){
        console.log('error', error.respone.data)
    }); 
}

/**
 * npm i [tên thư viện] --> cài trên project (mỗi project mỗi cài)
 * npm i [tên thư viện] -g --> cài trực tiếp trên máy
 * Thư viện đưa web lên domain: npm i surge -g
 */