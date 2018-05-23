import React from "react";
import fetch from 'isomorphic-fetch'

class CreateProduct extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      handleSubmit(event) {
        event.preventDefault();

        var token = this.props.token;
        const data = new FormData(event.target);
        fetch('https://shopdtonline.herokuapp.com/api/type', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                tenloai: data.get('tenloai'),
              })
        })
        .then(res => res.json())
        .then(
            (result) => {
              alert('Thêm thành công.');
            },
            (error) => {
                alert('Thêm thất bại rùi! Liên hệ sang');
            }
        );
      }
    
      render() {
        return (
        <div class = "container">
          <form class="form-horizontal" onSubmit={this.handleSubmit}>
		  	<div class="row">
			  	<div class="col-sm-3">Tên Loại Sản Phẩm</div>
				<div class="col-sm-9">
					<input required maxlength="50" type="text" class="form-control" id="tenloai" name="tenloai" placeholder="iPhone X"/>
				</div>
			</div>
            <div class="text-center" style={{margin:10}}>
                <button name="btnSave" class="btn btn-success" id="btnUpload">
					<span class="glyphicon glyphicon-ok" tyle="submit"></span>
					Lưu lại
				</button>
            </div>
          </form>
        </div>
        );
      }
}

export default CreateProduct;