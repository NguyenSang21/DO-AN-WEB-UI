import React from "react";
import fetch from 'isomorphic-fetch'

class UpdateCategories extends React.Component {

    constructor() {
        super();
        this.state = {
          error: null,
          isLoaded: false,
          idloai: 0,
          tenloai: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTenLoai = this.updateTenLoai.bind(this);
    }
      
      handleSubmit(event) {
          event.preventDefault();

          var id = this.props.id;
          const data = new FormData(event.target);
          var token = this.props.token;
          //alert(JSON.stringify(data.get('Pass')));
          fetch('https://shopdtonline.herokuapp.com/api/type', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
              idloai: id,
              tenloai: data.get('tenloai')
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

      updateTenLoai(event) {
        this.setState({tenloai: event.target.value});
      }      

      componentDidMount() {
        var id = this.props.id;
        fetch("https://shopdtonline.herokuapp.com/api/type/"+ id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        idloai: result[0].idloai,
                        tenloai: result[0].tenloai,    
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
            return <div>Loading...</div>;
        } else if(isLoaded){
        return (
          <form onSubmit={this.handleSubmit}>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputEmail4">Tên Loại</label>
                  <input class="form-control" id="tenloai" name="tenloai" value={this.state.tenloai} onChange={this.updateTenLoai}/>
                </div>
              </div>
              <div class="form-row">
                  <button name="btnSave" class="btn btn-success" id="btnUpload">
                    <span class="glyphicon glyphicon-ok" tyle="submit"></span>
                    Lưu lại
                  </button>
              </div>
          </form>
        );
      }
    }
}

export default UpdateCategories;