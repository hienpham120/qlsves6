function Validation() {

    //Chứa các phương thức kiểm tra hợp lệ
    this.kiemTraRong = function (value,selectorError,name) {
        //Xử lý không hợp lệ
        //.trim() loại bỏ khoảng trắng đầu - cuối chuỗ
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        //Xử lý hợp lệ
        document.querySelector(selectorError).innerHTML = '';
        return true;

    }

    this.kiemTraKyTu = function(value,selectorError,name){
        var regexAllLetters = /^[A-Za-z]+$/; 
        if(regexAllLetters.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự !';
        return false;
    }

    this.tatCaSo = function(value,selectorError,name){
        var regexNumber = /^[0-9]+$/;
        //Nếu như trả về true --> hợp lệ
        if(regexNumber.test(value)){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải là số !';
        return false;
    }

    this.kiemTraEmail = function(value, selectorError,name){
        var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexEmail.test.value){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng (@example.com)';
        return false;
    }

    this.kiemTraDoDai = function(value, selectorError, minLength, maxLength){
        if(value.lenght < minLength || value.lenght > maxLength){
            document.querySelector(selectorError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự !`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function(value, selectorError, minValue, maxValue, name){
        if(value < minValue || value > maxValue){
            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}
