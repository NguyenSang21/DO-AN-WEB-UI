import React, { Component } from 'react';
import {connect} from 'react-redux';


 class StatusProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            itemsOrders: [],
            itemsDetailOrders:[],
            trangThai: null
        }
     }

     componentDidMount(){
         // test order của user 1
         fetch("https://shopdtonline.herokuapp.com/api/order")
         .then(res => res.json())
         .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    itemsOrders: result,
                });
                console.log(result);
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
         )
     }

     detailOrder(event){
        const id = event.currentTarget.dataset.id; //get id 
        fetch("https://shopdtonline.herokuapp.com/api/detailorder/"+ id)
        .then(res => res.json())
        .then(
           (result) => {
               this.setState({
                   isLoaded: true,
                   itemsDetailOrders: result,
               });
               console.log(result);
           },
           (error) => {
               this.setState({
               isLoaded: true,
               error
               });
           }
        )
     }

     updateStatus(event){
        var {token} = this.props;
        console.log(token);
        const idCTHD = event.currentTarget.dataset.id; //get id
        fetch('https://shopdtonline.herokuapp.com/api/detailorder', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                idCTHD: idCTHD,
                TrangThai: this.state.trangThai
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

     updateTrangThai(event)
     {
        event.preventDefault();
        const value = event.target.value;
        this.setState({trangThai: value});
     }

  render() {
    const {error, isLoaded, itemsOrders, itemsDetailOrders} = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="text-center"><h4>Loading...</h4></div>;
    } else {
        return (
            <div class="row col-12">
                <div class="table-responsive">
                    <div type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã hoá đơn</th>
                            <th>Số sản phẩm</th>
                            <th>Ngày mua</th>
                            <th>Tình trạng</th>
                            <th>Tổng tiền</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody id="items">
                        {itemsOrders.map(item => (
                            <tr data-toggle="collapse" data-target="#demo1" data-id={item.idHD} onClick={this.detailOrder.bind(this)} class="accordion-toggle ">
                                <td>{item.idHD}</td>
                                <td>{item.soSanPham}</td>
                                <td>{item.NgayMua}</td>
                                <td>{item.tinhTrang}</td>
                                <td>{item.tongTien}</td>
                                <td>{item.diaChi}</td>
                            </tr>
                        ))}
                    </tbody> 
                    </table>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            <h2>Chi tiết đơn hàng</h2> 
                            <table class="table table-striped">
                            
                            <thead>
                                <tr>
                                    <th>Mã Sản Phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Cập nhật trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                            {itemsDetailOrders.map(item => (
                                <tr data-toggle="collapse" data-target="#demo1" onlick={this.detailOrder.bind(this)} class="accordion-toggle ">
                                    <td>{item.idCTHD}</td>
                                    <td>{item.tenSanPham}</td>
                                    <td>{item.SoLuong}</td>
                                    <td>{item.DonGia}</td>
                                    <td>{item.TongTien1SP}</td>
                                    <td>{item.TrangThai}</td>
                                    <td class="text-right">
                                    <select id="trangThai" name="trangThai" onClick={this.updateTrangThai.bind(this)}>								
                                        <option value="chua giao">Chưa giao</option>
                                        <option value="da giao">Đã giao</option>
                                        <option value="dang giao">Đang giao</option>
                                    </select>
                                        <button type="button" onClick={this.updateStatus.bind(this)} data-id={item.idCTHD} className="btn btn-danger text-right">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <hr/>
                <div class="row">
                    <div class="col-md-6 col-md-offset-4 text-center">
                        <ul class="pagination" id="myPager"></ul>
                    </div>
                </div>
            </div>
        </div>
        )
    }
  }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        token: state.token
    };
}

export default connect(mapStateToProps) (StatusProduct);
