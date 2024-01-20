import { useEffect, useState } from "react";
import "./Users.scss";
import { fetchAllUsers, handleDeleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

function Users() {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [dataModal, setDataModal] = useState({});

  const [isShowModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      setListUsers(response.data.DT.users);
      setTotalPages(response.data.DT.totalPages);
      console.log(response.data.DT);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteAUser = async (user) => {
    setDataModal(user);
    setShowModalDelete(true);
  };
  const handleClose = () => {
    setShowModalDelete(false);
    setDataModal({});
  };

  const handleConfirmDelete = async () => {
    let response = await handleDeleteUser(dataModal.id);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      await fetchUsers();
      setShowModalDelete(false);
    } else {
      toast.error(response.data.EM);
    }
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="actions">
              <button className="btn btn-success">Refresh</button>
              <button className="btn btn-primary">Add new user</button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers &&
                  listUsers.length &&
                  listUsers.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.Group?.name}</td>
                      <td style={{ display: "flex", gap: "5px" }}>
                        <button className="btn btn-warning">Edit</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteAUser(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
      />

      <ModalUser title={"Create new user"} />
    </>
  );
}

export default Users;
