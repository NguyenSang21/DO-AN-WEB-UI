import React from "react";
import Modal from 'react-modal';
import CreateProduct from './CreateProduct'
import UpdateProduct from './UpdateProduct'
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            modalIsOpen: false,
            modalIsUpdate: false,
            update: false,
            idM: 1
        };
    
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    // load lại khi có update
    componentDidUpdate(prevProps, prevState) {
        if (this.state.update) {
            fetch("https://shopdtonline.herokuapp.com/api/products")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            update: false,
                            items: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            update: false,
                            error
                        });
                    }
                )
        }
    }
     // load lại khi có update
     componentWillReceiveProps(nextProps){
        fetch("https://shopdtonline.herokuapp.com/api/products")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
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
        // load lần đầu (môt lân duy nhât)
        componentDidMount() {
            fetch("https://shopdtonline.herokuapp.com/api/products")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
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

    // mở model để thêm mới sản phẩm
    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
        this.setState({update: true});
    }

    openModalUpdate(e) {
        var id = e.currentTarget.dataset.id;
        this.setState({idM: id});
        this.setState({update: false});
        this.setState({modalIsUpdate: true});
    }

    closeModalUpdate = () => {
        this.setState({update: true});
        this.setState({modalIsUpdate: false});
    }
    // bắt sự kiện để delete
    handleClickDelete(e) {
        e.preventDefault();

        var token = this.props.token;
        var id = e.currentTarget.dataset.id; 
        fetch('https://shopdtonline.herokuapp.com/api/products/' + id , {
            method: 'Delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
                },
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    update: true
                });
                alert('Xóa thành công !');
            },
            (error) => {
                alert('Xóa thât bại ! Yêu cầu đăng nhập');
            }
        );
    }
   

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center"><h4>Loading...</h4></div>;
        } else {
            return (
                <div className="row">
                    <div class="col-md-12 text-center" style={{marginBottom: 30}}>
                        <button class="btn btn-info"  type="button"  onClick={this.openModal}>
                            <h4>Thêm mới sản phẩm</h4>
                        </button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal">
                            <div class="text-center">
                                <h2 ref={subtitle => this.subtitle = subtitle}>Thêm mới sản phẩm</h2>
                            </div>
                            <CreateProduct token={this.props.token}/>
                            <div class="text-center" style={{marginTop: 10}}>
                                <button class="btn btn-default" onClick={this.closeModal}>Close lại</button>
                            </div>
                            
                        </Modal>
                    </div>
                    {items.map(item => (
                        <div className="col-md-3" key={item.idM}>
                            <div className="card mb-4 box-shadow">
                                <img className="card-img-top"
                                    style={{
                                        marginTop: 10,
                                        }}
                                     src={item.linkAnh}
                                     alt="Card image cap" />
                                    <div className="card-body">
                                        <div className="text-center" style={{marginBottom:20}}>
                                            <h4 className="card-text">{item.tenMay}</h4>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" onClick={this.openModalUpdate.bind(this)} data-id={item.idM}
                                                        className="btn btn-info">Sửa
                                                </button>
                                                <Modal
                                                    isOpen={this.state.modalIsUpdate}
                                                    onRequestClose={this.closeModalUpdate}
                                                    contentLabel="Example Modal">
                                                    <div class="text-center" style={{marginBottom:20}}>
                                                        <h2 ref={subtitle => this.subtitle = subtitle}>Sửa lại sản phẩm</h2>
                                                    </div>
                                                    <UpdateProduct id={this.state.idM} token={this.props.token}/>
                                                    <div class="text-center"  style={{marginTop:20}}>
                                                        <button class="btn btn-success" onClick={this.closeModalUpdate}>Close lại</button>
                                                    </div>
                                                </Modal>
                                                <button type="button" onClick={this.handleClickDelete.bind(this)} data-id={item.idM}
                                                        className="btn btn-danger">Xoá
                                                </button>
                                            </div>
                                            <NumberFormat value={item.Gia} displayType={'text'} thousandSeparator={true} />Đ
                                        </div>
                                    </div>
                            </div>
                        </div>
                        ))
                        }
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        token: state.token
    };
}

export default connect(mapStateToProps) (ProductList);