import React from "react";
import Modal from 'react-modal';
import UpdateUser from './UpdateUser';
import {connect} from 'react-redux';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            modalIsOpen: false,
            modalIsUpdate: false,
            update: false,
            idNGDUNG: 1
        };
    
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    // load lại khi có update
    componentDidUpdate(prevProps, prevState) {
        if (this.state.update) {
            fetch("https://shopdtonline.herokuapp.com/api/user")
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


     // load lại khi có update
     componentWillReceiveProps(nextProps){
        fetch("https://shopdtonline.herokuapp.com/api/user")
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
   
        // load lần đầu (môt lân duy nhât)
        componentDidMount() {
            fetch("https://shopdtonline.herokuapp.com/api/user")
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
        this.setState({idNGDUNG: id});
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

        var id = e.currentTarget.dataset.id;
        var token = this.props.token; 
        fetch('https://shopdtonline.herokuapp.com/api/user/' + id , {
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
            return <div class="text-center">Loading...</div>;
        } else {
            return (
                <div className="row">
                    {items.map(item => (
                        <div className="col-md-12" key={item.idNGDUNG}>
                            <div className="card mb-12 box-shadow">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Họ tên</th>
                                            <th>Ngày Sinh</th>
                                            <th>Giới tính</th>
                                            <th>SĐT</th>
                                            <th>Email</th>
                                            <th>Loại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.idNGDUNG}</td>
                                            <td>{item.Username}</td>
                                            <td>{item.Pass}</td>
                                            <td>{item.hoTen}</td>
                                            <td>{item.ngSinh}</td>
                                            <td>{item.gTinh}</td>
                                            <td>{item.SDT}</td>
                                            <td>{item.email}</td>
                                            <td>{item.Loai}</td>
                                        </tr>	
                                    </tbody>
                                </table>
                                <div className="btn-group">
                                    <div class="text-right">
                                    <button style={{marginRight:5}} type="button" onClick={this.openModalUpdate.bind(this)} data-id={item.idNGDUNG}
                                        className="btn btn-info">Edit</button>
                                            <Modal
                                                isOpen={this.state.modalIsUpdate}
                                                onRequestClose={this.closeModalUpdate}
                                                contentLabel="Example Modal">
                                                <div class = "text-center">
                                                    <h2 ref={subtitle => this.subtitle = subtitle}>Cập nhật người dùng</h2>
                                                </div>
                                                <UpdateUser id={this.state.idNGDUNG} token={this.props.token}/>
                                                <div class="text-center" style={{marginTop:10}}>
                                                    <button class="btn btn-default" onClick={this.closeModalUpdate}>
                                                        Close lại
                                                    </button>
                                                </div>
                                            </Modal>
                                    <button type="button" onClick={this.handleClickDelete.bind(this)} data-id={item.idNGDUNG} className="btn btn-danger">
                                        Delete
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

export default connect(mapStateToProps) (UserList);