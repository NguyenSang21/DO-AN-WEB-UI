import React from "react";
import Modal from 'react-modal';
import CreateCategories from './CreateCategories'
import UpdateCategories from './UpdateCategories'
import {connect} from 'react-redux';


class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            modalIsOpen: false,
            modalIsUpdate: false,
            update: false,
            idLoai: 1
        };
    
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    // load lại khi có update
    componentDidUpdate(prevProps, prevState) {
        if (this.state.update) {
            fetch("https://shopdtonline.herokuapp.com/api/type")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            update: false,
                            items: result
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
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


    //  // load lại khi có update
    //  componentWillReceiveProps(nextProps){
    //     fetch("https://shopdtonline.herokuapp.com/api/type")
    //             .then(res => res.json())
    //             .then(
    //                 (result) => {
    //                     this.setState({
    //                         isLoaded: true,
    //                         items: result
    //                     });
    //                 },
    //                 // Note: it's important to handle errors here
    //                 // instead of a catch() block so that we don't swallow
    //                 // exceptions from actual bugs in components.
    //                 (error) => {
    //                     this.setState({
    //                         isLoaded: true,
    //                         error
    //                     });
    //                 }
    //             )
    //   }
   
        // load lần đầu (môt lân duy nhât)
        componentDidMount() {
            fetch("https://shopdtonline.herokuapp.com/api/type")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
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
        this.setState({idLoai: id});
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
        fetch('https://shopdtonline.herokuapp.com/api/type/' + id , {
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
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
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
            return <div>Loading...</div>;
        } else {
            return (
                <div className="row">
                    <div class="col-md-12 text-center" style={{marginBottom: 30}}>
                        <button class="btn btn-info"  onClick={this.openModal}>
                            <h4> Thêm mới loại sản phẩm </h4>
                        </button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal">
                            <div class="text-center">
                                <h2 ref={subtitle => this.subtitle = subtitle}>Thêm mới loại sản phẩm</h2>
                                <CreateCategories token={this.props.token}/>
                                <button class="btn btn-default" onClick={this.closeModal}>Close lại</button>
                            </div>
                            
                        </Modal>
                    </div>
                    {items.map(item => (
                        <div className="col-md-12" key={item.idLoai}>
                            
                            <div className="card mb-12 box-shadow">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên loại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.idloai}</td>
                                            <td>{item.tenloai}</td>
                                        </tr>	
                                    </tbody>
                                </table>
                                <div className="btn-group">
                                        <div class="text-right">
                                            <button style={{marginRight:10}} type="button" onClick={this.openModalUpdate.bind(this)} data-id={item.idloai}
                                                className="btn btn-info">Sửa
                                            </button>
                                            <Modal
                                                isOpen={this.state.modalIsUpdate}
                                                onRequestClose={this.closeModalUpdate}
                                                contentLabel="Example Modal">
                                                <h2 ref={subtitle => this.subtitle = subtitle}>Cập nhật loại sản phẩm</h2>
                                                <UpdateCategories id={this.state.idLoai} token={this.props.token}/>
                                                <div class="form-row">
                                                <div class="justify-content-center">
                                                    <button class="btn btn-default" onClick={this.closeModalUpdate}>
                                                        <span class="glyphicon glyphicon-ok"></span>
                                                        Close lại
                                                    </button>
                                                </div>
                                                </div>
                                            </Modal>
                                            <button type="button" onClick={this.handleClickDelete.bind(this)} data-id={item.idloai} className="btn btn-danger">
                                                    Xoá
                                            </button>
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

export default connect(mapStateToProps) (CategoriesList);