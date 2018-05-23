import React from "react";
import fetch from 'isomorphic-fetch'
var moment = require('moment');

class UpdateUser extends React.Component {

    constructor() {
        super();
        this.state = {
          error: null,
          isLoaded: false,
          idNgDung: 0,
          Username: "",
          Pass: "",
          hoTen: "",
          ngSinh: "",
          gTinh: "",
          SDT: "",
          email: "",
          Loai: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateHoTen = this.updateHoTen.bind(this);
        this.updateNgSinh = this.updateNgSinh.bind(this);
        this.updateGTinh = this.updateGTinh.bind(this);
        this.updateSDT = this.updateSDT.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateLoai = this.updateLoai.bind(this);
    }
      
      handleSubmit(event) {
          event.preventDefault();
          
          var id = this.props.id;
          const data = new FormData(event.target);
          var token = this.props.token;
          //alert(JSON.stringify(data.get('Pass')));
          fetch('https://shopdtonline.herokuapp.com/api/user', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
              idNGDUNG: id,
              Username: data.get('Username'),
              Pass: data.get('Pass'),
              hoTen: data.get('hoTen'),
              ngSinh: data.get('ngSinh'),
              gTinh: data.get('gTinh'),
              SDT: data.get('SDT'),
              email: data.get('email'),
              Loai: data.get('Loai'),
              })
        })
        .then(res => res.json())
        .then(
            (result) => {
              alert('Sửa thành công.');
            },
            (error) => {
                alert('Sửa thất bại! Bạn không có quyền admin');
            }
        );
        
    
      }

      updateUsername(event) {
        this.setState({Username: event.target.value});
      }

      updatePassword(event) {
        this.setState({Pass: event.target.value});
      }

      updateHoTen(event) {
        this.setState({hoTen: event.target.value});
      }

      updateNgSinh(event) {
        this.setState({ngSinh: event.target.value});
      }

      updateGTinh(event) {
        this.setState({gTinh: event.target.value});
      }
      
      updateSDT(event) {
        this.setState({SDT: event.target.value});
      }

      updateEmail(event) {
        this.setState({email: event.target.value});
      }

      updateLoai(event) {
        this.setState({Loai: event.target.value});
      }

      

      componentDidMount() {
        var id = this.props.id;
        console.log(id);
        fetch("https://shopdtonline.herokuapp.com/api/user/"+ id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        idNgDung: result[0].idNGDUNG,
                        Username: result[0].Username,
                        Pass: result[0].Pass,
                        hoTen: result[0].hoTen,
                        ngSinh: moment(result[0].ngSinh).format("YYYY-MM-DD"),
                        gTinh: result[0].gTinh,
                        SDT: result[0].SDT,
                        email: result[0].email,
                        Loai: result[0].Loai,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

      render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div class="text-center">Loading...</div>;
        } else if(isLoaded){
        return (
          <form onSubmit={this.handleSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Username</label>
                  <input class="form-control" id="Username" name="Username" value={this.state.Username} onChange={this.updateUsername}/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input type="password" class="form-control" id="Pass" name="Pass" value={this.state.Pass} onChange={this.updatePassword} />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputAddress">Email</label>
                  <input type="email" class="form-control" id="email" name="email" value={this.state.email} onChange={this.updateEmail}/>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputState">Ngày sinh</label>
                  <input class="form-control" id="ngSinh" name="ngSinh" value={this.state.ngSinh} onChange={this.updateNgSinh} required type="date" />
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress2">Họ tên</label>
                <input type="text" class="form-control" id="hoTen" name="hoTen" value={this.state.hoTen} onChange={this.updateHoTen}  />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCity">Số diện thoại</label>
                  <input type="text" class="form-control" id="SDT" name="SDT" value={this.state.SDT} onChange={this.updateSDT} />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputState">Giới Tính</label>
                  <select id="gTinh" name="gTinh" class="form-control">
                    <option value="Nam" selected>Nam</option>
                    <option value="Nam">Nữ</option>
                  </select>
                </div>
                <div class="form-group col-md-2">
                  <label for="inputZip">Loại</label>
                  <input type="text" class="form-control" id="Loai" name="Loai" value={this.state.Loai} onChange={this.updateLoai}/>
                </div>
              </div>
              <div class="text-center">
                  <button name="btnSave" class="btn btn-success" id="btnUpload">
                    Lưu lại
                  </button>
              </div>
          </form>
        );
      }
    }
}

export default UpdateUser;